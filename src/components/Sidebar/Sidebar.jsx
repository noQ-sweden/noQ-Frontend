import React, { useState, useEffect } from 'react';
import {
  FaCog,
  FaUserAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import useLogin from "./../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import noQiconGreen from "./../../assets/images/noQiconNoQGreen.svg";
import noQiconRed from "./../../assets/images/NoqIconRed.svg";
import noQiconWhiteOnGreen from "./../../assets/images/NoqIconWhiteOnGreen.svg";
import GetMenuItems from "./GetMenuItems";

export default function Sidebar() {
  const navigate = useNavigate();
  const { login } = useLogin();
  const [ icon, setIcon ] = useState();
  const [ hoverColor, setHoverColor ] = useState("bg-red-500");

  const liStyle =
    `py-5 text-gray-500 hover:${hoverColor} hover:text-white transition-colors duration-200 rounded-2xl`;
  const liTextStyle = "flex gap-4 pl-5 pr-5 text-l";

  const handleLogout = () => {
    // Clear user session data here (localStorage, cookies, etc.)
    localStorage.clear();
    // Redirect to the starting page
    navigate("/", { replace: true });
    // Reload the page to reset the application state
    window.location.reload();
  };

  const sidebarItemsTop = GetMenuItems(login.usergroups[0]);

  const sidebarItemsBottom = [
    { icon: FaCog, label: "Inställningar" },
    { icon: FaUserAlt, label: "Användare" },
    { icon: FaSignOutAlt, label: "Logga ut", action: handleLogout },
  ];

  useEffect(() => {
    if (login.usergroups[0] == "user") {
      setIcon(noQiconRed);
      setHoverColor("bg-green-noQ");
    } else if (login.usergroups[0] == "host") {
      setIcon(noQiconWhiteOnGreen);
      setHoverColor("bg-green-noQ");
    } else {
      setIcon(noQiconGreen);
      setHoverColor("bg-green-noQ");
    }
  }, [login, setIcon, setHoverColor]);

return (
    <div
      className="flex flex-col text-white min-h-screen bg-white m-0 select-none w-64"
    >
      <div className="items-center mt-4 mb-5">
          <img
            src={icon}
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
