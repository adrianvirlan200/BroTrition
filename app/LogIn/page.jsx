"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import LogIn from "/components/Login";

const login = () => {
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
      <LogIn />
    </div>
  );
};

export default login;
