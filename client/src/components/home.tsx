import zebras from "../assets/zebras.jpeg";
import { Button } from "./ui/button";

export default function Home() {
  return (
    <div>
      <section>
        <div className="about-kifaru flex justify-center items-center gap-x-8 p-8 w-full">
          <div className="text-content flex flex-col gap-y-4 max-w-lg">
            <h3 className="text-xl font-semibold">|| ABOUT US</h3>
            <h2 className="font-bold text-4xl font-sans">
              DISCOVER YOUR PERFECT GETAWAY
            </h2>
            <p>
              True luxury whispers through the details where every space is
              crafted with intention and every moment feels effortlessly
              extraordinary. Our properties bring together the soul of culture,
              the serenity of nature, and the elegance of bespoke comfort. Here,
              architecture becomes art, experiences unfold like poetry, and
              every stay feels timelessly unforgettable.
            </p>
            <Button className="w-50">Learn More</Button>
          </div>

          {/* Fixed grid with no gaps */}
          <div className="grid grid-cols-4 grid-rows-5 w-auto gap-2">
            {/* Side K vertical line */}
            <div className="col-start-1 row-start-1 w-[120px] h-[90px] overflow-hidden rounded-sm">
              <img
                src={zebras}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <div className="col-start-1 row-start-2 w-[120px] h-[90px] overflow-hidden rounded-sm">
              <img
                src={zebras}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <div className="col-start-1 row-start-3 w-[120px] h-[90px] overflow-hidden rounded-sm">
              <img
                src={zebras}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <div className="col-start-1 row-start-4 w-[120px] h-[90px] overflow-hidden rounded-sm">
              <img
                src={zebras}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <div className="col-start-1 row-start-5 w-[120px] h-[90px] overflow-hidden rounded-sm">
              <img
                src={zebras}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            {/* Top diagonal of K */}
            <div className="col-start-4 row-start-1 w-[120px] h-[90px] overflow-hidden rounded-sm">
              <img
                src={zebras}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <div className="col-start-3 row-start-2 w-[120px] h-[90px] overflow-hidden rounded-sm">
              <img
                src={zebras}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            {/* Middle joint */}
            <div className="col-start-2 row-start-3 w-[120px] h-[90px] overflow-hidden rounded-sm">
              <img
                src={zebras}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            {/* Bottom diagonal of K */}
            <div className="col-start-3 row-start-4 w-[120px] h-[90px] overflow-hidden rounded-sm">
              <img
                src={zebras}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <div className="col-start-4 row-start-5 w-[120px] h-[90px] overflow-hidden rounded-sm">
              <img
                src={zebras}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
