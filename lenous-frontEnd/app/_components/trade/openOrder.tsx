import Image from "next/image";

export interface Order {
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
  tp: any;
  sl: any;
  liqRisk: number;
}

interface OrderMarket {
  logo: string;
  title: string;
  type: string;
  leverage: number;
}

const tableTitleList = [
  "Market",
  "Side",
  "Amount",
  "Avg. Entry",
  "Mark Price",
  " Liq. Price",
  "Position Margin / Margin Rate",
  "Cml. PNL / PNL%",
  "TP /SL",
  "Liq. Risk%",
  "Close",
];

export default function OpenOrder({ order }: { order: Order }) {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="font-poppins text-neutral-light italic">
          <tr>
            {tableTitleList.map((item) => (
              <td key={item} className="pb-8">
                {item}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="font-poppins italic text-white align-top">
          <tr>
            <td>
              <div className="flex items-center gap-2">
                <Image
                  src={order.market.logo}
                  alt={order.market.title}
                  width={40}
                  height={40}
                  className="w-[40px] h-[40px] object-contain"
                />
                <div>
                  <h3>{order.market.title}</h3>
                  <div className="flex items-center gap-1">
                    <p>{order.market.type}</p>
                    <p>{order.market.leverage}x</p>
                  </div>
                </div>
              </div>
            </td>
            <td>{order.side}</td>
            <td>{order.amount + " " + order.unit}</td>
            <td>{order.avgEntry}</td>
            <td>{order.markPrice}</td>
            <td className="text-yellow">{order.liqPrice}</td>
            <td>
              <div>
                <p>{order.marginPosition + " " + order.marginUnit}</p>
                <p>{order.marginRate + "%"}</p>
              </div>
            </td>

            <td>
              <div className="text-primary">
                <p>
                  {(order.cmlPnl > 0 ? "+" : "") +
                    order.cmlPnl +
                    " " +
                    order.cmlUnit}
                </p>
                <p>
                  {(order.pnlPercentage > 0 ? "+" : "") +
                    order.pnlPercentage +
                    "%"}
                </p>
              </div>
            </td>
            <td>
              <div>
                <p>{order.tp}</p>
                <p>{order.sl}</p>
              </div>
            </td>
            <td className="text-primary">{order.liqRisk}%</td>
            <td className="text-bad-situation underline cursor-pointer">
              <p>Close</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
