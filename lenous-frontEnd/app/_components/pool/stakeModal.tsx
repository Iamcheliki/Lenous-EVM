import Image from "next/image";
import { useState } from "react";
import Modal from "react-modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const leverageList = [2, 3, 4, 5, 10, 20];

export default function StakeModal({ isOpen, onClose }: Props) {
  const [leverage, setLeverage] = useState<number>(2);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "32px 24px",
      width: "800px",
      height: "650px",
      background: "#ffffff26",
      backdropFilter: "blur(20px)",
      border: "none",
      "overflow-y": "hidden",
    },
    overlay: {
      background: "#8686866e",
      overflow: "auto",
      zIndex: "20",
    },
  };

  return (
    <Modal
      onRequestClose={onClose}
      isOpen={isOpen}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold text-white font-poppins">
          Add Liquidity
        </h1>
        <div className="font-poppins italic flex items-center gap-3 w-full">
          <div className="flex items-center justify-between bg-white-bg-05 py-2 px-6 rounded-2xl w-[75%]">
            <div>
              <p className="text-neutral-light text-md">USDC</p>
              <p className="text-white text-2xl">0</p>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src="https://cdn.moralis.io/eth/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png"
                width={30}
                height={30}
                className="w-[30px] h-[30px] object-contain"
                alt="USDC Token"
              />
              <p className="text-white">USDC</p>
            </div>
          </div>
          <div className="flex items-center justify-between bg-white-bg-05 py-2 px-6 rounded-2xl w-[25%] flex-shrink-0">
            <div>
              <p className="text-neutral-light text-md">LP Token</p>
              <p className="text-neutral-light text-2xl">0</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between font-poppins italic">
          <h3 className="text-2xl text-white">Leverage</h3>
          <div className="flex items-center gap-2">
            {leverageList.map((item: number) => (
              <div
                key={item + "leverage"}
                onClick={() => {
                  setLeverage(item);
                }}
                className={`flex items-center justify-center py-2 px-5 rounded-4xl cursor-pointer w-fit ${
                  item === leverage
                    ? "bg-[#4E8AFF80]"
                    : "border-sold border-[1px] border-neutral-light bg-transparent"
                }`}
              >
                <p
                  className={`text-sm ${
                    item === leverage ? "text-white" : "text-neutral-light"
                  }`}
                >
                  {item}X
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white-bg-05 rounded-2xl py-4 px-6 flex flex-col gap-4 font-poppins italic">
          <div className="flex justify-between items-center">
            <p className="text-neutral-light flex items-center gap-2 text-md">
              Fee
              <span className="bg-[#2775CA40] text-white py-[6px] px-[12px] rounded-2xl block text-sm">
                USDC
              </span>
            </p>
            <p className="text-white ">-</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-neutral-light">Max Slippage</p>
            <p className="text-white ">0.00%</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-neutral-light">Estimated Time</p>
            <p className="text-white ">{"<"} 30 minutes</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-neutral-light">Account Leverage</p>
            <p className="text-white ">-</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="bg-[#EAB3081a] rounded-4xl font-poppins italic py-3 px-6 flex items-center gap-2">
            <span className="bg-[url('/icons/warningIcon.svg')] bg-no-repeat bg-center block w-[28px] h-[28px] bg-contain" />
            <p className="text-white">
              This Pool is on High Risk, Reference site about Lorem Ipsum{" "}
            </p>
          </div>
          <button className="bg-[#4E8AFF80] text-white italic font-poppins rounded-4xl py-4">
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
