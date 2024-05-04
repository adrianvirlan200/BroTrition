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
import { PlusIcon } from "./NextUi/plusIcon";

import { useState, useEffect } from "react";
import Image from "next/image";

const AddExerciseButton = ({ onUpdate }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [duration, setDuration] = useState(30);
  const [calories, setCalories] = useState(0);
  const [manual, setManual] = useState(false);
  const [invalidDuration, setInvalidDuration] = useState(false);
  const [invalidCalories, setInvalidCalories] = useState(false);
  const [isGrayedOut, setIsGrayedOut] = useState(true);
  const [selectedRow, setSelectedRow] = useState({
    id: 0,
    activity: "",
    calories: 0,
  });
  const [reference, setReference] = useState(selectedRow);

  //handles the backend requests for searching exercises
  const handleSearching = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/mainTable/modals/exerciseSearchTable",
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
        const fetchedData = await response.json();

        if (fetchedData.status === 201) {
          setData(fetchedData.data);
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

  //make a request to insert the data into the database
  const handleInsert = async () => {
    onOpenChange(false); // close the modal

    try {
      const response = await fetch(
        "http://localhost:3000/api/mainTable/modals/exerciseInsert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            duration: duration,
            exerciseID: reference.id,
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

  //handles the selection of a row
  const handleRowSelect = (row) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == row) {
        setSelectedRow(data[i]);
        setReference(data[i]);
        break;
      }
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        variant="light"
        color="primary"
        className="end text-lg font-medium"
      >
        ADD EXERCISE
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
              <ModalHeader className="flex flex-col gap-0 text-blue-500">
                ADD EXERCISE
              </ModalHeader>

              <ModalBody>
                <Input
                  autoFocus
                  onChange={(e) => setSearchBoxValue(e.target.value)}
                  placeholder="Search all exercises and workouts..."
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
                  selectionMode="single"
                  color="primary"
                  onRowAction={(row) => handleRowSelect(row)}
                  aria-label="Chose an aliment to add to your meal."
                  classNames={{
                    base: "max-h-[225px] overflow-scroll",
                  }}
                  className="w-full border-gray-300 border-2 rounded-2xl font-medium scrollbar-hide"
                >
                  <TableHeader>
                    <TableColumn key="name">Name</TableColumn>
                    <TableColumn align="end" key="calories">
                      Calories/30min
                    </TableColumn>
                  </TableHeader>

                  <TableBody
                    loadingContent={<Spinner color="primary" size="lg" />}
                    isLoading={isLoading}
                    emptyContent={"Type something to search."}
                    items={data}
                  >
                    {(item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.activity}</TableCell>
                        <TableCell>{item.calories}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>

              <ModalFooter>
                <div className="w-full content-start border-gray-300 border-2 rounded-xl mb-4">
                  <h1 className="flex-center text-lg font-bold border-b-2 border-gray-300 min-h-12 mx-5">
                    {reference.activity}
                  </h1>
                  <div className="grid grid-cols-3 w-full px-5 pr-32 py-1 mb-2">
                    <h1 className="my-auto text-md">Enter the duration: </h1>
                    <Input
                      onChange={(e) => setDuration(e.target.value)}
                      isInvalid={invalidDuration}
                      endContent={"min"}
                      defaultValue={duration}
                      variant="underlined"
                      className="w-20"
                    ></Input>
                    <div></div>
                    <h1 className="my-auto text-md">Calories burned: </h1>
                    <Input
                      onChange={(e) => setCalories(e.target.value)}
                      isDisabled={!manual}
                      isInvalid={invalidDuration}
                      endContent={"Kcal"}
                      defaultValue={reference.calories}
                      value={!manual ? reference.calories : calories}
                      variant="underlined"
                      className="w-20"
                    ></Input>
                    <Checkbox
                      icon={<PlusIcon />}
                      color="warning"
                      className="text-xs"
                      onChange={() => setManual(!manual)}
                    >
                      Enter manually
                    </Checkbox>
                  </div>
                </div>

                <Button
                  isDisabled={isGrayedOut}
                  color="primary"
                  onPress={handleInsert}
                  className="mt-auto mb-2"
                >
                  Add exercise
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddExerciseButton;
