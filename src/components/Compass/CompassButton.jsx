
function CompassButton({onClick, children}) {

    return(
        <button onClick={onClick}
        className="w-full bg-[#245b56] text-white font-bold py-3 px-6 rounded-full hover:bg-green-800 transition-all duration-200">
            {children}
        </button>
    )

}

export default CompassButton