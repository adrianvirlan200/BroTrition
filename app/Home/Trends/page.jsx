"use client";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import WeightGraphCard from "@components/WeightGraphCard";

const Trends = () => {
  const router = useRouter();

  return (
    <div className="p-4">
      <h className="text-3xl font-semibold">Charts</h>
      <p className="text-xl">Analyze and Review you progress </p>

      <div className="relative my-5 p-3 bg-amber-200 flex border-1 border-gray-300 rounded-xl shadow-md">
        <Image
          src="/brotrition_assets/svg/chart.svg"
          width="60"
          height="60"
          alt="Medal"
          className=""
        />
        <div className="m-2 ml-6">
          <h className="text-xl font-bold">Gain valuable insights with Gold!</h>
          <p className="">
            Get access to personalized stats and exclusive features.
          </p>
        </div>

        <Button
          color="warning"
          onPress={() => {
            router.push("/Home/Gold");
          }}
          className="font-semibold absolute bottom-4 right-4 "
        >
          Learn More
        </Button>
      </div>

      <WeightGraphCard />
    </div>
  );
};

export default Trends;
