import { OrderToPlace } from "@/app/types/order";
import React from "react";

interface Props {
  order: OrderToPlace;
  setOrder: (order: OrderToPlace) => void;
}

const IsBuyOrSell: React.FC<Props> = ({ order, setOrder }) => {
  return (
    <div className="flex w-full  ">
      <button
        onClick={() => setOrder({ ...order, isBuyOrder: true })}
        className={`px-4 py-2 rounded-l-2xl  border border-light-gray flex-1 ${
          order.isBuyOrder
            ? "bg-light-gray text-white"
            : "bg-transparent text-white"
        }`}
      >
        Buy
      </button>
      <button
        onClick={() => setOrder({ ...order, isBuyOrder: false })}
        className={`px-4 py-2 rounded-r-2xl  border border-light-gray flex-1 ${
          order.isBuyOrder === false
            ? "bg-light-gray text-white"
            : "bg-transparent text-white"
        }`}
      >
        Sell
      </button>
    </div>
  );
};
export default IsBuyOrSell;
