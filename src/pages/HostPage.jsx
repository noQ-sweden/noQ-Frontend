import React, { useEffect } from "react";
import axios from "./../api/AxiosNoqApi";
import Overview from "../components/Admin/Overview";
import RoomStatus from "../components/Admin/RoomStatus";
import WeeklyRoomStatus from "../components/Admin/WeeklyRoomStatus";
import useHost from "./../hooks/useHost";
import useHeader from "./../hooks/useHeader";
import OutgoingGuests from "../components/Admin/OutgoingGuests";
import IncomingGuests from "../components/Admin/IncomingGuests";
import RequestList from "./../components/RequestsPage/RequestList";
import Panel from "./../components/Common/Panel";
import { GetBookingConfig } from "./../components/RequestsPage/GetBookingConfig";
import PropTypes from "prop-types";

import SEO from "../components/SEO";

export default function HostPage({ first_name }) {
  const { setHost } = useHost();
  const { setHeader } = useHeader();

  useEffect(() => {
    // inside useEffect to avoid update during render
    setHeader("Överblick");
    axios
      .get("api/host")
      .then((response) => {
        if (response.status === 200 && response.data != "Host not found") {
          setHost(response?.data);
        } else {
          console.log("Error while fetching host data.");
        }
      })
      .catch((error) => {
        console.log("Error while fetching host data.", error);
      });
  }, [setHost, setHeader]);

  return (
    <>
      <SEO title={`Gäst Sida | NoQ - Trygg Plats för att alla förtjänar det`} />
      <div
        className="grid p-3 grid-cols-5 justify-items-start gap-4"
        id="HostPage"
      >
        <div className="pl-3 flex flex-row gap-4 col-span-3">
          <div className="flex flex-col">
            <Overview />
            <RoomStatus />
            <WeeklyRoomStatus />
          </div>
        </div>
        <div className="pl-3 pr-3 flex flex-row gap-4 col-span-2 justify-start">
          <div className="flex flex-col">
            <Panel title="Förfrågningar">
              <RequestList compact={true} config={GetBookingConfig("host")} />
            </Panel>
            <IncomingGuests />
            <OutgoingGuests />
          </div>
        </div>
      </div>
    </>
  );
}

HostPage.propTypes = {
  first_name: PropTypes.string,
};
