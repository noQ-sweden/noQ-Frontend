import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Panel = ({ title, children, onPrevMonth, onNextMonth }) => {
  return (
    <div className=" bg-white flex flex-col rounded-lg p-2 my-4">
      <div className="flex">
        {onPrevMonth && (
          <button onClick={onPrevMonth} className="px-2 py-1">
            <FaAngleLeft />
          </button>
        )}
        <h2 className="text-xl font-semibold pl-4 mb-2 justify-start">{title}</h2>
        {onNextMonth && (
          <button onClick={onNextMonth} className="px-2 py-1">
            <FaAngleRight />
          </button>
        )}
      </div>
      <div className="max-w-full p-2 border-t">{children}</div>
    </div>
  );
};

export default Panel;
