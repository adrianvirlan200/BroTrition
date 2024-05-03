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

  switch (pathname) {
    case "/":
      nav = <TopNav />;
      break;
    case "/Login":
      nav = <LoginNav />;
      break;
    case "/Home":
      nav = <HomeNav />;
      break;
    default:
      nav = <LoginNav />;
      break;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-tr from-gray-100 to-lime-200">
        <div className="bg-scroll grid">
          <NextAuthSessionProvider>
            <NextUIProvider>
              {nav}
              {children}
              <Footer />
            </NextUIProvider>
          </NextAuthSessionProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
