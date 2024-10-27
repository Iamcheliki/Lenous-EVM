import React, { useEffect, useState } from "react";
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
import ConfirmModal from "./comfirmModal";
import DepositModal from "./depositModal";
import WithdrawModal from "./withdrawModal";
import { useSelector } from "react-redux";
import store from "@/app/redux/store";

const initialOrder: OrderToPlace = {
  type: Order_Type.Limit,
  price: 0,
  stopLossPrice: 0,
  takeProfitPrice: 0,
  amount: 0,
  isBuyOrder: true,
  hasTime: false,
  expiration: new Date(),
  leverage: 1,
  margin: Margin_Type.Isolated,
};

export interface OrderErrors {
  amount: string | null;
  price: string | null;
  time: string | null;
  takeProfit: string | null;
  stopLoss: string | null;
}

const PlaceOrder: React.FC = () => {
  const [check, setCheck] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderToPlace>(initialOrder);
  const { openConnectModal } = useConnectModal();
  const { isConnecting, address, isConnected, chain } = useAccount();
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showDepositModal, setShowDepositModal] = useState<boolean>(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const { selectedAsset } = useSelector((state: any) => state.trade);
  const [errors, setErrors] = useState<OrderErrors>({
    amount: null,
    price: null,
    time: null,
    takeProfit: null,
    stopLoss: null,
  });

  const signer = useEthersSigner({ chainId: baseSepolia.id });

  const contract = new ethers.Contract(
    ORDERBOOK_CONTRACT_ADDRESS,
    TradeABI.abi,
    signer
  );

  const handlePlaceOrder = async () => {
    //limit order args
    const asset = ethers.utils.getAddress(selectedAsset.address);
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

  const resetErrors = () => {
    setCheck(false);
    setErrors({
      amount: null,
      price: null,
      time: null,
      takeProfit: null,
      stopLoss: null,
    });
  };

  const handleCheckErrors = () => {
    let newErrors = { ...errors };

    //check amount
    if (order.amount === 0) {
      newErrors.amount = "Please enter a valid amount!";
    } else if (order.amount < 0) {
      newErrors.amount = "Please enter a positive amount!";
    } else {
      newErrors.amount = null;
    }

    //check if limit
    if (order.type === Order_Type.Limit) {
      //check price
      if (order.price === 0) {
        newErrors.price = "PLease enter a valid price!";
      } else if (order.price < 0) {
        newErrors.price = "PLease enter a positive price!";
      } else {
        newErrors.price = null;
      }

      //check take profit
      if (order.takeProfitPrice === 0) {
        newErrors.takeProfit = "Please enter a valid amount!";
      } else if (order.takeProfitPrice < 0) {
        newErrors.takeProfit = "Please enter a positive amount!";
      } else {
        newErrors.takeProfit = null;
      }

      //check stop loss
      if (order.stopLossPrice === 0) {
        newErrors.stopLoss = "Please enter a valid amount!";
      } else if (order.stopLossPrice < 0) {
        newErrors.stopLoss = "Please enter a positive amount";
      } else {
        newErrors.stopLoss = null;
      }
    }

    setErrors({ ...newErrors });
    if (
      newErrors.amount === null &&
      newErrors.price === null &&
      newErrors.stopLoss === null &&
      newErrors.takeProfit === null &&
      newErrors.time === null
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (check) {
      handleCheckErrors();
    }
  }, [order]);

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
        <OrderType
          order={order}
          setOrder={setOrder}
          resetErrors={resetErrors}
        />
        <div className="w-full h-0 border-white border-b mb-8 opacity-10"></div>
        {/* <TokenList order={order} setOrder={setOrder} />
        {errors.asset && (
          <p className="text-bad-situation text-sm py-1">{errors.asset}</p>
        )} */}
        {order.type === Order_Type.Market && (
          <MarketOrder
            order={order}
            setOrder={setOrder}
            errors={errors}
            setErrors={setErrors}
          />
        )}
        {order.type === Order_Type.Limit && (
          <LimitOrder
            order={order}
            setOrder={setOrder}
            errors={errors}
            setErrors={setErrors}
          />
        )}
      </div>
      {isConnected ? (
        <>
          <button
            onClick={() => {
              if (!handleCheckErrors()) {
                setShowConfirmModal(true);
              } else {
                setCheck(true);
              }
            }}
            className="bg-platform-bg-gradient mt-16 w-full rounded-2xl text-white py-[10px] font-poppins italic flex gap-2 items-center justify-center"
          >
            Place {order.type === Order_Type.Limit ? "limit" : "market"} order
          </button>
          <button
            onClick={() => {
              setShowDepositModal(true);
            }}
            className="bg-[#4E8AFF] mt-2 w-full rounded-2xl text-white py-[10px] font-poppins italic flex gap-2 items-center justify-center"
          >
            Deposit
          </button>
          <button
            onClick={() => {
              setShowWithdrawModal(true);
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
      <ConfirmModal
        visible={showConfirmModal}
        handleClose={() => setShowConfirmModal(false)}
        handleConfirm={handlePlaceOrder}
        order={order}
      />
      <DepositModal
        visible={showDepositModal}
        handleClose={() => setShowDepositModal(false)}
        handleDeposit={handleDeposit}
        amount={depositAmount}
        setAmount={setDepositAmount}
      />
      <WithdrawModal
        visible={showWithdrawModal}
        handleClose={() => {
          setShowWithdrawModal(false);
        }}
        handleWithdraw={handleWithdraw}
        amount={withdrawAmount}
        setAmount={setWithdrawAmount}
      />
    </div>
  );
};

export default PlaceOrder;
