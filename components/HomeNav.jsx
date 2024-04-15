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
import { usePathname } from "next/navigation";

const HomeNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  let homeLink;

  if (pathname.startsWith("/Home")) {
    homeLink = "/Home";
  } else {
    homeLink === "/";
  }

  const handleLogout = () => {
    router.push("/api/auth/signout");
  };

  return (
    <div className="lg:mb-16 w-screen h-16 pr-5">
      <Navbar shouldHideOnScroll isBordered maxWidth="full">
        <NavbarBrand>
          <Link
            color="foreground"
            className="text-xl text-bold"
            href={homeLink}
          >
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

        <NavbarContent className="lg:flex gap-16" justify="end">
          <NavbarItem className="lg:flex">
            <Button
              onClick={handleLogout}
              className="border-2 border-red-700 bg-transparent text-2xl text-bold"
            >
              Log Out
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default HomeNav;
