import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import PropTypes from "prop-types";

const Panel = ({ title, children, onPrevMonth, onNextMonth }) => {
  Panel.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onPrevMonth: PropTypes.func.isRequired,
    onNextMonth: PropTypes.func.isRequired,
  };

  return (
    <div className="border-2 border-#000000 bg-white flex flex-col shadow-md rounded-lg p-2 my-4">
      <div className="flex justify-around items-center">
        {onPrevMonth && (
          <button onClick={onPrevMonth} className="px-2 py-1">
            <FaAngleLeft />
          </button>
        )}
        <h2 className="text-xl font-semibold pl-4 mb-2">{title}</h2>
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
