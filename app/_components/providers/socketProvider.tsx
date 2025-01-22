"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAccount } from "wagmi";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import {
  getAllOrders,
  getAllPositions,
} from "@/app/dataRequests/orderDataRequests";
import {
  setBalances,
  setPrices,
  setUserOrders,
  setUserPositions,
} from "@/app/redux/slices/tradeSlice";
import { SOCKET_URL } from "@/app/dataRequests/constants";

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [connected, setConnected] = useState<boolean>(false);
  const socketRef = useRef<any>(null);
  const dispatch = useDispatch();
  const { address } = useAccount();

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL);
      socketRef.current.on("connect", () => {
        console.log("connected to socket");
        console.log(address);
        setConnected(true);
        // if (address) {
        //   console.log("hello");
        //   socketRef.current.emit("register_wallet", address);
        // }
      });

      socketRef.current.on("disconnect", () => {
        console.log("disconnect");
        setConnected(false);
      });

      socketRef.current.on("error", () => {
        console.log("error for socket");
      });

      // Listen for the 'message' event from the server
      socketRef.current.on("deposit", (data: any) => {
        console.log("Deposit message received from new socket", data);
        toast.success(`You deposited $${data.amount} successfully`);
      });

      socketRef.current.on("price", (data: any) => {
        console.log("Price message received from new socket", data);
        dispatch(setPrices(data.tokenPrice));
      });

      socketRef.current.on("orderPlaced", (data: any) => {
        console.log("Order message received from new socket", data);
        toast.success(
          `You placed a ${data.type} with the amount of ${
            data.amount
          } and the price $${data.price.toFixed(2)}`
        );
        if (address) {
          getAllOrders(address?.toString())
            .then((res) => {
              console.log(res);
              dispatch(setUserOrders([...res.data.orders]));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

      socketRef.current.on("orderMatched", (data: any) => {
        console.log("Match message received from new socket", data);
        toast.success(
          `Your Order with id ${data.orderId} matched with another order`
        );
        if (address) {
          getAllPositions(address?.toString())
            .then((res) => {
              console.log(res);
              dispatch(setUserOrders([...res.data.orders]));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

      socketRef.current.on("balance_update", (data: any) => {
        // console.log("Balance message received from new socket", data);
        dispatch(
          setBalances({
            totalBalance: data.totalBalance,
            usedMargin: data.usedMargin,
            freeMargin: data.freeMargin,
            totalPnl: data.totalPnl,
            totalCommision: data.totalCommision,
          })
        );
      });

      socketRef.current.on("live_positions", (data: any) => {
        // console.log("Position message received from new socket", data);
        dispatch(setUserPositions([...data.positions]));
      });

      socketRef.current.on("orderLiquided", (data: any) => {
        console.log("Liquid message received from new socket", data);
        toast.success(
          `Your Order with id ${data.orderId} liquided by margin call system`
        );
        if (address) {
          getAllPositions(address?.toString())
            .then((res) => {
              console.log(res);
              dispatch(setUserOrders([...res.data.orders]));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

      socketRef.current.on("orderSlTpClose", (data: any) => {
        console.log("SL/TP close message received from new socket", data);
        toast.success(
          `Your Order with id ${data.orderId} close becuase of Sl/Tp limit hit`
        );
        if (address) {
          getAllPositions(address?.toString())
            .then((res) => {
              console.log(res);
              dispatch(setUserOrders([...res.data.orders]));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

      socketRef.current.on("lpDeposit", (data: any) => {
        console.log("Deposit message received from socket", data);
        toast.success(
          `You deposited $${data.usdcAmount} successfully and received ${data.lpTokenMinted} token`
        );
      });
    }
  }, []);

  useEffect(() => {
    console.log("here should work", address, socketRef.current, connected);
    if (address && connected) {
      socketRef.current.emit("register_wallet", address);
    }
  }, [address, connected]);

  return <>{children}</>;
}
