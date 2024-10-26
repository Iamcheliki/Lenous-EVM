import axios from "axios";

const BASE_URL = "http://195.248.240.173:8000";

export const getALlOrders = async () => {
  return axios.get(`${BASE_URL}/orders`).then((res) => {
    return res;
  });
};

export const getAllOrdersByAddress = async (address: string) => {
  return axios
    .get(`${BASE_URL}/orders?wallet_address=${address}`)
    .then((res) => {
      console.log(res);
      return res;
    });
};
