import React from "react";
import PropTypes from "prop-types";

export default function SearchBtn({ onClick }) {
  return (
    <button 
      onClick={onClick} 
      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded-lg font-extralight mt-6"
    >
      Sök
    </button>
  );
}

SearchBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
