import zebras from "../assets/zebras.jpeg";
import rhino from "../assets/rhino.png";
import { Button } from "./ui/button";
import "../styles/global.css";

export default function Home() {
  return (
    <div>
      <section>
        <div className="about-kifaru flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8 p-4 md:p-8 w-full">
          <div className="text-content flex flex-col gap-4 md:gap-6 lg:gap-10 max-w-lg order-2 lg:order-1 w-full">
            <h3 className="text-lg md:text-xl font-semibold">|| ABOUT US</h3>
            <h2 className="font-bold text-2xl font-sans  md:text-3xl lg:text-4xl leading-tight">
              DISCOVER YOUR PERFECT GETAWAY
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              True luxury whispers through the details where every space is
              crafted with intention and every moment feels effortlessly
              extraordinary. Our properties bring together the soul of culture,
              the serenity of nature, and the elegance of bespoke comfort. Here,
              architecture becomes art, experiences unfold like poetry, and
              every stay feels timelessly unforgettable.
            </p>
            <Button className="w-full sm:w-40">Learn More</Button>
          </div>

          <div className="grid grid-cols-3 grid-rows-3 gap-1 md:gap-2 w-full w-full sm:max-w-sm md:max-w-md max-w-xs lg:max-w-lg order-1 lg:order-2">
            {/* Side K vertical line */}
            <div className="col-start-1 row-start-1 w-full h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden rounded-sm">
              <img src={zebras} alt="" className="w-full h-full object-contain" />
            </div>

            <div className="col-start-1 row-start-2 w-full h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden rounded-sm">
              <img src={zebras} alt="" className="w-full h-full object-contain" />
            </div>

            <div className="col-start-1 row-start-3 w-full h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden rounded-sm">
              <img src={zebras} alt="" className="w-full h-full object-contain" />
            </div>

            {/* Top diagonal of K */}
            <div className="col-start-3 row-start-1 w-full h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden rounded-sm rounded-br-full">
              <img src={zebras} alt="" className="w-full h-full object-contain" />
            </div>

            {/* Middle joint */}
            <div className="col-start-2 row-start-2 w-full h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden rounded-sm">
              <img
                src={rhino}
                alt="Featured Rhino"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Bottom diagonal of K */}
            <div className="col-start-3 row-start-3 w-full h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden rounded-lg rounded-tr-full">
              <img src={zebras} alt="" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
