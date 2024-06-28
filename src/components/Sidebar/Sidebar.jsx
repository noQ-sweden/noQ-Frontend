import React, { useState } from "react";
import {
  FaChartPie,
  FaCog,
  FaCalendarAlt,
  FaReceipt,
  FaUser,
  FaBell,
  FaUserAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import noQicon from "./../../assets/images/noQiconNoQGreen.svg";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const liStyle =
    "py-5 text-gray-500 border-green-noQ hover:bg-green-noQ hover:text-white transition-colors duration-200 hover:rounded-full";
  const liTextStyle = "flex gap-4 pl-10";
  const liTextStyleClosed = "flex gap-4 px-5";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Clear user session data here (localStorage, cookies, etc.)
    localStorage.clear(); // Example: clearing all localStorage items

    // Redirect to the starting page
    navigate("/", { replace: true });
    // Reload the page to reset the application state
    window.location.reload();
  };

  const sidebarItems = [
    { icon: FaChartPie, label: "Överblick", sideBarLink: "admin" },
    { icon: FaBell, label: "Förfrågningar", sideBarLink: "host/requests" },
    { icon: FaReceipt, label: "Fakturering" },
    { icon: FaCog, label: "Inställningar" },
    { icon: FaUserAlt, label: "Användare" },
    { icon: FaSignOutAlt, label: "Logga ut", action: handleLogout },
  ];

  return (
    <div
      className={`flex flex-col text-white min-h-screen bg-gray-100 m-0 select-none ${
        !isSidebarOpen ? "w-25" : "w-64"
      }`}
    >
      <ul className={`bg-green-noq text-xl ${isSidebarOpen ? "" : "w-full"}`}>
        <div className="flex flex-col items-center my-6">
          <a className={` ${isSidebarOpen ? "w-full" : "hidden"}`} href="/">
            <img
              src={noQicon}
              alt="noQ Logo"
              className={`h-20 mx-auto ${isSidebarOpen ? "w-auto" : "w-16"}`}
            />
          </a>
          <button onClick={toggleSidebar} className="mt-4">
            {isSidebarOpen ? (
              <GiCancel size="25" />
            ) : (
              <GiHamburgerMenu size="25" />
            )}
          </button>
        </div>
        <div>
          {sidebarItems.map(({ icon: Icon, label, sideBarLink, action }) => (
            <div
              onClick={() => {
                if (action) {
                  action();
                } else if (sideBarLink) {
                  navigate(sideBarLink, { replace: false });
                }
              }}
              key={label}
            >
              <li className={liStyle}>
                <span
                  className={isSidebarOpen ? liTextStyle : liTextStyleClosed}
                >
                  <Icon size="25" />
                  {isSidebarOpen && label}
                </span>
              </li>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}
