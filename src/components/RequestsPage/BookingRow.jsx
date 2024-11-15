import { getDate, getDayNumber, getMonth, getStatus } from '../../utility/utilityFunctions';
import PropTypes from "prop-types";
import { FaFlag } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";




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
        if (flag) {
            return <FaFlag icon="fa-solid fa-flag" className="h-6 w-6 text-red-700" />;
        } else {
            return <FaCheckCircle className="h-6 w-6 text-green-noQ" />
        }
    };

    return (
        <div className={`grid grid-cols-[1fr_2fr_3fr_2fr_2fr_2fr_3fr_2fr_2fr_4fr] px-4 py-1 ${bg_color}`}>
            <div className='grid grid-rows-1 justify-start self-center'>
                <input
                    className='size-4 ml-3'
                    type="checkbox"
                    checked={checkedBookings?.includes(booking.id) || false}
                    onChange={() => onCheckboxClick(booking.product.host.id, booking.id)}/>
            </div>
            <div className='grid grid-rows-1 justify-self-start'>
                <div className='leading-3 items-center text-center ml-2'>
                    <p className='font-bold text-2xl'>{getDayNumber(getDate(booking.booking_time))}</p>
                    <p className='text-base'>{getMonth(getDate(booking.booking_time))}</p>
                </div>
            </div>
            <div className='grid grid-rows-1 gap-1 items-center text-left pl-2'>
                <div>{booking.user.first_name}</div>
                <div>{booking.user.last_name}</div>
            </div>
            <div className='grid grid-rows-2 gap-1 items-center text-left'>
                <div>{booking.user.unokod}</div>
            </div>
            <div className='grid grid-rows-2 gap-1 items-center text-left'>
                { getStatus(booking.status.description).split(" ").map((word, index) => (
                    <div key={index}>{word}</div>
                ))}
            </div>
            <div className='grid grid-rows-2 gap-1 items-center text-left'>
                <div>{renderFlag(booking.user.flag)}</div>
            </div>
            <div className='grid grid-rows-2 gap-1 items-left text-left'>
                <div>{booking.product.type}</div>
            </div>
            <div className='grid grid-rows-1 justify-self-start'>
                <div className='leading-3 items-center text-center'>
                        <p className='font-bold text-2xl'>{getDayNumber(booking.start_date)}</p>
                        <p className='text-base'>{getMonth(booking.start_date)}</p>
                </div>
            </div>
            <div className='grid grid-rows-1 justify-self-start'>
                <div className='leading-3 items-center text-center'>
                        <p className='font-bold text-2xl'>{getDayNumber(booking.end_date)}</p>
                        <p className='text-base'>{getMonth(booking.end_date)}</p>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-2 items-right self-center justify-self-end mr-3'>
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
                        onClick={() => onAssignClick(booking.id)}>
                        {okButtonText}
                    </button>
                </div>
                <div>
                    <button className="
                        bg-gray-200
                        hover:bg-gray-300
                        border-grey-button-border
                        text-gray-500
                        border-2
                        font-semibold
                        text-m
                        align-middle
                        w-20
                        h-7
                        rounded
                        focus:outline-none
                        focus:shadow-outline"
                        onClick={() => onRejectClick(booking.id)}>
                        {nokButtonText}
                    </button>
                </div>
            </div>
       </div>
    );
    
}