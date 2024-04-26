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
import { useAsyncList } from "@react-stately/data";
import { useState, useEffect } from "react";
import Image from "next/image";

const AddFoodButton = ({ handleUpdateTable }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  let list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        setPage((prev) => prev + 1);
      }

      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      const res = await fetch(
        cursor || "https://swapi.py4e.com/api/people/?search=",
        { signal }
      );
      let json = await res.json();

      if (!cursor) {
        setIsLoading(false);
      }

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  const hasMore = page < 9;

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
                  placeholder="Search all foods & recipes..."
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
                  aria-label="Example table with client side sorting"
                  bottomContent={
                    hasMore && !isLoading ? (
                      <div className="flex w-full justify-center">
                        <Button
                          isDisabled={list.isLoading}
                          variant="flat"
                          onPress={list.loadMore}
                        >
                          {list.isLoading && (
                            <Spinner color="white" size="sm" />
                          )}
                          Load More
                        </Button>
                      </div>
                    ) : null
                  }
                  classNames={{
                    base: "max-h-[300px] overflow-scroll",
                    table: "min-h-[420px]",
                  }}
                  className="w-full border-gray-300 border-2 rounded-2xl font-medium scrollbar-hide"
                >
                  <TableHeader>
                    <TableColumn key="name">Name</TableColumn>
                    <TableColumn key="height">Height</TableColumn>
                    <TableColumn key="mass">Mass</TableColumn>
                    <TableColumn key="birth_year">Birth year</TableColumn>
                  </TableHeader>
                  <TableBody
                    isLoading={isLoading}
                    items={list.items}
                    loadingContent={<Spinner label="Loading..." />}
                  >
                    {(item) => (
                      <TableRow key={item.name}>
                        {(columnKey) => (
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
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

export default AddFoodButton;
