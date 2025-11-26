import { Card, CardContent } from "@/components/ui/card";
import luxury from "@/assets/icon/double-bed.png";
import serinity from "@/assets/icon/inner-peace.png";
import living from "@/assets/icon/curtains.png";
import vacation from "@/assets/icon/hut.png";
import bio from "@/assets/icon/bio.png";
import nature from "@/assets/icon/leaf.png";

export default function Why_UsSection() {
  const items = [
    {
      title: "Luxury & Comfort Focused",
      description:
        "Whether you seek a peaceful sanctuary or a sophisticated space to entertain.",
      icon: <img src={luxury} alt="Luxury icon" className="w-14 h-14" />,
    },
    {
      title: "Serenity & Exclusivity Focused",
      description:
        "Whether you seek a peaceful sanctuary or a sophisticated space to entertain.",
      icon: <img src={serinity} alt="Serenity icon" className="w-14 h-14" />,
    },
    {
      title: "Modern & Smart Living",
      description:
        "Whether you seek a peaceful sanctuary or a sophisticated space to entertain.",
      icon: <img src={living} alt="Modern icon" className="w-14 h-14" />,
    },
    {
      title: "Unique Vacation Homes",
      description:
        "Whether you seek a peaceful sanctuary or a sophisticated space to entertain.",
      icon: <img src={vacation} alt="Vacation icon" className="w-14 h-14" />,
    },
    {
      title: "Eco-Friendly & Sustainable",
      description:
        "Thoughtfully built homes that respect the environment and reduce impact.",
      icon: <img src={bio} alt="Eco friendly icon" className="w-14 h-14" />,
    },
    {
      title: "Nature-Inspired Retreats",
      description:
        "Homes that frame green vistas, fresh air, and slow, restorative moments.",
      icon: <img src={nature} alt="Nature icon" className="w-14 h-14" />,
    },
  ];
  return (
    <div>
      <section className="w-full px-6 md:px-20 py-16 bg-white ">
        <div className="flex flex-col md:flex-row">
          {/* Left Intro */}
          <div className="w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Why Choose
              <br /> Kifaru?
            </h2>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-start">
            {items.map((item, index) => (
              <div>
                <Card
                  key={index}
                  className="shadow-none border-none bg-transparent p-6 h-60 bg-blue-50"
                >
                  <CardContent className="p-0 space-y-2">
                    {item.icon}
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>

                {index !== items.length - 1 && (
                  <div className="w-px bg-gray-800" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
