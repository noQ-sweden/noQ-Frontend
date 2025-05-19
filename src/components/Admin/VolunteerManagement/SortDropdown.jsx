import React from "react";
import PropTypes from "prop-types";

export default function DropdownSort({ value, onChange }) {
  return (
    <select
      className="border border-gray-300 rounded px-2 py-2 text-sm w-full sm:w-auto"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Sortera efter...</option>
      <option value="title-asc">Title A-Ö</option>
      <option value="startDate-asc">Startdatum - Stigande</option>
      <option value="startDate-desc">Startdatum - Fallande</option>
      <option value="endDate-asc">Slutdatum - Stigande</option>
      <option value="endDate-desc">Slutdatum - Fallande</option>
    </select>
  );
}

DropdownSort.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
