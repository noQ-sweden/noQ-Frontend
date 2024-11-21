import React, { useEffect} from 'react';
import axios from './../api/AxiosNoqApi';
import StatisticsPageHeader from "../components/CaseworkerStatisticsPage/StatisticsPageHeader"

const CaseworkerStatisticsPage = () => {

    useEffect( () => {
        let url = "api/caseworker/guests/nights/count/2024-10-01/2024-10-31"
        axios.get (url)
        .then ((response) => {
            if (response.status === 200) {
            } else {
                console.log('Error while fetching overview data.');
            }
        })
        .catch((error) => {
            console.log("Error while fetching overview data.", error);
        });
    }, []);

    return (
      <StatisticsPageHeader/>
    );
};

export default CaseworkerStatisticsPage;