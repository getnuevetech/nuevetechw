import { Outlet } from "react-router";
import Navigation from "./Navigation";
import Footer from "@/sections/Footer";

export default function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}
