import { tokenList } from "@/app/_libs/utils/constants/TokenList";
import { Order_Type, OrderToPlace } from "@/app/types/order";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Props {
  visible: boolean;
  handleClose: () => void;
  handleDeposit: () => void;
  amount: number;
  setAmount: (amount: number) => void;
}

export default function DepositModal({
  visible,
  handleClose,
  handleDeposit,
  amount,
  setAmount,
}: Props) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "32px 24px",
      width: "600px",
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

  const [percent, setPeercent] = useState<number | string>(25);

  const percentList: (string | number)[] = [25, 50, 75, "max"];

  const schema = yup
    .object({
      amount: yup.number().positive().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  return (
    <Modal
      isOpen={visible}
      onRequestClose={handleClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="flex flex-col font-poppins italic h-full font-light">
        <h2 className="text-white text-xl font-light">Deposit</h2>
        <p className="text-neutral-light mt-3">
          USDC deposits from <Link href={"/"}>select chains</Link> have the
          lowest fees. Other deposits may have additional third-party fees.
        </p>
        <div className="flex flex-col items-center gap-3 mt-10 w-full">
          <div className="flex items-center justify-between rounded-2xl bg-white-bg-05 py-5 px-8 w-full">
            <div className="flex flex-col gap-2">
              <h3 className="text-neutral-light text-md">Source</h3>
              <div className="flex items-center gap-2">
                <Image
                  src={tokenList[0].img}
                  alt={tokenList[0].name}
                  width={100}
                  height={100}
                  className="w-9 h-9 object-contain"
                />
                <p className="text-white text-xl">Ethereum</p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-platform-bg-gradient flex items-center justify-center">
              <span className="block w-3 h-3 bg-[url('/icons/arrowDown.svg')] bg-no-repeat bg-center bg-contain" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white-bg-05 py-5 px-8 w-full">
            <div className="flex flex-col gap-2">
              <h3 className="text-neutral-light text-md">Source</h3>
              <div className="flex items-center gap-2">
                <Image
                  src={tokenList[1].img}
                  alt={tokenList[1].name}
                  width={100}
                  height={100}
                  className="w-9 h-9 object-contain"
                />
                <p className="text-white text-xl">USC Coins</p>
                <p className="text-white px-3 py-1 rounded-2xl bg-platform-bg-gradient">
                  USDC
                </p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-platform-bg-gradient flex items-center justify-center">
              <span className="block w-3 h-3 bg-[url('/icons/arrowDown.svg')] bg-no-repeat bg-center bg-contain" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-white mt-10 text-xl">
          <h3>Available</h3>
          <p>0 USDC</p>
        </div>
        <div className="bg-white-bg-05 rounded-2xl text-3xl text-neutral-light flex items-center py-3 px-8 mt-3">
          <input
            {...register("amount")}
            type="number"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            placeholder="Amount"
            className="bg-transparent font-poppins italic flex-grow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="flex-shrink-0">USDC</span>
        </div>
        <p className="text-bad-situation text-sm mt-1">
          {errors.amount?.message}
        </p>
        <div className="mt-3 flex items-center justify-between">
          {percentList.map((item: string | number) => (
            <div
              key={item}
              className={`w-[24%] text-center h-9 rounded-2xl leading-9 text-neutral-light text-xl ${
                item === percent
                  ? "bg-green-linear-gradient border-none"
                  : "bg-transparent border-neutral-light border-solid border-[1px]"
              }`}
            >
              {item + (typeof item === "number" ? "%" : "")}
            </div>
          ))}
        </div>
        <div className="mt-10 bg-white-bg-05 rounded-2xl py-4 px-8 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg text-neutral-light">
              Expected Deposit Amount
              <span className="bg-platform-bg-gradient rounded-2xl text-white py-1 px-3 bold ml-2 text-sm">
                USDC
              </span>
            </h2>
            <p className="text-lg text-white font-bold">-</p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg text-neutral-light">
              Equity
              <span className="bg-platform-bg-gradient rounded-2xl text-white py-1 px-3 bold ml-2 text-sm">
                USDC
              </span>
            </h2>
            <p className="text-lg text-white font-bold">-</p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg text-neutral-light">
              Buying Power
              <span className="bg-platform-bg-gradient rounded-2xl text-white py-1 px-3 bold ml-2 text-sm">
                USDC
              </span>
            </h2>
            <p className="text-lg text-white font-bold">-</p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg text-neutral-light">
              Max Slippage
              <span className="bg-platform-bg-gradient rounded-2xl text-white py-1 px-3 bold ml-2 text-sm">
                USDC
              </span>
            </h2>
            <p className="text-lg text-white font-bold">0.00%</p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg text-neutral-light">
              Estimated Time
              <span className="bg-platform-bg-gradient rounded-2xl text-white py-1 px-3 bold ml-2 text-sm">
                USDC
              </span>
            </h2>
            <p className="text-lg text-white font-bold">{"<"} 30 minutes</p>
          </div>
        </div>

        <button
          onClick={handleSubmit(handleDeposit)}
          className="bg-platform-bg-gradient text-white text-2xl h-[60px] rounded-2xl font-poppins italic mt-3 font-bold"
        >
          Deposit Funds
        </button>
      </div>
    </Modal>
  );
}
