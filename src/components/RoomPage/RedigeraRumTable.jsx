// const RedigeraRumTable = () => {

//     return(
//         <div className={`bg-[#FDFDFD] h-[312px] rounded-[30px] mt-[17px]`}>
//             <div className={``}>
//                 <div></div>
//                 <div></div>
//             </div>
//         </div>
//     )
// }

// export default RedigeraRumTable;

import React, { useState } from 'react';

const RedigeraRumTable = () => {
  const [namn, setNamn] = useState('');
  const [beskrivning, setBeskrivning] = useState('');
  const [antalSovplatser, setAntalSovplatser] = useState('');
  const [typ, setTyp] = useState('');
  const [krav, setKrav] = useState('');

  const handleSave = () => {
    // Spara informationen i en tabell 
    console.log({ namn, beskrivning, antalSovplatser, typ, krav });
    setNamn('');
    setBeskrivning('');
    setAntalSovplatser('');
    setTyp('');
    setKrav('');
  };

  
  return (
    <div className="flex  pt-[43px] pb-[20px] pl-[25px] pr-[46px] bg-white rounded-[30px]">
      <div className="flex-1 ">
        <div className="mb-4 flex items-center">
        <label className="block  mr-2 w-32">Namn</label>
          <input
            type="text"
            value={namn}
            onChange={(e) => setNamn(e.target.value)}
            className="w-[400px] h-[38px] px-3 py-2 border  bg-[#D9D9D9BF]"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="block  mr-2 w-32">Beskrivning</label>
          <textarea
            value={beskrivning}
            onChange={(e) => setBeskrivning(e.target.value)}
            className="w-[400px] h-[38px] px-3 py-2 border  bg-[#D9D9D9BF]"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="block  mr-2 w-32">Antal sovplatser</label>
          <input
            type="number"
            value={antalSovplatser}
            onChange={(e) => setAntalSovplatser(e.target.value)}
            className="w-[400px] h-[38px] px-3 py-2 border  bg-[#D9D9D9BF]"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="block mr-2 w-32">Typ</label>
          <input
            type="text"
            value={typ}
            onChange={(e) => setTyp(e.target.value)}
            className="w-[400px] h-[38px] px-3 py-2 border  bg-[#D9D9D9BF]"
          />
        </div>
      </div>
    <div className="flex-1 relative ml-[70px]">
    <div className="flex ">
   <label className=" block mr-[30px]"> Krav </label>
  <textarea
            value={krav}
            onChange={(e) => setKrav(e.target.value)}
            className=" w-[450px] h-[143px]  px-3 py-2 border  bg-[#D9D9D9BF]"
          />
    </div>
    <div className="flex justify-end mt-[37px]">
    <button
      onClick={handleSave}
      className="bg-[#255B57]  px-4 py-2 rounded-[50px] hover:bg-green-600 w-[200px] h-[50px]"
    >
      Spara
    </button>
  </div>
</div> 
    </div>
  );
};

export default RedigeraRumTable;

