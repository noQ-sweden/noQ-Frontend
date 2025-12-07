import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
} from "react-icons/fa";
import useLogin from "./../../hooks/useLogin";
import { useNavigate, useLocation } from "react-router-dom";
import noQiconWhiteOnGreen from "./../../assets/images/NoqIconWhiteOnGreen.svg";
import GetMenuItems from "./GetMenuItems";
import useLogout from "../../hooks/useLogout";
import { useTranslation } from "react-i18next";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useLogout();
  const { t, i18n } = useTranslation();
  const { login } = useLogin();
  const viewerGroup = login?.usergroups instanceof Array ? login?.usergroups[0] : null;



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

  // Check if a menu item is active
  const isActive = (sideBarLink) => {
    if (!sideBarLink) return false;
    const currentPath = location.pathname;
    // Exact match or starts with the link path
    return currentPath === `/${sideBarLink}` || currentPath.startsWith(`/${sideBarLink}/`);
  };

  return (
    <div className="mt-16 lg:mt-0">
      {/* Hamburger menu btn for Mobile */}
      <button
        className="fixed top-4 right-4 text-white focus:outline-none lg:hidden z-[60]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size="30" /> : <FaBars size="25" />}
      </button>

      {/* Sidebar - Full screen on mobile, sidebar on desktop */}
      <div
        className={`flex flex-col text-white bg-[#255B57] m-0 shadow-xl select-none fixed z-50 transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "translate-x-full"}
           inset-0 pt-20 lg:pt-0 lg:inset-auto lg:w-64 lg:top-0 lg:left-0 lg:h-screen lg:translate-x-0 lg:flex lg:sticky`}
      >
        {/* Logo */}
        <div className="hidden lg:flex items-center justify-center mt-8 mb-12">
          <img
            src={noQiconWhiteOnGreen}
            alt="noQ Logo"
            className="w-32 cursor-pointer"
            onClick={() => {
              navigate(login.usergroups[0], { replace: false });
            }}
          />
        </div>

        {/* Menu Items */}
        <div className="flex-1 px-6 flex flex-col items-center justify-center lg:block">
          <ul className="space-y-2">
            {sidebarItemsTop.map(
              ({ label, sideBarLink, action }) => {
                const active = isActive(sideBarLink);
                return (
                  <li
                    onClick={() => {
                      if (action) {
                        action();
                      } else if (sideBarLink) {
                        navigate(sideBarLink, { replace: false });
                      }
                      setIsOpen(false);
                    }}
                    key={label}
                    className={`py-3 px-4 text-white cursor-pointer transition-all duration-200 ${active ? "border-b-2 border-white font-semibold" : "hover:bg-[#1e4a46]"
                      }`}
                  >
                    <span className="text-xl">{label}</span>
                  </li>
                );
              }
            )}
            {/* Mobile-only Logout under Profil */}
            {isOpen && (
              <li
                onClick={handleLogout}
                className="py-3 px-4 text-white cursor-pointer transition-all duration-200 hover:bg-[#1e4a46] lg:hidden"
              >
                <span className="text-xl">Logga ut</span>
              </li>
            )}
          </ul>
        </div>
        {/* Logout Button at Bottom */}
        <div className="px-6 pb-8">
          <div
            onClick={handleLogout}
            className="py-3 px-4 text-white cursor-pointer hover:bg-[#1e4a46] transition-all duration-200 hidden lg:block"
          >

            <span className="text-base">Logga ut</span>
          </div>

          {/* Language selector for users */}
          {viewerGroup === "user" && (
            <div className="mt-4">
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                className="w-full text-gray-700 rounded px-4 py-2"
              >
                <option value="sv">Svenska</option>
                <option value="en">English</option>
                <option value="pl">Polski</option>
                <option value="ro">Română</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
