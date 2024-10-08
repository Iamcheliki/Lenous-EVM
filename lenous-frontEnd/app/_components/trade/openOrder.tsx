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

export default function OpenOrder({ order }: { order: Order }) {
  return (
    <>
      <tr>
        <td className="py-4">
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
        <td className="py-4">{order.side}</td>
        <td className="py-4">{order.amount + " " + order.unit}</td>
        <td className="py-4">{order.avgEntry}</td>
        <td className="py-4">{order.markPrice}</td>
        <td className="text-yellow py-4">{order.liqPrice}</td>
        <td className="py-4">
          <div>
            <p>{order.marginPosition + " " + order.marginUnit}</p>
            <p>{order.marginRate + "%"}</p>
          </div>
        </td>
        <td className="py-4">
          <div className="text-primary">
            <p>
              {(order.cmlPnl > 0 ? "+" : "") +
                order.cmlPnl +
                " " +
                order.cmlUnit}
            </p>
            <p>
              {(order.pnlPercentage > 0 ? "+" : "") + order.pnlPercentage + "%"}
            </p>
          </div>
        </td>
        <td className="py-4">
          <div>
            <p>{order.tp}</p>
            <p>{order.sl}</p>
          </div>
        </td>
        <td className="text-primary py-4">{order.liqRisk}%</td>
        <td className="text-bad-situation underline cursor-pointer py-4">
          <p>Close</p>
        </td>
      </tr>
    </>
  );
}
