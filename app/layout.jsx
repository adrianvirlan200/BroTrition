"use client";
import "@styles/globals.css";
import Nav from "@components/LoginNav";
import Footer from "@components/Footer";
import Provider from "@components/Provider";
import TopNav from "@components/TopNav";
import LoginNav from "@components/LoginNav";
import { usePathname } from "next/navigation";

const RootLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <html eng="en">
      <body className="bg-amber-50">
        <div className="bg-scroll grid">
          {pathname === "/LogIn" ? <LoginNav /> : <TopNav />}
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
