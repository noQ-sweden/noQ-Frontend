import BackButton from "../../components/Compass/BackButton";
import CompassButton from "../../components/Compass/CompassButton";
import CompassLayout from "../../components/Compass/CompassLayout";
import { useNavigate } from "react-router-dom";
import { useCompass } from "../../context/CompassContext";


function AgePage() {
    const navigate = useNavigate();
    const {setAgeGroup} = useCompass()

    return(
        <CompassLayout>
            <div className="bg-white border rounded-xl p-8 shadow-md relative w-full h-auto min-h-[400px]">
            <div className="absolute top-2 left-2">
            <BackButton/>
            </div>
                <h1 className="text-center text-2xl font-semibold text-green-900 mb-8">
                    Ålder på personen <br /> du hjälper
                </h1>


                <div className="flex flex-col gap-4">

                <CompassButton onClick={() => {setAgeGroup("Över 18")
                    navigate("/volunteer/compass/result")
                }}>
                    Över 18
                </CompassButton>

                <CompassButton onClick={() => {setAgeGroup("Under 18")
                    navigate("/volunteer/compass/result")
                }}>
                    Under 18
                </CompassButton>

                </div>

            </div>
        </CompassLayout>
    )
}

export default AgePage
