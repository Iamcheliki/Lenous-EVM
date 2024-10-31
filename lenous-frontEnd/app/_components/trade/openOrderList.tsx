import OpenOrder from "./openOrder";

// const orderList: Order[] = [
//   {
//     id: "12345",
//     market: {
//       logo: "/icons/dogecoin.svg",
//       title: "DOGEUSDT",
//       type: "Isolated",
//       leverage: 5,
//     },
//     side: "Long",
//     amount: 5409,
//     unit: "DOGE",
//     avgEntry: 0.140506,
//     markPrice: 0.140506,
//     liqPrice: 0.087859,
//     marginPosition: 296.77191888,
//     marginUnit: "USDT",
//     marginRate: 38.67,
//     cmlPnl: 4.96566456,
//     cmlUnit: "USDT",
//     pnlPercentage: 3.26,
//     tp: "",
//     sl: "",
//     liqRisk: 2.58,
//   },
//   {
//     id: "12345",
//     market: {
//       logo: "/icons/dogecoin.svg",
//       title: "DOGEUSDT",
//       type: "Isolated",
//       leverage: 5,
//     },
//     side: "Long",
//     amount: 5409,
//     unit: "DOGE",
//     avgEntry: 0.140506,
//     markPrice: 0.140506,
//     liqPrice: 0.087859,
//     marginPosition: 296.77191888,
//     marginUnit: "USDT",
//     marginRate: 38.67,
//     cmlPnl: 4.96566456,
//     cmlUnit: "USDT",
//     pnlPercentage: 3.26,
//     tp: "",
//     sl: "",
//     liqRisk: 2.58,
//   },
//   {
//     id: "12345",
//     market: {
//       logo: "/icons/dogecoin.svg",
//       title: "DOGEUSDT",
//       type: "Isolated",
//       leverage: 5,
//     },
//     side: "Long",
//     amount: 5409,
//     unit: "DOGE",
//     avgEntry: 0.140506,
//     markPrice: 0.140506,
//     liqPrice: 0.087859,
//     marginPosition: 296.77191888,
//     marginUnit: "USDT",
//     marginRate: 38.67,
//     cmlPnl: 4.96566456,
//     cmlUnit: "USDT",
//     pnlPercentage: 3.26,
//     tp: "",
//     sl: "",
//     liqRisk: 2.58,
//   },
// ];

const tableTitleList = [
  "Market",
  "Side",
  "Amount",
  "Avg. Entry",
  "Mark Price",
  " Liq. Price",
  "Position Margin / Margin Rate",
  "Cml. PNL / PNL%",
  // "TP /SL",
  "Liq. Risk%",
  "Close",
];

interface Props {
  orders: any[];
}

export default function OpenOrderList({ orders }: Props) {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="font-poppins text-neutral-light italic">
          <tr>
            {tableTitleList.map((item) => (
              <td key={item} className="pb-4 pt-8">
                {item}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="font-poppins italic text-white align-top">
          {orders.map((item) => (
            <OpenOrder order={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
