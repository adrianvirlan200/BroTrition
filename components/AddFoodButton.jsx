"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  CheckboxGroup,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  Button,
} from "@nextui-org/react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

import { useState, useEffect } from "react";
import Image from "next/image";

const AddFoodButton = ({ onUpdate }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [servingSize, setServingSize] = useState(100);
  const [invalidServingSize, setInvalidServingSize] = useState(false);
  const [isGrayedOut, setIsGrayedOut] = useState(true);
  const [selectedRow, setSelectedRow] = useState({
    Id: 0,
    Category: "",
    Description: "",
    Calories: 0,
    Protein: 0,
    Carbohydrate: 0,
    Total_Lipid: 0,
    ProteinPercentage: 0,
    CarbohydratePercentage: 0,
    Total_LipidPercentage: 0,
  });
  const [reference, setReference] = useState(selectedRow);

  //data in the macronutrients chart
  const data_chart = {
    labels: ["Proteins", "Carbs", "Fats"],
    datasets: [
      {
        data: [
          selectedRow.Protein,
          selectedRow.Carbohydrate,
          selectedRow.Total_Lipid,
        ],

        backgroundColor: [
          "rgba(68,208,123,0.5)",
          "rgba(28,202,215,0.5)",
          "rgba(234,59,4,0.5)",
        ],
        borderColor: [
          "rgba(68,208,123,0.8)",
          "rgba(28,202,215,0.8)",
          "rgba(234,59,4,0.8)",
        ],
        borderWidth: 2,
      },
    ],
  };

  //handles the backend requests for searching the food
  const handleSearching = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/mainTable/modals/foodSearchTable",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchBoxValue,
          }),
        }
      );

      if (response.ok) {
        const _data = await response.json();

        if (_data.status === 201) {
          setData(_data.data);
          setIsLoading(false);
        } else {
          console.log("Fatal Error;");
        }
      }
    } catch (error) {
      console.error("Catch block executed, Error:", error);
    }
  };

  //search the food to find and save
  //all data of the current selected row
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      handleSearching();
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchBoxValue]);

  const handleChart = (itemId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].Id == itemId) {
        setSelectedRow(data[i]);
        setReference(data[i]);
        break;
      }
    }
  };

  //change of the macronutrients in regard with the serving size
  useEffect(() => {
    const regex = /^[0-9]+$/;
    if (!regex.test(servingSize)) {
      setInvalidServingSize(true);
      setIsGrayedOut(true);
      return;
    } else {
      setInvalidServingSize(false);
      if (reference.Id != 0) setIsGrayedOut(false);
    }

    setSelectedRow({
      Id: reference.Id,
      Category: reference.Category,
      Description: reference.Description,
      Calories: Math.trunc((reference.Calories * servingSize) / 10) / 10,
      Protein: Math.trunc((reference.Protein * servingSize) / 10) / 10,
      Carbohydrate:
        Math.trunc((reference.Carbohydrate * servingSize) / 10) / 10,
      Total_Lipid: Math.trunc((reference.Total_Lipid * servingSize) / 10) / 10,
      ProteinPercentage: reference.ProteinPercentage,
      CarbohydratePercentage: reference.CarbohydratePercentage,
      Total_LipidPercentage: reference.Total_LipidPercentage,
    });
  }, [servingSize, reference]);

  //make a request to insert the data into the database
  const handleInsert = async () => {
    onOpenChange(false); // close the modal

    try {
      const response = await fetch(
        "http://localhost:3000/api/mainTable/modals/foodInsert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: servingSize,
            foodId: reference.Id,
          }),
        }
      );

      if (response.ok) {
        onUpdate(); // send a signal to the parent component to update the table
      }
    } catch (error) {
      console.error("Catch block executed, Error:", error);
    }
  };

  // this useEffect updates the state of the Add food button
  // to be grayed out if the serving size is invalid
  // it also takes into account the reference state(
  //it doesn't override the state when no reference is selected)
  useEffect(() => {
    if (reference.Id != 0)
      if (invalidServingSize) setIsGrayedOut(true);
      else setIsGrayedOut(false);
  }, [reference]);

  return (
    <>
      <Button
        onPress={onOpen}
        variant="light"
        color="success"
        className="end text-lg font-medium"
      >
        ADD FOOD
      </Button>

      <Modal
        backdrop="blur"
        scrollBehavior={"outside"}
        placement="top"
        size={"3xl"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-0 text-success-500">
                ADD FOOD
              </ModalHeader>

              <ModalBody>
                <Input
                  autoFocus
                  onChange={(e) => setSearchBoxValue(e.target.value)}
                  placeholder="Search all foods & ingredients & recipes..."
                  startContent={
                    <Image
                      src="/brotrition_assets/svg/search_logo.svg"
                      width="0"
                      height="0"
                      alt="search logo"
                      className="w-5 h-auto"
                    />
                  }
                  endContent={
                    <Button
                      onPress={handleSearching}
                      color="default"
                      variant=""
                      className="rounded-none border-l-2 border-l-slate-300 text-sm font-medium"
                    >
                      Search
                    </Button>
                  }
                  className="border-gray-300 border-2 rounded-xl"
                ></Input>

                <Table
                  isStriped
                  selectionMode="single"
                  onRowAction={(row) => handleChart(row)}
                  //color="success"
                  aria-label="Chose an aliment to add to your meal."
                  classNames={{
                    base: "max-h-[225px] overflow-scroll",
                  }}
                  className="w-full border-gray-300 border-2 rounded-2xl font-medium scrollbar-hide"
                >
                  <TableHeader>
                    <TableColumn key="name">Name</TableColumn>
                    <TableColumn key="description">Description</TableColumn>
                    <TableColumn key="calories">Calories/100g</TableColumn>
                  </TableHeader>

                  <TableBody
                    loadingContent={<Spinner color="success" size="lg" />}
                    isLoading={isLoading}
                    emptyContent={"Type something to search."}
                    items={data}
                  >
                    {(item) => (
                      <TableRow key={item.Id}>
                        <TableCell>{item.Category}</TableCell>
                        <TableCell>{item.Description}</TableCell>
                        <TableCell>{item.Calories}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                <div className="border-gray-300 border-2 rounded-2xl p-3">
                  <div className="min-h-12 border-b-2 border-b-gray-300">
                    <h1 className="flex-center text-lg font-bold">
                      {reference.Category}
                    </h1>
                    <p className="mb-2">
                      <span className="flex-center text-sm">
                        {reference.Description}
                      </span>{" "}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 mt-1 content-center">
                    <div>
                      <Pie
                        className="min-w-fit w-32 max-w-fit ml-8 max-h-36"
                        data={data_chart}
                      />
                    </div>
                    <div className="m-auto grid grid-cols-1 gap-3 text-sm">
                      <p>
                        Total Calories:{" "}
                        <span className="font-bold">
                          {selectedRow.Calories} kcal
                        </span>
                      </p>
                      <p>
                        Protein:{" "}
                        <span className="font-semibold">
                          {selectedRow.Protein}g
                        </span>
                        {" ("}
                        <span className="font-bold text-[#1cc961]">
                          {selectedRow.ProteinPercentage}%
                        </span>
                        )
                      </p>
                      <p>
                        Carbs:{" "}
                        <span className="font-semibold">
                          {selectedRow.Carbohydrate}g
                        </span>
                        {" ("}
                        <span className="font-bold text-[#13cedb]">
                          {selectedRow.CarbohydratePercentage}%
                        </span>
                        )
                      </p>
                      <p>
                        Fats:{" "}
                        <span className="font-semibold">
                          {selectedRow.Total_Lipid}g
                        </span>
                        {" ("}
                        <span className="font-bold text-[#ec6737]">
                          {selectedRow.Total_LipidPercentage}%
                        </span>
                        )
                      </p>
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <div className="w-full content-start">
                  <div className="border-gray-300 border-2 rounded-xl grid grid-cols-2 w-96 px-5 py-1">
                    <h1 className="my-auto">Enter the serving size: </h1>
                    <Input
                      onChange={(e) => setServingSize(e.target.value)}
                      isInvalid={invalidServingSize}
                      endContent={"g"}
                      defaultValue={servingSize}
                      variant="bordered"
                      className="w-20"
                    ></Input>
                  </div>
                </div>

                <Button
                  isDisabled={isGrayedOut}
                  color="success"
                  onPress={handleInsert}
                >
                  Add food
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddFoodButton;
