"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { set } from "mongoose";

const Login = () => {
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [borderColor, setBorderColor] = useState("border-slate-200");

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email: loginEmail,
      password: loginPassword,
      redirect: false,
      //callback: "/Home",
    });

    if (result.error) {
      setError("Invalid email or password");
      setBorderColor("border-red-500");
    } else {
      setError("");
      setBorderColor("border-slate-200");
    }
  };

  return (
    <div className="text-center w-screen h-auto flex justify-center items-center">
      <div className="min-w-96 font-medium bg-white m-2 w-2/6 p-12 border-slate-200 border-1 shadow-2xl rounded-xl grid grid-cols-1 gap-8 content-center justify-center">
        <h1 className="text-center text-bold text-2xl">Welcome Back!</h1>
        <Input
          onChange={(e) => setLoginEmail(e.target.value)}
          name="email"
          type="email"
          label="Email"
          size="lg"
          className={`border-2 rounded-2xl ${borderColor}`}
        />

        <Input
          onChange={(e) => setLoginPassword(e.target.value)}
          name="password"
          type="password"
          label="Password"
          size={"lg"}
          className={`border-2 rounded-2xl ${borderColor}`}
        />

        <p className="justify-self-start right-14 bottom-7 text-red-700 text-sm">
          {error}
        </p>

        <div className=" grid grid-cols-1 content-center px-20">
          <Button
            onClick={handleLogin}
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
            href="/Signup"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
