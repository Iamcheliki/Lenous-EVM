import TradeMenu from "@/app/_components/trade/TradeMenu";
import TradeTabs from "@/app/_components/trade/TradeTabs";
import TradingViewWidget from "@/app/_components/widgets/TradingViewWidget";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

const tradePanel = () => {
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
