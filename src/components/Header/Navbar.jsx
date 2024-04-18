import React, { useState } from "react";
import User from "./User";
import Language from "./Language";

export default function Navbar({ setLoginState }) {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <>
      <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full ">
        <div className="mb-2 sm:mb-0 lg: flex justify-center">
          <a href="/">
            <img src="noQicon.bmp" style={{ width: "100px" }} alt="logo" />
          </a>
        </div>
        <div className="flex lg: justify-center">
          <Language
            onClick={toggleLanguageDropdown}
            isDropdownOpen={isLanguageDropdownOpen}
            className="mr-2"
          />
          <User
            onClick={toggleUserDropdown}
            isDropdownOpen={isUserDropdownOpen}
            setLoginState={setLoginState}
          />
        </div>
      </nav>
    </>
  );
}
