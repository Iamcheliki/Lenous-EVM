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
                Price{" "}
                <span className="bg-platform-bg-gradient rounded-xl py-1 px-2 inline-block ml-1">
                  USD
                </span>
              </p>
            </td>
            <td className="w-[33%] text-right">
              <p>
                Size{" "}
                <span className="bg-platform-bg-gradient rounded-xl py-1 px-2 inline-block ml-1">
                  ETH
                </span>
              </p>
            </td>
            <td className="w-[33%] text-right">
              <p>
                Total{" "}
                <span className="bg-platform-bg-gradient rounded-xl py-1 px-2 inline-block ml-1">
                  ETH
                </span>
              </p>
            </td>
          </tr>
        </thead>
        <tbody className="text-white text-right">
          {orders.map((item) => (
            <tr>
              <td className="p-2">{item.price}</td>
              <td className="p-2">{item.size}</td>
              <td className="p-2">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
