import { getDate, getDayNumber, getMonth, getStatus } from '../../utility/utilityFunctions';
import PropTypes from "prop-types";

export default function BookingCard({ booking }){
    
    BookingCard.propTypes = {
        booking: PropTypes.any.isRequired,
    };

    const getGradient = () => {
        if(booking.status.description == "declined") {
            return "bg-[repeating-linear-gradient(0deg,_red_0,_red_10px,_transparent_10px,_transparent_20px)]";
        } else if (booking.status.description == "reserved") {
            return "bg-[repeating-linear-gradient(0deg,_green_0,_green_10px,_transparent_10px,_transparent_20px)]";
        } else {
            return "bg-[repeating-linear-gradient(45deg,_blue_0,_blue_10px,_transparent_10px,_transparent_20px)]";
        }
    }

    const boxStyle =
    `bg-background-white rounded-lg border border-overview-border p-7 ${getGradient()}`;

    return (
        <div className={boxStyle}>
            <div className="bg-white p-4 rounded-lg">
                <div className="text-lg font-semibold">
                    {booking.start_date} - {booking.end_date}
                </div>
                <div className="text-lg mt-3">
                {booking.product.host.name}, {booking.product.description} 
                </div>
                <div className="text-xl mt-3 font-semibold">
                    {getStatus(booking.status.description)}
                </div>
                {booking.status.description == "reserved" && (
                    <div className="mt-6">
                        <button className="
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            font-semibold
                            text-m    
                            w-48
                            h-10
                            rounded
                            focus:outline-none
                            focus:shadow-outline">
                            Bekräfta
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}