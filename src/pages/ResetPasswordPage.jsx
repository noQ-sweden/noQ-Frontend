import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Panel from "./../components/Common/Panel";
import axios from "./../api/AxiosNoqApi";

export default function ResetPasswordPage() {
    const { uidb64, token } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!newPassword || !confirmPassword) {
            setMessage("Du måste ange ett nytt lösenord och bekräfta det!");
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage("Lösenorden matchar inte!");
            return;
        }   

        setIsLoading(true);
        setMessage("");

        try {
            const response = await axios.post("api/reset-password/", {
                uidb64,
                token,
                new_password: newPassword,
            });

            if (response.status === 200) {
                setMessage("Lösenordet har återställts. Du kan nu logga in med ditt nya lösenord.");
                setTimeout(() => {
                    navigate("/login");
                }, 3000); // Redirect after 3 seconds
            }
        }
        catch (error) {
            console.error("Fel vid API-anrop", error);
            setMessage("Ett fel inträffade. Kontrollera att din länk är giltig och försök igen.");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="flex flex-col items-center">
            <div className="mb-6 text-red-600 text-xl font-semibold">
                {message && <p>{message}</p>}
            </div>

            <Panel>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-left text-sm font-semibold">
                            Nytt lösenord
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E04430]"
                        />
                    </div>

                    <div>
                        <label className="block text-left text-sm font-semibold">
                            Bekräfta lösenord
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E04430]"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="border border-gray-400 mt-10 w-48 mx-auto bg-green-600 text-white py-2 rounded-full hover:bg-noq-dark-green transition block"
                        >
                            {isLoading ? "Skickar..." : "Återställ lösenord"}
                        </button>
                    </div>
                </form>
            </Panel>
        </div>
    );
}