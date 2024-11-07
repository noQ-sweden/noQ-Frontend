import {
  FaChartPie,
  FaReceipt,
  FaBell,
  FaUser,
  FaRandom,
  FaCalendarAlt,
  FaChartBar,
} from "react-icons/fa";

export default function GetMenuItems(userGroup) {
  const hostSidebarItemsTop = [
    { icon: FaChartPie, label: "Överblick", sideBarLink: "host" },
    { icon: FaBell, label: "Förfrågningar", sideBarLink: "host/requests" },
    { icon: FaCalendarAlt, label: "Kalender" },
    { icon: FaRandom, label: "Mina Rum", sideBarLink: "host/products" },
    { icon: FaRandom, label: "Härberget" },
    { icon: FaUser, label: "Gäster" },
    { icon: FaReceipt, label: "Fakturering" },
  ];

  const caseworkerSidebarItemsTop = [
    { icon: FaChartPie, label: "Överblick", sideBarLink: "caseworker" },
    {
      icon: FaBell,
      label: "Förfrågningar",
      sideBarLink: "caseworker/requests",
    },
    {
      icon: FaUser,
      label: "Användare",
      sideBarLink: "caseworker/user-management",
    },
    {
      icon: FaChartBar,
      label: "Statistik",
      sideBarLink: "caseworker/statistics",
    },
  ];

  const userSidebarItemsTop = [
    { icon: FaChartPie, label: "Överblick", sideBarLink: "user" },
    { icon: FaBell, label: "Bokningar", sideBarLink: "user/requests" },
  ];

  if (userGroup == "caseworker") {
    return caseworkerSidebarItemsTop;
  } else if (userGroup == "host") {
    return hostSidebarItemsTop;
  } else {
    return userSidebarItemsTop;
  }
}
