"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Button,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { DateInput, Checkbox } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

const AddBiometricsButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [wCheck, setWCheck] = useState(false);
  const [hCheck, setHCheck] = useState(false);
  const [invalidWeight, setInvalidWeight] = useState(false);
  const [invalidHeight, setInvalidHeight] = useState(false);
  const [isGrayedOut, setIsGrayedOut] = useState(false);

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
  const day = String(date.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  function validateHeight() {
    // Allow decimal heights and range from 50 to 272 cm (approx range of shortest to tallest recorded humans)
    const regex = /^[0-9]{2,3}(\.[0-9]{1})?$/;
    const value = parseFloat(height);
    const isValid = regex.test(height) && value >= 50 && value <= 272;

    if (isValid) {
      setInvalidHeight(false);
    } else {
      setInvalidHeight(true);
    }

    return;
  }
  function validateWeight() {
    // Allow decimal weights and range from 2 to 635 kg (approx range of lightest to heaviest recorded humans)
    const regex = /^[0-9]{1,3}(\.[0-9]{1})?$/;
    const value = parseFloat(weight);
    const isValid = regex.test(weight) && value >= 2 && value <= 635;

    if (isValid) {
      setInvalidWeight(false);
    } else {
      setInvalidWeight(true);
    }

    return;
  }
  useEffect(() => {
    validateHeight();
    validateWeight();
  }, [height, weight]);
  useEffect(() => {
    if (invalidHeight || invalidWeight || (!wCheck && !hCheck)) {
      setIsGrayedOut(true);
    } else {
      setIsGrayedOut(false);
    }
  }, [invalidHeight, invalidWeight, wCheck, hCheck]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/mainTable/modals/biometricsSearch",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setWeight(data.data.weight);
        setHeight(data.data.height);
      }

      if (data.data.status === 500) {
        console.log("Fatal Error");
        setWeight(0);
        setHeight(0);
      }
    } catch (error) {
      console.error("Catch block executed, Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleInsert = async () => {
    onOpenChange(false);
    console.log("Inserting Biometrics");
    console.log("Weight Checkbox: ", wCheck);
    console.log("Weight: ", weight);
    console.log("Height Checkbox: ", hCheck);
    console.log("Height: ", height);

    try {
      const response = await fetch(
        "http://localhost:3000/api/mainTable/modals/biometricsInsert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wCheck: wCheck,
            weight: weight,
            hCheck: hCheck,
            height: height,
          }),
        }
      );
    } catch (error) {
      console.error("Catch block executed, Error:", error);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        variant="light"
        color="secondary"
        className="text-lg font-medium"
      >
        ADD BIOMETRICS
      </Button>

      <Modal
        backdrop="blur"
        scrollBehavior={"outside"}
        placement="top"
        size={"lg"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-0 text-success-500 text-purple-600">
                ADD BIOMETRICS
              </ModalHeader>

              <ModalBody>
                <div className="content-centre w-32 grid grid-cols-[1fr_3fr_1fr] gap-4">
                  <h1 className="font-medium mt-3">Date</h1>
                  <DateInput
                    label={"Today"}
                    variant="underlined"
                    isReadOnly
                    defaultValue={parseDate(today)}
                  />
                  <div></div>

                  <h1 className="font-medium mt-3">Weight</h1>
                  <Input
                    placeholder={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    isInvalid={invalidWeight}
                    endContent="kg"
                    variant="underlined"
                    className="w-20"
                  />
                  <Checkbox
                    isSelected={wCheck}
                    onValueChange={setWCheck}
                  ></Checkbox>

                  <h1 className="font-medium mt-3">Height</h1>
                  <Input
                    placeholder={height}
                    onChange={(e) => setHeight(e.target.value)}
                    isInvalid={invalidHeight}
                    endContent="cm"
                    variant="underlined"
                    className="w-20"
                  />
                  <Checkbox
                    isSelected={hCheck}
                    onValueChange={setHCheck}
                  ></Checkbox>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="secondary"
                  isDisabled={isGrayedOut}
                  onPress={handleInsert}
                >
                  Add Biometrics
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBiometricsButton;
