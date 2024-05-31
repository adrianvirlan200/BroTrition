"use client";
import "@styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Footer from "@components/Footer";
import TopNav from "@components/TopNav";
import LoginNav from "@components/LoginNav";
import HomeNav from "@components/HomeNav";
import { usePathname } from "next/navigation";
import NextAuthSessionProvider from "./nextauth/NextAuthSessionProvider";
import Sidebar from "@components/Sidebar";

const RootLayout = ({ children }) => {
  const pathname = usePathname();

  let nav;
  let sidebar;
  let footer;
  switch (pathname) {
    case "/":
      nav = <TopNav />;
      sidebar = "";
      footer = <Footer />;
      break;
    case "/Login":
      nav = <LoginNav />;
      sidebar = "";
      footer = <Footer />;
      break;
    case "/Home":
      nav = <HomeNav />;
      sidebar = <Sidebar />;
      footer = "";
      break;
    default:
      nav = <LoginNav />;
      break;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className="bg-gradient-to-tr from-gray-100 to-lime-200"> */}
      <body className="bg-[#fffcf6]">
        <NextAuthSessionProvider>
          <NextUIProvider>
            <div className="text-black">
              {nav}
              <div className="flex">
                {sidebar}
                {children}
              </div>
              <Footer />
            </div>
          </NextUIProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
