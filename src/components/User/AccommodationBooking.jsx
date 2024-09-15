import React, { useEffect, useState, useContext } from "react";
import AccommodationPanel from "./AccommodationPanal";
import { useParams } from "react-router-dom";
import { AccommodationContext } from "../../context/AccommodationProvider";


export default function AccommodationBooking() {
  const { accommodation } = useContext(AccommodationContext);
  const params = useParams();
  const [details, setDetails] = useState("");

  useEffect(() => {
    accommodation.map((request) => {
      if (request.id == params.id) {
        setDetails(request);
      }
    });
  }, []);

 


  const roomList = function () {
    details.products.forEach(room =>
    <li>
        <b>{room.name}:</b>
      <p>

        {room.description}
      </p>
    </li>
  );
  return <ul>{roomsList}</ul>;
}


  return (
    <>
      <div className=" p-3  ">
        <div className="pl-3 ">
          <div className="">
            <AccommodationPanel title="Vajl rum">
              <div className=" ">
                <h2 className="text-lg mb-4">{"<  "}Tillbaka</h2>
                <div id="roomContainer">
                Room
                </div>
                  <div className=" flex justify-end mx-20">
                    <button
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
                                focus:shadow-outline"
                      // onClick={() => handleAssignOnClick(request.id)}
                    >
                      Välj
                    </button>
                  </div>
                  <div className="grid grid-cols-3 justify-end">
                    <div className=" md:col-span-1">
                      <p className="text-base font-bold grid justify-items-start ">
                        Vad vi erbjuder
                      </p>
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
