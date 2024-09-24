export default function HeroSection() {
  return (
    <section>
      <div className="index-container  pt-24">
        <div className="font-inter text-7xl font-thin flex flex-col items-center gap-4">
          <div className="text-white">ANYTIME, ANYWHERE</div>
          <div className="text-primary -mt-3">Trade on the GO!</div>
        </div>
      </div>
      <div className="index-container mt-9">
        <h3
          className="text-white font-poppins font-thin text-center text-xl"
          style={{ textShadow: "13px 18px 0px #ffffff0d" }}
        >
          Trade Smarter, Swap Faster, Grow Further with Lenous Protocol’s
          innovative technologies{" "}
        </h3>
        <div className="appComuincation rounded-6xl font-poppins mt-28 grid grid-cols-4 justify-center py-20 text-white">
          <div className="text-center flex flex-col items-center gap-2">
            <p className="text-2xl font-black pt-2">Countries Covered</p>
            <div className="text-4xl font-extralight">200+</div>
          </div>
          <div className="text-center flex flex-col items-center gap-2">
            <p className="text-2xl font-black pt-2">Global Investors</p>
            <div className="text-4xl font-extralight">30M+</div>
          </div>
          <div className="text-center flex flex-col items-center gap-2">
            <p className="text-2xl font-black pt-2">Coins</p>
            <div className="text-4xl font-extralight">700M+</div>
          </div>
          <div className="text-center flex flex-col items-center gap-2">
            <p className="text-2xl font-black pt-2">24h Trading Volume</p>
            <div className="text-4xl font-extralight">2.158B+</div>
          </div>
        </div>
        {/* <div className="linearShadow relative h-11 -mt-2.5">
          <div className="h-11 left-14 right-14 absolute top-2 opacity-15 bg-colorfull-gradient box-shadow-[75px_75px_75px] blur-34"></div>
          <div className="h-px left-14 right-14 absolute top-2 bg-colorfull-gradient"></div>
        </div> */}
      </div>
    </section>
  );
}
