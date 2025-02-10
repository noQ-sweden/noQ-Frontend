import { getStatus } from "../../utility/utilityFunctions";
import PropTypes from "prop-types";

export default function BookingCard({ booking, onDelete, onConfirm }) {
  BookingCard.propTypes = {
    booking: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };

  const getGradient = () => {
    if (booking.status.description === "declined") {
      return "bg-[repeating-linear-gradient(90deg,_red_0,_red_10px,_transparent_10px,_transparent_20px)] border-red-500";
    } else if (booking.status.description === "pending") {
      return "bg-[repeating-linear-gradient(45deg,_blue_0,_blue_10px,_transparent_10px,_transparent_20px)] border-blue-500";
    } else {
      return "bg-[repeating-linear-gradient(0deg,_green_0,_green_10px,_transparent_10px,_transparent_20px)] border-green-500";
    }
  };

  const boxStyle = `rounded-lg border-4 p-4 shadow-md ${getGradient()}`;

  return (
    <div className={boxStyle}>
      <div className="bg-white p-4 rounded-lg">
        <div className="text-lg font-semibold">
          {booking.start_date} - {booking.end_date}
        </div>

        <div className="text-lg mt-3">
          {booking.product.host.name}, {booking.product.description}
        </div>

        <div className="mt-3">
          <span
            className={`px-4 py-1 rounded-xl text-sm font-semibold ${
              booking.status.description === "pending"
                ? "bg-yellow-300 text-yellow-900"
                : booking.status.description === "accepted"
                ? "bg-green-300 text-green-900"
                : "bg-red-300 text-red-900"
            }`}
          >
            {getStatus(booking.status.description)}
          </span>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:gap-3">
          {booking.status.description === "reserved" && (
            <button
              onClick={() => onConfirm(booking.id)}
              className="
                           bg-[#4CAA4A]
                            hover:bg-green-600
                            text-white
                            font-semibold
                            text-m    
                            w-full sm:w-48
                            h-10
                            rounded
                            focus:outline-none
                            focus:shadow-outline
                            mb-3 sm:mb-0"
            >
              Bekräfta
            </button>
          )}
          <button
            onClick={() => onDelete(booking.id)}
            className="
                            bg-[#B34A3C]
                            hover:bg-red-700
                            text-white
                            font-semibold
                            text-m    
                            w-full sm:w-48
                            h-10
                            rounded
                            focus:outline-none
                            focus:shadow-outline"
          >
            {booking.status.description === "declined" ? "Ta bort" : "Avboka"}
          </button>
        </div>
      </div>
    </div>
  );
}
