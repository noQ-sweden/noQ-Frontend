import React, {useState, useEffect } from "react";
import axios from "./../../api/AxiosNoqApi";
import checkedInIcon from "./../../assets/images/checkedInIcon.svg";
import freePlacesIcon from "./../../assets/images/freePlacesIcon.svg";
import requestsIcon from "./../../assets/images/requestsIcon.svg";
import checkingOutIcon from "./../../assets/images/checkingOutIcon.svg";

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

    const imageWidth = 40;
    const boxStyle = "bg-background-white rounded-lg border border-overview-border p-4"
    const imageStyle = "mb-4"

    return (
        <div className="flex flex-col items-left bg-white rounded-lg p-5">
        <div className=" text-black text-xl font-semibold text-left mb-3">
            Överblick
        </div>
        <div className="columns-4 gap-5">
            <div className={boxStyle}>
                <img src={checkedInIcon} alt="Checked In Icon" width={imageWidth} className={imageStyle} />
                <p className="text-lg font-semibold">{counts.checkedIn}</p>
                <p className="text-sm">Incheckade</p>
            </div>
            <div className={boxStyle}>
                <img src={freePlacesIcon} alt="Checked In Icon" width={imageWidth} className={imageStyle} />
                <p className="text-lg font-semibold">{counts.free}</p>
                <p className="text-sm">Lediga platser</p>
            </div>
            <div className={boxStyle}>
                <img src={requestsIcon} alt="Checked In Icon" width={imageWidth} className={imageStyle} />
                <p className="text-lg font-semibold">{counts.pending}</p>
                <p className="text-sm">Förfrågningar</p>
            </div>
            <div className={boxStyle}>
                <img src={checkingOutIcon} alt="Checked In Icon" width={imageWidth} className={imageStyle} />
                <p className="text-lg font-semibold">{counts.checkingOut}</p>
                <p className="text-base">Utcheckning</p>
            </div>
        </div>
        </div>
    )
}