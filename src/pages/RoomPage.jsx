import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomPagesListItem from '../components/RoomPage/RoomPagesListItem'

const RoomPage = () => {
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState({ name: '', description: '', total_places: 0, host_id: '', type: '', requirements: '' });
    const [editingRoom, setEditingRoom] = useState(null);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await axios.get('/products');
            setRooms(response.data);
        } catch (error) {
            console.error("There was an error fetching the rooms!", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingRoom) {
            setEditingRoom({ ...editingRoom, [name]: value });
        } else {
            setNewRoom({ ...newRoom, [name]: value });
        }
    };

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        try {
            await axios.post('api/products', newRoom);
            await fetchRooms();
            setNewRoom({ name: '', description: '', total_places: 0, host_id: '', type: '', requirements: '' });
        } catch (error) {
            console.error("There was an error creating the room!", error);
        }
    };

    const handleEditRoom = async (roomId) => {
        try {
            const response = await axios.get(`api/products/${roomId}`);
            setEditingRoom(response.data);
        } catch (error) {
            console.error("There was an error fetching the room details!", error);
        }
    };

    const handleUpdateRoom = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`api/products/${editingRoom.id}`, editingRoom);
            await fetchRooms();
            setEditingRoom(null);
        } catch (error) {
            console.error("There was an error updating the room!", error);
        }
    };

    const handleDeleteRoom = async (roomId) => {
        try {
            await axios.delete(`api/products/${roomId}`);
            await fetchRooms();
        } catch (error) {
            console.error("There was an error deleting the room!", error);
        }
    };

    return (
        <div className={`px-8 py-6`}>
            <h1 className={`font-inter text-4xl font-bold leading-tight`}>Redigera härbärge</h1>
            <ul>
                <RoomPagesListItem itemTitle='Allmän information'/>
                <RoomPagesListItem itemTitle='Typ av sovplats'/>
                <RoomPagesListItem itemTitle='Sovplatser'/>
                <RoomPagesListItem itemTitle='Tjänster'/>
                <RoomPagesListItem itemTitle='Övrig information'/>
            </ul>
            {/* <ul>
                {Array.isArray(rooms) && rooms.map(room => (
                    <li key={room.id}>
                        {room.name} - {room.description} - {room.total_places}
                        <button onClick={() => handleEditRoom(room.id)}>Edit</button>
                        <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>{editingRoom ? "Edit Room" : "Add New Room"}</h2>
            <form onSubmit={editingRoom ? handleUpdateRoom : handleCreateRoom}>
                <input type="text" name="name" value={editingRoom ? editingRoom.name : newRoom.name} onChange={handleInputChange} placeholder="Name" />
                <input type="text" name="description" value={editingRoom ? editingRoom.description : newRoom.description} onChange={handleInputChange} placeholder="Description" />
                <input type="number" name="total_places" value={editingRoom ? editingRoom.total_places : newRoom.total_places} onChange={handleInputChange} placeholder="Total Places" />
                <input type="text" name="host_id" value={editingRoom ? editingRoom.host_id : newRoom.host_id} onChange={handleInputChange} placeholder="Host ID" />
                <input type="text" name="type" value={editingRoom ? editingRoom.type : newRoom.type} onChange={handleInputChange} placeholder="Type" />
                <input type="text" name="requirements" value={editingRoom ? editingRoom.requirements : newRoom.requirements} onChange={handleInputChange} placeholder="Requirements" />
                <button type="submit">{editingRoom ? "Update Room" : "Add Room"}</button>
            </form> */}
        </div>
    );
};

export default RoomPage;
