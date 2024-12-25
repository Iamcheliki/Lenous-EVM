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
  handleWithdraw: () => void;
  amount: number;
  setAmount: (amount: number) => void;
}

export default function WithdrawModal({
  visible,
  handleClose,
  handleWithdraw,
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

  return (
    <Modal
      isOpen={visible}
      onRequestClose={handleClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="flex flex-col font-poppins italic h-full font-light">
        <h2 className="text-white text-xl font-light">WIthdraw</h2>
        <p className="text-neutral-light mt-3">
          USDC withdrawals to{" "}
          <Link href={"/"} className="underline text-primary">
            select chains
          </Link>{" "}
          have the lowest fees. Other withdrawal methods (e.g. assets on
          Ethereum) may have higher third-party fees.
        </p>
        {/* <div className="flex flex-col items-center gap-3 mt-10 w-full">
          <div className="flex items-center gap-3 w-full">
            <div className="flex flex-col gap-2 rounded-2xl bg-white-bg-05 py-5 px-8 w-[49%] flex-shrink-0 self-stretch">
              <h3 className="text-neutral-light text-md">Destination</h3>
              <input
                type="text"
                value={""}
                onChange={(e) => console.log(e.target.value)}
                placeholder="Address"
                className="bg-transparent text-xl font-poppins text-white italic flex-grow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white-bg-05 py-5 px-8 w-[49%] flex-shrink-0">
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
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-white-bg-05 py-5 px-8 w-full">
            <div className="flex flex-col gap-2">
              <h3 className="text-neutral-light text-md">Asset</h3>
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
        </div> */}
        <div className="bg-white-bg-05 rounded-2xl text-3xl text-neutral-light flex items-center py-3 px-8 mt-10">
          <input
            {...register("amount")}
            type="text"
            value={amount === 0 ? "" : amount}
            onChange={(e) => {
              const inputValue = e.target.value;
              const numericValue = inputValue.replace(/[^0-9]/g, "");
              setAmount(+numericValue);
            }}
            placeholder="Amount"
            className="bg-transparent font-poppins italic flex-grow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span
            onClick={() => {
              console.log("max amount");
            }}
            className="bg-platform-bg-gradient rounded-2xl py-1 px-3 bold ml-2 text-sm flex-shrink-0 text-primary font-bold cursor-pointer"
          >
            MAX
          </span>
        </div>
        <p className="text-bad-situation text-sm mt-1">
          {errors.amount?.message}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <h4 className="text-neutral-light text-xl">
            Free Collateral{" "}
            <span className="bg-platform-bg-gradient rounded-2xl text-white py-1 px-3 bold ml-2 text-sm">
              USDC
            </span>
          </h4>
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
          onClick={handleSubmit(handleWithdraw)}
          className="bg-platform-bg-gradient text-white text-2xl h-[60px] rounded-2xl font-poppins italic mt-3 font-bold"
        >
          Withdraw Funds
        </button>
      </div>
    </Modal>
  );
}
