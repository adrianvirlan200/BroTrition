"use client";
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import WelcomePage from "@components/WelcomePage.jsx"; // Path: app/page.jsx6+9`+9`
import Image from "next/image";

const first_page = () => {
  const router = useRouter();
  const pathname = usePathname();

  //prevent user to come back to login, signup and welcome page if he has already logged in
  const { data: session } = useSession();
  useEffect(() => {
    if (pathname === "/Login" || pathname === "/Signup" || pathname === "/")
      if (session) router.push("/Home");
  }, [session, router, pathname]);

  return (
    <div>
      <div className="p-5">
        <WelcomePage />
      </div>
    </div>
  );
};

export default first_page;
