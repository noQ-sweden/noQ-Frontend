import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import PropTypes from "prop-types";

const Panel = ({ title, children, onPrevMonth, onNextMonth }) => {
  Panel.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onPrevMonth: PropTypes.func,
    onNextMonth: PropTypes.func,
  };

  return (
    <div className=" bg-white flex flex-col rounded-lg border-2 border-grey-100 shadow-sm my-4 p-3">
      <div className="flex">
        {onPrevMonth && (
          <button onClick={onPrevMonth} className="px-2 py-1">
            <FaAngleLeft />
          </button>
        )}
        <h2 className="text-xl font-semibold justify-start mb-2 ml-2">{title}</h2>
        {onNextMonth && (
          <button onClick={onNextMonth} className="px-2 py-1">
            <FaAngleRight />
          </button>
        )}
      </div>
      <div className="max-w-full p-2 border-t-2">{children}</div>
    </div>
  );
};

export default Panel;
