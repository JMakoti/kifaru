import HeroSection from "@/apps/user/components/home/hero-section";
import AboutSection from "../shared/about-section";
import PropertySection from "../shared/property-section";
import KifaruExperience from "../components/home/kifaruexperience";
import Gallery from "../components/home/gallery";
import TestimonialSection from "../components/about/testmonials";
import TeamSection from "../components/home/established";
// import OpenCallSection from "../components/home/videobg.section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PropertySection />
      {/* <OpenCallSection/> */}
      <KifaruExperience />
      <AboutSection />
      <TeamSection />
      <Gallery />
      <TestimonialSection />
    </div>
  );
}


// const teamMembers = [
//   {
//     image:
//       "https://techbedkifaru.be/wp-content/uploads/2020/11/Olivier-bewerkt-3-394x394.png",
//     name: "Olivier Vanden Eynde",
//     title: "Partner",
//     quote:
//       "Olivier Vanden Eynde is a pioneer in development cooperation, combining social impact with entrepreneurship across Europe and Kenya.",
//     socials: {
//       linkedin: "#",
//       twitter: "#",
//       instagram: "#",
//     },
//   },
//   {
//     image:
//       "https://techbedkifaru.be/wp-content/uploads/2020/11/debbieOK2-394x394.jpg",
//     name: "Debbie",
//     title: "Partner",
//     quote:
//       "After a decade of rich experiences in finance and entrepreneurship, Debbie embraced her passion for building ventures and co-founded 'Close the Gap Kenya' with Olivier",
//     socials: {
//       linkedin: "#",
//       twitter: "#",
//     },
//   },
//   {
//     image: "https://techbedkifaru.be/wp-content/uploads/2020/11/Alexander2.jpg",
//     name: "Alexander",
//     title: "Junior",
//     quote:
//       "Alexander is a true 'born global', having grown up in Amsterdam, Brussels, and Mombasa, thriving in diverse cultures and languages.",
//     socials: {
//       linkedin: "#",
//       instagram: "#",
//     },
//   },
//   {
//     image: "/team/person4.jpg",
//     name: "Alexander Sibling",
//     title: "Junior",
//     quote:
//       "Alexander is a true 'born global', having grown up in Amsterdam, Brussels, and Mombasa, thriving in diverse cultures and languages.",
//     socials: {
//       linkedin: "#",
//       twitter: "#",
//       instagram: "#",
//     },
//   },
// ];