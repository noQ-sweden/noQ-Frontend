import React from 'react';
import EditRoomTable from '../components/RoomPage/EditRoomTable'
import useHeader from '../hooks/useHeader';

const RoomPage = () => {
    const { setHeader } = useHeader();
    setHeader("Mina Rum");

    return (
        <EditRoomTable></EditRoomTable>
    );
};

export default RoomPage;
