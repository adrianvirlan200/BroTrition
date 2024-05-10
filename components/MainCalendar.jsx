"use client";
import React, { useEffect } from "react";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useState } from "react";

export default function MainCalendar({ setDate }) {
  const [dateValue, setDateValue] = useState(today(getLocalTimeZone()));

  const handleDateChange = (date) => {
    setDateValue(date);
    const _date = date.year + "-" + date.month + "-" + date.day;
    setDate(_date);
  };

  return (
    <div className="flex gap-x-4">
      <Calendar
        aria-label="Calendar"
        value={dateValue}
        onChange={handleDateChange}
        maxValue={today(getLocalTimeZone())}
      />
    </div>
  );
}
