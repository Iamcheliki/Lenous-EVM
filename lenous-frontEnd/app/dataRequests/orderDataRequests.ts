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

export const getAllTraderInfo = async (address: string) => {
  return axios
    .get(`http://195.248.240.173:8120/api/trader/${address}`)
    .then((res) => {
      console.log(res);
      return res;
    });
};
