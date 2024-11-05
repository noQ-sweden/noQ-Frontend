import React, { useState } from "react";
import PropTypes from "prop-types";

const CustomDropdown = ({ name, value, onChange, requied }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Man", "Kvinna"];

  const handleOptionClick = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  };

  return (
    <div className="relative mt-5">
      <div
        className="border rounded border-gray-400 py-1 px-2 w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "Välj... "}
      </div>

      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-400 rounded mt-1 shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

CustomDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  requied: PropTypes.bool,
};

export default CustomDropdown;
