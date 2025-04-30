import BackButton from "../../components/Compass/BackButton";
import CompassButton from "../../components/Compass/CompassButton";
import CompassLayout from "../../components/Compass/CompassLayout";
import { useNavigate } from "react-router-dom";
import { useCompass } from "../../context/CompassContext";


function ServiceTypePage() {
    const navigate = useNavigate();
    const { setServiceType } = useCompass();


    return(
        <CompassLayout>            
            <div className="bg-white border rounded-xl p-8 shadow-md relative w-full h-auto min-h-[400px]">
            <div className="absolute top-2 left-2">
            <BackButton/> 
            </div>
                <h1 className="text-center text-2xl font-semibold text-green-900 mb-8">
                    Vad för service <br /> letar du efter?
                </h1>


                <div className="flex flex-col gap-4">
                    
                <CompassButton onClick={() => {setServiceType("direct")
                    navigate("/volunteer/compass/age")
                }}>
                    Direktinsats
                </CompassButton>

                <CompassButton onClick={() => {setServiceType("office")
                    navigate("/volunteer/compass/age")
                }}>
                    Mottagning
                </CompassButton> 

                <button onClick={() => {setServiceType("all")
                    navigate("/volunteer/compass/age")
                }}
                    className="mt-6 px-8 py-3 text-blue-600 border border-blue-600 bg-blue-50 font-semibold rounded-full hover:bg-blue-100 transition-colors"
                 >
                    Alla
                </button>

                </div>
    
            </div>
        </CompassLayout>
    )
}

export default ServiceTypePage