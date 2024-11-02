import React, { useState, useEffect, useRef } from "react";
import useLogin from "./../../hooks/useLogin";
import { useNavigate, Link } from "react-router-dom";
import PageTitle from "./PageTitle";
import {
  FaRegEnvelope,
  FaBell,
  FaCaretDown,
  FaCaretUp,
  FaQuestionCircle,
  FaSignOutAlt,
  FaCog, 
  FaShieldAlt 
} from "react-icons/fa";
import PropTypes from "prop-types";

export default function Navbar({ first_name, last_name }) {
  const navigate = useNavigate();
  const { login } = useLogin();
  const [nrOfMessages] = useState(0);
  const [nrOfAlerts] = useState(3); // Mocked alerts count
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  const getInitials = (first_name = "", last_name = "") => {
    const firstInitial = first_name ? first_name[0].toUpperCase() : "";
    const lastInitial = last_name ? last_name[0].toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Inject Botpress scripts
  useEffect(() => {
    const botpressScript1 = document.createElement("script");
    botpressScript1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    botpressScript1.async = true;

    const botpressScript2 = document.createElement("script");
    botpressScript2.src = "https://files.bpcontent.cloud/2024/11/02/09/20241102093854-JYPQTPG9.js";
    botpressScript2.async = true;

    document.body.appendChild(botpressScript1);
    document.body.appendChild(botpressScript2);

    return () => {
      document.body.removeChild(botpressScript1);
      document.body.removeChild(botpressScript2);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 bg-white">
      <PageTitle />
      <div className="flex items-center space-x-10">
        <div className="relative">
          <FaRegEnvelope className="text-2xl fill-almost-black" />{" "}
          {/* Adjusted size */}
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {nrOfMessages}
          </span>
        </div>
        <div className="relative" onClick={() => navigate("/notifications")}>
          <FaBell className="text-2xl fill-almost-black cursor-pointer" />{" "}
          {/* Adjusted size */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {nrOfAlerts}
          </span>
        </div>
        <ul className="flex space-x-10">
          <li>
            <Link to="/settings" className="flex flex-col items-center">
              <FaCog className="text-2xl" /> {/* Adjusted size */}
            </Link>
          </li>
          <li className="ml-2">
            {" "}
            {/* Added margin to create space */}
            <Link to="/administration" className="flex flex-col items-center">
              <FaShieldAlt className="text-2xl" /> {/* Adjusted size */}
            </Link>
          </li>
        </ul>
        <div className="relative flex items-center space-x-2" ref={dropdownRef}>
          {/* Clickable initials referring to the Användare module */}
          <div
            className="bg-green-noQ text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/user-management")} // Navigate on click
          >
              {login && first_name && last_name
                ? getInitials(first_name, last_name)
                : ""}
          </div>
          {isUserDropdownOpen && (
            <div className="absolute right-0 top-10 z-10 w-48 bg-white shadow-lg">
              <div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className="flex gap-4 pl-1 pr-1 text-l">
                    <FaSignOutAlt className="mt-1" />
                    <span>Logout</span>
                  </span>
                </button>
              </div>
            </div>
          )}
          <div className="pr-1 pl-1">
            {isUserDropdownOpen ? (
              <FaCaretUp onClick={toggleUserDropdown} />
            ) : (
              <FaCaretDown onClick={toggleUserDropdown} />
            )}
          </div>
        </div>
        <FaQuestionCircle className="text-2xl text-green-noQ ml-4" />
      </div>
    </nav>
  );
}

// PropTypes Validation
Navbar.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
};
