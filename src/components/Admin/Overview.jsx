import React, {useState, useEffect } from "react";
import axios from "../../api/AxiosNoqApi";
import checkedInIcon from "./../../assets/images/checkedInIcon.svg";
import freePlacesIcon from "./../../assets/images/freePlacesIcon.svg";
import requestsIcon from "./../../assets/images/requestsIcon.svg";
import checkingOutIcon from "./../../assets/images/checkingOutIcon.svg";
import Panel from "../Common/Panel";
import Card from "../Common/Card";
import useUpdate from "./../../hooks/useUpdate";

export default function Overview() {
    const initialCounts = {checkedIn: 0, incoming: 0, pending: 0, checkingOut: 0};
    const { updateData } = useUpdate();
    const [counts, setCounts] =
        useState(initialCounts);
    
    useEffect( () => {
        axios.get ('api/host/count_bookings')
        .then ((response) => {
        if (response.status === 200) {
            const counts = {
                checkedIn: response?.data?.current_guests_count,
                incoming: response?.data?.arrivals_count,
                pending: response?.data?.pending_count,
                checkingOut: response?.data?.departures_count
            };
            setCounts(counts);
        } else {
            console.log('Error while fetching overview data.');
        }
        })
        .catch((error) => {
        console.log("Error while fetching overview data.", error);
        });
    }, [updateData]);

    return (
            <Panel title="Överblick">
                <div className="columns-4 gap-5">
                    <Card
                        title="Förfrågningar"
                        content={counts.pending}
                        icon={requestsIcon}
                    />
                    <Card
                        title="Kommande"
                        content={counts.incoming}
                        icon={checkedInIcon}
                    />
                    <Card
                        title="Incheckade"
                        content={counts.checkedIn}
                        icon={freePlacesIcon}
                    />
                    <Card
                        title="Utcheckning"
                        content={counts.checkingOut}
                        icon={checkingOutIcon}
                    />
                </div>
            </Panel>
    )
}