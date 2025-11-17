import { Outlet } from "react-router";
import Footer from "./footer";
import Navbar from "./navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
