import {
    FaChartPie,
    FaReceipt,
    FaBell,
    FaUser,
    FaRandom,
    FaCalendarAlt,
    FaChartBar,
  } from "react-icons/fa";
import { useTranslation } from "react-i18next";
 

export default function GetMenuItems(userGroup) {
    const { t, i18n } = useTranslation();
    
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
        { icon: FaBell, label: "Förfrågningar", sideBarLink: "caseworker/requests" },
        { icon: FaUser, label: "Användare", sideBarLink: "caseworker/users" },
        { icon: FaChartBar, label: "Statistik", sideBarLink: "caseworker/statistics" },
    ];

    const userSidebarItemsTop = [
        { icon: FaChartPie, label: t("sidebar.Book"), sideBarLink: "user" },
        { icon: FaBell, label: t("sidebar.Reservations"), sideBarLink: "user/requests" },
    ];

    const volunteerSidebarItemsTop = [
        { icon: FaChartPie, label: "Boka", sideBarLink: "volunteer" },
    ];



    if (userGroup == "caseworker") {
        return caseworkerSidebarItemsTop;
    } else if (userGroup == "host") {
        return hostSidebarItemsTop;
    } else if(userGroup == "volunteer") {
        return volunteerSidebarItemsTop;
    } else {
        return userSidebarItemsTop
    }
}
