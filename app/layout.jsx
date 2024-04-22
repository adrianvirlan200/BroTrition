"use client";
import "@styles/globals.css";
import Nav from "@components/LoginNav";
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
    <html lang="en">
      <body className="bg-gradient-to-r from-gray-100 to-amber-100">
        <div className="bg-scroll grid">
          {nav}
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
