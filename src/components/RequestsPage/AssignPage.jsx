import React, { useState } from 'react';
import PropTypes from "prop-types";

export default function AssignPage({ recommendedRooms: props, avalibleRooms: props2 , setShowPopup, setShowTable}) {
    AssignPage.propTypes = {
        recommendedRooms: PropTypes.array.isRequired,
        avalibleRooms: PropTypes.array.isRequired,
        setShowPopup: PropTypes.func.isRequired,
        setShowTable: PropTypes.func.isRequired,
    };

    //const [room, setRoom] = useState({});
    const [recommendedRooms, /*setRecommendedRooms*/] = useState(props);
    const [avalibleRooms, /*setAvalibleRooms*/] = useState(props2);

    const handlePopupClose = () => {
        setShowPopup(false);
        setShowTable(true)
    }

    return (<div className="p-10 ">
        <div className=' w-full p-4 bg-white shadow-xl rounded-lg '>
            <h2 className='text-2xl'>Rekommenderat</h2>

            <div className="grid grid-cols-1 gap-4">
                <div className='grid grid-cols-5 gap-2 text-center'>
                    <h3 className='text-xl'>Välj</h3>
                    <h3 className='text-xl'>Rum</h3>
                    <h3 className='text-xl'>Belägning</h3>
                    <h3 className='text-xl'>Övriga boenden</h3>
                    <h3 className='text-xl'>Boende</h3>
                </div>
                {recommendedRooms.map(rooms => (
                    <div key={rooms.roomNumber} className='grid grid-cols-5 gap-2  items-center text-center border-2 border-gray-300   hover:border-2 hover:border-green-500'>
                        <input type="checkbox" />
                        <div>
                            <p><strong>Rum {rooms.roomNumber}</strong></p>
                            <p>{rooms.roomType}</p>
                            <p>Våning {rooms.floor}</p>
                        </div>
                        <div className="flex justify-center items-center ">{rooms.roomLeft}</div>
                        <div>hello</div>
                        <div>{rooms.name}</div>
                    </div>
                ))}
            </div>

        </div>
        <div>
        </div>
        <div className=' w-full p-4 bg-white mt-5'>
            <h2 className='text-2xl'>Alternativ</h2>

            <div className="grid grid-cols-1 gap-4">
                <div className='grid grid-cols-5 gap-2 text-center'>
                    <h3 className='text-xl'>Välj</h3>
                    <h3 className='text-xl'>Rum</h3>
                    <h3 className='text-xl'>Belägning</h3>
                    <h3 className='text-xl'>Övriga boenden</h3>
                    <h3 className='text-xl'>Boende</h3>
                </div>
                {avalibleRooms.map(rooms => (
                    <div key={rooms.roomNumber} className='grid grid-cols-5 gap-2  items-center text-center border-2 border-gray-300   hover:border-2 hover:border-green-500'>
                        <input type="checkbox" />
                        <div>
                            <p><strong>Rum {rooms.roomNumber}</strong></p>
                            <p>{rooms.roomType}</p>
                            <p>Våning {rooms.floor}</p>
                        </div>
                        <div className="flex justify-center items-center ">{rooms.roomLeft}</div>
                        <div>hello</div>
                        <div>{rooms.name}</div>
                    </div>
                ))}
            </div>


        </div>
        <div className='flex justify-between m-auto'>
            <button className='bg-gray-500 text-white border border- rounded-lg px-4 py-2' onClick={handlePopupClose}>Gå tillbaka</button>
            <button className='bg-green-500 text-white border border-green-500 rounded-lg px-4 py-2'>Tilldela</button>
        </div>
        <div>
        </div>
    </div>
    )
}
