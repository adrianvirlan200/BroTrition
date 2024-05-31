"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginNav = () => {
  const router = useRouter();
  const handleLogIn = () => {
    router.push("/Login");
  };

  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      maxWidth="full"
      className="max-h-14 bg-zinc-800 text-white mb-16 border-b-1 border-black"
    >
      <NavbarBrand>
        <Link color="foreground" className="text-xl text-bold" href="/">
          <Image
            src="/brotrition_assets/png/pear.png"
            width={40}
            height={40}
            alt="Description of your image"
          />
          <p className="font-bold text-inherit text-4xl green_gradient">
            BroTrition
          </p>
        </Link>
      </NavbarBrand>
    </Navbar>
  );
};

export default LoginNav;
