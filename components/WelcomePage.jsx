"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const WelcomePage = () => {
  const router = useRouter();
  const handleSignIn = () => {
    router.push("/Signup");
  };

  return (
    <div className="mx-16 mb-48 h-full grid lg:grid-cols-[3fr_2fr] sm:grid-cols-1 lg:gap-24 sm:gap-6 content-center">
      <div className="grid grid-col-1 gap-1">
        <h1 className="text-5xl font-bold text-slate-900 decoration-6">
          Start your journey Here!
        </h1>
        <p1 className="text-3xl font-bold text-left text-slate-700 decoration-1">
          Keep track of your diet, exercise and health.
        </p1>
        <p2 className="text-3xl font-bold text-left text-slate-700 decoration-1">
          Join us! It's free!
        </p2>
        <button
          onClick={handleSignIn}
          className="max-w-lg min-h-12 rounded-xl bg-gradient-to-tr from-pink-500 to-yellow-500 hover:bg-gradient-to-tr hover:from-red-600 hover:to-orange-500 text-white font-bold lg:text-4xl sm:4xl shadow-lg"
        >
          Sign Up Now
        </button>
      </div>

      <div className="">
        <iframe
          style={{ width: "600px", height: "400px" }}
          src={"https://www.youtube.com/embed/SkJaRIX7c1k"}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default WelcomePage;
