"use client";
import React, { useEffect, useState } from "react";
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
import { setPrices } from "@/app/redux/slices/tradeSlice";

interface Message {
  messsage: string;
}

export default function TradeTabs() {
  const tabs = [
    {
      id: 1,
      label: "positions",
      content: "",
    },
    {
      id: 2,
      label: "History",
      content: "",
    },
    {
      id: 3,
      label: "Strategy",
      content: "",
    },
    {
      id: 4,
      label: "Assets",
      content: "",
    },
  ];
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(1);
  const [userOrder, setUserOrder] = useState<any[]>([]);
  const { address } = useAccount();
  const { selectedAsset } = useSelector((state: any) => state.trade);
  const [filteredByAsset, setFilteredByAsset] = useState<boolean>(false);

  // const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://195.248.240.173:8866");

    newSocket.onopen = () => {
      console.log("websocket connected");
    };

    newSocket.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      dispatch(
        setPrices({
          btcPrice: message.prices.btc_usd_price,
          solPrice: message.prices.sol_usd_price,
          ethPrice: message.prices.eth_usd_price,
        })
      );
    };
  }, []);

  useEffect(() => {
    if (address) {
      setIsLoading(true);
      if (activeTab === 2) {
        getAllOrdersByAddress(address)
          .then((res) => {
            console.log("trade table list", res.data.orders);
            const list = [...res.data.orders];

            if (filteredByAsset) {
              const filteredList = list.filter(
                (x) => x.symbol === selectedAsset.address
              );
              setUserOrder([...filteredList]);
            } else {
              setUserOrder([...list]);
            }
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      } else if (activeTab === 1) {
        getAllTraderInfo(address)
          .then((res) => {
            console.log("position list", res.data.positions);
            const list = [...res.data.positions];

            if (filteredByAsset) {
              const filteredList = list.filter(
                (x) => x.symbol === selectedAsset.address
              );
              setUserOrder([...filteredList]);
            } else {
              setUserOrder([...list]);
              setIsLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }
    }
  }, [filteredByAsset, address, activeTab]);

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
          ) : (
            <OpenOrderList orders={userOrder} />
          )
        ) : (
          <>Please connect your wallet</>
        )}
        {/* {tabs.find((item) => item.id === activeTab)?.content} */}
      </div>
    </div>
  );
}
