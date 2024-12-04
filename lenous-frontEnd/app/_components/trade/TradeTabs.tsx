"use client";
import React, { useEffect, useRef, useState } from "react";
// import PositionTable from './positions/PositionTable';
import Icon from "../UI/icon";
import OpenOrderList from "./openOrderList";
import {
  getAllOrders,
  getAllOrdersByAddress,
  getAllTraderInfo,
} from "@/app/dataRequests/orderDataRequests";
import { useAccount } from "wagmi";
import { useDispatch, useSelector } from "react-redux";
import { setBalances, setPrices } from "@/app/redux/slices/tradeSlice";
import { toast } from "react-toastify";
import OpenPositionsList from "./openPositionsList";
import { io } from "socket.io-client";

interface Message {
  messsage: string;
}

const SOCKET_URL = "http://localhost:3000"; // Replace with your Socket.IO server URL

export default function TradeTabs() {
  const tabs = [
    {
      id: 1,
      label: "Orders",
      content: "",
    },
    {
      id: 2,
      label: "Positions",
      content: "",
    },
    {
      id: 3,
      label: "History",
      content: "",
    },
  ];
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(1);
  const [userOrder, setUserOrder] = useState<any[]>([]);
  const [userPositions, setUserPositions] = useState<any[]>([]);
  const { address } = useAccount();
  const [filteredByAsset, setFilteredByAsset] = useState<boolean>(false);
  const socketRef = useRef<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:3000");
      socketRef.current.on("connect", () => {
        console.log("connected to socket");

        if (address) {
          console.log("hello");
          socketRef.current.emit("register_wallet", address);
        }
      });

      socketRef.current.on("disconnect", () => {
        socketRef.current = null;
      });

      // Listen for the 'message' event from the server
      socketRef.current.on("deposit", (data: any) => {
        console.log("Deposit message received from new socket", data);
        toast.success(`You deposited $${+data.amount / 10 ** 6} successfully`);
      });

      socketRef.current.on("balance_update", (data: any) => {
        console.log("Balance message received from new socket", data);
        dispatch(
          setBalances({
            totalBalance: +data.totalBalance / 10 ** 6,
            usedMargin: +data.usedMargin / 10 ** 6,
            freeMargin: +data.freeMargin / 10 ** 6,
            totalPnl: +data.totalPnl / 10 ** 6,
            totalCommision: +data.totalCommision / 10 ** 6,
          })
        );
      });
    }
  }, []);

  useEffect(() => {
    if (address) {
      socketRef.current.emit("register_wallet", address);
    }
  }, [address]);

  console.log(socketRef.current);

  return (
    <div className="py-8 container">
      <div className="flex justify-between">
        <div className="inline-flex items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`pr-20 py-2 text-lg  font-medium focus:outline-none rounded-t-3xl ${
                activeTab === tab.id ? "text-primary" : "text-neutral-light"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setFilteredByAsset(!filteredByAsset);
            }}
          >
            <span
              className={`block rounded-full w-4 h-4 border-[1px] border-solid border-neutral-light ${
                filteredByAsset ? "bg-primary" : "bg-transparent"
              }`}
            />
            <p className="text-neutral-light italic">
              Filtered by Selected Asset
            </p>
          </div>
        </div>
        <div className="flex">
          <button className="text-white bg-primary border py-1 px-6 mr-4  rounded-3xl">
            filter
          </button>
          <button className="text-white flex items-center border rounded-3xl  py-1 px-4 border-white ">
            search
            <span className="pl-2">
              <Icon name="search" />
            </span>
          </button>
        </div>
      </div>
      <div className=" mt-12 min-h-[350px]">
        {address ? (
          isLoading ? (
            <p className="text-white">Loading...</p>
          ) : activeTab === 1 ? (
            <OpenOrderList orders={userOrder} />
          ) : (
            <OpenPositionsList orders={userPositions} />
          )
        ) : (
          <p className="text-white">Please connect your wallet</p>
        )}
        {/* {tabs.find((item) => item.id === activeTab)?.content} */}
      </div>
    </div>
  );
}
