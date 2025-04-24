import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';


const CompassContext = createContext();

export function CompassProvider ({children}) {
    const [serviceType, setServiceType] = useState(null);
    const [ageGroup, setAgeGroup] = useState(null);
    const [filterTags, setFilterTags] = useState([]);
    const [openNow, setOpenNow] = useState(false);

    return(
        <CompassContext.Provider value={{
            serviceType, setServiceType, 
            ageGroup, setAgeGroup, 
            filterTags, setFilterTags,
            openNow, setOpenNow
        }}>
            {children}
        </CompassContext.Provider>
    )
}

CompassProvider.propTypes = {
    children: PropTypes.any,
};

export function useCompass() {
    return useContext(CompassContext)
}