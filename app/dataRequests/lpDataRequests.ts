import axios from "axios";
import { BASE_URL } from "./constants";
import { BigNumber } from "ethers";

export const handleGetSignatureForDeposit = async (
  depositAmount: number,
  lpTokenAmount: number,
  deadline: number,
  userAddress: string
) => {
  return axios
    .post(`${BASE_URL}/lp/get-deposit-sign`, {
      depositAmount,
      lpTokenAmount,
      deadline,
      userAddress,
    })
    .then((res) => {
      return res;
    });
};

export const getTokenPrice = async () => {
  return axios.get(`${BASE_URL}/lp/get-token-price`).then((res) => res);
};
