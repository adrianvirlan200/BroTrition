"use client";
import MainTable from "@components/MainTable";
import AddFoodButton from "@components/AddFoodButton";
import AddExerciseButton from "@components/AddExerciseButton";
import AddBiometricsButton from "@components/AddBiometricsButton";
import AddNoteButton from "@components/AddNoteButton";

import { useState } from "react";

export default function Home() {
  const [updateSignal, setUpdateSignal] = useState(false);

  const handleUpdateTable = () => {
    setUpdateSignal((prevData) => !prevData);
  };

  return (
    <div className="border-gray-400 content-center w-1/2 min-w-fit ml-unit-40 p-2 bg-white rounded-2xl">
      <div className="m-2">
        <AddFoodButton onUpdate={handleUpdateTable} />
        <AddExerciseButton onUpdate={handleUpdateTable} />
        <AddBiometricsButton onUpdate={handleUpdateTable} />
        <AddNoteButton onUpdate={handleUpdateTable} />
      </div>
      <MainTable updateSignal={updateSignal} />
    </div>
  );
}
