import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi"

function BackButton() {
    const navigate = useNavigate()

    return (
        <button onClick={() => navigate(-1)}
        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors">
            <FiChevronLeft className="text-gray-600 text-2xl"/>

        </button>
    )
}

export default BackButton