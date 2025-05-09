import React, { useState, useEffect, useRef } from "react";
import useLogin from "./../../hooks/useLogin";
import useLogout from "../../hooks/useLogout";
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
  FaShieldAlt,
} from "react-icons/fa";
import PropTypes from "prop-types";
import noQiconWhiteOnGreen from "../../assets/images/NoqIconWhiteOnGreen.svg";


export default function Navbar({ first_name, last_name }) {
  const navigate = useNavigate();
  const { login } = useLogin();
  const { logout } = useLogout();
  const [nrOfMessages] = useState(0);
  const [nrOfAlerts] = useState(3); // Mocked alerts count
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  const viewerGroup =
  login?.usergroups instanceof Array ? login?.usergroups[0] : null;

  const getInitials = (first_name = "", last_name = "") => {
    const firstInitial = first_name ? first_name[0].toUpperCase() : "";
    const lastInitial = last_name ? last_name[0].toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };
  console.log(getInitials.first_name);

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

  return (
    <nav className="lg:flex items-center justify-between p-10 lg:p-4 bg-[#255B57] lg:bg-white transition-transform duration-100 ">

        {viewerGroup === "volunteer" && (
      <div className="lg:hidden absolute left-4 top-4">
        <img src={noQiconWhiteOnGreen} alt="noQ" className="w-24" />
      </div>
    )}
      <PageTitle />

      <div className="lg:flex items-center space-x-10 hidden">
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
