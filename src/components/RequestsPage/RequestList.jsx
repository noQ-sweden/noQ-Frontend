import React, { useState, useEffect } from 'react';
import axios from './../../api/AxiosNoqApi';


export default function RequestList() { 

    const [requests, setRequests] = useState([]);
    const [undoRequests, setUndoRequests] = useState([]);

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

    const getStatus = (status) => {
        if (status === 'accepted') {
            return "Tilldelat";
        } else if (status === 'declined') {
            return "Nekad";
        } else {
            return ""
        }
    }

    const handleAssignOnClick = (bookingId) => {
        const url = "api/host/pending/" + bookingId + "/appoint";
        axios.patch (url)
            .then (function (response) {
                console.log(response);
                if (response.status === 200 && response?.data !== "") {
                    undoRequests.push(response?.data);
                    setUndoRequests(undoRequests);
                    fetchPendingRequests();
                }
            })
            .catch((error) => {
                console.log("Error while updating booking status to accepted.", error);
            });
    }

    const handleRejectOnClick = (bookingId) => {
        const url = "api/host/pending/" + bookingId + "/decline";
        axios.patch (url)
            .then (function (response) {
                console.log(response);
                if (response.status === 200 && response?.data !== "") {
                    undoRequests.push(response?.data);
                    setUndoRequests(undoRequests);
                    fetchPendingRequests();
                }
            })
            .catch((error) => {
                console.log("Error while updating booking status to accepted.", error);
            });
    }

    const handleUndoOnClick = (bookingId) => {
        const url = "api/host/bookings/" + bookingId + "/setpending";
        axios.patch (url)
            .then (function (response) {
                console.log(response);
                if (response.status === 200 && response?.data !== "") {
                    const idx = undoRequests.findIndex(obj => obj.id === parseInt(bookingId));
                    if (idx > -1) {
                        undoRequests.splice(idx, 1);
                    }
                    setUndoRequests(undoRequests);
                    fetchPendingRequests();
                }
            })
            .catch((error) => {
                console.log("Error while updating booking status to accepted.", error);
            });
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
            <h2 className='text-2xl mb-4'>Förfrågningar</h2>
            { requests.map(request => (
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
            { undoRequests.length > 0 &&
                <h2 className='text-2xl mb-4 mt-8'>Senaste ändringar</h2>
            }
            { undoRequests.map(undoRequest => (
                <div key={undoRequest.id} className='
                    grid
                    grid-cols-[70px_150px_2fr_2fr_100px]
                    rounded
                    border-2
                    border-800-green
                    p-2
                    '>
                    <div className='grid grid-rows-1 items-center text-left font-bold text-xl text-green-noQ'>
                        { getStatus(undoRequest.status.description) }
                    </div>
                    <div className='grid grid-rows-1 items-center text-center'>
                        <div className='leading-3'>
                            <p className='font-bold text-2xl'>{ getDayNumber(undoRequest.start_date) }</p>
                            <p className='text-lg'>{ getMonth(undoRequest.start_date) }</p>
                        </div>
                    </div>
                    <div className='grid grid-rows-1 gap-1 items-center text-left'>
                        <div><b>Värd:</b> { undoRequest.product.host.name }</div>
                        <div><b>Rumstyp:</b> { undoRequest.product.type }</div>
                    </div>
                    <div className='grid grid-rows-1 gap-1 items-center text-left'>
                        <div><b>Unokod:</b> { undoRequest.user.unokod }</div>
                        <div><b>Kön:</b> { getGender(undoRequest.user.gender) }</div>
                    </div>
                    <div className='grid grid-rows-1 gap-2 items-right'>
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
                                onClick={() => handleUndoOnClick(undoRequest.id)}>
                                Ångra
                            </button>
                        </div>
                    </div>
                </div>
            ))}

        </div>
        
    );
}

