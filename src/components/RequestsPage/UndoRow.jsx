import { getDayNumber, getMonth, getGender, getStatus } from '../../utility/utilityFunctions';
import PropTypes from "prop-types";

export default function BookingRow({undoRequest, onUndoClick}) {
    BookingRow.propTypes = {
        undoRequest: PropTypes.any.isRequired,
        onUndoClick: PropTypes.func.isRequired
    };

    return (
        <div className='
        grid
        grid-cols-[70px_150px_2fr_2fr_100px]
        rounded
        border-2
        border-800-green
        p-2
        '>
        <div className='grid grid-rows-1 items-center text-left font-bold text-xl text-green-noQ'>
            { getStatus(undoRequest.status.description) }
        </div>
        <div className='grid grid-rows-1 items-center text-center'>
            <div className='leading-3'>
                <p className='font-bold text-2xl'>{ getDayNumber(undoRequest.start_date) }</p>
                <p className='text-lg'>{ getMonth(undoRequest.start_date) }</p>
            </div>
        </div>
        <div className='grid grid-rows-1 gap-1 items-center text-left'>
            <div><b>Värd:</b> { undoRequest.product.host.name }</div>
            <div><b>Rumstyp:</b> { undoRequest.product.type }</div>
        </div>
        <div className='grid grid-rows-1 gap-1 items-center text-left'>
            <div><b>Unokod:</b> { undoRequest.user.unokod }</div>
            <div><b>Kön:</b> { getGender(undoRequest.user.gender) }</div>
        </div>
        <div className='grid grid-rows-1 gap-2 items-right'>
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
                    onClick={() => onUndoClick(undoRequest.id)}>
                    Ångra
                </button>
            </div>
        </div>
    </div>

    );
}