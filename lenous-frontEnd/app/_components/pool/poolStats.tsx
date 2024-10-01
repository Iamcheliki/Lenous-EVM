import { tokenList } from "@/app/_libs/utils/constants/TokenList";
import Image from "next/image";

export default function PoolStats() {
  const token = tokenList[1];

  return (
    <div className="bg-[#ffffff26] rounded-[24px] flex flex-col p-[34px_31px] gap-[38px]">
      <div className="flex justify-between">
        <button className="bg-[#ffffff0d] rounded-[20px] h-[48px] w-[48%] flex-shrink-0 text-white text-[22px] font-poppins italic">
          Swap
        </button>
        <button className="bg-[#ffffff0d] rounded-[20px] h-[48px] w-[48%] flex-shrink-0 text-white text-[22px] font-poppins italic">
          Add Liquidity
        </button>
      </div>

      <p className="text-white italic text-[20px]">Pool Balance</p>
      <div className="flex flex-col gap-[9px]">
        <Image src={token.img} alt={token.name} width={28} height={28} />
        <div className="w-full h-[10px] bg-gray-500">
          <div className="w-[80%] bg-[#4E8AFF] h-full" />
        </div>
        <p className="text-white italic text-[20px]">299.46 USDC</p>
      </div>
      <div>
        <h4 className="text-white italic text-[20px]">TVL</h4>
        <div className="flex items-center gap-[18px]">
          <h3 className="font-poppins text-white text-[32px] italic font-bold">
            $215.3M
          </h3>
          <div className="flex items-center gap-[7.5px]">
            <span className="block w-[20px] h-[20px] bg-[url('/icons/topArrow.svg')] bg-contain bg-no-repeat bg-center" />
            <span className="text-[20px] text-[#aaaaaa] italic">9.58 %</span>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-white italic text-[20px]">24H Volume</h4>
        <div className="flex items-center gap-[18px]">
          <h3 className="font-poppins text-white text-[32px] italic font-bold">
            $9.0M
          </h3>
          <div className="flex items-center gap-[7.5px]">
            <span className="block w-[20px] h-[20px] bg-[url('/icons/downArrow-red.svg')] bg-contain bg-no-repeat bg-center" />
            <span className="text-[20px] text-[#aaaaaa] italic">92.79 %</span>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-white italic text-[20px]">24H fees</h4>
        <div className="flex items-center gap-[18px]">
          <h3 className="font-poppins text-white text-[32px] italic font-bold">
            $26.9K
          </h3>
        </div>
      </div>
    </div>
  );
}
