import React, { useState, useEffect } from 'react';
import { BsChatRightText } from "react-icons/bs";

export default function RequestList({ setShowPopup, setShowTable, requests: propRequests }) { 

    const [requests, setRequests] = useState([]);

    const handleAssignOnClick = (id) => {
        setShowPopup(true);
        setShowTable(false);
        console.log(id);
    }

    const handleRejectOnClick = (id) => {
        // Filter out the request with the given id
        const updatedRequests = requests.filter(request => request.id !== id);
        // Update the state with the filtered requests
        setRequests(updatedRequests);
        console.log(id);
    }

    // Update the requests state when propRequests change
    useEffect(() => {
        if (Array.isArray(propRequests)) {
            setRequests(propRequests);
        }
    }, [propRequests]);

    return (
        <div className="grid grid-cols-1 gap-4">
            <div className='grid grid-cols-9 gap-2 text-center'>
                <h3 className='text-xl'>Välj Flera</h3>
                <h3 className='text-xl'>Värd</h3>
                <h3 className='text-xl'>Meddelande</h3>
                <h3 className='text-xl'>Mottagen</h3>
                <h3 className='text-xl'>Rumstyp</h3>
                <h3 className='text-xl'>Incheckning</h3>
                <h3 className='text-xl'>Utcheckning</h3>
                <h3 className='text-xl'></h3>
                <h3 className='text-xl'></h3>
            </div>
            {requests.map(request => (
                <div key={request.id} className='grid grid-cols-9 gap-2 items-center text-center'>
                    <input type="checkbox" />
                    <div>{request.host}</div>
                    <div className='flex justify-center items-center mt-3'><BsChatRightText size={20} /></div>
                    <div>{request.startDate}</div>
                    <div>{request.roomType}</div>
                    <div>{request.startDate}</div>
                    <div>{request.endDate}</div>
                    <div><button className="bg-green-200 text-Request-ButtonText-Green hover:bg-green-700 font-bold rounded border-solid border-2 border-Request-ButtonBorder-Green p-2 pr-4 pl-4 hover:text-white" onClick={() => handleAssignOnClick(request.id)}>Tilldela</button></div>
                    <div><button className="bg-red-200 text-Request-ButtonText-red hover:bg-red-700 font-bold rounded border-solid border-2 border-Request-ButtonBorder-red p-2 pr-4 pl-4 hover:text-white" onClick={() => handleRejectOnClick(request.id)}>Neka</button></div>
                </div>
            ))}
        </div>
    );
}
