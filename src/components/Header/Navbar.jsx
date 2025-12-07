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
    <nav className="fixed top-0 w-full z-50 lg:flex items-center justify-between p-10 lg:p-4 bg-[#255B57] lg:bg-white transition-transform duration-100 ">

      {viewerGroup === "volunteer" && (
        <div className="lg:hidden absolute left-4 top-4">
          <img src={noQiconWhiteOnGreen} alt="noQ" className="w-24" />
        </div>
      )}
      <PageTitle />

      {/* Header iconsremoved */}
    </nav>
  );
}

// PropTypes Validation
Navbar.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
};
