"use client";
import Image from "next/image";
import { Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Button, Divider } from "@nextui-org/react";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="z-20 top-0 fixed content-start sm:invisible lg:visible min-h-full w-60 rounded-none bg-zinc-800 text-white">
      <Link href={"/Home"} className="text-xl text-bold pt-3 pl-4 mb-5">
        <Image src="/brotrition_assets/png/pear.png" width="40" height="40" />
        <p className="font-bold text-inherit text-4xl green_gradient">
          BroTrition
        </p>
      </Link>
      <Button
        color="default"
        variant="light"
        onPress={() => {
          router.push("/Home");
        }}
        className="mt-2 ml-2 text-white font-medium text-lg w-5/6 flex-start pt-2 hover:text-orange-500"
      >
        <Image
          src="/brotrition_assets/png/dashboard.png"
          width="28"
          height="28"
          className="transition ease-in-out group-hover:scale-110"
        />
        DashBoard
      </Button>
      <Button
        color="default"
        variant="light"
        onPress={() => {
          router.push("/Home/Trends");
        }}
        className="mt-2 ml-2 text-white font-medium text-lg w-5/6 flex-start pt-2 hover:text-orange-500"
      >
        <Image
          src="/brotrition_assets/png/trends.png"
          width="23"
          height="23"
          className="transition ease-in-out group-hover:scale-110"
        />
        Trends
      </Button>
      <Button
        color="default"
        variant="light"
        onPress={() => {
          router.push("/Home/Gym");
        }}
        className="mt-2 ml-2 text-white font-medium text-lg w-5/6 flex-start pt-2 hover:text-orange-500"
      >
        <Image
          src="/brotrition_assets/png/dumbbell.png"
          width="26"
          height="26"
          className="transition ease-in-out group-hover:scale-110"
        />
        Find a Gym
      </Button>
      <Button
        color="default"
        variant="light"
        onPress={() => {
          router.push("/Home/Gold");
        }}
        className="mt-2 ml-2 text-white font-medium text-lg w-5/6 flex-start pt-2 hover:text-orange-500"
      >
        <Image
          src="/brotrition_assets/png/dollar.png"
          width="26"
          height="26"
          className="transition ease-in-out group-hover:scale-110"
        />
        BroTrition Gold
      </Button>
      <Button
        color="default"
        variant="light"
        onPress={() => {
          router.push("/Home/Support");
        }}
        className="mt-2 ml-2 pt-2 text-white font-medium text-lg w-5/6 flex-start hover:text-orange-500"
      >
        <Image
          src="/brotrition_assets/png/question_mark.png"
          width="27"
          height="27"
          className="transition ease-in-out group-hover:scale-110"
        />
        Support
      </Button>
      <Button
        color="default"
        variant="light"
        onPress={() => {
          router.push("/About");
        }}
        className="mt-2 ml-2 text-white font-medium text-lg w-5/6 flex-start pt-2 hover:text-orange-500"
      >
        <Image
          src="/brotrition_assets/png/i_logo.png"
          width="26"
          height="26"
          className="transition ease-in-out group-hover:scale-110"
        />
        About
      </Button>

      <Divider orientation="horizontal" className="my-2" />

      <Link href={"https://play.google.com/store/games?device=windows"}>
        <Image
          src="/brotrition_assets/svg/google-cropped.svg"
          width="110"
          height="110"
          alt="google"
          className="ml-7 mt-3"
        ></Image>
      </Link>
      <Link href={"https://www.apple.com/store"}>
        <Image
          src="/brotrition_assets/svg/apple-cropped.svg"
          width="110"
          height="120"
          alt="apple"
          className="ml-7 mt-1 mb-3"
        ></Image>
      </Link>

      <Divider orientation="horizontal" className="my-2" />

      <div className="grid grid-cols-4 px-4 ml-3 mt-3">
        <Link href={"https://www.facebook.com"}>
          <Image
            src="/brotrition_assets/svg/facebook.svg"
            width="30"
            height="30"
            alt="apple"
            className=""
          ></Image>
        </Link>
        <Link href={"https://www.instagram.com"}>
          <Image
            src="/brotrition_assets/svg/instagram.svg"
            width="30"
            height="30"
            alt="apple"
            className=""
          ></Image>
        </Link>
        <Link href={"https://www.youtube.com"}>
          <Image
            src="/brotrition_assets/svg/youtube.svg"
            width="30"
            height="30"
            alt="apple"
            className=""
          ></Image>
        </Link>
        <Link href={"https://www.reddit.com"}>
          <Image
            src="/brotrition_assets/svg/reddit.svg"
            width="30"
            height="30"
            alt="apple"
            className=""
          ></Image>
        </Link>
      </div>

      <Button
        color="success"
        radius="full"
        size="md"
        onPress={() => {
          router.push("/Home/Support");
        }}
        className="absolute bottom-0 left-0 mb-7 ml-7 mt-52 font-semibold"
      >
        <Image
          src="/brotrition_assets/svg/question-mark.svg"
          width="23"
          height="23"
        />
        Support
      </Button>
    </div>
  );
};

export default Sidebar;
