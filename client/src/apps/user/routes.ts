export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  {
    to: "/property",
    label: "Properties",
    children: [
      {
        to: "/property/belgium",
        label: "Belgium",
        description: "Check Out Our Belgium Properties",
      },
      {
        to: "/property/brussels",
        label: "Brussels",
        description: "Check Out Our Brussels Properties",
      },
      {
        to: "/property/msambweni",
        label: "Msambweni",
        description: "Check Out Our Msambweni Properties",
      },
      {
        to: "/property/nairobi",
        label: "Nairobi",
        description: "Check Out Our Nairobi Properties",
      },
      {
        to: "/property/netherlands",
        label: "Netherlands",
        description: "Check Out Our Netherlands Properties",
      },
      {
        to: "/property/nyali",
        label: "Nyali",
        description: "Check Out Our Nyali Properties",
      },
    ],
  },
  // { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export default navLinks;
