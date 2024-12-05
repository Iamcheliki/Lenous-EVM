import axios from "axios";
import { BASE_URL } from "./constants";

export const getAllOrders = async (address: string) => {
  return axios.get(`${BASE_URL}/orders/${address}`).then((res) => {
    return res;
  });
};

export const getAllPositions = async (address: string) => {
  return axios.get(`${BASE_URL}/orders/positions/${address}`).then((res) => {
    return res;
  });
};
