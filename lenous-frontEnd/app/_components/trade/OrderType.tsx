import { Order_Type, OrderToPlace } from "@/app/types/order";
import React from "react";

interface Props {
  order: OrderToPlace;
  setOrder: (order: OrderToPlace) => void;
  resetErrors: () => void;
}

const OrderType: React.FC<Props> = ({ order, setOrder, resetErrors }) => {
  return (
    <div className="flex space-x-4 pb-5 italic ">
      <button
        onClick={() => {
          resetErrors();
          setOrder({ ...order, type: Order_Type.Limit });
        }}
        className={`px-4 py-2  italic ${
          order.type === Order_Type.Limit
            ? " text-primary underline"
            : "text-neutral-light"
        }`}
      >
        Limit
      </button>
      <button
        onClick={() => {
          resetErrors();
          setOrder({ ...order, type: Order_Type.Market });
        }}
        className={`px-4 py-2 italic  ${
          order.type === Order_Type.Market
            ? " text-primary underline"
            : "text-neutral-light"
        }`}
      >
        Market
      </button>
    </div>
  );
};
export default OrderType;
