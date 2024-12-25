import { TokenData } from "@/app/_libs/types/token";
import { tokenList } from "@/app/_libs/utils/constants/TokenList";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MarketSection() {
  const tokenIds = tokenList.map((token) => token.id).join(",");
  const [tokensPrice, setTokensPrice] = useState<TokenData[]>([]);

  const fetchTokenData = async (tokens: string) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokens}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch token data");
      }
      const data: TokenData[] = await response.json();
      setTokensPrice([...data]);
    } catch (error) {
      console.error("Error fetching token data:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchTokenData(tokenIds);
  }, []);

  return (
    <>
      <div className="text-center text-white mt-36">
        <div>
          <div className="text-primary text-3xl font-extralight">
            16 July 2024
          </div>
          <div className="text-4xl font-bold">Crypto Market Today</div>
        </div>
        <div className="mt-12 bg-radial-gradient-25-5 py-10">
          <div className="text-primary text-4xl font-extralight">
            NEW LISTING
          </div>
          <div className="flex justify-between index-container">
            <div className="flex items-center">
              <Image
                src="/images/index/uxLink.png"
                alt={"uxLink"}
                width={190}
                height={146}
              />
              <div className="text-left">
                <div className="text-5xl font-bold">UXLINK</div>
                <div className="text-2xl font-extralight mt-2">UXLINK</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="pr-3 flex items-end">
                <div className="font-black text-4xl pr-1">49</div>
                <div className="font-extralight">H</div>
              </div>
              <div className="pr-3 flex items-end">
                <div className="font-black text-4xl pr-1">32</div>
                <div className="font-extralight">M</div>
              </div>
              <div className="pr-3 flex items-end">
                <div className="font-black text-4xl pr-1">01</div>
                <div className="font-extralight">S</div>
              </div>
            </div>
          </div>
        </div>
        <div className="linearShadow relative h-11 -mt-2.5">
          <div className="h-11 left-0 right-0 absolute top-2 opacity-15 bg-colorfull-gradient box-shadow-[75px_75px_75px] blur-34"></div>
          <div className="h-px left-0 right-0 absolute top-2 bg-colorfull-gradient"></div>
        </div>
      </div>
      <div className="index-container grid grid-cols-3 gap-8 text-white mt-28">
        {/* column 1 */}
        <div className="rounded-6xl p-10 flex flex-col gap-16 border border-white-bg-15 items-center">
          <div className="text-center text-white text-4xl relative w-fit">
            <span
              className="absolute font-black text-[#EF4444] -top-1 -left-2 -z-[1]"
              style={{ textShadow: "1px 2px 14px #ef4444c9" }}
            >
              H
            </span>
            <p className="font-extralight">HOT LIST</p>
          </div>
          <div>
            {tokensPrice.slice(0, 5).map((token) => (
              <div key={token.id} className="flex justify-between pt-6 gap-20">
                <div className="flex items-center">
                  <div className="pr-2">
                    <Image
                      src={token.image}
                      alt={token.name}
                      width={35}
                      height={35}
                    />
                  </div>
                  <div>
                    <div className="text-xl">{token.symbol.toUpperCase()}</div>
                    <div className="font-extralight">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl">{token.current_price}</div>
                  <div
                    className={` font-extralight ${
                      token.price_change_percentage_24h >= 0
                        ? "text-good-condition"
                        : "text-bad-situation"
                    }`}
                  >
                    {Number(token.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* column 2 */}
        <div className="rounded-6xl p-10 flex flex-col gap-16 border border-white-bg-15 items-center">
          <div className="text-center text-white text-4xl relative">
            <span
              className="absolute font-black text-[#00D17A] -top-1 -left-2 -z-[1]"
              style={{ textShadow: "1px 2px 14px #00D17Ac9" }}
            >
              N
            </span>
            <p className="font-extralight">NEW COINS</p>
          </div>
          <div>
            {tokensPrice.slice(5, 10).map((token) => (
              <div key={token.id} className="flex justify-between pt-6">
                <div className="flex items-center">
                  <div className="pr-2">
                    <Image
                      src={token.image}
                      alt={token.name}
                      width={35}
                      height={35}
                    />
                  </div>
                  <div>
                    <div className="text-xl">{token.symbol.toUpperCase()}</div>
                    <div className="font-extralight">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl">{token.current_price}</div>
                  <div
                    className={` font-extralight ${
                      token.price_change_percentage_24h >= 0
                        ? "text-good-condition"
                        : "text-bad-situation"
                    }`}
                  >
                    {Number(token.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* column 3 */}
        <div className="rounded-6xl p-10 flex flex-col gap-16 border border-white-bg-15 items-center">
          <div className="text-center text-white text-4xl relative">
            <span
              className="absolute font-black text-[#A855F7] -top-1 -left-2 -z-[1]"
              style={{ textShadow: "1px 2px 14px #A855F7c9" }}
            >
              T
            </span>
            <p className="font-extralight">TOP GAINERS</p>
          </div>
          <div>
            {tokensPrice.slice(10, 15).map((token) => (
              <div key={token.id} className="flex justify-between pt-6">
                <div className="flex items-center">
                  <div className="pr-2">
                    <Image
                      src={token.image}
                      alt={token.name}
                      width={35}
                      height={35}
                    />
                  </div>
                  <div>
                    <div className="text-xl">{token.symbol.toUpperCase()}</div>
                    <div className="font-extralight">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl">{token.current_price}</div>
                  <div
                    className={` font-extralight ${
                      token.price_change_percentage_24h >= 0
                        ? "text-good-condition"
                        : "text-bad-situation"
                    }`}
                  >
                    {Number(token.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
