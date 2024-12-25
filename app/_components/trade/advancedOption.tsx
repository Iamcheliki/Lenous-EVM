import React, { useEffect, useRef, useState } from "react";

interface AdvancedOptionProps {
  label: string;
  optionList: any[];
  option: string;
  setOption: (option: string) => void;
}

export default function AdvancedOption({
  label,
  optionList,
  option,
  setOption,
}: AdvancedOptionProps) {
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const handleToggleSelect = () => {
    setOpenSelect(!openSelect);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-between bg-white-bg-05 w-full px-4 py-2.5 rounded-2xl font-poppins cursor-pointer italic"
        onClick={handleToggleSelect}
      >
        <div>
          <h3 className="text-neutral-light text-sm">{label}</h3>
          <p className="text-white text-md">{option}</p>
        </div>
        <span className="bg-[url('/icons/arrowDown.svg')] bg-no-repeat bg-center bg-contain w-[14px] h-[14px] block" />
      </div>
      {openSelect && (
        <div className="absolute top-[80%] left-0 right-0 w-full bg-[#5c5a63] z-10 rounded-2xl flex flex-col overflow-hidden">
          {optionList.map((item) => (
            <div
              key={item}
              className="text-neutral-light text-sm text-center w-full py-2 cursor-pointer font-poppins italic hover:bg-platform-bg-gradient "
              onClick={() => {
                setOption(item);
                setOpenSelect(false);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
