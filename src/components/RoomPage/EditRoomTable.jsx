import React, { useState, useEffect } from 'react';
import EditIcon from './EditIcon'; 
import BinIcon from './BinIcon';
import axios from "../../api/AxiosNoqApi.js";

const EditRoomTable = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [host_id, setHostId] = useState('');
  const [beds, setBeds] = useState('');
  const [type, setType] = useState('');
  const [requirements, setRequirements] = useState('');
  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState(null);


  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('api/host/products');
      setRows(response.data);
    } catch (error) {
      console.error("There was an error fetching the rooms!", error);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const totalPlaces = Number.isNaN(parseInt(beds)) ? 0 : parseInt(beds);


    const newRow = {
      id,
      name,
      description,
      total_places: totalPlaces,
      host_id,
      type,
      requirements: requirements || ""
    };

    console.log("Sending payload:", newRow);

    try {
      if (editIndex !== null) {
        const roomId = rows[editIndex].id;
        await axios.put(`/api/host/products/${roomId}/edit`, newRow);
      } else {
        await axios.post('/api/host/products', newRow);
      }
      fetchRooms();
      clearForm();
    } catch (error) {
      console.error("There was an error saving the room!", error.response?.data || error.message);
    }
  };

  const clearForm = () => {
    setName('');
    setDescription('');
    setHostId('');
    setBeds(null);
    setType('');
    setRequirements('');
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const row = rows[index];
    setId(row.id);
    setName(row.name);
    setDescription(row.description);
    setHostId(row.host_id);
    setBeds(row.total_places);
    setType(row.type);
    setRequirements(row.requirements);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const roomId = rows[index].id;
    try {
      await axios.delete(`api/host/products/${roomId}`);
      await fetchRooms();
    } catch (error) {
      console.error("There was an error deleting the room!", error);
    }
  };

  return (
      <div className="p-4">
        <div className="mt-4 rounded-[20px] overflow-hidden border border-gray-300 bg-white" style={{ width: '1189px', maxHeight: '450px', paddingBottom: '5px' }}>
          <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="table-fixed w-full" style={{ tableLayout: 'fixed' }}>
              <thead className="bg-white sticky top-0 z-10" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
              <tr>
                <th className="border-b border-r border-gray-300 px-4 py-2 font-inter text-l font-medium" style={{ width: '170px' }}>Namn</th>
                <th className="border-b border-r border-gray-300 px-4 py-2 font-inter text-l font-medium" style={{ width: '170px' }}>Beskrivning</th>
                <th className="border-b border-r border-gray-300 px-4 py-2 font-inter text-l font-medium" style={{ width: '110px' }}>Antal sovplatser</th>
                <th className="border-b border-r border-gray-300 px-4 py-2 font-inter text-l font-medium" style={{ width: '170px' }}>Typ</th>
                <th className="border-b border-r border-gray-300 px-4 py-2 font-inter text-l font-medium">Krav</th>
                <th className="border-b border-gray-300 px-4 py-2 font-inter text-l font-medium" style={{ width: '170px' }}>Redigera</th>
              </tr>
              </thead>
              <tbody>
              {rows.map((row, index) => {
                const isLastRow = index === rows.length - 1;
                const borderClass = isLastRow ? '' : 'border-b';
                return (
                    <tr key={index} className={`border-gray-300 ${borderClass}`}>
                      <td className={`border-r px-4 py-2 text-center ${borderClass}`} style={{ verticalAlign: 'middle' }}>{row.name}</td>
                      <td className={`border-r px-4 py-2 text-center ${borderClass}`} style={{ verticalAlign: 'middle' }}>{row.description}</td>
                      <td className={`border-r px-4 py-2 text-center ${borderClass}`} style={{ verticalAlign: 'middle' }}>{row.total_places}</td>
                      <td className={`border-r px-4 py-2 text-center ${borderClass}`} style={{ verticalAlign: 'middle' }}>{row.type}</td>
                      <td className={`border-r px-4 py-2 text-center ${borderClass}`} style={{ verticalAlign: 'middle' }}>{row.requirements}</td>
                      <td className={`px-4 py-2 text-center ${borderClass}`} style={{ verticalAlign: 'middle' }}>
                        <div className="flex items-center justify-center space-x-2">
                          <button onClick={() => handleEdit(index)} className="flex items-center justify-center text-white rounded hover:bg-gray-200 w-[74px] h-[36px] p-0">
                            <EditIcon className="w-full h-full" />
                          </button>
                          <button onClick={() => handleDelete(index)} className="flex items-center justify-center text-white rounded hover:bg-gray-200 w-[36px] h-[36px] p-0">
                            <BinIcon className="w-full h-full" />
                          </button>
                        </div>
                      </td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ width: '1189px' }} className="flex pt-[43px] pb-[20px] pl-[25px] pr-[46px] bg-white rounded-[30px] mt-4 border border-gray-300">
          <div className="flex-1">
            <div className="mb-4 flex items-center">
              <label className="block mr-2 w-32">Namn</label>
              <input type="text" value={name} onChange={handleInputChange(setName)} className="w-[400px] h-[38px] px-3 py-2 border bg-[#D9D9D9BF]" />
            </div>
            <div className="mb-4 flex items-center">
              <label className="block mr-2 w-32">Beskrivning</label>
              <textarea value={description} onChange={handleInputChange(setDescription)} className="w-[400px] h-[38px] px-3 py-2 border bg-[#D9D9D9BF]" />
            </div>
            <div className="mb-4 flex items-center">
              <label className="block mr-1 w-32">Antal sovplatser</label>
              <input type="number" value={parseInt(beds)} onChange={handleInputChange(setBeds)} className="w-[400px] h-[38px] px-3 py-2 border bg-[#D9D9D9BF]" />
            </div>
            <div className="mb-4 flex items-center">
              <label className="block mr-2 w-32">Typ</label>
              <input type="text" value={type} onChange={handleInputChange(setType)} className="w-[400px] h-[38px] px-3 py-2 border bg-[#D9D9D9BF]" />
            </div>
          </div>
          <div className="flex-1 relative ml-[70px]">
            <div className="flex items-start">
              <label className="block mr-[30px]">Krav</label>
              <textarea value={requirements} onChange={handleInputChange(setRequirements)} className="w-[450px] h-[143px] px-3 py-2 border bg-[#D9D9D9BF]" />
            </div>
            <div className="flex justify-end mt-[37px]">
              <button onClick={handleSave} className="bg-[#255B57] px-4 py-2 rounded-[50px] hover:bg-green-600 w-[200px] h-[50px]">
                Spara
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EditRoomTable;