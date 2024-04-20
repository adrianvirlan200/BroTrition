"use client";
import { Button, CheckboxGroup, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

function validatePassword(password) {
  // Criteria:
  // Minimum 8 characters long
  // Contains at least one uppercase letter
  // Contains at least one lowercase letter
  // Contains at least one digit
  // Contains at least one special character
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

  return regex.test(password);
}

const SignUp = () => {
  const router = useRouter();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRetypePassword, setRetypeRegisterPassword] = useState("");

  const [adsCheckbox, setAdsCheckbox] = useState(true);
  const [termsCheckbox, setTermsCheckbox] = useState(false);

  const [errMessage, setErrMessage] = useState("");
  const [emailColor, setEmailColor] = useState("border-slate-200");
  const [passwordColor, setPasswordColor] = useState("border-slate-200");

  const handleRegister = async (e) => {
    // if (!validateEmail(registerEmail)) {
    //   setErrMessage("Invalid Email!");
    //   setEmailColor("border-red-700");
    //   return;
    // } else {
    //   setEmailColor("border-slate-200");
    //   setErrMessage("");
    // }

    // if (registerPassword !== registerRetypePassword) {
    //   setErrMessage("Passwords do not match!");
    //   setPasswordColor("border-red-700");
    //   console.log(errMessage);
    //   return;
    // } else {
    //   setErrMessage("");
    //   setPasswordColor("border-slate-200");
    // }

    // if (!validatePassword(registerPassword)) {
    //   setErrMessage(
    //     "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    //   );
    //   setPasswordColor("border-red-700");
    //   return;
    // } else {
    //   setPasswordColor("border-slate-200");
    //   setErrMessage("");
    // }
    e.preventDefault();

    const data = { email: registerEmail, password: registerPassword };

    try {
      const response = await fetch("http://localhost:3000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.status === 500) {
          setErrMessage("User already exists. Please log in.");
          return;
        } else if (data.status === 201) {
          setErrMessage("");
          console.log("Registration successful");
          router.push("/Home");
        } else {
          setErrMessage(
            "An error occurred while registering. Please try again."
          );
        }
      } else {
        const data = await response.json();
        console.log("NOT OKAY, data: ", data);
      }
    } catch (error) {
      console.error("catch block executed, Error:", error);
    }
  };

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
          className={`border-2 rounded-2xl ${emailColor}`}
        />
        <Input
          onChange={(e) => setRegisterPassword(e.target.value)}
          name="password"
          type="password"
          label="Password"
          size={"lg"}
          className={`border-2 rounded-2xl ${passwordColor}`}
        />
        <Input
          onChange={(e) => setRetypeRegisterPassword(e.target.value)}
          name="retype_password"
          type="password"
          label="Validate Password"
          size={"lg"}
          className={`border-2 rounded-2xl ${passwordColor}`}
        />
        <p className="justify-self-start right-14 bottom-7 text-red-700 text-sm">
          {errMessage}
        </p>
        <div className="static grid grid-cols-1 gap-2 content-stretch">
          <Checkbox
            onChange={() => setTermsCheckbox(!termsCheckbox)}
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
            onChange={() => setAdsCheckbox(!adsCheckbox)}
            defaultSelected={true}
            color="success"
            value="promotions"
            className=""
          >
            You agree to receive Promotions from BroTrition
          </Checkbox>
        </div>
        <Button
          isDisabled={!termsCheckbox}
          onClick={handleRegister}
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
            href="/Login"
          >
            Log In!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
