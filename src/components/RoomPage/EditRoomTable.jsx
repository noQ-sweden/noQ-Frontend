import React, { useState, useEffect } from 'react';
import axios from "../../api/AxiosNoqApi.js";
import useLogin from "../../hooks/useLogin";
import {FaTrash} from "react-icons/fa";
import {FaPencil} from "react-icons/fa6";

const EditRoomTable = () => {
  const { login } = useLogin();
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [host, setHost] = useState(login.host);
  const [beds, setBeds] = useState(null);
  const [type, setType] = useState('');
  const [requirements, setRequirements] = useState('');
  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState(null);


  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`api/host/hosts/${host.id}/products`);
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
      host: host,
      type,
      requirements: requirements || ""
    };

    try {
      if (editIndex !== null) {
        const productId = rows[editIndex].id;
        await axios.put(`/api/host/products/${productId}/edit`, newRow);
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
    setId(0);
    setName('');
    setDescription('');
    setHost(login.host);
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
    setHost(row.host);
    setBeds(row.total_places);
    setType(row.type);
    setRequirements(row.requirements);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const productId = rows[index].id;
    try {
      await axios.delete(`api/host/products/${productId}`);
      await fetchRooms();
    } catch (error) {
      console.error("There was an error deleting the room!", error);
    }
  };

  return (
      <div className="p-4">
        <div className="mt-4 rounded-lg overflow-hidden border border-gray-300 bg-white" style={{ width: '1189px', maxHeight: '450px', paddingBottom: '5px' }}>
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
                          <button onClick={() => handleEdit(index)}
                            className="flex items-center justify-center text-black rounded hover:text-gray-700 w-[74px] h-[36px] p-0">
                            <FaPencil className="w-full h-full" />
                          </button>
                          <button onClick={() => handleDelete(index)} className="flex items-center justify-center text-black rounded hover:text-gray-700 w-[36px] h-[36px] p-0">
                            <FaTrash className="w-full h-full" />
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
        <div style={{ width: '1189px' }} className="flex pt-[43px] pb-[20px] pl-[25px] pr-[46px] bg-white rounded-lg mt-4 border border-gray-300">
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
              <input type="number" value={beds == null ? "" : beds.toString()} onChange={handleInputChange(setBeds)} className="w-[400px] h-[38px] px-3 py-2 border bg-[#D9D9D9BF]" />
            </div>
            <div className="mb-4 flex items-center">
              <label className="block mr-2 w-32">Typ</label>
              <select className="w-[400px] h-[38px] px-3 border bg-[#D9D9D9BF]" value={type} onChange={handleInputChange(setType)} >
                <option value="room">Room</option>
                <option value="woman-only">Women-only</option>
              </select>{/* options={roomOptions} value="" onChange={handleInputChange(setType)} className="w-[400px] h-[38px] px-3 py-2 border bg-[#D9D9D9BF]" />/*/}
            </div>
          </div>
          <div className="flex-1 relative ml-[70px]">
            <div className="flex items-start">
              <label className="block mr-[30px]">Krav</label>
              <textarea value={requirements} onChange={handleInputChange(setRequirements)} className="w-[430px] h-[143px] px-3 py-2 border bg-[#D9D9D9BF]" />
            </div>
            <div className="flex justify-end mt-[37px]">
              <button onClick={handleSave}
                  className="
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
                        focus:shadow-outline">
                  Spara
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EditRoomTable;