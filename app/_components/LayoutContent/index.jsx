"use client";

import { usePathname } from "next/navigation";
import Navbar from "./../Navigation";

export default function LayoutContent({ children }) {
  const pathname = usePathname();

  const hideNavbarRoutes = ["/signup", "/login"];

  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
}