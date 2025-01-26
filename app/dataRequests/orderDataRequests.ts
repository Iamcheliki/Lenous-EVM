import axios from "axios";
import { BASE_URL } from "./constants";

export const getAllOrders = async (address: string) => {
  return axios.get(`${BASE_URL}/orders/${address}`).then((res) => {
    return res;
  });
};

export const getAllHistory = async (address: string) => {
  return axios.get(`${BASE_URL}/orders/history/${address}`).then((res) => {
    return res;
  });
};
