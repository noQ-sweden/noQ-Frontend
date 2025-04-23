import React from "react";
import PropTypes from "prop-types";

export default function DropdownSort({ value, onChange }) {
  return (
    <select
      className="border border-gray-300 rounded px-2 py-2 text-sm w-full sm:w-auto"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="date">Sortera efter...</option>
      <option value="name">Title A-Ö</option>
      <option value="status">Startdatum</option>
      <option value="status">Slutdatum</option>
    </select>
  );
}

DropdownSort.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
