"use client";

import TradeMenu from "@/app/_components/trade/TradeMenu";
import TradeTabs from "@/app/_components/trade/TradeTabs";
import TradingViewWidget from "@/app/_components/widgets/TradingViewWidget";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

const tradePanel = () => {
  const { address } = useAccount();
  useEffect(() => {
    if (address) {
      const newSocket = new WebSocket("ws://195.248.240.173:8765");

      newSocket.onopen = () => {
        console.log("trdae websocket connected");
        const authMessage = { user_id: address };
        newSocket.send(JSON.stringify(authMessage));
      };

      newSocket.onmessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data);
        console.log("trade message", message);
        switch (message.event_type) {
          case "OrderPlaced":
            toast.success("Order placed successfully!");
            break;
          case "OrderMatched":
            toast.success("Order matched successfully!");
            break;
          case "OrderCancelled":
            toast.warn("Order cenceled!");
            break;
          case "Deposit":
            toast.success("Deposit successfull!");
            break;
        }
      };

      newSocket.onerror = (err) => {
        console.log("trade socket error", err);
      };

      newSocket.onclose = () => {
        console.log("trade message close");
      };
    }
  }, [address]);

  return (
    <div>
      <div className=" w-full">
        <div className="flex h-full ">
          <div className="flex-1">
            <TradingViewWidget />
          </div>
          <TradeMenu />
        </div>
      </div>
      <div className=" bg-white-bg-05">
        <TradeTabs />
      </div>
    </div>
  );
};
export default tradePanel;
