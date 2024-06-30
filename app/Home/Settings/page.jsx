"use client";
import { Input, Button, Divider, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

const Settings = () => {
  const [data, setData] = useState({
    email: "",
    password: "************",
    validatePassword: "************",
    birthYear: 0,
    username: "",
  });

  const [name, setName] = useState("");
  const [password, setPassword] = useState("************");
  const [password2, setPassword2] = useState("************");
  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState("No changes made yet");
  const [color, setColor] = useState("bg-gray-100");

  const [updateData, setUpdateData] = useState();

  const handleNameChange = async (e) => {
    const regex = /^[a-zA-Z0-9._-]{3,20}$/;
    const isValid = regex.test(name);

    if (isValid) {
      const response = await fetch("/api/personalData/update/name", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name }),
      });

      if (response.ok && response.status == 200) {
        setName("");
        setUpdateData(name);
        setMessage("Name updated successfully");
        setColor("bg-green-600");
      } else {
        setMessage("Error: Something went wrong");
        setColor("bg-red-600");
      }
    } else {
      setMessage("Error: Invalid name");
      setColor("bg-red-600");
    }
  };

  const handlePasswordChange = async (e) => {
    // Criteria:
    // Minimum 8 characters long
    // Contains at least one uppercase letter
    // Contains at least one lowercase letter
    // Contains at least one digit
    // Contains at least one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    const isValid = regex.test(password);

    if (isValid && password === password2) {
      const response = await fetch("/api/personalData/update/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password }),
      });

      if (response.ok && response.status == 200) {
        setMessage("Password updated successfully");
        setColor("bg-green-600");
        setUpdateData(password);
      } else {
        setMessage("Error: Something went wrong");
        setColor("bg-red-600");
      }
    } else {
      if (!isValid) {
        setMessage("Error: Password does not meet criteria");
      } else {
        setMessage("Error: Passwords do not match");
      }
      setColor("bg-red-600");
    }
  };

  const handleGoalChange = async () => {
    if (goal === "") {
      console.log("Error: No goal selected");
      return;
    }

    const response = await fetch("/api/personalData/update/goal", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goal: goal }),
    });

    if (response.ok && response.status == 200) {
      setMessage("Goal updated successfully");
      setColor("bg-green-600");
      setUpdateData(goal);
    } else {
      setMessage("Error: Something went wrong");
      setColor("bg-red-600");
    }
  };

  const getPersonalData = async () => {
    const response = await fetch("/api/personalData/fetch", {
      method: "GET",
    });

    if (response.ok) {
      const data_ = await response.json();
      setData(data_.data);
    }
  };

  useEffect(() => {
    getPersonalData();
  }, [updateData]);

  return (
    <div>
      <h1 className="font-bold text-3xl mb-4">Settings</h1>
      <p className="mb-4">
        Change information about your account and manage your privacy settings.
      </p>

      <div className={`${color} mb-4 p-2 pl-3 rounded-xl`}>{message}</div>

      <Divider className="my-8" />

      <div className="grid grid-cols-[2fr_1fr] gap-2 content-center">
        <Input
          label="nickname"
          placeholder={data.username}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          color="success"
          className="self-center"
          onPressEnd={handleNameChange}
        >
          Save
        </Button>
      </div>

      <Divider className="my-8" />

      <div className="grid grid-cols-[2fr_1fr] gap-2">
        <Input
          type="password"
          label="Password"
          placeholder="*************"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          color="success"
          className="self-center"
          onPress={handlePasswordChange}
        >
          Save
        </Button>
        <Input
          type="password"
          label="Validate Password"
          placeholder="*************"
          onChange={(e) => setPassword2(e.target.value)}
        />
      </div>

      <Divider className="my-8" />

      <div className="grid grid-cols-[2fr_1fr] gap-2">
        <div>
          <p1 className="text-start my-auto mr-11">Change goal</p1>
          {data.goal && (
            <Select
              key={data.goal} // Force re-render when goal_ changes
              variant="bordered"
              defaultSelectedKeys={[data.goal]}
              label="Goal"
              onChange={(e) => setGoal(e.target.value)}
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
          )}
        </div>
        <Button
          color="success"
          className="self-center"
          onPress={handleGoalChange}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Settings;
