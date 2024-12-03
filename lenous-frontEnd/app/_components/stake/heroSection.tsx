export default function HeroSection({ openModal }: { openModal: () => void }) {
  return (
    <div className="flex justify-between h-[400px] py-[71px]">
      <div className="flex flex-col gap-[12px]">
        <h2 className="font-inter text-7xl font-thin text-white tracking-[-8px]">
          Lenous Financail System
        </h2>
        <h1 className="font-inter text-7xl font-thin text-primary tracking-[-8px]">
          USDC Satking System to Earn Profit
        </h1>
        <p className="mt-auto text-xl text-white font-poppins">
          a safe way to invest on different markets and
          <br />
          earn benefits
        </p>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="flex gap-12 font-poppins">
          <div className="flex flex-col items-end gap-3">
            <h3 className="text-lg font-bold text-white">Totla Value Locked</h3>
            <p className="text-4xl text-white font-thin italic">$2.93 B</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <h3 className="text-lg font-bold text-white">Lenous Volume</h3>
            <p className="text-4xl text-white font-thin italic">$41.01 B</p>
          </div>
        </div>
        <button
          onClick={openModal}
          className="bg-[#4E8AFF33] text-white text-[24px] h-[56px] rounded-[20px] px-4 border-[3px] border-solid border-[#4E8AFF1a]"
        >
          Stake
        </button>
      </div>
    </div>
  );
}
