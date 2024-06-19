"use client";
import MainTable from "@components/MainTable";
import AddFoodButton from "@components/AddFoodButton";
import AddExerciseButton from "@components/AddExerciseButton";
import AddBiometricsButton from "@components/AddBiometricsButton";
import AddNoteButton from "@components/AddNoteButton";
import MacroStats from "@components/MacroStats";
import MainCalendar from "@components/MainCalendar";
import CalHistory from "@components/CalHistory";
import TryGold from "@components/TryGold";
import MicroStats from "@components/MicroStats";
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
    <div className="grid lg:grid-cols-[3fr_1fr] grid-cols-1 md:grid-cols-1 gap-4">
      {/* Left column */}
      <div>
        <div className="border-1 border-gray-300 w-full p-2 bg-white rounded-2xl shadow-md">
          <div className="m-2 grid grid-cols-2 lg:grid-cols-4">
            <AddFoodButton onUpdate={handleUpdateTable} className="mx-auto" />
            <AddExerciseButton
              onUpdate={handleUpdateTable}
              className="mx-auto"
            />
            <AddBiometricsButton
              onUpdate={handleUpdateTable}
              className="mx-auto"
            />
            <AddNoteButton onUpdate={handleUpdateTable} className="mx-auto" />
          </div>
          <MainTable
            currentDate={date}
            onDelete={handleUpdateTable}
            updateSignal={updateSignal}
          />
        </div>

        <div className="w-full mt-3 border-1 border-gray-300 content-center p-2 bg-white rounded-2xl shadow-md">
          <MacroStats currentDate={date} updateSignal={updateSignal} />
        </div>

        <div className="w-full mt-3 border-1 border-gray-300 content-center p-2 bg-white rounded-2xl shadow-md">
          <div className="h-screen">
            <MicroStats />
          </div>
        </div>
      </div>

      {/* Right column */}
      <div>
        <div className="max-w-fit overflow-clip border-1 border-gray-300 content-center p-2 bg-white rounded-2xl shadow-md">
          <MainCalendar setDate={handleSetDate} />
          <CalHistory updateSignal={updateSignal} />
        </div>
        <div className="mt-4 mx-auto p-2 w-full border-1 border-gray-300 content-center py-2 bg-white rounded-2xl shadow-md">
          <TryGold />
        </div>
      </div>
    </div>
  );
}
