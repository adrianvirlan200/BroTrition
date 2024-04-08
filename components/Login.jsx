"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const Login = () => {
  return (
    <form className="text-center w-screen h-auto flex justify-center items-center">
      <div className="font-medium bg-white m-2 w-2/6 h-auto p-11 border-slate-200 border-1 shadow-2xl rounded-xl grid grid-cols-1 gap-8 content-center justify-center">
        <h1 className="text-center text-bold text-2xl">Welcome Back!</h1>

        <Input
          size="lg"
          type="email"
          label="Email"
          onSelect={handleSelect}
          onBlur={handleBlur}
          className="border-2 rounded-2xl border-slate-200"
        />

        <Input
          size={"lg"}
          type="password"
          label="Password"
          placeholder="Enter your password"
          className="border-2 rounded-2xl border-slate-200"
        />
        <div className="relative grid grid-cols-1 content-center px-20">
          <Button
            color="success"
            className="mb-3 border-2 border-green-600 text-bold text-xl font-bold"
          >
            LOG IN
          </Button>

          <Link color="blue" className="underline text-base text-bold" href="#">
            Forgot your password?
          </Link>
        </div>

        <div className="grid grid-cols-1 content-center">
          <p className="text-xl">Not yet a member?</p>
          <Link
            color="blue"
            className="underline text-base text-bold"
            href="/SignIn"
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
