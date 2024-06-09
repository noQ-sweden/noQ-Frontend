import React, { useState } from "react";
import {
  FaCog,
  FaChartPie,
  FaCalendarAlt,
  FaReceipt,
  FaUser,
  FaBell,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import noQicon from "./../../assets/images/noQiconWhite.svg"

export default function Sidebar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const liStyle =
    "py-5 border-green-noQ hover:bg-gray-300 hover:text-green-noQ transition-colors duration-200";
  const liTextStyle = "flex gap-4 pl-10";
  const liTextStyleClosed = "flex gap-4 px-5";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarItems = [
    { icon: FaChartPie, label: "Överblick", sideBarLink: "admin" },
    { icon: FaCalendarAlt, label: "Kalender" },
    { icon: FaBell, label: "Förfrågan", sideBarLink: "host/requests" },
    { icon: FaUser, label: "Gäster" },
    { icon: FaReceipt, label: "Fakturering" },
    { icon: FaCog, label: "Inställningar" },
  ];

  return (
    <div
      className={`flex flex-col text-white min-h-screen bg-green-noQ m-0 select-none ${
        !isSidebarOpen ? "w-25" : "w-64"
      }`}>
      <ul className={`bg-green-noQ text-xl ${isSidebarOpen ? "" : "w-full"}`}>
        <div className="flex justify-between flex-row items-start my-6 px-5 pr-3">
          <a className={` ${isSidebarOpen ? "pl-5 w-24" : "hidden"}`} href="/">
            <img src={noQicon} alt="noQ Logo" />
          </a>
          <button onClick={toggleSidebar}>
            {isSidebarOpen ? (
              <GiCancel size="25" />
            ) : (
              <GiHamburgerMenu size="25" />
            )}
          </button>
        </div>
        <div>
          {sidebarItems.map(({ icon: Icon, label, sideBarLink }) => (
            <div onClick={() => navigate(sideBarLink, { replace: true })} key={label}>
              <li className={liStyle} >
                <span
                  className={isSidebarOpen ? liTextStyle : liTextStyleClosed}>
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
