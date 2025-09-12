import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import useLogin from "./../../hooks/useLogin";
import useLogout from "../../hooks/useLogout";
import GetMenuItems from "./GetMenuItems";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { t, i18n } = useTranslation();
  const { login } = useLogin();
  const userGroup = Array.isArray(login?.usergroups)
    ? login?.usergroups[0]
    : "user";

  const schemes = {
    host: "py-5 text-white hover:underline transition-colors rounded-2xl",
    volunteer: "py-5 text-white hover:underline transition-colors rounded-2xl",
    caseworker: "py-5 text-white hover:underline transition-colors rounded-2xl",
    user: "py-5 text-white hover:underline transition-colors rounded-2xl",
  };

  const liStyle = schemes[userGroup] ?? schemes.user;

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      localStorage.clear();
      navigate("/", { replace: true });
      setIsOpen(false);
    }
  };

  const itemsTop = GetMenuItems(userGroup); // should return {labelKey, sideBarLink}

  const itemsBottom = [
    { labelKey: "sidebar.HelpOrg" },
    { labelKey: "sidebar.User" },
    { labelKey: "sidebar.Logout", action: handleLogout },
  ];

  const actionEl = "block w-full text-center hover:underline";

  return (
    <div className="mt-16">
      {/* Hamburger (mobile) */}
      <button
        className="fixed top-4 right-4 text-white lg:hidden z-50"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? t("Close") : t("Open menu")}
      >
        {isOpen ? <FaTimes size="30" /> : <FaBars size="25" />}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 right-0 h-screen w-screen z-40 bg-noq-green transform transition-transform duration-200 
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:w-64 lg:translate-x-0 lg:right-auto lg:left-0 lg:z-0 `}
        aria-label="Huvudmeny"
      >
        <div className="h-full flex items-center justify-center px-6">
          <ul className="w-full max-w-xs space-y-2 text-center" role="menu">
            {itemsTop.map(({ labelKey, sideBarLink, action }) => (
              <li className={liStyle} key={sideBarLink ?? labelKey} role="none">
                {sideBarLink ? (
                  <NavLink
                    to={sideBarLink}
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(labelKey)}
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      action?.();
                      setIsOpen(false);
                    }}
                  >
                    {t(labelKey)}
                  </button>
                )}
              </li>
            ))}

            {itemsBottom.map(({ labelKey, sideBarLink, action }) => (
              <li className={liStyle} key={sideBarLink ?? labelKey} role="none">
                {sideBarLink ? (
                  <NavLink
                    to={sideBarLink}
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(labelKey)}
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    role="menuitem"
                    className={actionEl}
                    onClick={() => {
                      action?.();
                      setIsOpen(false);
                    }}
                  >
                    {t(labelKey)}
                  </button>
                )}
              </li>
            ))}
            {userGroup === "user" && (
              //Language Translation for "User/Guest"
              <li role="none" className="pt-2">
                <div className="relative text-right">
                  <label className="sr-only" htmlFor="lang">
                    Language
                  </label>
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
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Overlay for Mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/0 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
