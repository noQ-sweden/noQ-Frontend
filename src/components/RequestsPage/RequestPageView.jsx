import { useState, useEffect, React } from 'react';
import RequestList from './RequestList';
import AssignPage from './AssignPage';

export default function RequestPageView() {
    //const [requests, setRequests] = useState([]);
    const [availableRooms, setavailableRooms] = useState([]);
    const [recommendedRooms, setRecommendedRooms] = useState([]);


    const [showPopup, setShowPopup] = useState(false);
    const [showTable, setShowTable] = useState(true);

    // Mockdata for requests
    useEffect(() => {
        const mockRequests = [
            { "id": 1, "host": "Jane Smith", "roomType": "sovsal", "roomLeft": 5, "startDate": "2024-06-01", "endDate": "2024-06-05", "status": "confirmed" },
            { "id": 2, "host": "John Johnson", "roomType": "enkel", "roomLeft": 5, "startDate": "2024-06-10", "endDate": "2024-06-15", "status": "confirmed" },
            { "id": 3, "host": "Emma Brown", "roomType": "sovsal", "roomLeft": 5, "startDate": "2024-07-01", "endDate": "2024-07-10", "status": "pending" }
        ];

        const mockRooms = [
            { "roomNumber": 1, "roomType": "enkel", "roomLeft": 5, "floor": 1, "name": "John doe" },
            { "roomNumber": 2, "roomType": "sovsal", "roomLeft": 5, "floor": 225, "name": "John doe" },
            { "roomNumber": 3, "roomType": "dubbel", "roomLeft": 5, "floor": 3, "name": "John doe" },
            { "roomNumber": 4, "roomType": "familj", "roomLeft": 5, "floor": 2, "name": "John doe" },
            { "roomNumber": 5, "roomType": "familj", "roomLeft": 5, "floor": 0, "name": "John doe" }
        ]

        const roomToRemove = 1
        setavailableRooms(mockRooms.filter(room => room.roomNumber !== roomToRemove));

        const recommendedRooms = mockRooms.filter(room => room.roomNumber === 1);
        setRecommendedRooms(recommendedRooms);

        //setRequests(fetchPendingRequests());

    }, []);


    return (
        <div className='p-4'>
            <h2 className='text-2xl mb-4'>{!showPopup ? 'Förfrågningar' : 'Tilldela rum'}</h2>
            {showPopup && (
                <AssignPage availableRooms={availableRooms} recommendedRooms={recommendedRooms} setShowPopup={setShowPopup} setShowTable={setShowTable} />
            )}
            {showTable && (
                <RequestList setShowPopup={setShowPopup} setShowTable={setShowTable} />

            )}
        </div>
    );
}
