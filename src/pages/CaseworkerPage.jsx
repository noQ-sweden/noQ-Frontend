import React, { useEffect, useState } from 'react';
import axios from "./../api/AxiosNoqApi";

export default function CaseworkerPage() {
    const [ caseworkerText, setCaseworkerText ] = useState("");

    useEffect( () => {
        axios.get ('api/caseworker')
        .then ((response) => {
        if (response.status === 200) {
            setCaseworkerText(response?.data);
        } else {
            console.log('Error while fetching caseworker data.');
        }
        })
        .catch((error) => {
        console.log("Error while fetching caseworker data.", error);
        });
    }, []);
    return (
        <>
            <div>
                <h1>{caseworkerText}</h1>
            </div>
        </>
    )
}