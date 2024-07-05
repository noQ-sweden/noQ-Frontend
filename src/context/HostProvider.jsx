import { createContext, useState } from "react";
import PropTypes from 'prop-types';

const HostContext = createContext({});

export const HostProvider = ({ children }) => {
    const [host, setHost] = useState({});

    return (
        <HostContext.Provider value={{ host, setHost }}>
            {children}
        </HostContext.Provider>
    )
}

HostProvider.propTypes = {
    children: PropTypes.any,
};

export default HostContext;