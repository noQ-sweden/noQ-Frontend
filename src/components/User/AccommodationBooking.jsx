import React, { useEffect, useState, useContext } from "react";
import AccommodationPanel from "./AccommodationPanel";
import { format } from "date-fns";
import { useParams, Link } from "react-router-dom";
import { AccommodationContext } from "../../context/AccommodationProvider";
import axios from "../../api/AxiosNoqApi.js";
import AccomodationDetailProductIcon from "./AccomodationDetailProductIcon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AccommodationAlertBooking from "./AccomodationAlertBooking.jsx";

export default function AccommodationBooking() {
  const navigate = useNavigate();
  const { accommodation } = useContext(AccommodationContext);
  const params = useParams();
  const [message, setMessage] = useState("");
  const [hostRooms, setHostRooms] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [bookingSuccessful, setBookingSuccessful] = useState(false);
  const [indexedAvailableDates, setIndexedAvailableDates] = useState({});

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
  };

  const handleCloseAlert = () => {
    if (bookingSuccessful) {
      setShowAlert(false);
      setBookingSuccessful(false);
      navigate("/user");
    } else {
      setShowAlert(false);
      setBookingSuccessful(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      start_date: format(startDate, "yyyy-MM-dd"),
      end_date: format(endDate, "yyyy-MM-dd"),
      product_id: selectedRoom,
    };

    try {
      const response = await axios.post("/api/user/request_booking", payload);

      if (response.status === 200) {
        setBookingSuccessful(true);
        setShowAlert(true);
      }
      if (response.status === 409 || response.status === 500) {
        setBookingSuccessful(false);
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error Booking:", error);
      setBookingSuccessful(false);
      setShowAlert(true);
    }
  };
  useEffect(() => {
    const hostProducts = accommodation.filter(
      (item) => item.host.id == params.id
    );
    const products = hostProducts.length > 0 ? hostProducts[0].products : null;
    if (products) {
      setHostRooms(
        products.filter(
          (item) => item.type == "room" || item.type == "woman-only"
        )
      );
    } else {
      setHostRooms("");
    }
  }, [accommodation, params.id]);

  useEffect(() => {
    console.log(message);
  }, [message]);

  useEffect(() => {
    const fetchHostData = async () => {
      try {
        const response = await axios.get(`/api/user/available_host/${params.id}`);

        if (response.data.length > 0) {
          const products = response.data[0].products || [];

          // Index available dates by room ID
          const indexedDates = {};
          products.forEach((product) => {
            indexedDates[product.id] = product.available_dates.map((date) => date.available_date);
          });

          setIndexedAvailableDates(indexedDates);
          setHostRooms(
            products.filter((item) => item.type === "room" || item.type === "woman-only")
          );
        } else {
          setHostRooms([]);
        }
      } catch (error) {
        console.error("Error fetching host data:", error);
      }
    };

    fetchHostData();
  }, [params.id]);

  return (
    <>
      <div className="p-3">
        <AccommodationPanel title="Välj rum">
          <div className="">
            <p
              className="
              font-semibold
              text-lg
              mb-6"
            >
              <Link to={`/user`} className="flex items-center">
                <FaChevronLeft className="mr-2 text-gray-500" />
                Tillbaka
              </Link>
            </p>
            <div className="flex flex-row justify-center">
              {showAlert && (
                <AccommodationAlertBooking
                  success={bookingSuccessful}
                  closeAlert={handleCloseAlert}
                />
              )}
              <form onSubmit={handleSubmit} className="w-[70%] ">
                <div className="bg-white p-4 rounded-md mb-6">
                  <p className="mb-2">Välj datum</p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 p-3 rounded-md bg-gray-200 justify-center">
                    <div className="mb-4">
                      <label className="block mb-2 ml-1">
                        Incheckningsdatum
                      </label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date);

                          // Find the first room that has the selected date
                          const matchingRoom = hostRooms.find(room =>
                            indexedAvailableDates[room.id]?.includes(format(date, "yyyy-MM-dd"))
                          );

                          if (matchingRoom) {
                            setSelectedRoom(matchingRoom.id);
                          } else {
                            setSelectedRoom(null);
                          }
                        }}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Välj incheckningsdatum"
                        className="p-3 border rounded-md"
                        includeDates={selectedRoom ? indexedAvailableDates[selectedRoom]?.map(date => new Date(date)) || []
                          : Object.values(indexedAvailableDates).flat().map(date => new Date(date))}
                      />

                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 ml-1">
                        Utcheckningsdatum
                      </label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="Välj utcheckningsdatum"
                        className="p-3 border rounded-md"
                        includeDates={
                          selectedRoom
                            ? indexedAvailableDates[selectedRoom]
                              ?.map(date => new Date(date))
                              .filter(date => !startDate || date >= startDate) || []
                            : []
                        }
                        disabled={!startDate}
                      />

                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-md mb-6">
                  <p className="mb-2">Välj rum</p>
                  <div className="flex justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      {hostRooms.length > 0 ? (
                        hostRooms.map((room) => (
                          <div
                            key={room.id}
                            className={`p-4 border rounded transition-all duration-300 shadow-sm w-full ${selectedRoom === room.id ? "bg-green-600 text-white" : "bg-gray-200"
                              }`}
                          >
                            <div className="grid gap-10 justify-items-center">
                              <AccomodationDetailProductIcon type={room.type} />
                              <p>{room.description}</p>
                              <button
                                className="
                                  bg-green-600 hover:bg-green-700 text-white font-semibold text-m
                                  align-middle h-7 px-6 rounded focus:outline-none focus:shadow-outline
                                  disabled:bg-gray-400 disabled:cursor-not-allowed"
                                onClick={() => {
                                  setSelectedRoom(room.id);
                                  setStartDate(null);
                                  setEndDate(null);
                                }}
                                disabled={selectedRoom === room.id}
                              >
                                {selectedRoom === room.id ? "Vald" : "Välj"}
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>Laddar rum...</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-md mb-6">
                  <p className="mb-2">Skicka meddelande till bostället</p>
                  <textarea
                    id="messageTextarea"
                    value={message}
                    onChange={handleTextareaChange}
                    aria-label="Type your message"
                    aria-required="true"
                    placeholder="Type your message..."
                    rows="5"
                    className="w-[80%] h-32 bg-gray-100 p-2"
                  />
                </div>
                <div className="grid justify-items-center ">
                  <button
                    type="submit"
                    className="
                                              bg-green-600
                                              hover:bg-green-700
                                              text-white
                                              font-semibold
                                              text-m    
                                              w-48
                                              h-10
                                              rounded
                                              focus:outline-none
                                              focus:shadow-outline"
                  >
                    Skicka förfrågan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </AccommodationPanel>
      </div>
    </>
  );
}
