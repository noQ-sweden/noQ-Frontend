import React, { useState } from "react";
import axios from "axios";

export default function User({ isDropdownOpen, onClick, setLoginState }) {
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [admin, setAdmin] = useState({});

  const client = axios.create({
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });

  const mockLogin = async () => {
    // Mock login function
    const response = {
      status: 200,
      data: { email: "ngustafsson@example.net" },
    };

    if (response.status === 200) {
      setLoginSuccessful(true);
      setIsUserLoggedIn(true);
      setLoginState(true);
      setAdmin(response.data);
    }
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    setLoginState(false);
    setAdmin({});
  };

  return (
    <div className="relative">
      <button onClick={onClick} className="flex items-center">
        <span>User</span>
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
          {isUserLoggedIn ? (
            <div>
              <p className="px-4 py-2 text-sm text-gray-700">
                Welcome, {admin.email}
              </p>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={mockLogin}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
}
