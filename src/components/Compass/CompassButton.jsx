import PropTypes from 'prop-types'; 

function CompassButton({onClick, children}) {

    return(
        <button onClick={onClick}
        className="w-full bg-[#245b56] text-white font-bold py-3 px-6 rounded-full hover:bg-green-800 transition-all duration-200">
            {children}
        </button>
    )

}

    CompassButton.propTypes = {
        onClick: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired,
    };

export default CompassButton