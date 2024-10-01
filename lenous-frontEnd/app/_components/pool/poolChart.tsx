import { tokenList } from "@/app/_libs/utils/constants/TokenList";
import Image from "next/image";
import TimeSelect from "./timeSelect";
import { useState } from "react";

export default function PoolChart() {
  const token = tokenList[1];
  const [selectedTime, setSelectedTime] = useState<string>("1H");
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex justify-between">
        <div className="flex gap-[16px] items-center">
          <Image
            src={token.img}
            alt={token.name}
            width={60}
            height={60}
            className="w-[60px] h-[60px] flex-shrink-0 object-contain"
          />
          <div>
            <div className="flex items-center gap-[12px]">
              <h3 className="font-poppins text-white text-[32px] italic font-bold">
                USDC
              </h3>
              <div className="flex items-center gap-[7.5px]">
                <span className="block w-[20px] h-[20px] bg-[url('/icons/topArrow.svg')] bg-contain bg-no-repeat bg-center" />
                <span className="text-[20px] text-[#aaaaaa] italic">0.3%</span>
              </div>
            </div>
            <p className="text-[20px] text-[#aaaaaa] italic">0xCBCd...62eD</p>
          </div>
        </div>
        <div className="ml-auto">
          <TimeSelect
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </div>
        <p className="font-poppins text-[22px] leading-[50px] text-white flex items-center h-fit ml-[70px] cursor-pointer">
          Volume
          <span className="inline-block bg-[url('/icons/downArrow.svg')] bg-center bg-no-repeat bg-contain w-[14px] h-[14px] ml-[10px]" />
        </p>
      </div>
      <div>
        <Image
          src="/images/pool-chart.png"
          alt="pool"
          width={937}
          height={350}
          className="w-full h-[350xpx] object-contain"
        />
      </div>
    </div>
  );
}
