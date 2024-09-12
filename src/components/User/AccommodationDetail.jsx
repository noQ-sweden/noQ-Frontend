import React, { useEffect,useState,useContext } from "react";
import AccommodationPanel from "./AccommodationPanal";
import { useParams } from "react-router-dom";
import { AccommodationContext } from './../../context/AccommodationProvider'


export default function AccommodationDetail() {
    const { accommodation} = useContext(AccommodationContext);
    const params = useParams();
    const [details, setDetails] = useState("");
    
    useEffect(() => {
        accommodation.map(request => {
            if (request.id == params.id) {
                setDetails(request);
            }
        });
    },[]);

   

  return (
    <>
    <div className=" p-3  " >
        <div className="pl-3 ">
            <div className="">
                <AccommodationPanel title="Om boendet">
                <div className=" ">
                    <h2 className='text-lg mb-4'>{"<  "}Tillbaka</h2>
                    <div className=' 
                    grid
                    gap-6
                    rounded
                    p-2
                    bg-white
                    '>
                        
                        <div className='grid grid-cols-3'>
                            <img src={details.imageSrc} alt={details.name} className='rounded-lg w-52 col-span-1' />
                            <div className=" md:col-span-2 ">
                              <p className='text-base grid justify-items-start '>{details.name}</p>
                              <p className='text-sm grid justify-items-start '>{details.street}</p>
                              <p className='text-sm grid justify-items-start '>{details.city}</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 justify-end'>
                            <div className=" md:col-span-1">
                                <p className='text-base font-bold grid justify-items-start '>Om boendet</p>
                                <p className='text-sm grid justify-items-start '>{details.about}</p>                              
                            </div>
                            <div className="grid col-span-2  justify-self-end md:mr-20 ">
                                 <img src={details.imageSrc} alt={details.name} className=' w-60 justify-self-center border-2 border-solid border-grey p-2' />
                                <div className="grid grid-cols-3 gap-2 pt-2">
                                    <img src={details.imageSrc} alt={details.name} className=' w-20 border-2 border-solid border-grey p-2' />
                                    <img src={details.imageSrc} alt={details.name} className=' w-20 border-2 border-solid border-grey p-2' />
                                    <img src={details.imageSrc} alt={details.name} className=' w-20 border-2 border-solid border-grey p-2' />
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 justify-end'>
                            <div className=" md:col-span-1">
                                <p className='text-base font-bold grid justify-items-start '>Vad vi erbjuder</p>
                                                            
                            </div>  
                        </div>            
                    </div>
                </div>
                
                    
                </AccommodationPanel>
            </div>
        </div>
       
    </div>
</>
  );
}
