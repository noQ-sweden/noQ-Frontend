import React from "react";
import {
  FaCog,
  FaChartPie,
  FaReceipt,
  FaUserAlt,
  FaBell,
  FaSignOutAlt,
  FaUser,
  FaRandom,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import noQicon from "./../../assets/images/noQiconNoQGreen.svg";

export default function Sidebar() {
  const navigate = useNavigate();

  const liStyle =
    "py-5 text-gray-500 border-green-noQ hover:bg-green-noQ hover:text-white transition-colors duration-200 rounded-2xl";
  const liTextStyle = "flex gap-4 pl-5 pr-5 text-l";

  const handleLogout = () => {
    // Clear user session data here (localStorage, cookies, etc.)
    localStorage.clear();
    // Redirect to the starting page
    navigate("/", { replace: true });
    // Reload the page to reset the application state
    window.location.reload();
  };

  const sidebarItemsTop = [
    { icon: FaChartPie, label: "Överblick", sideBarLink: "host" },
    { icon: FaBell, label: "Förfrågningar", sideBarLink: "host/requests" },
    { icon: FaCalendarAlt, label: "Kalender" },
    { icon: FaRandom, label: "Mina Rum", sideBarLink: "host/products" },
    { icon: FaRandom, label: "Härberget" },
    { icon: FaUser, label: "Gäster" },
    { icon: FaReceipt, label: "Fakturering" },
  ];

  const sidebarItemsBottom = [
    { icon: FaCog, label: "Inställningar" },
    { icon: FaUserAlt, label: "Användare" },
    { icon: FaSignOutAlt, label: "Logga ut", action: handleLogout },
  ];

  return (
    <div
      className="flex flex-col text-white min-h-screen bg-white m-0 select-none w-64"
    >
      <div className="items-center mt-4 mb-5">
          <img
            src={noQicon}
            alt="noQ Logo"
            className="h-20 mx-auto w-auto"
            onClick={() => {
                navigate("host", { replace: false });
            }}
          />
      </div>
      <div className="align-top p-8">
        <ul>
          <div>
            {sidebarItemsTop.map(({ icon: Icon, label, sideBarLink, action }) => (
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
                  <span className={liTextStyle}>
                    <Icon size="25" />
                    {label}
                  </span>
                </li>
              </div>
            ))}
          </div>
        </ul>
      </div>
      <div className="align-bottom p-8">
        <ul>
          <div>
            {sidebarItemsBottom.map(({ icon: Icon, label, sideBarLink, action }) => (
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
                  <span className={liTextStyle}>
                    <Icon size="25" />
                    {label}
                  </span>
                </li>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>  );
}
