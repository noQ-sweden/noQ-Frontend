import React, { useState } from "react";
import moment from "moment";
import Panel from "./Panel";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "months"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "months"));
  };

  const daysInMonth = currentMonth.daysInMonth();

  const days = [];

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <div
        key={day}
        className="bg-gray-100 hover:bg-green-noQ hover:text-gray-300 p-2 rounded-md text-center">
        {day}
      </div>
    );
  }

  return (
    <Panel
      title={currentMonth.format("MMMM YYYY")}
      onPrevMonth={handlePrevMonth}
      onNextMonth={handleNextMonth}>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <React.Fragment key={index}>{day}</React.Fragment>
        ))}
      </div>
    </Panel>
  );
};

export default Calendar;
