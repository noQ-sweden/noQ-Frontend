import React, { useEffect } from "react";
import axios from "./../api/AxiosNoqApi"
import Overview from "./../components/Admin/Overview";
import RoomStatus from "./../components/Admin/RoomStatus";
import UserInfo from "./../components/Admin/UserInfo";
import useHost from "./../hooks/useHost";
import RequestList from "./../components/RequestsPage/RequestList"
import Panel from "./../components/Common/Panel"

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
            <div className="flex flex-col" id="HostPage">
                <div className="pl-4 flex flex-row gap-5">
                    <Overview className="max-w-64" />
                    <UserInfo className="max-w-36" />
                </div>
                <div className="pl-4 flex flex-row gap-5">
                    <RoomStatus className="max-w-64 h-auto" />
                    <Panel title="Förfrågningar">
                        <RequestList className="max-w-36 h-auto" />
                    </Panel>
                </div>
            </div>
        </>
    )
}