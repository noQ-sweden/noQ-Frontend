import React, { useState, useEffect } from "react";
import useLogin from "./../../hooks/useLogin";
import axios from './../../api/AxiosNoqApi';
import { FaRegEnvelope, FaBell, FaCaretDown, FaQuestionCircle } from "react-icons/fa";

export default function Navbar() {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const { login } = useLogin();
    const [hostInfo, setHostInfo] = useState(null);
    //TODO: Functionality for messages and alerts is not in place yet.
    //      Displaying 0 messages and alerts for now.
    const [nrOfMessages, /*setNrOfMessages*/] = useState(0);
    const [nrOfAlerts, /*setNrOfAlert*/] = useState(0);

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const fetchHostInfo = async() => {
        axios.get('api/host')
            .then (function (response) {
                if (response.status == 200) {
                    setHostInfo(response?.data);
                }
            })
            .catch((error) => {
              console.log("Error while fetching host information.", error);
            });
    }

    const getInitials = (username) => {
        const names = username.split('.');
        let initials = "";
        return initials.concat(names[0][0], names[1][0]).toUpperCase();
    }

    useEffect(() => {
        fetchHostInfo();
    }, []);

    return (
        <nav className="flex items-center justify-between p-4 bg-white">
            <div className="my-6 text-3xl sm:mb-0 lg:flex justify-center font-bold">{hostInfo?.name}</div>
            <div className="flex items-center space-x-10"> {/* Adjusted space-x value */}
                <div className="relative">
                    <FaRegEnvelope className="size-6 fill-almost-black" />
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{nrOfMessages}</span>
                </div>
                <div className="relative">
                    <FaBell className="size-6 fill-almost-black" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{nrOfAlerts}</span>
                </div>
                <div className="relative flex items-center space-x-2 cursor-pointer" onClick={toggleUserDropdown}>
                    <div className="bg-green-noQ text-white rounded-full w-8 h-8 flex items-center justify-center">{getInitials(login?.username)}</div>
                    <div className="text-sm">{login?.username}</div>
                    <FaCaretDown />
                </div>
                <FaQuestionCircle className="text-2xl text-green-noQ ml-4" /> {/* Added ml-4 margin class */}
            </div>
        </nav>
    );
}
