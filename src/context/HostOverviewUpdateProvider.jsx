import { createContext, useState } from "react";
import PropTypes from 'prop-types';

const HostOverviewUpdateContext = createContext({});

export const HostOverviewUpdateProvider = ({ children }) => {
    const [updateData, setUpdateData] = useState(0);

    return (
        <HostOverviewUpdateContext.Provider value={{ updateData, setUpdateData }}>
            {children}
        </HostOverviewUpdateContext.Provider>
    )
}

HostOverviewUpdateProvider.propTypes = {
    children: PropTypes.any,
};

export default HostOverviewUpdateContext;