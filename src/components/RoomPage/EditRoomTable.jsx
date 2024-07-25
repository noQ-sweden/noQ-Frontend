import React, { useState, useEffect } from 'react';
import EditIcon from './EditIcon'; 
import BinIcon from './BinIcon';

const EditRoomTable = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [beds, setBeds] = useState('');
  const [type, setType] = useState('');
  const [requirements, setRequirements] = useState('');
  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Sample data for initialization
  const sampleData = [
    { name: 'Room A', description: 'A spacious room with a sea view.', beds: 2, type: 'Deluxe', requirements: 'No smoking' },
    { name: 'Room B', description: 'Cozy room with garden view.', beds: 1, type: 'Standard', requirements: 'Pet friendly' },
  ];

  useEffect(() => {
    // Initialize rows with sample data
    setRows(sampleData);
  }, []);

  const handleSave = () => {
    const newRow = { name, description, beds, type, requirements };
    if (editIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editIndex] = newRow;
      setRows(updatedRows);
      setEditIndex(null);
    } else {
      setRows([...rows, newRow]);
    }

    // Clear input fields
    setName('');
    setDescription('');
    setBeds('');
    setType('');
    setRequirements('');
  };

  const handleEdit = (index) => {
    const row = rows[index];
    setName(row.name);
    setDescription(row.description);
    setBeds(row.beds);
    setType(row.type);
    setRequirements(row.requirements);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <div className="p-4">
      <div
        className="mt-4 rounded-[20px] overflow-hidden border border-gray-300 bg-white"
        style={{ width: '1189px', maxHeight: '450px', paddingBottom: '5px' }}
      >
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
                    <td className={`border-r px-4 py-2 text-center ${borderClass}`} style={{ verticalAlign: 'middle' }}>{row.beds}</td>
                    <td className={`border-r px-4 py-2 text-center ${borderClass}`} style={{ verticalAlign: 'middle' }}>{row.type}</td>
                    <td className={`border-r px-4 py-2 text-center ${borderClass}`} style={{ verticalAlign: 'middle' }}>{row.requirements}</td>
                    <td className={`px-4 py-2 text-center ${borderClass}`} style={{ verticalAlign: 'middle' }}>
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className="flex items-center justify-center text-white rounded hover:bg-gray-200 w-[74px] h-[36px] p-0"
                        >
                          <EditIcon className="w-full h-full" />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="flex items-center justify-center text-white rounded hover:bg-gray-200 w-[36px] h-[36px] p-0"
                        >
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
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[400px] h-[38px] px-3 py-2 border bg-[#D9D9D9BF]"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block mr-2 w-32">Beskrivning</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-[400px] h-[38px] px-3 py-2 border bg-[#D9D9D9BF]"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block mr-2 w-32">Antal sovplatser</label>
            <input
              type="number"
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
              className="w-[400px] h-[38px] px-3 py-2 border bg-[#D9D9D9BF]"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block mr-2 w-32">Typ</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-[400px] h-[38px] px-3 py-2 border bg-[#D9D9D9BF]"
            />
          </div>
        </div>
        <div className="flex-1 relative ml-[70px]">
          <div className="flex items-start">
            <label className="block mr-[30px]">Krav</label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-[450px] h-[143px] px-3 py-2 border bg-[#D9D9D9BF]"
            />
          </div>
          <div className="flex justify-end mt-[37px]">
            <button
              onClick={handleSave}
              className="bg-[#255B57] px-4 py-2 rounded-[50px] hover:bg-green-600 w-[200px] h-[50px]"
            >
              Spara
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoomTable;
