"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  CheckboxGroup,
  Checkbox,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

function validatePassword(password, password2) {
  // Criteria:
  // Minimum 8 characters long
  // Contains at least one uppercase letter
  // Contains at least one lowercase letter
  // Contains at least one digit
  // Contains at least one special character
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

  return regex.test(password);
}

function validateNickname(nickname) {
  const regex = /^[a-zA-Z0-9._-]{3,20}$/;
  return regex.test(nickname);
}

function validateHeight(height) {
  // Allow decimal heights and range from 50 to 272 cm (approx range of shortest to tallest recorded humans)
  const regex = /^[0-9]{2,3}(\.[0-9]{1,2})?$/;
  const value = parseFloat(height);
  return regex.test(height) && value >= 50 && value <= 272;
}

function validateWeight(weight) {
  // Allow decimal weights and range from 2 to 635 kg (approx range of lightest to heaviest recorded humans)
  const regex = /^[0-9]{1,3}(\.[0-9]{1,2})?$/;
  const value = parseFloat(weight);
  return regex.test(weight) && value >= 2 && value <= 635;
}

const SignUp = () => {
  const router = useRouter();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRetypePassword, setRetypeRegisterPassword] = useState("");

  const [nickname, SetNickname] = useState("");
  const [selectedGender, setSelectedGender] = useState("not");
  const [height, SetHeight] = useState("");
  const [weight, SetWeight] = useState("");

  const [adsCheckbox, setAdsCheckbox] = useState(true);
  const [termsCheckbox, setTermsCheckbox] = useState(false);

  const [errMessage, setErrMessage] = useState("");
  const [emailColor, setEmailColor] = useState("border-slate-200");
  const [passwordColor, setPasswordColor] = useState("border-slate-200");

  const [specsError, setSpecsError] = useState("");
  const [nicknameColor, setNicknameColor] = useState("border-slate-200");
  const [weightColor, setWeightColor] = useState("border-slate-200");
  const [heightColor, setHeightColor] = useState("border-slate-200");

  const [formErrors, setFormErrors] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateEmail(registerEmail)) {
      setErrMessage("Invalid Email!");
      setEmailColor("border-red-700");
      setFormErrors("The Form has errors!");
      return;
    } else {
      setFormErrors("");
      setEmailColor("border-slate-200");
      setErrMessage("");
    }

    if (registerPassword !== registerRetypePassword) {
      setErrMessage("Passwords do not match!");
      setPasswordColor("border-red-700");
      setFormErrors("The Form has errors!");
      return;
    } else {
      setFormErrors("");
      setErrMessage("");
      setPasswordColor("border-slate-200");
    }

    if (!validatePassword(registerPassword)) {
      setErrMessage(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      setFormErrors("The Form has errors!");
      setPasswordColor("border-red-700");
      return;
    } else {
      setFormErrors("");
      setPasswordColor("border-slate-200");
      setErrMessage("");
    }

    if (!validateNickname(nickname)) {
      setSpecsError("Invalid nickname!");
      setNicknameColor("border-red-700");
      setFormErrors("The Form has errors!");
      return;
    } else {
      setFormErrors("");
      setSpecsError("");
      setNicknameColor("border-slate-200");
    }

    if (!validateHeight(height)) {
      setSpecsError("Invalid height!");
      setHeightColor("border-red-700");
      setFormErrors("The Form has errors!");
      return;
    } else {
      setFormErrors("");
      setSpecsError("");
      setHeightColor("border-slate-200");
    }

    if (!validateWeight(weight)) {
      setFormErrors("The Form has errors!");
      setSpecsError("Invalid weight!");
      setWeightColor("border-red-700");
      return;
    } else {
      setFormErrors("");
      setSpecsError("");
      setWeightColor("border-slate-200");
    }

    let finalGender = selectedGender;
    if (selectedGender === "not" || selectedGender === "mechanic") {
      finalGender = "";
    }

    const data = {
      email: registerEmail,
      password: registerPassword,
      nickname: nickname,
      gender: finalGender,
      height: height,
      weight: weight,
      ads: adsCheckbox,
    };

    console.log(data);

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
          router.push("/Login");
        } else {
          setErrMessage(
            "An error occurred while registering. Please try again."
          );
        }
      } else {
        const data = await response.json();
        console.log("NOT OKAY");
      }
    } catch (error) {
      console.error("catch block executed, Error:", error);
    }
  };

  return (
    <>
      <form className="text-center w-screen h-auto flex justify-center items-center">
        <div className="min-w-96 font-medium bg-white m-2 w-2/6 p-12 border-slate-200 border-1 rounded-xl grid grid-cols-1 gap-8">
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

      <div className="m-auto min-w-96 font-medium bg-white w-2/6 p-12 border-slate-200 border-1 rounded-xl">
        <h1 className="text-center text-bold text-2xl">
          Now tell us more about yourself 🤗
        </h1>
        <div className="grid grid-cols-1 gap-5 mt-10">
          <div className="grid grid-cols-2 mb-2">
            <div className="text-center py-5">
              <p1>Your Name</p1>
            </div>
            <div className="content-start">
              <Input
                onChange={(e) => SetNickname(e.target.value)}
                name="nickname"
                type="nickname"
                label="Nickname"
                placeholder="How should we call you?"
                size="lg"
                className={`border-2 rounded-2xl ${nicknameColor}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 mb-2">
            <div className="text-center py-5">
              <p1>Sex</p1>
            </div>
            <div className="content-start">
              <Select
                isRequired={true}
                onChange={(e) => setSelectedGender(e.target.value)}
                defaultSelectedKeys={["not"]}
                label="Select your gender"
                className="max-w-xs m-auto"
              >
                <SelectItem key="male" value="male">
                  Male
                </SelectItem>
                <SelectItem key="female" value="female">
                  Female
                </SelectItem>
                <SelectItem key="mechanic" value="mechanic">
                  Mechanic
                </SelectItem>
                <SelectItem key="not" value="not">
                  Prefer to not say
                </SelectItem>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mb-2">
          <div className="text-center py-5">
            <p1>Height</p1>
          </div>
          <div className="content-start">
            <Input
              onChange={(e) => SetHeight(e.target.value)}
              name="name"
              type="name"
              label="Cm"
              placeholder="Enter your height in cm"
              size="lg"
              className={`border-2 rounded-2xl ${heightColor}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 mb-2">
          <div className="text-center py-5">
            <p1>Weight</p1>
          </div>
          <div className="content-start">
            <Input
              onChange={(e) => SetWeight(e.target.value)}
              name="name"
              type="name"
              label="Kg"
              placeholder="Enter your weight in kg"
              size="lg"
              className={`border-2 rounded-2xl ${weightColor}`}
            />
          </div>
        </div>

        <p1 className="ml-8 text-red-600">{specsError}</p1>
      </div>

      <div className=" content-center mt-2 mx-auto min-w-96 font-medium bg-white w-2/6 p-12 border-slate-200 border-1 rounded-xl">
        <h1 className="text-center text-bold text-2xl mb-5">
          Terms and services
        </h1>
        <div className="grid grid-cols-1 gap-5 content-center">
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
            You agree to receive Personalized Ads and Promotions from BroTrition
          </Checkbox>
        </div>
        <p className="mt-5 mb-0 justify-self-start right-14 bottom-7 text-red-700 text-sm">
          {formErrors}
        </p>
        <Button
          isDisabled={!termsCheckbox}
          onClick={handleRegister}
          color="danger"
          className="mx-auto mt-8 border-2 border-red-700 text-bold text-xl font-bold flex justify-center"
        >
          SIGN UP
        </Button>
      </div>
    </>
  );
};

export default SignUp;
