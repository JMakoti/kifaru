import { Card, CardContent } from "@/components/ui/card";
import luxury from "@/assets/icon/kifaru-comfort.png";
import dining from "@/assets/icon/kifaru-dining.png";
import coaching from "@/assets/icon/kifaru-coaching-icon.png";
import homes from "@/assets/icon/kifaru-homes.png";
import transport from "@/assets/icon/kifaru-transport.png";
import humancentered from "@/assets/icon/kifaru-human-centered.png";

export default function Why_UsSection() {
  const items = [
    {
      title: "Luxury & Comfort Focused",
      description:
        "guests experience the comfort of consistent, sustainable standards, Across all properties.",
      icon: <img src={luxury} alt="Luxury icon" className="w-14 h-14" />,
    },
    {
      title: "Flexible Dining Experiences",
      description:
        "Ensuring authentic, nourishing food and beverage experiences rooted in local culture.",
      icon: <img src={dining} alt="Modern icon" className="w-14 h-14" />,
    },
    {
      title: "Personal Coaching Professionals",
      description:
        "including life coaches, business coaches, and inspirational role models.",
      icon: <img src={coaching} alt="Serenity icon" className="w-14 h-14" />,
    },

    {
      title: "Unique Homes",
      description:
        "Whether you seek a peaceful sanctuary or a sophisticated space to entertain.",
      icon: <img src={homes} alt="Vacation icon" className="w-14 h-14" />,
    },
    {
      title: "Reliable & Ethical Mobility Solutions",
      description:
        "Thoughtfully built homes that respect the environment and reduce impact.",
      icon: (
        <img src={transport} alt="Eco friendly icon" className="w-14 h-14" />
      ),
    },
    {
      title: "Effortless & Human-centered",
      description: "It is a living network of spaces, people, and purpose.",
      icon: <img src={humancentered} alt="Nature icon" className="w-14 h-14" />,
    },
  ];
  return (
    <div>
      <section className="w-full px-6 md:px-20 py-8 bg-white mt-6 ">
        <div>
          {/*Intro */}
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-gray-900 leading-tight">
              Why Choose Kifaru?
            </h2>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-start">
            {items.map((item, index) => (
              <div>
                <Card
                  key={index}
                  className="shadow-none border bg-transparent p-6 h-60 rounded-lg"
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
