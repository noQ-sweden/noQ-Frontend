import axios from 'axios';
import { useState, useEffect, React } from 'react';
import RequestList from './RequestList';
import AssignPage from './AssignPage';

export default function RequestPageView() {
    const [requests, setRequests] = useState([]);
    const [availableRooms, setAvailableRooms] = useState([]);
    const [recommendedRooms, setRecommendedRooms] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showTable, setShowTable] = useState(true);


    useEffect(() => {
        // Fetch pending bookings
        axios.get('/pending')
            .then(response => {
                setRequests( response.data);
                console.log('Response data:', response.data);
            })
            .catch(error => {
                console.error('Error fetching pending bookings:', error);
            });

        // Fetch available hosts
        axios.get('/hosts')
            .then(response => {
                setAvailableRooms(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching available hosts:', error);
            });

    }, []);

    return (
        <div className='p-4'>
            <h2 className='text-2xl mb-4'>{!showPopup ? 'Förfrågningar' : 'Tilldela rum'}</h2>
            {showPopup && (
                <AssignPage availableRooms={availableRooms} recommendedRooms={recommendedRooms} setShowPopup={setShowPopup} setShowTable={setShowTable} />
            )}
            {showTable && (
                <RequestList requests={requests} setShowPopup={setShowPopup} setShowTable={setShowTable} />
            )}
        </div>
    );
}

