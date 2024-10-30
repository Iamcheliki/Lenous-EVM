import Image from "next/image";

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
  const formatNumber = (price: number) => {
    return price.toLocaleString("en-US");
  };

  const calculatePnl = (order: any) => {
    const pnl = marketPrice * order.amount - order.price / order.amount;
  };

  const marketPrice = 0.000000004;
  const pnl = marketPrice * order.amount - order.price / order.amount;
  const orderToShow: orderToShow = {
    id: order.orderId,
    market: {
      logo: "/",
      title: "Bitcoin",
      type: order.marginType === 0 ? "Cross" : "Isolated",
      leverage: order.leverage,
    },
    side: order.isBuyOrder === 1 ? "Long" : "Short",
    amount: order.amount,
    avgEntry: order.price / order.amount,
    markPrice: marketPrice,
    liqPrice:
      order.price / order.amount -
      ((1 / order.leverage) * order.price) / order.amount,
    marginPosition: 2000,
    marginRate: 20,
    cmlPnl: pnl,
    pnlPercentage: (pnl / order.amount) * 100,
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
        <td className="py-4">
          {formatNumber(orderToShow.amount) + " " + orderToShow.unit}
        </td>
        <td className="py-4">{orderToShow.avgEntry}</td>
        <td className="py-4">{formatNumber(orderToShow.markPrice)}</td>
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
        <td className="text-bad-situation underline cursor-pointer py-4">
          <p>Close</p>
        </td>
      </tr>
    </>
  );
}
