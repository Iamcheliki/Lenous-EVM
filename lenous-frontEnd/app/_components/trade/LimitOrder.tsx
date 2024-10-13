import React from "react";
import { useState, useEffect } from "react";
import TimeInfForce from "./TimeInForce";
import Time from "./Time";
import TransactionInfo from "./TransactionInfo";
import { ethers } from "ethers";
// import OrderbookABI from '@/app/_libs/utils/abis/Orderbook.json';
import { useEthersProvider, useEthersSigner } from "@/app/_libs/utils/ethers";
import { useWatchContractEvent } from "wagmi";
import ProfitAndStop from "./ProfitAndStop";
import AdvancedOption from "./advancedOption";
import { OrderToPlace } from "@/app/types/order";
// import { ORDERBOOK_ADDRESS } from '@/app/_libs/utils/constants/contractAddresses';

interface Props {
  order: OrderToPlace;
  setOrder: (order: OrderToPlace) => void;
}

const precentageList = [25, 50, 75, 100];

const LimitOrder: React.FC<Props> = ({ order, setOrder }) => {
  const [amount, setAmount] = useState<string>("5");
  const [hasTime, setHasTime] = useState<boolean>(true);
  const [expirationTime, setExpirationTime] = useState<number>(
    Math.floor(Date.now() / 1000) + 5
  );
  const [time, setTime] = useState<string>("Mins");
  const [TimeInForce, setTimeInforce] = useState<string>("Good Til Time");
  const [profit, setProfit] = useState<string>("0");
  const [percent, setPercent] = useState<number>(25);
  const [stopLoss, setStopLoss] = useState<string>("0");

  // useEffect(() => {
  //   console.log(time);
  //   if (hasTime) {
  //     let timeInSeconds = 0;
  //     switch (time.type) {
  //       case "Days":
  //         timeInSeconds = time.amount * 24 * 60 * 60;
  //         break;
  //       case "Hours":
  //         timeInSeconds = time.amount * 60 * 60;
  //         break;
  //       case "Mins":
  //         timeInSeconds = time.amount * 60;
  //         break;
  //       case "Weeks":
  //         timeInSeconds = time.amount * 7 * 24 * 60 * 60;
  //         break;
  //       default:
  //         timeInSeconds = 5;
  //     }
  //     setExpirationTime(Math.floor(Date.now() / 1000) + timeInSeconds);
  //   }
  // }, [time, hasTime]);

  const provider = useEthersProvider();
  const signer = useEthersSigner();

  // const contract = new ethers.Contract(
  //   ORDERBOOK_ADDRESS,
  //   OrderbookABI,
  //   signer || provider
  // );

  // useWatchContractEvent({
  //   address: ORDERBOOK_ADDRESS,
  //   abi: OrderbookABI,
  //   eventName: "OrderPlaced",
  //   onLogs(logs) {
  //     console.log("New logs!", logs);
  //   },
  // });

  const submitLimitOrder = async () => {
    // const price = ethers.utils.parseUnits("3800", 6);
    // const stopLossPrice = ethers.utils.parseUnits(stopLoss, 6);
    // const takeProfitPrice = ethers.utils.parseUnits(profit, 6);
    // const parsedAmount = ethers.utils.parseUnits(amount.toString(), 6);
    // const gasLimit = ethers.utils.hexlify(1000000);
    // const isBuyOrder = actionType == "buy" ? true : false;
    // console.log(isBuyOrder);
    // try {
    //   const tx = await contract.placeLimitOrder(
    //     price,
    //     takeProfitPrice,
    //     stopLossPrice,
    //     parsedAmount,
    //     isBuyOrder,
    //     expirationTime,
    //     leverage,
    //     marginType,
    //     { gasLimit }
    //   );
    //   await tx.wait();
    //   console.log("Limit order placed successfully!");
    // } catch (error) {
    //   console.error("Transaction failed:", error);
    // }
  };

  useEffect(() => {
    if (TimeInForce === "Good Til Time") {
      setOrder({ ...order, hasTime: true });
    } else {
      setOrder({ ...order, hasTime: false });
    }
  }, [TimeInForce]);

  return (
    <div className="mt-4">
      <div className="text-md font-poppins italic text-neutral-light flex items-center justify-between mb-4">
        <h4>Available</h4>
        <p>0 USDT</p>
      </div>
      <div className="mb-4">
        <label
          htmlFor="limitPrice"
          className="block text-sm text-neutral-light font-medium "
        >
          Limit Price
        </label>
        <input
          id="limitPrice"
          type="number"
          placeholder="$0.0"
          value={order.price}
          onChange={(e) => setOrder({ ...order, price: +e.target.value })}
          className="mt-1 block w-full  px-4 py-3  rounded-2xl  text-neutral-light bg-white-bg-05 sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm text-neutral-light font-medium "
        >
          Amount
        </label>
        <input
          id="amount"
          type="number"
          value={order.amount}
          onChange={(e) => setOrder({ ...order, amount: +e.target.value })}
          className="mt-1 block w-full  px-4 py-3  rounded-2xl text-neutral-light bg-white-bg-05 sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Enter amount"
        />
      </div>
      <div className="flex gap-1 border-neutral-light border-b pb-8">
        {precentageList.map((item) => (
          <div
            key={item}
            onClick={() => {
              setPercent(item);
            }}
            className={
              "h-[36px] px-3 text-neutral-light rounded-[18px] flex-grow flex-shrink-0 flex items-center justify-center text-center cursor-pointer " +
              (item === percent
                ? "bg-green-linear-gradient text-primary "
                : "border-solid border-[1px] border-white-bg-15")
            }
          >
            <span>{item}%</span>
          </div>
        ))}
      </div>
      <div className="pt-10">
        <h3 className="text-neutral-light font-poppins italic">Advanced</h3>
        <div className="mt-4 flex gap-4">
          <div className="flex-grow flex-shrink-0 w-[49%]">
            <AdvancedOption
              option={TimeInForce}
              setOption={setTimeInforce}
              label="Time in Foce"
              optionList={["Good Til Time", "Immediate Or Cancel"]}
            />
          </div>
          <div className="flex-grow flex-shrink-0 w-[49%]">
            <AdvancedOption
              option={time}
              setOption={setTime}
              label="Time"
              optionList={["Mins", "Hours", "Days", "Weeks"]}
            />
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="flex-grow flex-shrink-0 w-[49%]">
            <div className=" flex justify-between bg-white-bg-05 w-full px-4 py-2.5 rounded-2xl font-poppins italic">
              <div>
                <h3 className="text-primary text-sm">Take Profit</h3>
                <input
                  id="amount"
                  type="number"
                  value={order.takeProfitPrice}
                  onChange={(e) =>
                    setOrder({ ...order, takeProfitPrice: +e.target.value })
                  }
                  className="block w-full text-white text-md bg-transparent sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>
          <div className="flex-grow flex-shrink-0 w-[49%]">
            <div className=" flex justify-between bg-white-bg-05 w-full px-4 py-2.5 rounded-2xl font-poppins italic">
              <div>
                <h3 className="text-bad-situation text-sm">Take Profit</h3>
                <input
                  id="amount"
                  type="number"
                  value={order.stopLossPrice}
                  onChange={(e) =>
                    setOrder({ ...order, stopLossPrice: +e.target.value })
                  }
                  className="block w-full text-white text-md bg-transparent sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
      <div className="mt-6  ">
        <div className="text-white mb-4">Advanced</div>

        <div className="flex items-center gap-4 justify-between ">
          <div className="grow">
            <TimeInfForce setHasTime={setHasTime} hasTime={hasTime} />
          </div>
          {hasTime && (
            <div className="grow">
              <Time setTime={setTime} />
            </div>
          )}
        </div>
        <div className="mt-4 text-center ">
          <ProfitAndStop
            profit={profit}
            setProfit={setProfit}
            stopLoss={stopLoss}
            setStopLoss={setStopLoss}
          />
        </div>

        <div className="transactionInfo">
          <TransactionInfo submitOrder={submitLimitOrder} />
        </div>
      </div> 
      */}
    </div>
  );
};
export default LimitOrder;
