import React, { useState, useEffect,useContext } from 'react';
import axios from '../../api/AxiosNoqApi';
import { Outlet, Link } from 'react-router-dom';
import { AccommodationContext } from '../../context/AccommodationProvider';



export default function AccommodationList() {
    const { accommodation,setAccommodation} = useContext(AccommodationContext);

  
    // Fetch shelter data from the mock API
    const fetchAvailableShelters = async () => {
        axios.get('api/user/available_shelters')
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    setAccommodation(response?.data || []); 
                }
            })
            .catch((error) => {
                console.log("Error while fetching available shelters.", error);
            });
    };

    useEffect(() => {
        fetchAvailableShelters(); // Fetch data on component load
        console.log(accommodation);
    }, []);


    return (
        <div className="grid grid-cols-1 gap-1 w-full">
            <h2 className='text-lg mb-4'>{"<  "}Tillbaka</h2>
            { accommodation.map(request => (
                <div key={request.id} className='
                    grid
                    grid-cols-[100px_150px_80px_40px]
                    sm:grid-cols-[10px_150px_3fr_2fr]
                    rounded
                    p-2
                    bg-white
                    '>
                    
                    <div className=' place-content-center cons-span-1 sm:col-span-2'>
                        <img  src={request.imageSrc} alt="House in front of the road"
                                    className="w-24 sm:w-full sm:h-auto  "/>
                    </div>
                    
                  
                    <div className=' grid justify-items-start pl-2'>
                        <div className='leading-3 '>
                              <p className='text-xs sm:text-sm font-bold  '>{request.name}</p>
                              <p className='text-xs sm:text-sm  '>{request.street}</p>
                              <p className='text-xs sm:text-sm  '>{request.city}</p>
                        </div>
                    </div>
                    <div className='grid grid-rows-2 gap-1 items-center'>
                        <div>
                            <button className="
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
                                focus:shadow-outline"
                                // onClick={() => handleAssignOnClick(request.id)}
                                >
                                Välj
                            </button>
                        </div>
                        <div>
                            <p className="
                                text-gray-500
                                font-semibold
                                text-xs
                                sm:text-sm
                                align-middle
                               
                                "
                                // onClick={() => handleRejectOnClick(request.id)}
                                >
                                <Link to={`/accommodations/${request.id}`}>information{"  >"}</Link>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
          
            
        </div>
        
    );
}

