"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/embed/SkJaRIX7c1k"
  );

  const router = useRouter();
  const handleSignIn = () => {
    router.push("/Home");
  };

  return (
    <div className="lg:m-16 sm:m-32 sm:mt-64 h-56 grid lg:grid-cols-2 sm:grid-cols-1 gap-4 content-center">
      <div className="pr-[205px] grid grid-col-1 gap-1">
        <h1 className="text-5xl font-bold text-slate-900 decoration-6">
          Start your journey Here!
        </h1>
        <p1 className="text-3xl font-bold text-left text-slate-700 decoration-1">
          Keep track of your diet, exercise and health.
        </p1>
        <p2 className="text-3xl font-bold text-left text-slate-700 decoration-1">
          Join now! It's free!
        </p2>
        <button
          onClick={handleSignIn}
          className=" rounded-xl bg-gradient-to-tr from-pink-500 to-yellow-500 hover:bg-gradient-to-tr hover:from-red-600 hover:to-orange-500 text-white font-bold lg:text-4xl sm:4xl shadow-lg"
        >
          Sign In Now!
        </button>
      </div>

      <div className="">
        <iframe
          style={{ width: "600px", height: "400px" }}
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default SignIn;
