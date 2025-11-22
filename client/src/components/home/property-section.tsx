import { ArrowRight, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import properties from "../data/properties.json";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { useState, useEffect } from "react";

export default function PropertySection() {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h2 className="text-4xl font-bold mb-4">Our Properties</h2>

      <div className="grid md:grid-cols-3 gap-8 w-full p-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

function PropertyCard({ property }: { property: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (property.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [property.images.length]);

  return (
      <Card className="border rounded-lg overflow-hidden hover:shadow-lg w-full">
        <CardHeader className="p-0 m-0 flex-shrink-0">
          <div className="relative">
            <img
              src={property.images[currentImageIndex]}
              alt={property.name}
              className="w-full h-52 object-cover"
            />
            {property.images.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {property.images.map((_: any, index: number) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
          <CardTitle className="text-xl font-semibold px-3 mt-3">
            {property.name}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 text-base px-3">
            <MapPin className="w-4 h-4" />
            {property.location}, {property.country}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-gray-600 mb-2 px-3">
          {property.description}
        </CardContent>

        <CardFooter>
          <Button variant="link" className="p-0 w-full font-semibold" asChild>
            <Link
              to={property.link}
              className="flex gap-1 items-center justify-center bg-primary text-white py-2 rounded"
            >
              Book Now <ArrowRight size={16} />
            </Link>
          </Button>
        </CardFooter>
      </Card>
  );
}
