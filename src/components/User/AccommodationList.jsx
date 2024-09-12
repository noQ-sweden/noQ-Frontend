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
                    grid-cols-[10px_150px_4fr_1fr]
                    rounded
                    p-2
                    bg-white
                    '>
                    
                    <img  src={request.imageSrc} alt="House in front of the road"
                                className="w-full h-auto col-span-2"/>
                  
                    <div className='grid grid-rows-1 justify-center'>
                        <div className='leading-3 '>
                              <p className='text-base grid justify-items-start '>{request.name}</p>
                              <p className='text-sm grid justify-items-start '>{request.street}</p>
                              <p className='text-sm grid justify-items-start '>{request.city}</p>
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
                                text-sm
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

