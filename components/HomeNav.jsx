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
      <div className="lg:invisible">
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
              <DropdownItem
                key="dashboard"
                onClick={() => {
                  router.push("/Home");
                }}
              >
                <div className="flex items-center hover:text-orange-500">
                  <Image
                    src="/brotrition_assets/png/dashboard.png"
                    width="23"
                    height="23"
                    alt="dashboard"
                    className="mr-2 transition ease-in-out group-hover:scale-110"
                  />{" "}
                  <h1>DashBoard</h1>
                </div>
              </DropdownItem>
              <DropdownItem
                key="trends"
                onClick={() => {
                  router.push("/Home/Trends");
                }}
              >
                <div className="flex items-center hover:text-orange-500">
                  <Image
                    src="/brotrition_assets/png/trends.png"
                    width="20"
                    height="20"
                    alt="trends"
                    className="mr-2 transition ease-in-out group-hover:scale-110"
                  />
                  <h1>Trends</h1>
                </div>
              </DropdownItem>

              <DropdownItem
                key="gym"
                onClick={() => {
                  router.push("/Home/Gym");
                }}
              >
                <div className="flex items-center hover:text-orange-500">
                  <Image
                    src="/brotrition_assets/png/dumbbell.png"
                    width="23"
                    height="23"
                    className="mr-2 transition ease-in-out group-hover:scale-110"
                  />
                  <h1>Find a Gym</h1>
                </div>
              </DropdownItem>

              <DropdownItem
                key="gold"
                onClick={() => {
                  router.push("/Home/Gold");
                }}
              >
                <div className="flex items-center hover:text-orange-500">
                  <Image
                    src="/brotrition_assets/png/dollar.png"
                    width="22"
                    height="22"
                    className="mr-2 transition ease-in-out group-hover:scale-110"
                  />
                  <h1>Brotrition Gold</h1>
                </div>
              </DropdownItem>

              <DropdownItem
                key="support"
                onClick={() => {
                  router.push("/Home/Support");
                }}
              >
                <div className="flex items-center hover:text-orange-500">
                  <Image
                    src="/brotrition_assets/png/question_mark.png"
                    width="24"
                    height="24"
                    className="mr-2 transition ease-in-out group-hover:scale-110"
                  />
                  <h1>Support</h1>
                </div>
              </DropdownItem>

              <DropdownItem
                key="about"
                onClick={() => {
                  router.push("/Home/About");
                }}
              >
                <div className="flex items-center hover:text-orange-500">
                  <Image
                    src="/brotrition_assets/png/i_logo.png"
                    width="24"
                    height="24"
                    className="font-medium text-lg mr-2 transition ease-in-out group-hover:scale-110"
                  />
                  <h1>About</h1>
                </div>
              </DropdownItem>
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
