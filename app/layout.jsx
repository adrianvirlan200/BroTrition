"use client";
import "@styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Footer from "@components/Footer";
import TopNav from "@components/TopNav";
import LoginNav from "@components/LoginNav";
import HomeNav from "@components/HomeNav";
import { usePathname } from "next/navigation";
import NextAuthSessionProvider from "./nextauth/NextAuthSessionProvider";

const RootLayout = ({ children }) => {
  const pathname = usePathname();

  let nav;
  if (pathname.startsWith("/Home")) {
    nav = <HomeNav />;
  } else if (pathname == "/Login") {
    nav = <LoginNav />;
  } else if (pathname == "/") {
    nav = <TopNav />;
  } else {
    nav = <LoginNav />;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#fffcf6] min-w-screen min-h-screen">
        <NextAuthSessionProvider>
          <NextUIProvider>
            <div className="text-black min-w-screen min-h-screen overflow-x-auto">
              {nav}
              <div className="flex ">{children}</div>
              <Footer />
            </div>
          </NextUIProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
