import { createContext, useState } from "react";
import PropTypes from 'prop-types';

const LoginContext = createContext({});

export const LoginProvider = ({ children }) => {
    const [login, setLogin] = useState({});

    return (
        <LoginContext.Provider value={{ login, setLogin }}>
            {children}
        </LoginContext.Provider>
    )
}

LoginProvider.propTypes = {
    children: PropTypes.any,
};

export default LoginContext;