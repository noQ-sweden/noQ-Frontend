import { useState } from "react";
import axios from "./../api/AxiosNoqApi";

const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      // Send a request to the backend server to log out the user
      await axios.get("/api/logout/", { withCredentials: true });
    } catch (error) {
      // maybe some better error handling here
      console.log("An error occurred while logging out. Please try again.");
    } finally {
      setIsLoggingOut(false); // reset the state
    }
  };

  return { logout };
};

export default useLogout;
