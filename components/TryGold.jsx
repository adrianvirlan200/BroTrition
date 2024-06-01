"use client";
import Image from "next/image";
import { Divider, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const TryGold = () => {
  const router = useRouter();

  return (
    <div className="border-1 border-gray-200 rounded-xl p-2">
      <div className="grid grid-cols-[1fr_2fr]">
        <Image
          src="/brotrition_assets/svg/medal-yellow.svg"
          width="80"
          height="80"
          alt="Medal"
          className=""
        />

        <div>
          <h1 className="text-2xl font-bold">Try out</h1>
          <span className="text-xl font-bold green_gradient">BroTrition </span>
          <span className="text-xl font-bold orange_gradient">Gold</span>
        </div>
      </div>

      <Divider className="my-2" />

      <div>
        <h className="font-medium text-lg">Our premium version</h>
        <p>
          Get access to advanced features like custom meal plans, workout
          routines, and much more!
        </p>
        <Button
          color="success"
          className="font-semibold mt-3"
          onPress={() => {
            router.push("/Home/Gold");
          }}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default TryGold;
