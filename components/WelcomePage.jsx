"use client";
import React from "react";
import { useRouter } from "next/navigation";

const WelcomePage = () => {
  const router = useRouter();
  const handleSignIn = () => {
    router.push("/Signup");
  };

  return (
    <div className="mx-16 w-full grid lg:grid-cols-[3fr_2fr] grid-cols-1 lg:gap-24 gap-6">
      {/* left text */}
      <div className="min-w-full min-h-5/6 grid grid-col-1 gap-1">
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

      {/* right youtube video player */}
      <div className="relative w-full max-w-4xl h-0 pb-[56.25%] mx-auto">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/SkJaRIX7c1k"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="h-56"></div>
    </div>
  );
};

export default WelcomePage;
