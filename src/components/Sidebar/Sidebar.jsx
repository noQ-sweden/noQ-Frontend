import React, { useState } from "react";
import {
  FaBars,
  FaCog,
  FaUserAlt,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import useLogin from "./../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
//import noQiconNoQRed from "./../../assets/images/noQiconNoQRed.svg";
//import noQiconNoQRedWhite from "./../../assets/images/noQiconNoQRedWhite.svg";
import noQiconWhiteOnGreen from "./../../assets/images/NoqIconWhiteOnGreen.svg";
import noQiconGreen from "./../../assets/images/noQiconNoQGreen.svg";
import GetMenuItems from "./GetMenuItems";
import useLogout from "../../hooks/useLogout";
import { useTranslation } from "react-i18next";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { t, i18n } = useTranslation();
  const { login } = useLogin();
  const viewerGroup = login?.usergroups instanceof Array ? login?.usergroups[0] : null;


  // Lisa
  /* const colorSchemeUser1 = {
    liStyle:
      "py-5 text-gray-500 hover:bg-[#E04430] cursor-pointer hover:text-white transition-colors duration-200 rounded-2xl",
    logoSrc: noQiconNoQRed,
  };
/*
  // Tommy
  /*const colorSchemeUser2 = {
    liStyle:
      "py-5 text-gray-500 hover:bg-[#E04430] cursor-pointer hover:text-white transition-colors duration-200 rounded-2xl",
    logoSrc: noQiconNoQRedWhite,
  };
  */

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
    colors = isUserLisa ? colorSchemeHost : colorSchemeHost;
  } else if (login.usergroups[0] == "volunteer") {
    colors = colorSchemeHost;
  } else if (login.usergroups[0] == "host") {
    colors = colorSchemeHost;
  } else {
    colors = colorSchemeCaseworker;
  }

  const liTextStyle = "flex gap-4 pl-5 pr-5 text-l";

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const sidebarItemsTop = GetMenuItems(login.usergroups[0]);

  const sidebarItemsBottom = [
    { icon: FaCog, label: t("sidebar.Settings") },
    { icon: FaUserAlt, label: t("sidebar.User") },
    { icon: FaSignOutAlt, label: t("sidebar.Logout"), action: handleLogout },
  ];

  return (
    <div className="mt-16">
      {/* Hamburger menu btn for Mobile */}
      <button
        className="fixed top-4 right-4 text-white focus:outline-none lg:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size="30" /> : <FaBars size="25" />}
      </button>

      {/*<img
        className="absolute top-2 left-4 lg:hidden cursor-pointer"
        src={colors.logoSrc}
        onClick={() => {
          navigate(login.usergroups[0], { replace: false });
        }}
        alt="noQ Logo"
        width="100"
      />
      */}

      {/* Sidebar */}
      <div
        className={`flex flex-col text-white bg-white m-0 shadow-xl rounded-md select-none w-64 fixed top-20 right-0 z-40 sm:z-40 lg:z-0 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:top-16 lg:h-100 lg:translate-x-0 lg:flex lg:sticky transition-transform duration-200 `}
      >
        <div className="items-center mt-2 mb-5">
          {/*<img
            src={colors.logoSrc}
            alt="noQ Logo"
            className="h-20 mx-auto w-auto cursor-pointer"
            onClick={() => {
              navigate(login.usergroups[0], { replace: false });
            }}
          />*/}
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
              {viewerGroup !== "user" ? (
                null
              ) : 
                //Language Translation for "User/Guest"
                <div className="relative text-right">
                <select
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="text-gray-700 rounded px-4 py-2"
                >
                  <option value="sv">Svenska</option>
                  <option value="en">English</option>
                  <option value="pl">Polski</option>
                  <option value="ro">Română</option>
                </select>
                </div>
              }
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
