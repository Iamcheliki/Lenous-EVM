import React from "react";
import { useState, useEffect } from "react";
import TimeInfForce from "./TimeInForce";
import Time from "./Time";
import TransactionInfo from "./TransactionInfo";
import { ethers } from "ethers";
// import OrderbookABI from '@/app/_libs/utils/abis/Orderbook.json';
import { useWatchContractEvent } from "wagmi";
import ProfitAndStop from "./ProfitAndStop";
import AdvancedOption from "./advancedOption";
import { OrderToPlace } from "@/app/types/order";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { OrderErrors } from "./PlaceOrder";

// import { ORDERBOOK_ADDRESS } from '@/app/_libs/utils/constants/contractAddresses';

interface Props {
  order: OrderToPlace;
  setOrder: (order: OrderToPlace) => void;
  errors: OrderErrors;
  setErrors: (errors: OrderErrors) => void;
}

const precentageList = [25, 50, 75, 100];

const LimitOrder: React.FC<Props> = ({
  order,
  setOrder,
  errors,
  setErrors,
}) => {
  const [TimeInForce, setTimeInforce] = useState<string>("Good Til Time");
  const [percent, setPercent] = useState<number>(25);

  useEffect(() => {
    if (TimeInForce === "Good Til Time") {
      setOrder({ ...order, hasTime: true });
    } else {
      setOrder({ ...order, hasTime: false });
    }
  }, [TimeInForce]);

  return (
    <div className="mt-4">
      <div className="mb-4">
        <label
          htmlFor="limitPrice"
          className="block text-sm text-neutral-light font-medium "
        >
          Limit Price
        </label>
        <input
          id="limitPrice"
          type="text"
          placeholder="Enter the limit price"
          value={order.price === 0 ? "" : order.price.toString()}
          onChange={(e) => {
            const inputValue = e.target.value;
            const regex = /^[0-9]*\.?[0-9]*$/;
            if (regex.test(inputValue)) {
              setOrder({ ...order, price: inputValue });
            }
          }}
          className="mt-1 block w-full  px-4 py-3  rounded-2xl  text-neutral-light bg-white-bg-05 sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {errors.price && (
          <p className="text-bad-situation text-sm py-1">{errors.price}</p>
        )}
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
          type="text"
          value={order.amount}
          onChange={(e) => {
            const inputValue = e.target.value;
            const regex = /^[0-9]*\.?[0-9]*$/;
            if (regex.test(inputValue)) {
              setOrder({ ...order, amount: inputValue });
            }
          }}
          className="mt-1 block w-full  px-4 py-3  rounded-2xl text-neutral-light bg-white-bg-05 sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Enter the amount"
        />
        {errors.amount && (
          <p className="text-bad-situation text-sm py-1">{errors.amount}</p>
        )}
      </div>
      <div className="flex gap-1 border-neutral-light  mb-8">
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
      <div className="w-full h-0 border-white border-b opacity-10"></div>
      <div className="pt-10">
        <h3 className="text-neutral-light font-poppins italic">Advanced</h3>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex-grow flex-shrink-0 w-full">
            <AdvancedOption
              option={TimeInForce}
              setOption={setTimeInforce}
              label="Time in Foce"
              optionList={["Good Til Time", "Immediate Or Cancel"]}
            />
          </div>
          {order.hasTime && (
            <div className="bg-white-bg-05 w-full flex justify-center py-2.5 rounded-2xl font-poppins cursor-pointer italic">
              <DatePicker
                className="bg-transparent text-white"
                selected={order.expiration}
                onChange={(date) => setOrder({ ...order, expiration: date })}
                showTimeSelect
                // filterTime={filterPassedTime}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-4">
          <div className="flex-grow flex-shrink-0 w-[49%]">
            <div className=" flex justify-between bg-white-bg-05 w-full px-4 py-2.5 rounded-2xl font-poppins italic">
              <div>
                <h3 className="text-primary text-sm">Take Profit</h3>
                <input
                  id="amount"
                  type="text"
                  value={
                    order.takeProfitPrice === 0
                      ? ""
                      : order.takeProfitPrice.toString()
                  }
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const numericValue = inputValue.replace(/[^0-9]/g, "");
                    setOrder({ ...order, takeProfitPrice: +numericValue });
                  }}
                  className="block w-full text-white text-md bg-transparent sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Enter the amount"
                />
              </div>
            </div>
            {errors.takeProfit && (
              <p className="text-bad-situation text-sm py-1">
                {errors.takeProfit}
              </p>
            )}
          </div>
          <div className="flex-grow flex-shrink-0 w-[49%]">
            <div className=" flex justify-between bg-white-bg-05 w-full px-4 py-2.5 rounded-2xl font-poppins italic">
              <div>
                <h3 className="text-bad-situation text-sm">Stop Loss</h3>
                <input
                  id="amount"
                  type="text"
                  value={
                    order.stopLossPrice === 0
                      ? ""
                      : order.stopLossPrice.toString()
                  }
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const numericValue = inputValue.replace(/[^0-9]/g, "");
                    setOrder({ ...order, stopLossPrice: +numericValue });
                  }}
                  className="block w-full text-white text-md bg-transparent sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            {errors.stopLoss && (
              <p className="text-bad-situation text-sm py-1">
                {errors.stopLoss}
              </p>
            )}
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
