import { ETHERSCAN_API_KEY } from "@/app/_libs/utils/constants/apiKey";
import axios from "axios";
import { useEffect, useState } from "react";
import data from "../../_libs/utils/constants/erc20Tokens.json";
import Select from "react-select";
import { OrderToPlace } from "@/app/types/order";

interface Props {
  order: OrderToPlace;
  setOrder: (order: OrderToPlace) => void;
}

export default function TokenList({ order, setOrder }: Props) {
  const [tokens, setTokens] = useState<any[]>([]);
  // const handleGetTokens = () => {
  //   axios
  //     .get(
  //       `https://api.etherscan.io/api?module=stats&action=tokenlist&apikey=${ETHERSCAN_API_KEY}`
  //     )
  //     .then((res) => {
  //       console.log("tokensList", res);
  //       // setTokens([...res.data.tokenList]);
  //     });
  // };

  const handleTokenSet = () => {
    const newList = data.tokens.map((item) => ({
      label: item.name,
      value: item.address,
    }));
    setTokens([...newList]);
  };

  useEffect(() => {
    // handleGetTokens();
    handleTokenSet();
  }, []);

  return (
    <div>
      <Select
        classNamePrefix="select"
        defaultValue={tokens[0]}
        isSearchable={true}
        name="Token"
        options={tokens}
        onChange={(value) => {
          setOrder({
            ...order,
            asset: { symbol: value.label, address: value.value },
          });
        }}
      />
    </div>
  );
}
