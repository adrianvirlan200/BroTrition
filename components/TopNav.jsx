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

const TopNav = () => {
  const router = useRouter();

  const handleLogIn = () => {
    router.push("/Login");
  };

  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      maxWidth="full"
      className="max-h-14 mb-10 bg-zinc-800 text-white"
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
      <NavbarContent className="hidden lg:flex gap-16" justify="end">
        <NavbarItem>
          <Link color="foreground" className="text-xl text-bold" href="/About">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" className="text-xl text-bold" href="#">
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            aria-current="page"
            className="text-xl text-bold"
            href="/Support"
          >
            Support
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="text-xl text-bold">
            Blog
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="text-xl text-bold">
            Forum
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="lg:flex gap-16" justify="end">
        <NavbarItem className="lg:flex">
          <Button
            onClick={handleLogIn}
            className="mr-5 border-2 border-green-700 bg-transparent text-2xl text-bold"
          >
            Log In
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default TopNav;
