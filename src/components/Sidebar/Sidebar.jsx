import React, { useState } from "react";
import { FaBars, FaCog, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import useLogin from "./../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import noQiconNoQRed from "./../../assets/images/noQiconNoQRed.svg";
import noQiconNoQRedWhite from "./../../assets/images/noQiconNoQRedWhite.svg";
import noQiconWhiteOnGreen from "./../../assets/images/NoqIconWhiteOnGreen.svg";
import noQiconGreen from "./../../assets/images/noQiconNoQGreen.svg";
import GetMenuItems from "./GetMenuItems";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { login } = useLogin();

  // Lisa
  const colorSchemeUser1 = {
    liStyle:
      "py-5 text-gray-500 hover:bg-[#E04430] cursor-pointer hover:text-white transition-colors duration-200 rounded-2xl",
    logoSrc: noQiconNoQRed,
  };

  // Tommy
  const colorSchemeUser2 = {
    liStyle:
      "py-5 text-gray-500 hover:bg-[#E04430] cursor-pointer hover:text-white transition-colors duration-200 rounded-2xl",
    logoSrc: noQiconNoQRedWhite,
  };

  const colorSchemeHost = {
    liStyle:
      "py-5 text-gray-500 hover:bg-green-noQ hover:text-white cursor-pointer transition-colors duration-200 rounded-2xl",
    logoSrc: noQiconWhiteOnGreen,
  };

  const colorSchemeCaseworker = {
    liStyle:
      "py-5 text-gray-500 hover:bg-green-noQ hover:text-white cursor-pointer transition-colors duration-200 rounded-2xl",
    logoSrc: noQiconGreen,
  };

  // Select the correct color scheme based on user type and name
  let colors = null;
  const isUserLisa =
    typeof login?.first_name === "string" &&
    login.first_name.toLowerCase() === "lisa";
  if (login.usergroups[0] == "user") {
    colors = isUserLisa ? colorSchemeUser1 : colorSchemeUser2;
  } else if (login.usergroups[0] == "volunteer") {
    colors = colorSchemeUser1;
  } else if (login.usergroups[0] == "host") {
    colors = colorSchemeHost;
  } else {
    colors = colorSchemeCaseworker;
  }

  const liTextStyle = "flex gap-4 pl-5 pr-5 text-l";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  const sidebarItemsTop = GetMenuItems(login.usergroups[0]);

  const sidebarItemsBottom = [
    { icon: FaCog, label: "Inställningar" },
    { icon: FaUserAlt, label: "Användare" },
    { icon: FaSignOutAlt, label: "Logga ut", action: handleLogout },
  ];

  return (
    <div>
      {/* Hamburger menu btn for Mobile */}
      <button
        className="absolute top-4 left-4 text-gray-700 focus:outline-none lg:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size="25" />
      </button>

      {/* Sidebar */}
      <div
        className={`flex flex-col text-white min-h-screen bg-white m-0 select-none w-64 fixed top-0 left-0 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:flex lg:relative lg:transform-none transition-transform duration-100`}
      >
        <div className="items-center mt-4 mb-5">
          <img
            src={colors.logoSrc}
            alt="noQ Logo"
            className="h-20 mx-auto w-auto cursor-pointer"
            onClick={() => {
              navigate(login.usergroups[0], { replace: false });
            }}
          />
        </div>
        <div className="align-top p-8">
          <ul>
            <div>
              {sidebarItemsTop.map(
                ({ icon: Icon, label, sideBarLink, action }) => (
                  <div
                    onClick={() => {
                      if (action) {
                        action();
                      } else if (sideBarLink) {
                        navigate(sideBarLink, { replace: false });
                      }
                      setIsOpen(false); // close menu after selection
                    }}
                    key={label}
                  >
                    <li className={colors.liStyle}>
                      <span className={liTextStyle}>
                        <Icon size="25" />
                        {label}
                      </span>
                    </li>
                  </div>
                )
              )}
            </div>
          </ul>
        </div>
        <div className="align-bottom p-8">
          <ul>
            <div>
              {sidebarItemsBottom.map(
                ({ icon: Icon, label, sideBarLink, action }) => (
                  <div
                    onClick={() => {
                      if (action) {
                        action();
                      } else if (sideBarLink) {
                        navigate(sideBarLink, { replace: false });
                      }
                      setIsOpen(false); // close menu after selection
                    }}
                    key={label}
                  >
                    <li className={colors.liStyle}>
                      <span className={liTextStyle}>
                        <Icon size="25" />
                        {label}
                      </span>
                    </li>
                  </div>
                )
              )}
            </div>
          </ul>
        </div>
      </div>

      {/* Overlay for Mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
