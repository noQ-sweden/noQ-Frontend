import axios from "axios";
import { createContext, useState } from "react";
import PropTypes from "prop-types";

const LoginContext = createContext({});

export const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState({
    username: null,
    first_name: null,
    last_name: null,
    usergroups: [],
    host: null,
  });

  // Add handleLogin to update the state
  const handleLogin = async (loginData) => {
    try {
      const response = await axios.post("/api/api/login/", loginData);
      const data = response.data;

      // Updating the login state with response data
      setLogin({
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        usergroups: data.groups,
        host: data.host,
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.any,
};

export default LoginContext;
