import { useState } from "react";
import { Link } from 'react-router-dom';
import Panel from "./../components/Common/Panel";
import axiosNoqApi from './../api/AxiosNoqApi'; 


export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email) {
            setMessage("Du måste ange en e-postadress!")
            return
        }
        
        setIsLoading(true);
        setMessage("")

        try {
            const response = await axiosNoqApi.post('/forgot-password', {email});

            if (await response.status === 200) {
                setMessage("Instruktioner för återställning av lösenord har skickats till din e-post.")
        }
    } catch (error) {
        console.error("Fel vid API-anrop", error)
        setMessage("Kontrollera att din e-postadress är korrekt och försök igen.")
    } finally {
        setIsLoading(false);
    }
    }
   

    return(
        <div className="flex flex-col items-center">
             {/* Error message handling */}
             <div className="mb-12 text-red-600 text-xl font-semibold">
                {message && <p>{message}</p>}
            </div>
            

            <Panel>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-left text-sm font-semibold">
                            E-postadress
                        </label>
                        <input 
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Skriv in din e-postadress" 
                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E04430] focus:border-[#E04430]"/>
                        
                    </div>


                    <div className="flex justify-center mt-4">
                        <button type="submit"
                        disabled={isLoading}
                        className="bg-[#E04430] hover:bg-[#C0392B] text-white font-semibold text-m w-48 h-14 rounded focus:outline-none focus:shadow-outline flex items-center justify-center px-4">
                            {isLoading ? "Laddar..." : "Återställ lösenord"}
                        </button>
                    </div>
                </form>
            </Panel>

            <div className="mt-6">
                <p className="text-sm">
                    <Link to="/" className="text-black hover:text-[#C0392B]">
                        Tillbaka till inloggning
                    </Link>

                </p>
          
            </div>





        </div>
    )
}