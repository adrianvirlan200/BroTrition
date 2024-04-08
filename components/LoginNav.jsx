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
    router.push("/LogIn");
  };

  return (
    <div className="lg:mb-16 w-screen h-16 pr-5">
      <Navbar shouldHideOnScroll isBordered maxWidth="full">
        <NavbarBrand>
          <Link color="foreground" className="text-xl text-bold" href="/">
            <Image
              src="/brotrition_assets/png/pear.png"
              width={60}
              height={60}
              alt="Description of your image"
            />
            <p className="font-bold text-inherit text-4xl green_gradient">
              BroTrition
            </p>
          </Link>
        </NavbarBrand>
      </Navbar>
    </div>
  );
};

export default LoginNav;
