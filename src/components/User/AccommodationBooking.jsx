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

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room.id);
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

  return (
    <>
      <div className="p-3">
        <AccommodationPanel title="Välj rum">
          <div className="">
            <p className="font-semibold text-lg mb-6">
              <Link to={`/user`} className="flex items-center">
                <FaChevronLeft className="mr-2 text-gray-500" />
                Tillbaka
              </Link>
            </p>


            {showAlert && (
              <div className="flex justify-center">
                <AccommodationAlertBooking
                  success={bookingSuccessful}
                  closeAlert={handleCloseAlert}
                />
              </div>
            )}


            <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">

              <div className="bg-white p-4 rounded-md mb-6">
                <p className="mb-2 font-semibold">Välj datum</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-3 rounded-md bg-gray-200">
                  <div className="flex flex-col">
                    <label className="block mb-2">Incheckningsdatum</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText="Välj incheckningsdatum"
                      className="p-3 border rounded-md w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block mb-2">Utcheckningsdatum</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      placeholderText="Välj utcheckningsdatum"
                      className="p-3 border rounded-md w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-md mb-6">
                <p className="mb-2 font-semibold">Välj rum</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {hostRooms ? (
                    hostRooms.map((room) => (
                      <div
                        key={room.id}
                        className={`p-4 border rounded transition-all duration-300 shadow-sm w-full ${
                          selectedRoom === room.id
                            ? "bg-[#4CAA4A] text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        <div className="grid gap-4 justify-items-center">
                          <AccomodationDetailProductIcon type={room.type} />
                          <p className="text-center">{room.description}</p>
                          <button
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold text-m align-middle h-7 px-6 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed"
                            onClick={() => handleSelectRoom(room)}
                            disabled={selectedRoom === room.id}
                          >
                            {selectedRoom === room.id ? "Vald" : "Välj"}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center">Laddar rum...</p>
                  )}
                </div>
              </div>

              <div className="bg-white p-4 rounded-md mb-6">
                <p className="mb-2 font-semibold">Skicka meddelande till bostället</p>
                <textarea
                  id="messageTextarea"
                  value={message}
                  onChange={handleTextareaChange}
                  aria-label="Type your message"
                  aria-required="true"
                  placeholder="Skriv ditt meddelande här..."
                  rows="5"
                  className="w-full bg-gray-100 p-3 border rounded-md"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#4CAA4A] hover:bg-green-700 text-white font-semibold text-m w-48 h-10 rounded focus:outline-none focus:shadow-outline"
                >
                  Skicka förfrågan
                </button>
              </div>
            </form>
          </div>
        </AccommodationPanel>
      </div>
    </>
  );
}
