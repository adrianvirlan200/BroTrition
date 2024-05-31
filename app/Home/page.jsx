"use client";
import MainTable from "@components/MainTable";
import AddFoodButton from "@components/AddFoodButton";
import AddExerciseButton from "@components/AddExerciseButton";
import AddBiometricsButton from "@components/AddBiometricsButton";
import AddNoteButton from "@components/AddNoteButton";
import MacroStats from "@components/MacroStats";
import MainCalendar from "@components/MainCalendar";
import CalHistory from "@components/CalHistory";
import { today, getLocalTimeZone } from "@internationalized/date";

import { useState } from "react";

export default function Home() {
  const [updateSignal, setUpdateSignal] = useState(false);

  const handleUpdateTable = () => {
    setUpdateSignal((prevData) => !prevData);
  };

  const initialDate = today(getLocalTimeZone());
  const [date, setDate] = useState(
    initialDate.year + "-" + initialDate.month + "-" + initialDate.day
  );
  const handleSetDate = (date) => {
    setDate(date);
  };

  return (
    <div className="grid lg:grid-cols-[3fr_1fr] sm:grid-cols-1 gap-4">
      {/* Left column */}
      <div>
        <div className="border-1 border-gray-300 w-full p-2 bg-white rounded-2xl">
          <div className="m-2">
            <AddFoodButton onUpdate={handleUpdateTable} />
            <AddExerciseButton onUpdate={handleUpdateTable} />
            <AddBiometricsButton onUpdate={handleUpdateTable} />
            <AddNoteButton onUpdate={handleUpdateTable} />
          </div>
          <MainTable
            currentDate={date}
            onDelete={handleUpdateTable}
            updateSignal={updateSignal}
          />
        </div>

        <div className="w-full mt-3 border-1 border-gray-300 content-center p-2 bg-white rounded-2xl">
          <MacroStats currentDate={date} updateSignal={updateSignal} />
        </div>

        <div className="w-full mt-3 border-1 border-gray-300 content-center p-2 bg-white rounded-2xl">
          <div className="h-screen">
            ToDo: add progress bars for all micro-nutrients
          </div>
        </div>
      </div>

      {/* Right column */}
      <div>
        <div className="border-1 border-gray-300 content-center w-fit p-2 bg-white rounded-2xl">
          <MainCalendar setDate={handleSetDate} />
          <CalHistory updateSignal={updateSignal} />
        </div>
      </div>
    </div>
  );
}
