import { TokenData } from "@/app/_libs/types/token";
import { tokenList } from "@/app/_libs/utils/constants/TokenList";
import Image from "next/image";

const fetchTokenData = async (tokens: string): Promise<TokenData[]> => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokens}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch token data");
    }
    const data: TokenData[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching token data:", error);
    return [];
  }
};

export default async function MarketSection() {
  const tokenIds = tokenList.map((token) => token.id).join(",");
  const tokensPrice = await fetchTokenData(tokenIds);
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
        <div className="rounded-6xl border border-white-bg-15 p-10">
          <div className="text-center text-white text-4xl">
            <div className="font-extralight">HOT LIST</div>
            <div>H</div>
          </div>
          <div>
            {tokensPrice.slice(0, 5).map((token) => (
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
        {/* column 2 */}
        <div className="rounded-6xl border border-white-bg-15 p-10">
          <div className="text-center text-white text-4xl">
            <div className="font-extralight">NEW COINS</div>
            <div>H</div>
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
        <div className="rounded-6xl border border-white-bg-15 p-10">
          <div className="text-center text-white text-4xl">
            <div className="font-extralight">TOP GAINERS</div>
            <div>H</div>
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
