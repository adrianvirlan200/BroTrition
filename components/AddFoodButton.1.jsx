"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import Image from "next/image";

export const AddFoodButton = ({ handleUpdateTable }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleSearchValue = (value) => {
    const _value = value.replace(/\d+/g, "");
    setSearchBoxValue(_value);
  };

  const handleSearching = async () => {
    console.log(searchBoxValue);

    let query = "";

    if (searchBoxValue === "") {
      query = "rice chicken potato beef egg fish pork lamb goat turkey duck";
    } else {
      query = searchBoxValue;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/mainTable/modals/foodTable",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
          }),
        }
      );

      if (response.ok) {
        const _data = await response.json();

        if (_data.status === 201) {
          setData(_data.data);
        } else {
          console.log("Fatal Error;");
        }
        //console.log(data[0].calories);
        //console.log(data);
      }
    } catch (error) {
      console.error("catch block executed, Error:", error);
    }
  };

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
                  onChange={(e) => handleSearchValue(e.target.value)}
                  placeholder="Search all foods & ingredients..."
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
                  //isStriped
                  aria-label="Chose an aliment to add to your meal."
                  classNames={{
                    base: "max-h-[300px] overflow-scroll",
                    table: "min-h-[420px]",
                  }}
                  className="w-full border-gray-300 border-2 rounded-2xl font-medium scrollbar-hide"
                >
                  <TableHeader>
                    <TableColumn key="name">Name</TableColumn>
                    <TableColumn key="macro">
                      Proteins/Carbs/Fats/100g
                    </TableColumn>
                    <TableColumn key="calories">Calories/100g</TableColumn>
                  </TableHeader>

                  <TableBody items={data}>
                    {(item) => (
                      <TableRow key={item.name}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          {item.protein_g}/{item.fat_total_g}/
                          {item.carbohydrates_total_g}
                        </TableCell>
                        <TableCell>{item.calories}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                <div className="border-gray-300 border-2 rounded-2xl p-3">
                  lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem
                  ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum
                  dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit
                  ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem
                  ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum
                  dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" onPress={onClose}>
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
