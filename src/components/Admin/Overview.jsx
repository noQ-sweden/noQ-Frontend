import React, {useState, useEffect } from "react";
import axios from "../../api/AxiosNoqApi";
import checkedInIcon from "./../../assets/images/checkedInIcon.svg";
import freePlacesIcon from "./../../assets/images/freePlacesIcon.svg";
import requestsIcon from "./../../assets/images/requestsIcon.svg";
import checkingOutIcon from "./../../assets/images/checkingOutIcon.svg";
import Panel from "../Common/Panel";
import Card from "../Common/Card";

export default function Overview() {
    const initialCounts = {checkedIn: 0, free: 0, pending: 0, checkingOut: 0};
    const [counts, setCounts] =
        useState(initialCounts);
    
    useEffect( () => {
        axios.get ('api/host/count_bookings')
        .then ((response) => {
        if (response.status === 200) {
            let freeCount = 0;
            const products = response?.data?.available_products;
            for (let product in products) {
                freeCount += parseInt(products[product]);
            }
            const counts = {
                checkedIn: response?.data?.current_guests_count,
                free: freeCount,
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
    }, []);

    return (
        <Panel title="Överblick">
            <div className="columns-4 gap-5">
                <Card
                    title="Incheckade"
                    unit="Personer"
                    content={counts.free}
                    icon={checkedInIcon}
                />
                <Card
                    title="Lediga platser"
                    unit="Platser"
                    content={counts.checkedIn}
                    icon={freePlacesIcon}
                />
                <Card
                    title="Förfrågningar"
                    unit="Platser"
                    content={counts.pending}
                    icon={requestsIcon}
                />
                <Card
                    title="Utcheckning"
                    unit="Personer"
                    content={counts.checkingOut}
                    icon={checkingOutIcon}
                />
            </div>
        </Panel>
    )
}