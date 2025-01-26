import HistoryRecord from "./historyRecord";

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

interface Props {
  orders: any[];
}

export default function OrdersHistoryList({ orders }: Props) {
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
            <HistoryRecord
              key={item.order_id + item.position_id}
              order={item}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
