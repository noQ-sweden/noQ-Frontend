import React from "react";
import {
  FaCog,
  FaChartPie,
  FaCalendarAlt,
  FaReceipt,
  FaUser,
  FaBell,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Sidebar() {
  const liStyle =
    "hover:bg-gray-300 py-5 border-b-4 border-green-noQ hover:text-green-noQ";
  const liTextStyle = "flex gap-4 pl-16";
  return (
    <>
      <div className="flex-col flex-grow text-white shadow-xl flex min-w-80 max-w-80 h-screen bg-green-noQ  m-0 ">
        <ul className="bg-green-noQ mt-6 text-xl">
          <div className="flex my-6 pl-16">
            <a href="/">
              <img src="noQicon.bmp" style={{ width: "120px" }} alt="logo" />
            </a>
          </div>
          <li className={liStyle}>
            <span className={liTextStyle}>
              <FaChartPie size="25" /> Överblick
            </span>
          </li>
          <li className={liStyle}>
            <span className={liTextStyle}>
              <FaCalendarAlt size="25" /> Kalender
            </span>
          </li>
          <li className={liStyle}>
            <span className={liTextStyle}>
              <FaBell size="25" /> Förfrågan
            </span>
          </li>
          <li className={liStyle}>
            <span className={liTextStyle}>
              <FaUser size="25" /> Gäster
            </span>
          </li>
          <li className={liStyle}>
            <span className={liTextStyle}>
              <FaReceipt size="25" /> Fakturering
            </span>
          </li>
          <li className={liStyle}>
            <span className={liTextStyle}>
              <FaCog size="25" /> Inställningar
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
