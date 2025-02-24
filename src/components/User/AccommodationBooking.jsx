import React, { useState } from "react";
import { format } from "date-fns";
import axios from "../../api/AxiosNoqApi.js";

export default function AccommodationBooking() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [bookingSuccessful, setBookingSuccessful] = useState(false);

  const handleSelectToday = () => {
    setStartDate(new Date());
  };

  const handleSelectTomorrow = () => {
    if (!startDate) {
      alert("Vänligen välj incheckningsdatum först.");
      return;
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setEndDate(tomorrow);
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      alert("Vänligen välj både inchecknings- och utcheckningsdatum.");
      return;
    }

    setLoading(true);

    const payload = {
      start_date: format(startDate, "yyyy-MM-dd"),
      end_date: format(endDate, "yyyy-MM-dd"),
    };

    try {
      const response = await axios.post("/api/user/request_booking", payload);

      if (response.status === 200) {
        setBookingSuccessful(true);
      } else {
        setBookingSuccessful(false);
      }
      setShowAlert(true);
    } catch (error) {
      console.error("Error Booking:", error);
      setBookingSuccessful(false);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3">
      {/* Date Selection Buttons */}
      <div className="bg-gray-200 p-4 rounded-md mb-6">
        <p className="mb-2 font-semibold">Välj datum</p>
        <div className="flex flex-col gap-3">
          <div>
            <p className="mb-1">Incheckningsdatum</p>
            <button
              type="button"
              onClick={handleSelectToday}
              className={`p-3 border rounded-md w-full ${
                startDate ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {startDate ? format(startDate, "yyyy-MM-dd") : "Idag"}
            </button>
          </div>
          <div>
            <p className="mb-1">Utcheckningsdatum</p>
            <button
              type="button"
              onClick={handleSelectTomorrow}
              className={`p-3 border rounded-md w-full ${
                endDate ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              disabled={!startDate}
            >
              {endDate ? format(endDate, "yyyy-MM-dd") : "Imorgon"}
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className={`p-3 w-full bg-green-500 text-white rounded-md ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
        }`}
        disabled={loading}
      >
        {loading ? "Laddar..." : "Boka"}
      </button>
    </div>
  );
}