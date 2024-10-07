import React, { useState } from "react";
// import SelectOption from "../share/SelectOption";

interface Props {
  marginType: number;
  setMarginType: (value: number) => void;
}

const MarginType: React.FC<Props> = ({ marginType, setMarginType }) => {
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const options = [
    { value: 5, label: "Type1" },
    { value: 10, label: "Type2" },
    { value: 20, label: "Type3" },
  ];

  const handleToggleSelect = () => {
    setOpenSelect(!openSelect);
  };
  return (
    <div className="relative">
      <button
        className="text-neutral-light flex justify-center bg-white-bg-05 w-full px-4 py-2.5 rounded-2xl sm:text-sm"
        onClick={handleToggleSelect}
      >
        Margin
      </button>
      {openSelect && (
        <div className="absolute top-[calc(100%+10px)] left-0 right-0 p-4 bg-[#38363E] z-10 rounded-2xl flex flex-col">
          {options.map((option) => (
            <div
              key={option.value}
              className="text-neutral-light text-sm text-center w-full py-2 border-solid border-b-[0.5px] last:border-none cursor-pointer"
              onClick={() => {
                setMarginType(option.value);
                setOpenSelect(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MarginType;
