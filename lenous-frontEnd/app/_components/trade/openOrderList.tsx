import OpenOrder, { Order } from "./openOrder";

const orderList: Order[] = [
  {
    id: "12345",
    market: {
      logo: "/icons/dogecoin.svg",
      title: "DOGEUSDT",
      type: "Isolated",
      leverage: 5,
    },
    side: "Long",
    amount: 5409,
    unit: "DOGE",
    avgEntry: 0.140506,
    markPrice: 0.140506,
    liqPrice: 0.087859,
    marginPosition: 296.77191888,
    marginUnit: "USDT",
    marginRate: 38.67,
    cmlPnl: 4.96566456,
    cmlUnit: "USDT",
    pnlPercentage: 3.26,
    tp: "",
    sl: "",
    liqRisk: 2.58,
  },
];

export default function OpenOrderList() {
  return (
    <div>
      {orderList.map((item) => (
        <div key={item.id}>
          <OpenOrder order={item} />
        </div>
      ))}
    </div>
  );
}
