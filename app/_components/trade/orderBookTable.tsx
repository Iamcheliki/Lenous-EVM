interface Props {
  orders: any[];
}

export default function OrderBookTable({ orders }: Props) {
  return (
    <div className="font-poppins italic w-full mt-12">
      <table className="w-full">
        <thead className="text-neutral-light">
          <tr>
            <td className="w-[33%] text-right">
              <p>
                Price
                <span className="bg-platform-bg-gradient rounded-xl py-1 px-2 inline-block ml-1">
                  USD
                </span>
              </p>
            </td>
            <td className="w-[33%] text-right">
              <p>
                amount
                {/* <span className="bg-platform-bg-gradient rounded-xl py-1 px-2 inline-block ml-1">
                  {}
                </span> */}
              </p>
            </td>
            <td className="w-[33%] text-right">
              <p>
                Type
                {/* <span className="bg-platform-bg-gradient rounded-xl py-1 px-2 inline-block ml-1">
                  USD
                </span> */}
              </p>
            </td>
          </tr>
        </thead>
        <tbody className="text-white text-right">
          {orders.map((item) => (
            <tr>
              <td className="p-2">{item.price.toFixed(4)}</td>
              <td className="p-2">{item.amount.toFixed(4)}</td>
              <td className="p-2">
                {item.isBuyOrder === "true" ? "Long" : "Short"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
