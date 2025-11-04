import { useTranslation } from "react-i18next";

export default function GetMenuItems(userGroup) {
  const { t } = useTranslation();

  const host = [
    {
      labelKey: t("sidebar.Overview"),
      sideBarLink: "host",
    },
    {
      labelKey: t("sidebar.Volunteers"),
      sideBarLink: "host/volunteerlist",
    },
    {
      labelKey: t("sidebar.Requests"),
      sideBarLink: "host/requests",
    },
    {
      labelKey: t("sidebar.Calendar"),
      sideBarLink: "host/calendar",
    },
    {
      labelKey: t("sidebar.MyRooms"),
      sideBarLink: "host/products",
    },
    {
      labelKey: t("sidebar.VolunteerMgmt"),
      sideBarLink: "host/volunteers",
    },
  ];

  const caseworker = [
    {
      labelKey: t("sidebar.Overview"),
      sideBarLink: "caseworker",
    },
    {
      labelKey: t("sidebar.Requests"),
      sideBarLink: "caseworker/requests",
    },
    {
      labelKey: t("sidebar.Users"),
      sideBarLink: "caseworker/users",
    },
    {
      labelKey: t("sidebar.Stats"),
      sideBarLink: "caseworker/statistics",
    },
  ];

  const user = [
    {
      labelKey: t("sidebar.FindAssig"),
      sideBarLink: "user",
    },
    {
      labelKey: t("sidebar.Reservations"),
      sideBarLink: "user/requests",
    },
  ];

  const volunteer = [
    {
      labelKey: t("sidebar.FindAssig"),
      sideBarLink: "volunteer",
    },
    {
      labelKey: t("sidebar.MyWork"),
      sideBarLink: "volunteer/compass", // this route need to be changed to it's new destination
    },
    {
      labelKey: t("sidebar.Activities"),
      sideBarLink: "activities",
    },
  ];

  switch (userGroup) {
    case "host":
      return host;
    case "caseworker":
      return caseworker;
    case "volunteer":
      return volunteer;
    default:
      return user;
  }
}
