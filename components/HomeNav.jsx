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
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const HomeNav = () => {
  const router = useRouter();
  const pathname = usePathname();
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
            <DropdownItem key="analytics">Analytics</DropdownItem>
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
