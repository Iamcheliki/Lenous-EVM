import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useEthersProvider, useEthersSigner } from "@/app/_libs/utils/ethers";
// import OrderbookABI from '@/app/_libs/utils/abis/Orderbook.json';
import TransactionInfo from "./TransactionInfo";
import { OrderToPlace } from "@/app/types/order";
// import { ORDERBOOK_ADDRESS } from '@/app/_libs/utils/constants/contractAddresses';

interface Props {
  order: OrderToPlace;
  setOrder: (order: OrderToPlace) => void;
}

const precentageList = [25, 50, 75, 100];

const MarketOrder: React.FC<Props> = ({ order, setOrder }) => {
  const [amount, setAmount] = useState<string>("");
  const provider = useEthersProvider();
  const signer = useEthersSigner();
  const [percent, setPercent] = useState<number>(25);

  // Initialize contract instance
  // const contract = new ethers.Contract(
  //   ORDERBOOK_ADDRESS,
  //   OrderbookABI,
  //   signer || provider
  // );

  // const submitMarketOrder = async () => {
  //   const parsedAmount = ethers.utils.parseUnits(amount.toString(), 6);
  //   const gasLimit = ethers.utils.hexlify(1000000);
  //   const isBuyOrder = actionType == 'buy' ? true : false;

  //   try {
  //     const tx = await contract.placeMarketOrder(
  //       parsedAmount,
  //       isBuyOrder,
  //       leverage,
  //       marginType,
  //       { gasLimit }
  //     );

  //     await tx.wait();
  //     console.log('Market order placed successfully!');
  //   } catch (error) {
  //     console.error('Transaction failed:', error);
  //   }
  // };

  return (
    <div className="mt-4">
      <div className="text-md font-poppins italic text-neutral-light flex items-center justify-between mb-4">
        <h4>Available</h4>
        <p>0 USDT</p>
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
    </div>
  );
};

export default MarketOrder;
