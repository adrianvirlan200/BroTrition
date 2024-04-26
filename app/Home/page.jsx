"use client";
import MainTable from "@components/MainTable";
import AddFoodButton from "@components/AddFoodButton";
import AddExerciseButton from "@components/AddExerciseButton";
import AddBiometricsButton from "@components/AddBiometricsButton";
import AddNoteButton from "@components/AddNoteButton";

import { useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  const handleUpdateTable = (newData) => {
    setUpdateTable((prevData) => [...prevData, newData]);
  };

  return (
    <div className="border-gray-400 content-center w-1/2 min-w-fit ml-unit-40 p-2 bg-white rounded-2xl">
      <div className="m-2">
        <AddFoodButton onInsert={handleUpdateTable} />
        <AddExerciseButton onInsert={handleUpdateTable} />
        <AddBiometricsButton onInsert={handleUpdateTable} />
        <AddNoteButton onInsert={handleUpdateTable} />
      </div>
      <MainTable data={data} />
    </div>
  );
}
