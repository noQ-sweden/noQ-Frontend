import { createContext, useState } from "react";
import PropTypes from 'prop-types';

const HeaderContext = createContext({});

export const HeaderProvider = ({ children }) => {
    const [header, setHeader] = useState({});

    return (
        <HeaderContext.Provider value={{ header, setHeader }}>
            {children}
        </HeaderContext.Provider>
    )
}

HeaderProvider.propTypes = {
    children: PropTypes.any,
};

export default HeaderContext;