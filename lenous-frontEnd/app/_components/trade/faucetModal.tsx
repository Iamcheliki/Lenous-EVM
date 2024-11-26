import { tokenList } from "@/app/_libs/utils/constants/TokenList";
import Image from "next/image";
import { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";

interface Props {
  visible: boolean;
  handleClose: () => void;
}

export default function FaucetModal({ visible, handleClose }: Props) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "32px 24px",
      width: "400px",
      background: "#ffffff26",
      backdropFilter: "blur(20px)",
      border: "none",
      "overflow-y": "hidden",
      borderRadius: "1rem",
    },
    overlay: {
      background: "#8686866e",
      overflow: "auto",
      zIndex: "20",
    },
  };

  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleFaucet = () => {
    console.log("Faucet");
  };

  return (
    <Modal
      isOpen={visible}
      onRequestClose={handleClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="flex flex-col font-poppins italic h-full">
        <h2 className="text-white text-lg font-light mb-4">
          Faucet Test Tokens
        </h2>
        <label className="font-poppins italic text-white mb-1 font-normal text-sm">
          Wallet Address
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          className="mb-4 mt-1 block w-full  px-4 py-3  rounded-2xl text-white bg-white-bg-15 sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <label className="font-poppins italic text-white mb-1 font-normal text-sm">
          Amount
        </label>
        <input
          type="text"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          className="mb-8 mt-1 block w-full  px-4 py-3  rounded-2xl text-white bg-white-bg-15 sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          onClick={handleFaucet}
          className="bg-platform-bg-gradient text-white text-2xl h-[60px] rounded-2xl font-poppins italic"
        >
          Faucet
        </button>
      </div>
    </Modal>
  );
}
