import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

import Image from "next/image";

const TopNav = () => {
  return (
    <div className="lg:mb-16 w-screen flex-top-0">
      <Navbar shouldHideOnScroll isBordered>
        <NavbarBrand>
          <Image
            src="/brotrition_assets/png/pear.png"
            width={36}
            height={36}
            alt="Description of your image"
          />

          <p className="font-bold text-inherit green_gradient">BroTrition</p>
        </NavbarBrand>
        <NavbarContent className="hidden lg:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="lg:flex">
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default TopNav;
