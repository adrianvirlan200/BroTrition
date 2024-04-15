"use client";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRetypePassword, setRetypeRegisterPassword] = useState("");

  // const register = () => {
  //   axios({
  //     method: "post",
  //     url: "http://localhost:3001/SignUp",
  //     withCredentials: true,
  //     data: {
  //       email: registerEmail,
  //       password: registerPassword,
  //     },
  //   })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  return (
    <form className="text-center w-screen h-auto flex justify-center items-center">
      <div className="min-w-96 font-medium bg-white m-2 w-2/6 p-12 border-slate-200 border-1 shadow-2xl rounded-xl grid grid-cols-1 gap-8">
        <h1 className="text-center text-bold text-2xl">
          Create your account for Free
        </h1>
        <Input
          onChange={(e) => setRegisterEmail(e.target.value)}
          name="email"
          type="email"
          label="Email"
          size="lg"
          className="border-2 rounded-2xl border-slate-200"
        />
        <Input
          onChange={(e) => setRegisterPassword(e.target.value)}
          name="password"
          type="password"
          label="Password"
          size={"lg"}
          className="border-2 rounded-2xl border-slate-200"
        />
        <Input
          onChange={(e) => setRetypeRegisterPassword(e.target.value)}
          name="retype_password"
          type="password"
          label="Validate Password"
          size={"lg"}
          className="border-2 rounded-2xl border-slate-200"
        />
        <div className="static grid grid-cols-1 gap-2 content-stretch">
          <Checkbox
            required={true}
            value="termsAndCond"
            color="success"
            className=""
          >
            You agree to{" "}
            <a href="#" className="underline text-bold">
              BroTrition's Terms and Conditions
            </a>
          </Checkbox>
          <Checkbox
            defaultSelected={true}
            color="success"
            value="promotions"
            className=""
          >
            You agree to receive Promotions from BroTrition
          </Checkbox>
        </div>
        <Button
          //onClick={register}
          color="danger"
          className="mx-auto border-2 border-red-700 text-bold text-xl font-bold flex justify-center"
        >
          SIGN UP
        </Button>
        <div className="grid grid-cols-1 content-center">
          <p className="text-xl">Already a member?</p>
          <Link
            color="blue"
            className="underline text-base text-bold"
            href="/login"
          >
            Log In!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
