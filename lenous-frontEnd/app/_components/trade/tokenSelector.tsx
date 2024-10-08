interface Props {
  amount: number;
  setAmount: (amount: number) => void;
  tokenList: string[];
  selectedToken: string;
  setSelectedToken: (token: string) => void;
}

export default function TokenSelector({
  amount,
  setAmount,
  tokenList,
  selectedToken,
  setSelectedToken,
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <button
          className="bg-white-bg-05 text-neutral-light rounded-2xl font-poppins italic p-2 flex-shrink-0"
          onClick={() => {
            setAmount(amount - 1);
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            setAmount(amount + 1);
          }}
          className="bg-white-bg-05 text-neutral-light rounded-2xl font-poppins italic p-2 flex-shrink-0"
        >
          +
        </button>
        <input
          className="bg-white-bg-05 text-neutral-light rounded-2xl font-poppins italic py-2 w-[5vw] text-center flex-shrink-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(+e.target.value);
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        {tokenList.map((item) => (
          <button
            className={
              "py-2 px-4 rounded-2xl font-poppins italic flex-shrink-0 " +
              (item === selectedToken
                ? "bg-platform-bg-gradient text-primary"
                : "bg-white-bg-05 text-neutral-light")
            }
            key={item}
            onClick={() => {
              setSelectedToken(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
