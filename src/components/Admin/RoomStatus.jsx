import React, {useState, useEffect } from "react";
import axios from "../../api/AxiosNoqApi";
import freePlacesIcon from "./../../assets/images/freePlacesIcon.svg";
import Panel from "../Common/Panel";
import Card from "../Common/Card";

export default function RoomStatus() {
    const [availableDates, setAvailableDates] = useState({})

    useEffect( () => {
        // /api/host/available/{nr_of_days}
        axios.get ('/api/host/available/1')
        .then ((response) => {
        if (response.status === 200) {
            console.log(response.data);
            console.log(response.data.available_dates);
            console.log(response.data['available_dates']);
            setAvailableDates(response.data.available_dates)
        } else {
            console.log('Error while fetching overview data.');
        }
        })
        .catch((error) => {
        console.log("Error while fetching overview data.", error);
        });
    }, []);

    return (
        <Panel title="Lediga platser idag">
            { Object.keys(availableDates).map((key, index) => (
                <div key={key} className="flex flex-row gap-5">
                    { availableDates[key].map((availability) => (
                        <div key={availability.id} >
                            <Card
                                title={availability.product.description}
                                unit="Places"
                                content={
                                    availability.places_left + " / "
                                    + availability.product.total_places}
                                icon={freePlacesIcon}
                           />
                        </div>
                    ))}
                </div>
            ))}
       </Panel>
    )
}
