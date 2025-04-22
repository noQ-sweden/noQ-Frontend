import React from "react";
import PropTypes from "prop-types";

export default function FilterDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded px-2 py-1 text-sm"
    >
      <option value="all">Alla</option>
      <option value="ongoing">Pågående</option>
      <option value="completed">Avslutade</option>
    </select>
  );
}

FilterDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
