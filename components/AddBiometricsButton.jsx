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
import { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const AddBiometricsButton = ({ onUpdate }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [date, setDate] = useState(new Date());
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [invalidWeight, setInvalidWeight] = useState(false);
  const [invalidHeight, setInvalidHeight] = useState(false);

  // const handleInsert = async () => {
  //   if (!weight || !height || isNaN(weight) || isNaN(height)) {
  //     setInvalidWeight(isNaN(weight) || weight === "");
  //     setInvalidHeight(isNaN(height) || height === "");
  //     return;
  //   }

  //   onOpenChange(false); // close the modal

  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/api/biometricsInsert",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           date,
  //           weight,
  //           height,
  //         }),
  //       }
  //     );

  //     if (response.ok) {
  //       onUpdate(); // send a signal to the parent component to update the table
  //     }
  //   } catch (error) {
  //     console.error("Catch block executed, Error:", error);
  //   }
  // };

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
              <ModalHeader className="flex flex-col gap-0 text-success-500">
                ADD BIOMETRICS
              </ModalHeader>

              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium">Date</label>
                    {/* <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      className="border-gray-300 border-2 rounded-xl p-2"
                    /> */}
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium">Weight (kg)</label>
                    <Input
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      isInvalid={invalidWeight}
                      variant="bordered"
                      placeholder="Enter your weight"
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium">Height (cm)</label>
                    <Input
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      isInvalid={invalidHeight}
                      variant="bordered"
                      placeholder="Enter your height"
                      className="w-full"
                    />
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="success" onPress={handleInsert} className="mb-0">
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
