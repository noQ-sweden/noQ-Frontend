import axios from "./../../api/AxiosNoqApi";
import React, { useState, useEffect } from 'react';
import { BsChatRightText } from "react-icons/bs";

export default function RequestList() {

    const [requests, setRequests] = useState([]);

    const handleAssignOnClick = (id) => {
        console.log(id);
    }

    const handleRejectOnClick = (id) => {
        const mockRequests = requests.filter(request => request.id !== id);
        setRequests(mockRequests);
        console.log(id);
    }

    const getDayNumber = (date) => {
        const values = date.split('-');
        return values[2];
    }

    const getMonth = (date) => {
        const values = date.split('-');
        var month = '';
        switch(values[1]) {
            case '01':
                month="JAN";
                break;
            case '02':
                month="FEB";
                break;
            case '03':
                month="MAR";
                break;
            case '04':
                month="APR";
                break;
            case '05':
                month="MAJ";
                break;
            case '06':
                month="JUN";
                break;
            case '07':
                month="JUL";
                break;
            case '08':
                month="AUG";
                break;
            case '09':
                month="SEP";
                break;
            case '10':
                month="OCT";
                break;
            case '11':
                month="NOV";
                break;
            default:
                month="DEC";
        }
        return month;
    }

    const getGender = (gender) => {
        if (gender === 'K') {
            return "Kvinna";
        } else if (gender === 'M') {
            return "Man";
        } else {
            return "Annan"
        }
    }

    const fetchPendingRequests = async () => {
        axios.get ('api/host/pending')
            .then (function (response) {
                if (response.status === 200) {
                    setRequests(response?.data);
                }
            })
            .catch((error) => {
                console.log("Error while fetching pending bookings.", error);
            });
    }

    useEffect(() => {
        fetchPendingRequests();
    }, []); 

    return (
        <div className="grid grid-cols-1 gap-2">
            {requests.map(request => (
                <div key={request.id} className='
                    grid
                    grid-cols-[10px_150px_2fr_2fr_100px]
                    rounded
                    border-2
                    border-800-green
                    p-2
                    '>
                    <div className='grid grid-rows-1 items-center text-center'>
                        <input className='size-4' type="checkbox" />
                    </div>
                    <div className='grid grid-rows-1 items-center text-center'>
                        <div className='leading-3'>
                            <p className='font-bold text-2xl'>{getDayNumber(request.start_date)}</p>
                            <p className='text-lg'>{getMonth(request.start_date)}</p>
                        </div>
                    </div>
                    <div className='grid grid-rows-1 gap-1 items-center text-left'>
                        <div><b>Värd:</b> {request.product.host.name}</div>
                        <div><b>Rumstyp:</b> {request.product.type}</div>
                    </div>
                    <div className='grid grid-rows-1 gap-1 items-center text-left'>
                        <div><b>Unokod:</b> {request.user.unokod}</div>
                        <div><b>Kön:</b> {getGender(request.user.gender)}</div>
                    </div>
                    <div className='grid grid-rows-2 gap-2 items-right'>
                        <div>
                            <button className="
                                bg-green-600
                                hover:bg-green-700
                                text-white
                                font-semibold
                                text-m
                                align-middle
                                w-20
                                h-7
                                rounded
                                focus:outline-none
                                focus:shadow-outline"
                                onClick={() => handleAssignOnClick(request.id)}>
                                Tilldela
                            </button>
                        </div>
                        <div>
                            <button className="
                                bg-gray-200
                                hover:bg-gray-300
                                border-slate-800
                                text-gray-500
                                font-semibold
                                text-m
                                align-middle
                                w-20
                                h-7
                                rounded
                                focus:outline-none
                                focus:shadow-outline"
                                onClick={() => handleRejectOnClick(request.id)}>
                                Neka
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
