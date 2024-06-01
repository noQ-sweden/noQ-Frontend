import React, { useState, useContext } from "react";
import axios from "axios";
import { VisitorGroup } from "../../enums"
import { VisitorContext } from "../../App"

export default function User({ isDropdownOpen, onClick }) {
  const { visitorGroupState, visitorId, loginHandler } = useContext(VisitorContext);

  const handleLogout = () => {
    loginHandler(false, VisitorGroup.Unauthorized, "");
  };

  return (
    <div className="relative">
      <button onClick={onClick} className="flex items-center">
        <span>{visitorGroupState}</span>
        <svg
          className="ml-1 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-1 z-10">
            <div>
              <p className="px-4 py-2 text-sm text-gray-700">
                Welcome, {visitorId}
              </p>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Logout
              </button>
            </div>
        </div>
      )}
    </div>
  );
}
