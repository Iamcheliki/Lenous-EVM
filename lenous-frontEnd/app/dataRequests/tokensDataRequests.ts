import axios from "axios"

export const getTokensPrice = async (tokenList:string[]) => {
    return axios.post("http://195.248.240.173:5053/api/prices",{
        coins: tokenList
    }).then((res) => {
        console.log(res)
        return res
    })
}