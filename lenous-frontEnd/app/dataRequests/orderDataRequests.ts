import axios from "axios";
import { BASE_URL } from "./constants";

export const getAllOrders = async () => {
  return axios.get(`${BASE_URL}/orders`).then((res) => {
    return res;
  });
};

export const getAllOrdersByAddress = async (address: string) => {
  return axios.get(`${BASE_URL}/api/user/orders/${address}`).then((res) => {
    console.log(res);
    return res;
  });
};
