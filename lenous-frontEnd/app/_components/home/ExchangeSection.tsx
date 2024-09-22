import Image from "next/image";
import Link from "next/link";

export default function ExchnageSection() {
  return (
    <div className="index-container mt-36 flex justify-between text-white">
      <div>
        <div className="h-full">
          <div>
            <div className="text-primary text-3xl font-extralight ">
              Lenous Exchange
            </div>
            <div className="text-4xl font-bold mt-2">
              Try Our Crypto Exchange Now
            </div>
            <div className="text-2xl font-extralight mt-10">
              Start trading to get up to 11,200 USDT in rewards!
            </div>
            <Link
              className="inline-block mt-4 py-2 px-6 bg-radial-gradient-25-5 rounded-full"
              href="#"
            >
              View more benefits
            </Link>
          </div>
          <div className="mt-28">
            <div>
              <div className="text-5xl font-extralight">SIGN UP</div>
              <div className="text-5xl font-extralight text-primary">
                SIGN UP
              </div>
            </div>
            <div className="text-xl font-extralight ">
              Sign Up and Claim 500 USDT token + 200 USDT coupon + 7500 USDT
              Futures Trial Fund
            </div>
            <Link
              className="inline-block mt-4 py-2 px-6 bg-radial-gradient-25-5 rounded-full"
              href="#"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/images/index/lenous-exchange.png"
          alt={"lenous exchange"}
          width={450}
          height={405}
        />
      </div>
    </div>
  );
}
