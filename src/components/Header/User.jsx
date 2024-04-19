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

  const loginHandler = async () => {
    try {
      const response = await client.post("http://localhost:8000/api/login/", {
        email: "ngustafsson@example.net",
        password: "23OD*q^b@+",
      });

      if (response.status === 200) {
        setLoginSuccessful(true);
        setIsUserLoggedIn(true);
        setLoginState(true);
        const admin = {
          email: "ngustafsson@example.net",
        };
        setAdmin(admin);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <span className="hidden md:block ">
        {loginSuccessful ? admin.email : "Användare"}
      </span>
      <div className="relative ml-5 mr-5  ">
        <button
          className="block h-8 w-8 rounded-full overflow-hidden focus:outline-none focus:border-white"
          onClick={onClick}
        >
          <img src="user.png" className="h-8 w-8 object-cover" alt="user" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden ">
            <div className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white">
              <button onClick={loginHandler}>
                {isUserLoggedIn ? "Logga ut" : "Logga in"}
              </button>
            </div>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
            >
              Konto
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white"
            >
              Baka bröd
            </a>
          </div>
        )}
      </div>
    </>
  );
}
