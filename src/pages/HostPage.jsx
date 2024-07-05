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
            <div className="grid grid-cols-2" id="HostPage">
                <div className="pl-3 flex flex-row gap-4">
                    <div className="flex flex-col">
                        <Overview />
                        <RoomStatus />
                    </div>
                </div>
                <div className="pl-3 pr-3 flex flex-row gap-4">
                    <div className="flex flex-col">
                        <UserInfo />
                        <Panel title="Förfrågningar">
                            <RequestList
                                compact={true}
                            />
                        </Panel>
                    </div>
                </div>
            </div>
        </>
    )
}