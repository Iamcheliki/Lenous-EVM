import { Margin_Type, OrderToPlace } from "@/app/types/order";
import React, { useState } from "react";
import Modal from "react-modal";

// import SelectOption from "../share/SelectOption";

interface Props {
  order: OrderToPlace;
  setOrder: (order: OrderToPlace) => void;
}

const MarginType: React.FC<Props> = ({ order, setOrder }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const options = [
    { value: Margin_Type.Cross, label: Margin_Type.Cross },
    { value: Margin_Type.Isolated, label: Margin_Type.Isolated },
  ];
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      height: "650px",
      background: "unset",
      border: "none",
      overflowY: "hidden",
    },
    overlay: {
      background: "#00000066",
      overflow: "auto",
      zIndex: "20",
    },
  };

  return (
    <div className="relative">
      <button
        className="text-neutral-light flex justify-center bg-white-bg-05 w-full px-4 py-2.5 rounded-2xl sm:text-sm"
        onClick={handleOpenModal}
      >
        {order.margin}
      </button>

      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        style={customStyles}
      >
        <div className="w-full text-left max-w-md p-8 bg-white bg-opacity-20 rounded-2xl backdrop-blur-md flex flex-col gap-8">
          <h2 className="text-white text-xl italic font-light leading-9">
            Margin Mode
          </h2>
          <div className="flex flex-col font-poppins gap-3">
            <div
              className="bg-white-bg-05 p-6 rounded-2xl cursor-pointer"
              onClick={() => {
                setOrder({ ...order, margin: Margin_Type.Cross });
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-white italic">Cross</h3>
                <span
                  className={
                    "block w-[25px] h-[25px] rounded-full " +
                    (order.margin === Margin_Type.Cross
                      ? "bg-primary"
                      : "bg-white-bg-30")
                  }
                />
              </div>
              <p className="text-sm text-neutral-light italic mt-4">
                Use shared Collatral and risk across multiple positions
              </p>
            </div>
            <div
              className="bg-white-bg-05 p-6 rounded-2xl cursor-pointer"
              onClick={() => {
                setOrder({ ...order, margin: Margin_Type.Isolated });
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-white italic">Isolated</h3>
                <span
                  className={
                    "block w-[25px] h-[25px] rounded-full " +
                    (order.margin === Margin_Type.Isolated
                      ? "bg-primary"
                      : "bg-white-bg-30")
                  }
                />
              </div>
              <p className="text-sm text-neutral-light italic mt-4">
                Use distinct Collateral for each position to isolated risk
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col items-end gap-3">
            <button
              className="w-full py-3 text-white px-5 bg-teal-500 bg-opacity-15 rounded-full flex justify-center items-center"
              onClick={handleCloseModal}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default MarginType;
