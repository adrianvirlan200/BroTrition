"use client";
import { EditIcon } from "./NextUi/EditIcon";
import { DeleteIcon } from "./NextUi/DeleteIcon";
import { EyeIcon } from "./NextUi/EyeIcon";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  Spinner,
} from "@nextui-org/react";

export default function MainTable({ updateSignal }) {
  const columns = [
    { name: "NAME", uid: "name" },
    { name: "QUANTITY", uid: "quantity" },
    { name: "CALORIES", uid: "calories" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [data, setData] = useState([]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Handling the delete action
  const handleDelete = async (foodID) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/mainTable/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ foodID }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      if (data.status === 500) {
        console.log("Fatal Error;");
      }
    } catch (error) {
      console.error("catch block executed, Error:", error);
    }

    setUpdateTable((prevState) => !prevState);
    setIsLoading(false);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Fetching the data
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/mainTable/fetch",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const fetchedData = await response.json();

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        setData(fetchedData.data);
        setIsLoading(false);
      }

      if (fetchedData.status === 500) {
        console.log("Fatal Error;");
      }
    } catch (error) {
      console.error("catch block executed, Error:", error);
    }
  };


  //this hook is used to fetch data automatically
  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [updateTable, updateSignal]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Rendering of the table cells
  const renderCell = useCallback((data, columnKey) => {
    const cellValue = data.foodID;

    switch (columnKey) {
      case "name":
        return (
          <div className="flex min-w-48">
            <Image
              src="/brotrition_assets/svg/food.svg"
              width="0"
              height="0"
              alt="food icon"
              className="w-6 h-auto min-w-6 min-h-6"
            />
            <div>{data.Category}</div>
          </div>
        );
      case "quantity":
        return (
          <div className="grid grid-cols-2 w-16">
            <div>{data.quantity}</div>
            <div>g</div>
          </div>
        );
      case "calories":
        return (
          <div className="grid grid-cols-2 gap-x-0 w-24">
            <div>{data.calories}</div>
            <div>Kcal</div>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit food">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete food">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => handleDelete(cellValue)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      color="success"
      selectionMode="single"
      defaultSelectedKeys={[]}
      isCompact
      //isStriped
      className="border-gray-400 font-medium"
      aria-label="Example table with custom cells"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner color="success" size="lg" />}
        emptyContent={"No foods added today."}
        items={data}
      >
        {(item) => (
          <TableRow key={item.foodID}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
