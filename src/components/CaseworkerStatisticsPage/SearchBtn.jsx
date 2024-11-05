import React from "react";
export default function SearchBtn({onClick, disabled}) {
      return(
            <button 
            onClick={onClick}
            disabled={disabled}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg font-extralight mt-6"
            >
                  Sök
            </button>
      )
}