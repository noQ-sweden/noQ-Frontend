import axios from "./../api/AxiosNoqApi";

const useLogout = () => {
  const logout = async () => {
    try {
      // Send a request to the backend server to log out the user
      await axios.get("/api/logout/", { withCredentials: true });
    } catch (error) {
      // maybe some better error handling here
      console.log("An error occurred while logging out. Please try again.");
    }
  };

  return { logout };
};

export default useLogout;
