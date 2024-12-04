import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const CustomDropdownGender = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Man", "Kvinna"];

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const genderDropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      genderDropdownRef.current &&
      !genderDropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={genderDropdownRef} className="relative mt-1">
      <div
        className="border rounded border-gray-400 py-1 px-2 w-1/4 cursor-pointer "
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "Välj alternativ"}
      </div>

      {isOpen && (
        <ul className="absolute top-full left-0 w-1/4 bg-white border border-gray-400 rounded mt-1 shadow-lg z-10">
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

CustomDropdownGender.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomDropdownGender;
