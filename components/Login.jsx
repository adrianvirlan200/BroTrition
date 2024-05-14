"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email: loginEmail,
      password: loginPassword,
      redirect: false,
    });

    if (result.error) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
      router.push("Home");
    }
  };

  return (
    <div className="mb-24 text-center w-screen h-auto flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="min-w-96 font-medium bg-white m-2 w-2/6 p-12 border-slate-200 border-1 shadow-2xl rounded-xl grid grid-cols-1 gap-8 content-center justify-center"
      >
        <h1 className="text-center text-bold text-2xl">Welcome Back!</h1>
        <Input
          autoFocus
          onChange={(e) => setLoginEmail(e.target.value)}
          isInvalid={isInvalid}
          color={isInvalid ? "error" : "default"}
          name="email"
          type="email"
          label="Email"
          size="lg"
          variant="bordered"
        />

        <Input
          onChange={(e) => setLoginPassword(e.target.value)}
          isInvalid={isInvalid}
          errorMessage={isInvalid && "Invalid email or password"}
          color={isInvalid ? "error" : "default"}
          name="password"
          type="password"
          label="Password"
          size={"lg"}
          variant="bordered"
        />

        <div className=" grid grid-cols-1 content-center px-20">
          <Button
            onClick={handleLogin}
            color="success"
            type="submit"
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
      </form>
    </div>
  );
};

export default Login;
