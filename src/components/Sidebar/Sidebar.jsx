import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import useLogin from "./../../hooks/useLogin";
import useLogout from "../../hooks/useLogout";
import GetMenuItems from "./GetMenuItems";
import { useTranslation } from "react-i18next";
import noQiconWhite from "../../assets/images/noQiconWhite.svg";

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
      window.location.reload();
    }
  };

  const itemsTop = GetMenuItems(userGroup); // should return {labelKey, sideBarLink}

  const itemsBottom = [
    { labelKey: "sidebar.HelpOrg" },
    { labelKey: "sidebar.User" },
    { labelKey: "sidebar.Logout", action: handleLogout },
  ];

  const actionEl = "block w-full text-center hover:underline";

  const renderItem = ({ labelKey, sideBarLink, action }) => (
    <li className={liStyle} key={sideBarLink ?? labelKey} role="none">
      {sideBarLink ? (
        <NavLink
          to={sideBarLink}
          role="menuitem"
          className={actionEl}
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
  );

  const renderLanguageSelector = () => (
    <li role="none" className="pt-2">
      <div className="relative text-right">
        <label className="sr-only" htmlFor="lang">
          Language
        </label>
        <select
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="text-gray-700 rounded px-4 py-2"
          defaultValue={i18n.language}
        >
          <option value="sv">Svenska</option>
          <option value="en">English</option>
          <option value="pl">Polski</option>
          <option value="ro">Română</option>
        </select>
      </div>
    </li>
  );

  return (
    <div>
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
        className={`fixed top-0 right-0 h-screen w-screen z-40 bg-noq-green transform transition-transform duration-200 flex flex-col
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        lg:sticky lg:top-0 lg:h-[calc(100vh)] lg:w-64 lg:translate-x-0 lg:right-auto lg:left-0 lg:z-0 `}
        aria-label="Huvudmeny"
      >
        {userGroup === "volunteer" && (
          <div className="px-6 pt-6 pb-16 shrink-0">
            <img
              src={noQiconWhite}
              alt="noQ"
              className="block mx-auto w-24 xl:w-28"
            />
          </div>
        )}
        <div className="flex-1 flex flex-col px-6 overflow-y-auto">
          <ul className="flex-1 flex flex-col gap-2 text-center" role="menu">
            {itemsTop.map(renderItem)}
            {itemsBottom
              .filter((i) => i.labelKey !== "sidebar.Logout")
              .map(renderItem)}
            {userGroup === "user" && renderLanguageSelector()}
          </ul>
          <ul className="text-center" role="menu">
            {itemsBottom
              .filter((i) => i.labelKey === "sidebar.Logout")
              .map(({ labelKey, sideBarLink, action }) => (
                <li
                  key={sideBarLink ?? labelKey}
                  role="none"
                  className={`${liStyle} mt-auto`}
                >
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
                </li>
              ))}
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
