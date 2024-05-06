"use client";
import MainTable from "@components/MainTable";
import AddFoodButton from "@components/AddFoodButton";
import AddExerciseButton from "@components/AddExerciseButton";
import AddBiometricsButton from "@components/AddBiometricsButton";
import AddNoteButton from "@components/AddNoteButton";
import MacroStats from "@components/MacroStats";

import { useState } from "react";

export default function Home() {
  const [updateSignal, setUpdateSignal] = useState(false);

  const handleUpdateTable = () => {
    setUpdateSignal((prevData) => !prevData);
  };

  return (
    <div className="ml-40">
      <div className="border-gray-400 content-center w-2/3 min-w-fit p-2 bg-white rounded-2xl mb-5">
        <div className="m-2">
          <AddFoodButton onUpdate={handleUpdateTable} />
          <AddExerciseButton onUpdate={handleUpdateTable} />
          <AddBiometricsButton onUpdate={handleUpdateTable} />
          <AddNoteButton onUpdate={handleUpdateTable} />
        </div>
        <MainTable onDelete={handleUpdateTable} updateSignal={updateSignal} />
      </div>
      <div className="border-gray-400 content-center w-1/5 min-w-fit p-2 bg-white rounded-2xl">
        test
      </div>
      <div className="border-gray-400 content-center w-2/3 min-w-fit p-2 bg-white rounded-2xl">
        <MacroStats updateSignal={updateSignal} />
      </div>
    </div>
  );
}
