import React, { useEffect } from "react";
import axios from "./../api/AxiosNoqApi"


import useHost from "./../hooks/useHost";

import AccommodationList from "./../components/User/AccommodationList";
import AccommodationPanel from "../components/User/AccommodationPanal";
import { Routes, Route } from "react-router-dom";

export default function UserPage() {
    const { setHost } = useHost();

    useEffect( () => {
        axios.get ('api/host')
        .then ((response) => {
        if (response.status === 200 && response.data != "Host not found") {
            setHost(response?.data);
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
            <div className="grid p-3 grid-cols-5 justify-items-start gap-4" id="HostPage">
                <div className="pl-3 flex flex-row gap-4 col-span-3">
                    <div className="flex flex-col">
                        <AccommodationPanel title="Välj boände">
                        <AccommodationList />
                        </AccommodationPanel>
                    </div>
                </div>
               
            </div>
        </>
    )
}