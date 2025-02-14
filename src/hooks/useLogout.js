import { useState } from "react";
import axios from "./../api/AxiosNoqApi";
import useLogin from "./useLogin"; // För att uppdatera login state efter logout

const useLogout = () => {
  const { setLogin } = useLogin(); // Hämta setLogin från din login context
  const [isLoggingOut, setIsLoggingOut] = useState(false); // För att hantera loading-status

  const logout = async () => {
    try {
      setIsLoggingOut(true); // Sätt till loading innan logout
      // Skicka GET-förfrågan till backend för att logga ut
      await axios.get("/api/logout/", { withCredentials: true });
    } catch (error) {
      console.log("Error logging out", error);
    } finally {
      setIsLoggingOut(false); // Återställ loading-status
    }
  };

  return { logout };
};

export default useLogout;
