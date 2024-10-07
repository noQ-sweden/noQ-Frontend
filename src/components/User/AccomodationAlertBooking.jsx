import PropTypes from "prop-types";

export default function AccommodationAAlertBooking({success, closeAlert}) {
    AccommodationAAlertBooking.propTypes = {
        success: PropTypes.bool.isRequired,
        closeAlert: PropTypes.func.isRequired,
    };

    return(
        <>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                {success ? (
                    <>
                    <h2 className="text-xl font-semibold">Bokning genomfört</h2>
                    <p>Din bokning har genomförts och hanteras snarast.</p>
                    </>
                ):(
                    <>
                    <h2 className="text-xl font-semibold">Bokning misslyckades</h2>
                    <p>Bokning misslyckades, försök igen.</p>
                    </>
                )}
                <button
                    className="mt-6 bg-green-600 text-white px-4 py-2 rounded" 
                    onClick={closeAlert}
                >
                    Stäng
                </button>
            </div>
            </div>
        </>
    )
}
