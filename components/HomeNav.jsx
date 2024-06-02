"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const HomeNav = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleLogout = () => {
    router.push("/api/auth/signout");
  };

  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      maxWidth="full"
      isBlurred="false"
      className="bg-zinc-800 max-h-14 z-10"
    >
      <div className="ml-96">
        <NavbarBrand>
          <Dropdown className="bg-zinc-800">
            <DropdownTrigger>
              <Image
                src="/brotrition_assets/svg/menu.svg"
                width="40"
                height="40"
                alt="menu"
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="text-white"
            >
              <DropdownItem
                key="logo"
                className="h-14 gap-2"
                onClick={() => {
                  router.push("/Home");
                }}
              >
                <div className="flex items-center border-b border-gray-300 pb-2">
                  <Image
                    src="/brotrition_assets/png/pear.png"
                    width="30"
                    height="30"
                    alt="menu"
                  />
                  <h1 className="text-2xl green_gradient font-bold ml-2">
                    BroTrition
                  </h1>
                </div>
              </DropdownItem>
              <DropdownItem key="settings">
                <div className="flex items-center">
                  <Image
                    src="/brotrition_assets/png/dashboard.png"
                    width="23"
                    height="23"
                    className="mr-2 transition ease-in-out group-hover:scale-110"
                  />{" "}
                  <h1>DashBoard</h1>
                </div>
              </DropdownItem>
              <DropdownItem key="team_settings">Trends</DropdownItem>
              <DropdownItem key="analytics">Find a Gym</DropdownItem>
              <DropdownItem key="system">Brotrition Gold</DropdownItem>
              <DropdownItem key="configurations">Support</DropdownItem>
              <DropdownItem key="configurations">About</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarBrand>
      </div>

      <NavbarContent as="div" justify="end" className="mr-5">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="success"
              name="Jason Hughes"
              size="md"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="profile"
              className="h-14 gap-2 border-b-2 border-b-gray-300 rounded-b-none"
            >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">
                {status != "loading" ? session.user.name : "placeholder"}
              </p>
              <p className="font-medium text-xs">
                {status != "loading" ? session.user.email : "placeholder "}
              </p>
            </DropdownItem>
            <DropdownItem key="settings">My Account</DropdownItem>
            <DropdownItem
              key="analytics"
              onClick={() => {
                router.push("/Home/Trends");
              }}
            >
              Analytics
            </DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="team_settings">Settings</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default HomeNav;
