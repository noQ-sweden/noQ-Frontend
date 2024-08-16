import React, { useEffect } from "react";
import axios from "./../api/AxiosNoqApi"
import Overview from "../components/Admin/Overview";
import RoomStatus from "../components/Admin/RoomStatus";
import WeeklyRoomStatus from "../components/Admin/WeeklyRoomStatus";
import useHost from "./../hooks/useHost";
import OutgoingGuests from "../components/Admin/OutgoingGuests";
import IncomingGuests from "../components/Admin/IncomingGuests";
import RequestList from "./../components/RequestsPage/RequestList";
import Panel from "./../components/Common/Panel";


export default function HostPage() {
    const { setHost } = useHost();

    useEffect( () => {
        axios.get ('api/host')
        .then ((response) => {
        if (response.status === 200 && response.data != "Host not found") {
            setHost(response?.data);
            console.log(response.data);
        } else {
            console.log('Error while fetching host data.');
        }
        })
        .catch((error) => {
        console.log("Error while fetching host data.", error);
        });
    }, [ setHost ]);

    return (
        <>
            <div className="grid grid-cols-2" id="HostPage">
                <div className="pl-3 flex flex-row gap-4">
                    <div className="flex flex-col">
                        <Overview />
                        <RoomStatus />
                        <WeeklyRoomStatus />
                    </div>
                </div>
                <div className="pl-3 pr-3 flex flex-row gap-4">
                    <div className="flex flex-col">
                        <Panel title="Förfrågningar">
                            <RequestList
                                compact={true}
                            />
                        </Panel>
                        <IncomingGuests />
                        <OutgoingGuests />

                    </div>
                </div>
            </div>
        </>
    )
}