import React, {useState, useEffect } from "react";
import axios from "../../api/AxiosNoqApi";
import checkedInIcon from "./../../assets/images/checkedInIcon.svg";
import freePlacesIcon from "./../../assets/images/freePlacesIcon.svg";
import requestsIcon from "./../../assets/images/requestsIcon.svg";
import checkingOutIcon from "./../../assets/images/checkingOutIcon.svg";
import Panel from "../Common/Panel";
import Card from "../Common/Card";

export default function RoomStatus() {

    useEffect( () => {
        // /api/host/available/{nr_of_days}
        axios.get ('/api/host/available/1')
        .then ((response) => {
        if (response.status === 200) {
            console.log(response.data);
        } else {
            console.log('Error while fetching overview data.');
        }
        })
        .catch((error) => {
        console.log("Error while fetching overview data.", error);
        });
    }, []);

    return (
        <Panel title="Lediga Rum">
            <div className="columns-4 gap-5">
                <Card
                    title="Incheckade"
                    unit="Personer"
                    content="4"
                />
                <Card
                    title="Lediga platser"
                    unit="Platser"
                    content="3"
                />
                <Card
                    title="Förfrågningar"
                    unit="Platser"
                    content="4"
                />
                <Card
                    title="Utcheckning"
                    unit="Personer"
                    content="5"
                />
            </div>
        </Panel>
    )
}