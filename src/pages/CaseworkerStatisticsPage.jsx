import React, { useEffect, useState } from 'react';
import axios from './../api/AxiosNoqApi';
import StatisticsPageHeder from "../components/CaseworkerStatisticsPage/StatisticsPageHeder"

const CaseworkerStatisticsPage = () => {

    useEffect( () => {
        let url = "api/caseworker/guests/nights/count/2024-10-01/2024-10-31"
        axios.get (url)
        .then ((response) => {
            if (response.status === 200) {
              //console.log(response.data);
            } else {
                console.log('Error while fetching overview data.');
            }
        })
        .catch((error) => {
            console.log("Error while fetching overview data.", error);
        });
    }, []);

    return (
      <StatisticsPageHeder/>
    );
};

export default CaseworkerStatisticsPage;