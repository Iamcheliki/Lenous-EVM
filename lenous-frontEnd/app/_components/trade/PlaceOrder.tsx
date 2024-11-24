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
import TokenABI from "../../_libs/ABIs/TokenContract.json";
import {
  TOKEN_CONTRACT_ADDRESS,
  ORDERBOOK_CONTRACT_ADDRESS,
} from "@/app/_libs/utils/constants/contractAddresses";
import TokenList from "./tokenList";
import { baseSepolia } from "@wagmi/core/chains";
import ConfirmModal from "./comfirmModal";
import DepositModal from "./depositModal";
import WithdrawModal from "./withdrawModal";
import { useDispatch, useSelector } from "react-redux";
import store from "@/app/redux/store";
import { getUserCredit } from "@/app/dataRequests/userDataRequests";
import { getTokensPrice } from "@/app/dataRequests/tokensDataRequests";
import { setBalances } from "@/app/redux/slices/tradeSlice";

const initialOrder: OrderToPlace = {
  type: Order_Type.Limit,
  price: "0",
  stopLossPrice: "0",
  takeProfitPrice: "0",
  amount: "0",
  totalPrice: "0",
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
  totalPrice: string | null;
}

const PlaceOrder: React.FC = () => {
  const dispatch = useDispatch();
  const [check, setCheck] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderToPlace>(initialOrder);
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
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
    totalPrice: null,
  });
  // const [userBalance, setUserBalance] = useState<number>(0);
  // const [userFreeMargin, setUserFreeMargin] = useState<number>(0);
  // const [userUsedMargin, setUserUsedMargin] = useState<number>(0);
  const { balances } = useSelector((state: any) => state.trade);

  useEffect(() => {
    const newSocket = new WebSocket(
      `ws://195.248.240.173:8121/ws/balance/${address}`
    );

    newSocket.onopen = () => {
      console.log("balance websocket connected");
    };

    newSocket.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      console.log("message balance", message);
      dispatch(
        setBalances({
          usedMargin: +(parseFloat(message.user_balance) / 10 ** 6).toFixed(2),
          freeMargin: +(parseFloat(message.free_margin) / 10 ** 12).toFixed(2),
          totalBalance: +(parseFloat(message.margin_used) / 10 ** 12).toFixed(
            2
          ),
        })
      );
      // setUserBalance(+(parseFloat(message.user_balance) / 10 ** 6).toFixed(2));
      // setUserFreeMargin(
      //   +(parseFloat(message.free_margin) / 10 ** 12).toFixed(2)
      // );
      // setUserUsedMargin(
      //   +(parseFloat(message.margin_used) / 10 ** 12).toFixed(2)
      // );
    };
  }, [address]);

  const signer = useEthersSigner({ chainId: baseSepolia.id });

  const contract = new ethers.Contract(
    ORDERBOOK_CONTRACT_ADDRESS,
    TradeABI,
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

    console.log({
      asset,
      price: ethers.utils.parseUnits(price.toString(), "ether"),
      stopLossPrice,
      takeProfitPrice,
      amount: ethers.utils.parseUnits(amount.toString(), "ether"),
      isBuyOrder,
      expiration,
      leverage,
      marginType,
    });

    if (order.type === Order_Type.Limit) {
      await contract
        .placeLimitOrder(
          "0x4256630000000000000000000000000000000000",
          ethers.utils.parseUnits(price, "ether"),
          parseFloat(stopLossPrice),
          parseFloat(takeProfitPrice),
          ethers.utils.parseUnits(amount, "ether"),
          isBuyOrder,
          expiration,
          leverage,
          marginType
        )
        .then((res: any) => console.log(res))
        .catch((err: any) => console.log(err));
    } else {
      // const estimatedGasLimit = await contract.estimateGas.placeMarketOrder(
      //   asset,
      //   amount,
      //   isBuyOrder,
      //   leverage,
      //   marginType
      // );
      const gasPrice = ethers.utils.parseUnits("100", "gwei");
      console.log({
        asset,
        amount: ethers.utils.parseUnits(amount.toString(), "ether"),
        isBuyOrder,
        leverage,
        marginType,
      });
      await contract
        .placeMarketOrder(
          "0x4256630000000000000000000000000000000000",
          ethers.utils.parseUnits(amount.toString(), "ether"),
          isBuyOrder,
          leverage,
          marginType
          // {
          //   gasLimit: 80000,
          //   gasPrice: gasPrice,
          // }
        )
        .then((res: any) => console.log(res))
        .catch((err: any) => console.log(err));
    }
  };

  const handleDeposit = async () => {
    const gasPrice = ethers.utils.parseUnits("0.00000000001", "ether");
    const gasLimit = ethers.utils.parseUnits("0.00000000001", "ether");

    const tokenContract = new ethers.Contract(
      TOKEN_CONTRACT_ADDRESS,
      TokenABI,
      signer
    );

    const approveTx = await tokenContract.approve(
      ORDERBOOK_CONTRACT_ADDRESS,
      depositAmount * 10 ** 6
    );
    await approveTx.wait();

    await contract
      .deposit(depositAmount * 10 ** 6)
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
      totalPrice: null,
    });
  };

  const handleCheckErrors = () => {
    let newErrors = { ...errors };

    //check amount
    if (+order.amount === 0) {
      newErrors.amount = "Please enter a valid amount!";
    } else if (+order.amount < 0) {
      newErrors.amount = "Please enter a positive amount!";
    } else {
      newErrors.amount = null;
    }

    //check if limit
    if (order.type === Order_Type.Limit) {
      //check price
      if (+order.price === 0) {
        newErrors.price = "PLease enter a valid price!";
      } else if (+order.price < 0) {
        newErrors.price = "PLease enter a positive price!";
      } else {
        newErrors.price = null;
      }
    }

    console.log(+order.totalPrice / +order.leverage);
    console.log(balances.freeMargin);
    if (+order.totalPrice / +order.leverage > balances.freeMargin) {
      console.log("no margin");
      newErrors.totalPrice = "Please enter an amount less than you free margin";
    } else {
      newErrors.totalPrice = null;
    }

    setErrors({ ...newErrors });
    if (
      newErrors.amount === null &&
      newErrors.price === null &&
      newErrors.stopLoss === null &&
      newErrors.takeProfit === null &&
      newErrors.time === null &&
      newErrors.totalPrice === null
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
      <div className="w-full h-0 border-white border-b mb-8 mt-6 opacity-10"></div>
      <div className="">
        <div className="text-md font-poppins italic text-neutral-light flex items-center justify-between mb-4">
          <h4>Total Balance:</h4>
          <p>{balances.totalBalance} USD</p>
        </div>
        <div className="text-md font-poppins italic text-neutral-light flex items-center justify-between mb-4">
          <h4>Used Margin:</h4>
          <p>{balances.usedMargin} USD</p>
        </div>
        <div className="text-md font-poppins italic text-neutral-light flex items-center justify-between mb-4">
          <h4>Free Margin:</h4>
          <p
            className={
              balances.freeMargin > 0 ? "text-primary" : "text-bad-situation"
            }
          >
            {balances.freeMargin} USD
          </p>
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
