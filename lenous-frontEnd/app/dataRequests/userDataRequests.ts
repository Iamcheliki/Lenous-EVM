import axios from "axios";
import { BASE_URL } from "./constants";

export const getUserCredit = async (address: string) => {
  return axios
    .get(`http://195.248.240.173:8000/api/user/balance/${address}`)
    .then((res) => {
      return res;
    });
};
