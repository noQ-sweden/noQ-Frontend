
  import React, { useState } from 'react';

const RedigeraRumTable = () => {
  const [namn, setNamn] = useState('');
  const [beskrivning, setBeskrivning] = useState('');
  const [antalSovplatser, setAntalSovplatser] = useState('');
  const [typ, setTyp] = useState('');
  const [krav, setKrav] = useState('');
  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = () => {
    const newRow = { namn, beskrivning, antalSovplatser, typ, krav };
    if (editIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editIndex] = newRow;
      setRows(updatedRows);
      setEditIndex(null);
    } else {
      setRows([...rows, newRow]);
    }

    // Clear input fields
    setNamn('');
    setBeskrivning('');
    setAntalSovplatser('');
    setTyp('');
    setKrav('');
  };

  const handleEdit = (index) => {
    const row = rows[index];
    setNamn(row.namn);
    setBeskrivning(row.beskrivning);
    setAntalSovplatser(row.antalSovplatser);
    setTyp(row.typ);
    setKrav(row.krav);
    setEditIndex(index);
  };

  return (
    <div className="p-4">
      <div className="mt-4">
        <table className="min-w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Namn</th>
              <th className="border border-gray-300 px-4 py-2">Beskrivning</th>
              <th className="border border-gray-300 px-4 py-2">Antal sovplatser</th>
              <th className="border border-gray-300 px-4 py-2">Typ</th>
              <th className="border border-gray-300 px-4 py-2">Krav</th>
              <th className="border border-gray-300 px-4 py-2">Redigera</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{row.namn}</td>
                <td className="border border-gray-300 px-4 py-2">{row.beskrivning}</td>
                <td className="border border-gray-300 px-4 py-2">{row.antalSovplatser}</td>
                <td className="border border-gray-300 px-4 py-2">{row.typ}</td>
                <td className="border border-gray-300 px-4 py-2">{row.krav}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Redigera
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex  pt-[43px] pb-[20px] pl-[25px] pr-[46px] bg-white rounded-[30px]">
        <div className="flex-1 ">
          <div className="mb-4 flex items-center">
            <label className="block mr-2 w-32">Namn</label>
            <input
              type="text"
              value={namn}
              onChange={(e) => setNamn(e.target.value)}
              className="w-[400px] h-[38px] px-3 py-2 border bg-[#D9D9D9BF]"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block mr-2 w-32" >Beskrivning</label>
            <textarea
              value={beskrivning}
              onChange={(e) => setBeskrivning(e.target.value)}
              className="w-[400px] h-[38px] px-3 py-2 border bg-[#D9D9D9BF]"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block mr-2 w-32" >Antal sovplatser</label>
            <input
              type="number"
              value={antalSovplatser}
              onChange={(e) => setAntalSovplatser(e.target.value)}
              className="w-[400px] h-[38px] px-3 py-2 border bg-[#D9D9D9BF]"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block mr-2 w-32">Typ</label>
            <input
              type="text"
              value={typ}
              onChange={(e) => setTyp(e.target.value)}
              className="w-[400px] h-[38px] px-3 py-2 border bg-[#D9D9D9BF]"
            />
          </div>
        </div>
        <div className="flex-1 relative ml-[70px]">
          <div className="flex items-start">
            <label className="block mr-[30px]">Krav</label>
            <textarea
              value={krav}
              onChange={(e) => setKrav(e.target.value)}
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



export default RedigeraRumTable;

