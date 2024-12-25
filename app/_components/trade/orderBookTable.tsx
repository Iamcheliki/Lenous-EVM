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
                <span className="bg-platform-bg-gradient rounded-xl py-1 px-2 inline-block ml-1">
                  BTC
                </span>
              </p>
            </td>
            <td className="w-[33%] text-right">
              <p>
                Rema...
                <span className="bg-platform-bg-gradient rounded-xl py-1 px-2 inline-block ml-1">
                  USD
                </span>
              </p>
            </td>
          </tr>
        </thead>
        <tbody className="text-white text-right">
          {orders.map((item) => (
            <tr>
              <td className="p-2">{(+item.price / 10 ** 18).toFixed(4)}</td>
              <td className="p-2">{(+item.amount / 10 ** 18).toFixed(4)}</td>
              <td className="p-2">
                {(+item.remaining_amount / 10 ** 18).toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
