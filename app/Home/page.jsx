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
    <div className="lg:ml-96 sm:ml-5">
      <div className="grid lg:grid-cols-[2fr_1fr] sm:grid-cols-1 gap-5 ">
        <div className="min-w-fit p-2 bg-white rounded-2xl mb-5">
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

        <div className="">
          <div className="content-center w-fit p-2 bg-white rounded-2xl">
            <MainCalendar setDate={handleSetDate} />
            <CalHistory updateSignal={updateSignal} />
          </div>
        </div>
      </div>

      <div className="mr-2 border-gray-400 content-center w-2/3 min-w-fit p-2 bg-white rounded-2xl">
        <MacroStats currentDate={date} updateSignal={updateSignal} />
      </div>
    </div>
  );
}
