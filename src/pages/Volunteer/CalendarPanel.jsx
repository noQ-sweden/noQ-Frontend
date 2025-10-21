import React, { useMemo } from "react";

const WEEKDAYS = ["M", "T", "O", "T", "F", "L", "S"];

const formatMonth = new Intl.DateTimeFormat("sv-SE", {
  month: "long",
});
const formatDay = new Intl.DateTimeFormat("sv-SE", { day: "numeric" });

const getMondayIndex = (jsDay) => (jsDay + 6) % 7;

function getStartOfMonth(date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  firstDay.setHours(0, 0, 0, 0);
  return firstDay;
}

// Check if two dates are the same
function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function buildMonthGrid(currentMonth) {
  const startDate = getStartOfMonth(currentMonth);
  const daysBefore = getMondayIndex(startDate.getDay()); // how many days from previous month
  const firstCellDate = new Date(startDate);
  firstCellDate.setDate(startDate.getDate() - daysBefore);

  const cells = [];
  for (let index = 0; index < 42; index++) {
    const day = new Date(firstCellDate);
    day.setDate(firstCellDate.getDate() + index);
    cells.push({
      date: day,
      isInCurrentMonth: day.getMonth() === currentMonth.getMonth(),
    });
  }

  return cells;
}

export default function CalendarPanel({
  month,
  selected,
  onAction,
  dotsByDay,
}) {
  const calendarDays = useMemo(() => buildMonthGrid(month), [month]);

  return (
    <div className="rounded border border-slate-200 bg-white">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b rounded-t-xl">
        <button
          aria-label="Föregående månad"
          onClick={() => onAction({ type: "prevMonth" })}
          className="p-2 rounded hover:bg-slate-100"
        >
          ‹
        </button>

        <div className="text-slate-500 font-light">
          {formatMonth.format(month).replace(/^./, (c) => c.toUpperCase())}
        </div>

        <button
          aria-label="Nästa månad"
          onClick={() => onAction({ type: "nextMonth" })}
          className="p-2 rounded hover:bg-slate-100"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 text-xs text-slate-500 px-2 py-1">
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} className="text-center py-1">
            {weekday}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 ">
        {calendarDays.map(({ date, isInCurrentMonth }, index) => {
          const isSelected = isSameDate(date, selected);
          const dotsCount = dotsByDay.get(date.toDateString()) || 0;

          return (
            <button
              key={index}
              onClick={() => onAction({ type: "setDate", date })}
              className={[
                "aspect-square  flex items-center justify-center relative border transition",
                isInCurrentMonth ? " " : "text-slate-300 bg-slate-50",
                isSelected
                  ? "bg-newGreen text-[#fff] border-[#1C4915]"
                  : "hover:bg-slate-100",
              ].join(" ")}
            >
              <span className="text-sm">{formatDay.format(date)}</span>

              {dotsCount > 0 && (
                <span className="absolute bottom-1 flex gap-0.5">
                  {Array.from({ length: Math.min(3, dotsCount) }).map(
                    (_, dotIndex) => (
                      <span
                        key={dotIndex}
                        className="w-1.5 h-1.5 rounded-full bg-emerald-600"
                      />
                    )
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
