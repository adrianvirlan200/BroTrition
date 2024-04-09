"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { Input } from "@nextui-org/react";
import { useState } from "react";

const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  return (
    <form className="text-center w-screen h-auto flex justify-center items-center">
      <div className="min-w-96 font-medium bg-white m-2 w-2/6 p-12 border-slate-200 border-1 shadow-2xl rounded-xl grid grid-cols-1 gap-8 content-center justify-center">
        <h1 className="text-center text-bold text-2xl">Welcome Back!</h1>
        <Input
          onChange={(e) => setLoginUsername(e.target.value)}
          name="email"
          type="email"
          label="Email"
          size="lg"
          className="border-2 rounded-2xl border-slate-200"
        />

        <Input
          onChange={(e) => setLoginPassword(e.target.value)}
          name="password"
          type="password"
          label="Password"
          size={"lg"}
          className="border-2 rounded-2xl border-slate-200"
        />
        <div className=" grid grid-cols-1 content-center px-20">
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
            href="/SignUp"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;