import axios from "axios"
import { BASE_URL } from "./constants"


export const getUserCredit =async (address: string) => {
    return axios.get(`http://195.248.240.173:5054/balance/${address}/`).then((res) => {
        return res;
    })
}