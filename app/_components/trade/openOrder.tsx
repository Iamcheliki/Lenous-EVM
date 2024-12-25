import {
  calculateAveEnt,
  calculatePnl,
  convertFrom12,
  convertFrom18,
  convertToNumber,
} from "@/app/_libs/utils/calculator";
import { ORDERBOOK_CONTRACT_ADDRESS } from "@/app/_libs/utils/constants/contractAddresses";
import { tokenList } from "@/app/_libs/utils/constants/TokenList";
import { useEthersSigner } from "@/app/_libs/utils/ethers";
import { formatNumber } from "@/app/_libs/utils/formatter";
import { ethers } from "ethers";
import Image from "next/image";
import { useSelector } from "react-redux";
import { baseSepolia } from "viem/chains";
import TradeABI from "../../_libs/ABIs/order-book.json";

export interface orderToShow {
  id: string;
  market: OrderMarket;
  side: string;
  amount: number;
  unit: string;
  avgEntry: number;
  markPrice: number;
  liqPrice: number;
  marginPosition: number;
  marginUnit: string;
  marginRate: number;
  cmlPnl: number;
  cmlUnit: string;
  pnlPercentage: number;
  // tp: any;
  // sl: any;
  liqRisk: number;
}

interface OrderMarket {
  logo: string;
  title: string;
  type: string;
  leverage: number;
}

export default function OpenOrder({ order }: any) {
  const { prices } = useSelector((state: any) => state.trade);

  const signer = useEthersSigner({ chainId: baseSepolia.id });

  const contract = new ethers.Contract(
    ORDERBOOK_CONTRACT_ADDRESS,
    TradeABI,
    signer
  );

  const handleCloseOrder = async () => {
    console.log(order.order_id, order.asset_id);
    await contract
      .cancelOrder(order.asset_id, order.order_id, {
        gasPrice: ethers.utils.parseUnits("200", "gwei"),
        gasLimit: ethers.utils.hexlify(50000),
      })
      .then((res: any) => console.log(res))
      .catch((err: any) => {
        console.log(err);
      });
  };

  // const marketPrice = prices.btcPrice;
  const marketPrice = prices.btcPrice;
  const pnl = calculatePnl(
    convertFrom18(order.amount),
    marketPrice,
    convertFrom18(order.price)
  );

  const orderToShow: orderToShow = {
    id: order.orderId,
    market: {
      logo: tokenList[5].img,
      title: "Bitcoin",
      type: order.marginType,
      leverage: +parseFloat(order.leverage).toFixed(1),
    },
    side: order.isBuyOrder ? "Long" : "Short",
    amount: convertToNumber(order.amount),
    avgEntry: convertFrom18(order.price),
    markPrice: marketPrice,
    liqPrice:
      order.price / order.amount -
      ((1 / order.leverage) * order.price) / order.amount,
    marginPosition: 2000,
    marginRate: 20,
    cmlPnl: +pnl.toFixed(2),
    pnlPercentage: +((pnl / order.amount) * 100).toFixed(2),
    liqRisk: 10,
    marginUnit: "USD",
    cmlUnit: "USD",
    unit: "BTC",
  };
  return (
    <>
      <tr>
        <td className="py-4">
          <div className="flex items-center gap-2">
            <Image
              src={orderToShow.market.logo}
              alt={orderToShow.market.title}
              width={40}
              height={40}
              className="w-[40px] h-[40px] object-contain"
            />
            <div>
              <h3>{orderToShow.market.title}</h3>
              <div className="flex items-center gap-1">
                <p>{orderToShow.market.type}</p>
                <p>{orderToShow.market.leverage}x</p>
              </div>
            </div>
          </div>
        </td>
        <td className="py-4">{orderToShow.side}</td>
        <td className="py-4">{orderToShow.amount + " " + orderToShow.unit}</td>
        <td className="py-4">{orderToShow.avgEntry}</td>
        <td className="py-4">
          {orderToShow.markPrice ? formatNumber(orderToShow.markPrice) : "0"}
        </td>
        <td className="text-yellow py-4">{orderToShow.liqPrice}</td>
        <td className="py-4">
          <div>
            <p>
              {formatNumber(orderToShow.marginPosition) +
                " " +
                orderToShow.marginUnit}
            </p>
            <p>{orderToShow.marginRate + "%"}</p>
          </div>
        </td>
        <td className="py-4">
          <div className="text-primary">
            <p>
              {(orderToShow.cmlPnl > 0 ? "+" : "") +
                orderToShow.cmlPnl +
                " " +
                orderToShow.cmlUnit}
            </p>
            <p>
              {(orderToShow.pnlPercentage > 0 ? "+" : "") +
                orderToShow.pnlPercentage +
                "%"}
            </p>
          </div>
        </td>
        {/* <td className="py-4">
          <div>
            <p>{orderToShow.tp}</p>
            <p>{orderToShow.sl}</p>
          </div>
        </td> */}
        <td className="text-primary py-4">{orderToShow.liqRisk}%</td>
        <td
          onClick={handleCloseOrder}
          className="text-bad-situation underline cursor-pointer py-4"
        >
          <p>Close</p>
        </td>
      </tr>
    </>
  );
}
