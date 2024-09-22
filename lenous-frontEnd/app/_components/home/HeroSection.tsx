export default function HeroSection() {
  return (
    <section>
      <div className="index-container  pt-24">
        <div className="font-inter text-7xl font-thin">
          <div className="text-white">ANYTIME, ANYWHERE</div>
          <div className="text-primary -mt-3">ANYTIME, ANYWHERE</div>
        </div>
      </div>
      <div className="index-container mt-7">
        <div
          className="text-white font-poppins font-black text-center text-7xl"
          style={{ textShadow: "13px 18px 0px #ffffff0d" }}
        >
          TRADE ON THE GO
        </div>
        <div className="appComuincation rounded-6xl font-poppins mt-28 grid grid-cols-4 justify-center bg-radial-gradient-25-5 py-20 text-white">
          <div className="text-center">
            <div className="text-4xl">200+</div>
            <div className="text-2xl font-extralight  pt-2">
              Countries Covered
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl">30 Milion</div>
            <div className="text-2xl font-extralight  pt-2">
              Global Investors
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl">700+</div>
            <div className="text-2xl font-extralight  pt-2">Coins</div>
          </div>
          <div className="text-center">
            <div className="text-4xl">2.15 Bilion</div>
            <div className="text-2xl font-extralight pt-2">
              24h Trading Volume
            </div>
          </div>
        </div>
        <div className="linearShadow relative h-11 -mt-2.5">
          <div className="h-11 left-14 right-14 absolute top-2 opacity-15 bg-colorfull-gradient box-shadow-[75px_75px_75px] blur-34"></div>
          <div className="h-px left-14 right-14 absolute top-2 bg-colorfull-gradient"></div>
        </div>
      </div>
    </section>
  );
}
