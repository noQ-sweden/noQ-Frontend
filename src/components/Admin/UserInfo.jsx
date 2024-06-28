import React, {useState, useEffect } from "react";
import axios from "./../../api/AxiosNoqApi";
import useLogin from "./../../hooks/useLogin";
import tempUserIcon from "./../../assets/images/user.png";
import mailIcon from "./../../assets/images/mailIcon.svg";
import bellIcon from "./../../assets/images/bellIcon.svg";

export default function UserInfo() {
    const [messages, setmessages] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [userImage, setUserImage] = useState({tempUserIcon});
    const { login, setLogin } = useLogin();

    const imageWidth = 100;
    const boxStyle = "bg-white rounded-lg border border-overview-border p-1.5 m-4  mt-0 w-10 h-10 min-w-5 min-h-5 align-center"

    const getRoleName = (role) => {
        if (role === "host") {
            return "Värd";
        } else if (role === "officier") {
            return "Handläggare";
        } else {
            return "Användare";
        }
    }

    return (
        <div className="flex flex-row items-start">
            <div className={boxStyle}>
                <img src={mailIcon} alt="Mail Icon" width={imageWidth} />
            </div>
            <div className={boxStyle}>
                <img src={bellIcon} alt="Bell Icon" width={imageWidth} />
            </div>
            <div className="flex flex-row bg-white max-h-20 p-4 rounded-lg m-4 mt-0">
                <img src={tempUserIcon} alt="User Image" width="60" className="rounded-1" />
                <div className="flex flex-col ml-3">
                    <p className="text-lg font-semibold">{login?.username}</p>
                    <p className="text-sm">{getRoleName(login?.usergroups[0])}</p>
                </div>
            </div>
        </div>
    )
}