import React, { useState } from "react";
import Leverage from "./Leverage";
import IsBuyOrSell from "./IsBuyOrSell";
import OrderType from "./OrderType";
import LimitOrder from "./LimitOrder";
import MarketOrder from "./MarketOrder";
import MarginType from "./MarginType";
import { Margin_Type, Order_Type, OrderToPlace } from "@/app/types/order";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useWriteContract } from "wagmi";
import { useEthersProvider, useEthersSigner } from "@/app/_libs/utils/ethers";
import { ethers } from "ethers";
import TradeABI from "../../_libs/ABIs/OrderBook.json";
import StakeABI from "../../_libs/ABIs/StakingContract.json";
import LiquidityPoolABI from "../../_libs/ABIs/LiquidityPool.json";
import {
  LP_CONTRACT_ADDRESS,
  ORDERBOOK_CONTRACT_ADDRESS,
} from "@/app/_libs/utils/constants/contractAddresses";
import TokenList from "./tokenList";
import { baseSepolia } from "@wagmi/core/chains";

const initialOrder: OrderToPlace = {
  type: Order_Type.Limit,
  asset: { symbol: "", address: "" },
  price: 0,
  stopLossPrice: 0,
  takeProfitPrice: 0,
  amount: 0,
  isBuyOrder: true,
  hasTime: false,
  expiration: 0,
  leverage: 1,
  margin: Margin_Type.Isolated,
};

const PlaceOrder: React.FC = () => {
  const [leverage, setLeverage] = useState<number>(1);
  const [order, setOrder] = useState<OrderToPlace>(initialOrder);
  const { openConnectModal } = useConnectModal();
  const { isConnecting, address, isConnected, chain } = useAccount();
  const { data, writeContract } = useWriteContract();

  const signer = useEthersSigner({ chainId: baseSepolia.id });
  console.log(signer);

  const contract = new ethers.Contract(
    ORDERBOOK_CONTRACT_ADDRESS,
    TradeABI.abi,
    signer
  );

  console.log("contract", contract);

  const handlePlaceOrder = async () => {
    //limit order args
    const asset = ethers.utils.getAddress(order.asset.address);
    const price = order.price;
    const stopLossPrice = order.stopLossPrice;
    const takeProfitPrice = order.takeProfitPrice;
    const amount = order.amount;
    const isBuyOrder = order.isBuyOrder;
    const expiration = order.hasTime
      ? new Date(order.expiration).getTime()
      : new Date().getTime();
    const leverage = order.leverage;
    const marginType = order.margin === Margin_Type.Cross ? 0 : 1;

    console.log("expiration", expiration);
    console.log(
      asset,
      price,
      stopLossPrice,
      takeProfitPrice,
      amount,
      isBuyOrder,
      expiration,
      leverage,
      marginType
    );

    if (order.type === Order_Type.Limit) {
      await contract
        .placeLimitOrder(
          asset,
          price,
          stopLossPrice,
          takeProfitPrice,
          amount,
          isBuyOrder,
          expiration,
          leverage,
          marginType
        )
        .then((res: any) => console.log(res))
        .catch((err: any) => console.log(err));
    } else {
      await contract
        .placeMarketOrder(asset, amount, isBuyOrder, leverage, marginType, {
          gasLimit: 2000,
        })
        .then((res: any) => console.log(res))
        .catch((err: any) => console.log(err));
    }

    // writeContract({
    //   address: LP_CONTRACT_ADDRESS,
    //   abi: StakeABI,
    //   functionName: "placeLimitOrder",
    //   args: [],
    // });
  };

  const handleDeposit = async () => {
    await contract
      .deposit(200, {
        gasLimit: 2000,
      })
      .then((res: any) => console.log(res))
      .catch((err: any) => console.log(err));
  };

  const handleWithdraw = async () => {
    await contract
      .withdraw(200, {
        gasLimit: 2000,
      })
      .then((res: any) => console.log(res))
      .catch((err: any) => console.log(err));
  };
  console.log(data);
  return (
    <div className="p-4">
      {/* Margin Type Selection */}
      <div className="mb-4  ">
        <IsBuyOrSell order={order} setOrder={setOrder} />
        <div className="flex mt-4">
          <div className="flex-1 mr-2">
            <MarginType order={order} setOrder={setOrder} />
          </div>
          <div className="flex-1">
            <Leverage order={order} setOrder={setOrder} />
          </div>
        </div>
      </div>

      {/* Tab Pane */}
      <div className="mb-4">
        <OrderType order={order} setOrder={setOrder} />
        <div className="w-full h-0 border-neutral-light border-b"></div>
        <TokenList order={order} setOrder={setOrder} />
        {order.type === Order_Type.Market && (
          <MarketOrder order={order} setOrder={setOrder} />
        )}
        {order.type === Order_Type.Limit && (
          <LimitOrder order={order} setOrder={setOrder} />
        )}
      </div>
      {isConnected ? (
        <>
          <button
            onClick={() => {
              handlePlaceOrder();
            }}
            className="bg-platform-bg-gradient mt-16 w-full rounded-2xl text-white py-[10px] font-poppins italic flex gap-2 items-center justify-center"
          >
            Place {order.type === Order_Type.Limit ? "limit" : "market"} order
          </button>
          <button
            onClick={() => {
              handleDeposit();
            }}
            className="bg-[#4E8AFF] mt-2 w-full rounded-2xl text-white py-[10px] font-poppins italic flex gap-2 items-center justify-center"
          >
            Deposit
          </button>
          <button
            onClick={() => {
              handleWithdraw();
            }}
            className="bg-yellow mt-2 w-full rounded-2xl text-white py-[10px] font-poppins italic flex gap-2 items-center justify-center"
          >
            Withdraw
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            openConnectModal?.();
          }}
          className="bg-[#EAB3081a] mt-16 w-full rounded-2xl text-white py-[10px] font-poppins italic flex gap-2 items-center justify-center"
        >
          <span className="bg-[url('/icons/warningIcon.svg')] bg-no-repeat bg-center block w-[28px] h-[28px] bg-contain" />
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default PlaceOrder;
