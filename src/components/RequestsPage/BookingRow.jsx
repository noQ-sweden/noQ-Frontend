import { getDate, getDayNumber, getMonth, getStatus } from '../../utility/utilityFunctions';
import PropTypes from "prop-types";
import { FlagIcon, CheckCircleIcon } from '@heroicons/react/20/solid';



export default function BookingRow({
    booking,
    bg_color,
    checkedBookings,
    onCheckboxClick,
    onAssignClick,
    onRejectClick,
    okButtonText,
    nokButtonText }) {

    BookingRow.propTypes = {
        booking: PropTypes.any.isRequired,
        bg_color: PropTypes.string,
        checkedBookings: PropTypes.arrayOf(PropTypes.number),
        onCheckboxClick: PropTypes.func.isRequired,
        onAssignClick: PropTypes.func.isRequired,
        onRejectClick: PropTypes.func.isRequired,
        okButtonText: PropTypes.string,
        nokButtonText: PropTypes.string,
    };

    const renderFlag = (flag) => {
        switch (flag) {
            case "OK":
                return <CheckCircleIcon className="h-6 w-6 text-green-noQ" />
            case "FLAG":
                return <FlagIcon class="h-6 w-6 text-red-700" />
            case "DANGER":
                return <div className="h-6 w-6 rounded-full bg-red-600"></div>;
            default:
                return <div className="h-6 w-6 rounded-full border-2 border-blue-700"></div>;
        }
    };

    return (
        <div className={`flex flex-wrap gap-x-4 px-4 py-1 ${bg_color}`}>
            {/* Checkbox */}
            <div className="flex items-center w-[70px]">
                <input
                    className="ml-3"
                    type="checkbox"
                    checked={checkedBookings?.includes(booking.id) || false}
                    onChange={() => onCheckboxClick(booking.product.host.id, booking.id)}
                />
            </div>
    
            {/* Booking Time */}
            <div className="flex flex-col items-start w-[130px]">
                <p className="font-bold text-2xl">{getDayNumber(getDate(booking.booking_time))}</p>
                <p className="text-base">{getMonth(getDate(booking.booking_time))}</p>
            </div>
    
            {/* Guest Name */}
            <div className="flex flex-col items-start w-[200px]">
                <div>{booking.user.first_name}</div>
                <div>{booking.user.last_name}</div>
            </div>
    
            {/* Unokod */}
            <div className="flex items-center w-[130px]">
                <div>{booking.user.unokod}</div>
            </div>
    
            {/* Status */}
            <div className="flex items-center w-[130px]">
                {getStatus(booking.status.description).split(" ").map((word, index) => (
                    <div key={index}>{word}</div>
                ))}
            </div>
    
            {/* Flag */}
            <div className="flex items-center w-[135px]">
                {renderFlag(booking.user.flag)}
            </div>
    
            {/* Product Type */}
            <div className="flex items-center w-[170px]">
                <div>{booking.product.type}</div>
            </div>
    
            {/* Start Date */}
            <div className="flex flex-col items-center w-[100px]">
                <p className="font-bold text-2xl">{getDayNumber(booking.start_date)}</p>
                <p className="text-base">{getMonth(booking.start_date)}</p>
            </div>
    
            {/* End Date */}
            <div className="flex flex-col items-center w-[160px]">
                <p className="font-bold text-2xl">{getDayNumber(booking.end_date)}</p>
                <p className="text-base">{getMonth(booking.end_date)}</p>
            </div>
    
            {/* Buttons */}
            <div className="flex items-center w-[150px] space-x-2">
                <button
                    className="
                        bg-green-600 
                        hover:bg-green-700 
                        text-white 
                        font-semibold 
                        text-m 
                        w-20 
                        h-7 
                        rounded 
                        focus:outline-none 
                        focus:shadow-outline"
                    onClick={() => onAssignClick(booking.id)}
                >
                    {okButtonText}
                </button>
                <button
                    className="
                        bg-gray-200 
                        hover:bg-gray-300 
                        text-gray-500 
                        border-2 
                        border-grey-button-border 
                        font-semibold 
                        text-m 
                        w-20 
                        h-7 
                        rounded 
                        focus:outline-none 
                        focus:shadow-outline"
                    onClick={() => onRejectClick(booking.id)}
                >
                    {nokButtonText}
                </button>
            </div>
        </div>
    );
    
}