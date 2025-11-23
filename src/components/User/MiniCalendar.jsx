import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/sv";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

dayjs.locale("sv");

export default function MiniCalendar({
    selectedDate,
    setSelectedDate,
    activities = [],
}) {
    const [currentMonth, setCurrentMonth] = useState(dayjs(selectedDate));

    useEffect(() => {
        setCurrentMonth(dayjs(selectedDate));
    }, [selectedDate]);

    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const startDate = startOfMonth.startOf("week");
    const endDate = endOfMonth.endOf("week");

    const generateDates = () => {
        const dates = [];
        let date = startDate;
        while (date.isBefore(endDate) || date.isSame(endDate, "day")) {
            dates.push(date);
            date = date.add(1, "day");
        }
        return dates;
    };

    const dates = generateDates();

    const handlePrevMonth = () => {
        setCurrentMonth(currentMonth.subtract(1, "month"));
    };

    const handleNextMonth = () => {
        setCurrentMonth(currentMonth.add(1, "month"));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date.format("YYYY-MM-DD"));
    };

    const hasActivity = (date) => {
        return activities.some((activity) =>
            dayjs(activity.start_time).isSame(date, "day")
        );
    };

    const weekDays = ["M", "T", "O", "T", "F", "L", "S"];

    return (
        <div className="bg-white border rounded-xl p-4 shadow-sm w-full mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 bg-gray-50 rounded-t-lg p-2">
                <button onClick={handlePrevMonth} className="text-gray-500 hover:text-gray-700">
                    <FaChevronLeft />
                </button>
                <span className="text-gray-600 font-medium capitalize">
                    {currentMonth.format("MMMM")}
                </span>
                <button onClick={handleNextMonth} className="text-gray-500 hover:text-gray-700">
                    <FaChevronRight />
                </button>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 text-center mb-2">
                {weekDays.map((day, index) => (
                    <div key={index} className="text-xs text-gray-400 font-medium">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
                {dates.map((date, index) => {
                    const isCurrentMonth = date.month() === currentMonth.month();
                    const isSelected = date.format("YYYY-MM-DD") === selectedDate;
                    const isToday = date.isSame(dayjs(), "day");
                    const activity = hasActivity(date);

                    return (
                        <button
                            key={index}
                            onClick={() => handleDateClick(date)}
                            className={`
                h-10 w-full flex flex-col items-center justify-center rounded-lg text-sm relative
                ${!isCurrentMonth ? "text-gray-300" : "text-gray-700"}
                ${isSelected
                                    ? "bg-green-900 text-white"
                                    : "hover:bg-gray-100"
                                }
              `}
                        >
                            <span className={isToday && !isSelected ? "font-bold" : ""}>
                                {date.date()}
                            </span>
                            {/* Dot for activity */}
                            {activity && (
                                <span
                                    className={`h-1 w-1 rounded-full mt-0.5 ${isSelected ? "bg-white" : "bg-green-500"
                                        }`}
                                ></span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
