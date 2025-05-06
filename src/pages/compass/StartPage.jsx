import CompassButton from "../../components/Compass/CompassButton";
import CompassLayout from "../../components/Compass/CompassLayout";
import useLogin from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

function StartPage() {
    const navigate = useNavigate();
    const {login} = useLogin();

    return(
        <CompassLayout>
            <div className="bg-white border rounded-xl p-8 shadow-md relative w-full h-auto min-h-[400px]">
                <h1 className="text-center text-2xl font-semibold text-green-900 mb-8">
                    Hej {login?.first_name}, <br/> Vad vill du göra?
                </h1>


                <div className="flex flex-col gap-4">
                    
                <CompassButton onClick={() => navigate("/volunteer")}>
                    Hantera ärenden
                </CompassButton>

                <CompassButton onClick={() => navigate("/volunteer/compass/service-type")}>
                    Hjälpa någon på plats
                </CompassButton> 

                </div>
    
            </div>
        </CompassLayout>
    )
}

export default StartPage