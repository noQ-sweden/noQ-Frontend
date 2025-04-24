import CompassLayout from "../../components/Compass/CompassLayout"
import BackButton from "../../components/Compass/BackButton"
import { useCompass } from "../../context/CompassContext"
import { useEffect, useState } from "react"
import mockResources from "../../api/mockApi/compassResources"
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import FilterModal from "../../components/Compass/FilterModal"



function ResultPage () {
    const {serviceType, ageGroup, filterTags, openNow, setOpenNow, setFilterTags} = useCompass();
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);


    const getTitle = () => {
        if (serviceType === "direct") return "Direktinsatser"
        if (serviceType === "office") return "Mottagningar"
        return "Alla insatser"
    };


    useEffect(() => {
        const fetchMockResources = () => {
          const filtered = mockResources.filter((res) => {
            const matchesService = serviceType === "all" || res.target_group === serviceType;
            const matchesAge = res.applies_to.includes(ageGroup);
            const matchesTags = filterTags.length === 0 ||
            filterTags.some(tag => res.other?.toLowerCase().includes(tag.toLowerCase()))
            const matchesOpenNow = !openNow || res.is_open_now;
            return matchesService && matchesAge && matchesTags && matchesOpenNow;
          });
      
          setResources(filtered);
          setLoading(false);
        };
  
        if (serviceType && ageGroup) {
          fetchMockResources();
        }
      }, [serviceType, ageGroup, filterTags, openNow]);
      

 
    return(
        <CompassLayout>
            <div className="relative w-full h-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="absolute top-2 left-2">
                    <BackButton/>
                </div>

                <h1 className="text-center text-3xl font-medium text-green-900 mb-6">
                    {getTitle()}
                </h1>

                {filterTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {filterTags.map((tag, index) => (
                            <button key={index}
                            onClick={() => setFilterTags(filterTags.filter((t) => t !== tag))}
                            className="px-4 py-2 rounded-full border border-[#245b56] bg-[#245b56] text-white text-sm font-semibold hover:opacity-90 transition">
                                {tag}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex flex-wrap gap-3 justify-center mb-6">
                    <button onClick={() => setShowModal(true)}
                        className="px-4 py-2 rounded-full border text-sm font-semibold transition 
                                bg-white text-[#245b56] border-[#245b56] hover:bg-[#245b56] hover:text-white">
                            Filtrera
                        </button>
            
                    <button onClick={() => setOpenNow(!openNow)}
                        className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
                            openNow
                              ? "bg-[#245b56] text-white border-[#245b56]"
                              : "bg-white text-[#245b56] border-[#245b56] hover:bg-[#245b56] hover:text-white"
                          }`}>
                            Öppet just nu</button>
                </div>


                {loading && <p>Laddar...</p>}
                {error && <p className="text-red-500"> Fel: {error}</p>}

                <div className="space-y-4">
                    {resources.map((res) => {
                        const isPolice = res.name === "Polisen"
                        return(
                        <div key={res.id} className="border rounded-lg p-4 shadow-sm bg-white space-y-2 flex flex-col items-end text-right">

                        <h2 className="font-semibold text-lg text-gray-700 mb-3">{res.name}</h2>

                        <div className="flex items-center text-3xl text-black-600 gap-2 font-medium">
                            <span className="mb-4">{res.phone}</span>
                        </div>

                        {isPolice && (
                            <div className="w-full">
                                <span className="bg-red-400 text-white px-4 py-1 rounded-md font-medium text-base mb-6">
                                    Gäller i livshotande situationer
                                </span>

                            </div>
                        )}

                        <div className="flex items-right text-sm text-gray-700 gap-3 mt-4">
                            <FaMapMarkerAlt className="text-gray-500 mb-2" />
                            <span>{res.address}</span>
                            <FaClock className="text-gray-500 mb-4"/>
                            <span>{res.opening_time} - {res.closing_time}</span>
                        </div>


                        <div className="flex flex-wrap gap-2 mt-2">

                            {res.other?.split(",").map((tag, index) => (
                                <span key={`other-${index}`} className="px-2 py-1 text-xs rounded-full border text-blue-600 border-blue-400 bg-white-50 mb-2">
                                    {tag.trim()}</span>
                            
                            ))}
                        
                        </div>
                    </div>
                        )
                    })}
                </div>

                {showModal && <FilterModal onClose={() => setShowModal(false)}/>}

            </div>

        </CompassLayout>
    )
}

export default ResultPage