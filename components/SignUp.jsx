"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";

const SignUp = () => {
  const router = useRouter();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRetypePassword, setRetypeRegisterPassword] = useState("");

  const [nickname, SetNickname] = useState("");
  const [goal, setGoal] = useState("maintain");
  const [lifestyle, setLifestyle] = useState("lightly"); // [sedentary, lightly, moderately, very, extra
  const [yearOfBirth, setYearOfBirth] = useState("2000");
  const [selectedGender, setSelectedGender] = useState("not");
  const [height, SetHeight] = useState("");
  const [weight, SetWeight] = useState("");

  const [adsCheckbox, setAdsCheckbox] = useState(true);
  const [termsCheckbox, setTermsCheckbox] = useState(false);

  const [isGrayedOut, setIsGrayedOut] = useState(true);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvalidRetypePassword, setIsInvalidRetypePassword] = useState(false);
  const [isInvalidNickname, setIsInvalidNickname] = useState(false);
  const [isInvalidHeight, setIsInvalidHeight] = useState(false);
  const [isInvalidWeight, setIsInvalidWeight] = useState(false);
  const [isInvalidGoal, setIsInvalidGoal] = useState(false);
  const [isInvalidLifestyle, setIsInvalidLifestyle] = useState(false);
  const [isInvalidYearOfBirth, setIsInvalidYearOfBirth] = useState(false);
  const [isInvalidGender, setIsInvalidGender] = useState(false);

  const [userExists, setUserExists] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 1960; i <= currentYear; i++) {
    years.push(i.toString());
  }

  function validateEmail() {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isValid = regex.test(registerEmail);

    if (isValid) {
      setIsInvalidEmail(false);
    } else {
      setIsInvalidEmail(true);
    }

    return;
  }
  function validatePassword() {
    // Criteria:
    // Minimum 8 characters long
    // Contains at least one uppercase letter
    // Contains at least one lowercase letter
    // Contains at least one digit
    // Contains at least one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    const isValid = regex.test(registerPassword);

    if (isValid) {
      setIsInvalidPassword(false);
    } else {
      setIsInvalidPassword(true);
    }

    return;
  }
  function validateRetypePassword() {
    if (registerPassword === registerRetypePassword) {
      setIsInvalidRetypePassword(false);
    } else {
      setIsInvalidRetypePassword(true);
    }

    return;
  }
  function validateNickname() {
    const regex = /^[a-zA-Z0-9._-]{3,20}$/;
    const isValid = regex.test(nickname);

    if (isValid) {
      setIsInvalidNickname(false);
    } else {
      setIsInvalidNickname(true);
    }

    return;
  }
  function validateHeight() {
    // Allow decimal heights and range from 50 to 272 cm (approx range of shortest to tallest recorded humans)
    const regex = /^[0-9]{2,3}(\.[0-9]{1})?$/;
    const value = parseFloat(height);
    const isValid = regex.test(height) && value >= 50 && value <= 272;

    if (isValid) {
      setIsInvalidHeight(false);
    } else {
      setIsInvalidHeight(true);
    }

    return;
  }
  function validateWeight() {
    // Allow decimal weights and range from 2 to 635 kg (approx range of lightest to heaviest recorded humans)
    const regex = /^[0-9]{1,3}(\.[0-9]{1})?$/;
    const value = parseFloat(weight);
    const isValid = regex.test(weight) && value >= 20 && value <= 635;

    if (isValid) {
      setIsInvalidWeight(false);
    } else {
      setIsInvalidWeight(true);
    }

    return;
  }
  function validateGoal() {
    if (goal === "" || goal === undefined || goal === null) {
      setIsInvalidGoal(true);
    } else {
      setIsInvalidGoal(false);
    }

    return;
  }
  function validateLifestyle() {
    if (lifestyle === "" || lifestyle === undefined || lifestyle === null) {
      setIsInvalidLifestyle(true);
    } else {
      setIsInvalidLifestyle(false);
    }

    return;
  }
  function validateYearOfBirth() {
    if (years.includes(yearOfBirth)) {
      setIsInvalidYearOfBirth(false);
    } else {
      setIsInvalidYearOfBirth(true);
    }

    return;
  }
  function validateGender() {
    if (
      selectedGender === "" ||
      selectedGender === undefined ||
      selectedGender === null
    ) {
      setIsInvalidGender(true);
    } else {
      setIsInvalidGender(false);
    }
  }

  // The status of submit button
  useEffect(() => {
    if (
      !isInvalidEmail &&
      registerEmail !== "" &&
      !isInvalidPassword &&
      registerPassword !== "" &&
      !isInvalidRetypePassword &&
      registerRetypePassword !== "" &&
      !isInvalidNickname &&
      nickname !== "" &&
      !isInvalidGoal &&
      goal !== "" &&
      !isInvalidLifestyle &&
      lifestyle !== "" &&
      !isInvalidYearOfBirth &&
      yearOfBirth !== "" &&
      !isInvalidGender &&
      selectedGender !== "" &&
      !isInvalidHeight &&
      height !== "" &&
      !isInvalidWeight &&
      weight !== "" &&
      termsCheckbox
    ) {
      setIsGrayedOut(false);
    } else {
      setIsGrayedOut(true);
    }
  }, [
    isInvalidEmail,
    isInvalidPassword,
    isInvalidRetypePassword,
    isInvalidNickname,
    isInvalidGoal,
    isInvalidLifestyle,
    isInvalidYearOfBirth,
    isInvalidGender,
    isInvalidHeight,
    isInvalidWeight,
    termsCheckbox,
  ]);

  useEffect(() => {
    validateGoal();
    validateLifestyle();
    validateYearOfBirth();
    validateGender();
  }, [goal, lifestyle, yearOfBirth, selectedGender]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      email: registerEmail,
      password: registerPassword,
      nickname: nickname,
      goal: goal,
      lifestyle: lifestyle,
      yearOfBirth: yearOfBirth,
      gender: selectedGender,
      height: height,
      weight: weight,
      ads: adsCheckbox,
    };

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

        if (data.status === 501) {
          setUserExists(true);
          return;
        } else if (data.status === 201) {
          setUserExists(false);
          console.log("Registration successful");
          router.push("/Login");
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
    <div className="mb-16">
      <form className="text-center w-screen h-auto flex justify-center items-center">
        <div className="min-w-96 font-medium bg-white m-2 w-2/6 p-12 border-slate-200 border-1 rounded-xl grid grid-cols-1 gap-8">
          <h1 className="text-center text-bold text-2xl">
            Create your account for Free
          </h1>
          <Input
            autoFocus
            onChange={(e) => setRegisterEmail(e.target.value)}
            onBlur={validateEmail}
            name="email"
            type="email"
            label="Email"
            size="lg"
            variant="bordered"
            isInvalid={isInvalidEmail}
            color={isInvalidEmail ? "error" : "default"}
            errorMessage={isInvalidEmail && "Invalid email address"}
          />
          <Input
            onChange={(e) => setRegisterPassword(e.target.value)}
            onBlur={validatePassword}
            name="password"
            type="password"
            label="Password"
            size={"lg"}
            variant="bordered"
            isInvalid={isInvalidPassword}
            errorMessage={
              isInvalidPassword &&
              "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
            }
            color={isInvalidPassword ? "error" : "default"}
          />
          <Input
            onChange={(e) => setRetypeRegisterPassword(e.target.value)}
            onBlur={validateRetypePassword}
            name="retype_password"
            type="password"
            label="Validate Password"
            size={"lg"}
            isInvalid={isInvalidRetypePassword}
            variant="bordered"
            errorMessage={isInvalidRetypePassword && "Passwords do not match"}
            color={isInvalidRetypePassword ? "error" : "default"}
          />

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
        <div className="grid grid-cols-2 gap-5 mt-8">
          <p1 className="text-start my-auto">Your Name</p1>
          <Input
            onChange={(e) => SetNickname(e.target.value)}
            onBlur={validateNickname}
            name="nickname"
            type="nickname"
            label="Nickname"
            size="sm"
            variant="underlined"
            isInvalid={isInvalidNickname}
            errorMessage={isInvalidNickname && "Invalid nickname"}
            color={isInvalidNickname ? "error" : "default"}
          />

          <p1 className="text-start my-auto">Your Goal</p1>
          <Select
            variant="bordered"
            isInvalid={isInvalidGoal}
            onChange={(e) => setGoal(e.target.value)}
            defaultSelectedKeys={[goal]}
            label="Goal"
            className="max-w-xs m-auto"
          >
            <SelectItem key="maintain" value="maintain">
              Maintain weight
            </SelectItem>
            <SelectItem key="gain" value="gain">
              Gain weight
            </SelectItem>
            <SelectItem key="lose" value="lose">
              Lose weight
            </SelectItem>
          </Select>

          <p1 className="text-start my-auto">How active are you?</p1>
          <Select
            variant="bordered"
            isInvalid={isInvalidLifestyle}
            onChange={(e) => setLifestyle(e.target.value)}
            defaultSelectedKeys={[lifestyle]}
            label="Lifestyle"
            className="max-w-xs m-auto"
          >
            <SelectItem key="sedentary" value="male">
              Sedentary
            </SelectItem>
            <SelectItem key="lightly" value="lightly">
              Lightly active
            </SelectItem>
            <SelectItem key="moderately" value="moderately">
              Moderately active
            </SelectItem>
            <SelectItem key="very" value="very">
              Very active
            </SelectItem>
            <SelectItem key="extra" value="extra">
              Extra active
            </SelectItem>
          </Select>

          <p1 className="text-start my-auto">Year of Birth</p1>
          <Select
            variant="bordered"
            isInvalid={isInvalidYearOfBirth}
            onChange={(e) => setYearOfBirth(e.target.value)}
            defaultSelectedKeys={[yearOfBirth]}
            label="Birth Year"
            className="max-w-xs m-auto"
          >
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </Select>

          <p1 className="text-start my-auto">Sex</p1>
          <Select
            variant="bordered"
            isInvalid={isInvalidGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            defaultSelectedKeys={[selectedGender]}
            label="Gender"
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

          <p1 className="text-start my-auto">Height</p1>
          <Input
            onChange={(e) => SetHeight(e.target.value)}
            onBlur={validateHeight}
            name="name"
            type="name"
            label="Cm"
            size="sm"
            variant="underlined"
            isInvalid={isInvalidHeight}
            errorMessage={isInvalidHeight && "Invalid height"}
            color={isInvalidHeight ? "error" : "default"}
          />

          <p1 className="text-start my-auto">Weight</p1>
          <Input
            onChange={(e) => SetWeight(e.target.value)}
            onBlur={validateWeight}
            name="name"
            type="name"
            label="Kg"
            size="sm"
            variant="underlined"
            isInvalid={isInvalidWeight}
            errorMessage={isInvalidWeight && "Invalid weight"}
            color={isInvalidWeight ? "error" : "default"}
          />
        </div>
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
          >
            You agree to receive Personalized Ads and Promotions from BroTrition
          </Checkbox>
        </div>

        {userExists && (
          <div className="my-5">
            <p className="text-red-500">
              User already exists. Please{" "}
              <a href="/Login" className="underline font-bold">
                Log in.
              </a>
            </p>
          </div>
        )}

        <Button
          isDisabled={isGrayedOut}
          onClick={handleRegister}
          color="danger"
          className="mx-auto mt-8 border-2 border-red-700 text-xl font-bold flex justify-center"
        >
          SIGN UP
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
