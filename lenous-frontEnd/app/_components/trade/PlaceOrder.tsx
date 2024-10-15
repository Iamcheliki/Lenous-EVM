import React, { useState } from "react";
import Leverage from "./Leverage";
import IsBuyOrSell from "./IsBuyOrSell";
import OrderType from "./OrderType";
import LimitOrder from "./LimitOrder";
import MarketOrder from "./MarketOrder";
import MarginType from "./MarginType";
import { Margin_Type, Order_Type, OrderToPlace } from "@/app/types/order";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const initialOrder: OrderToPlace = {
  type: Order_Type.Limit,
  asset: "",
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
        {order.type === Order_Type.Market && (
          <MarketOrder order={order} setOrder={setOrder} />
        )}
        {order.type === Order_Type.Limit && (
          <LimitOrder order={order} setOrder={setOrder} />
        )}
      </div>
      {isConnected ? (
        <button
          onClick={() => {
            console.log(order);
          }}
          className="bg-platform-bg-gradient mt-16 w-full rounded-2xl text-white py-[10px] font-poppins italic flex gap-2 items-center justify-center"
        >
          Place {order.type === Order_Type.Limit ? "limit" : "market"} order
        </button>
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
