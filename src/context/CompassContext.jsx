import { createContext, useContext, useState } from "react";

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

export function useCompass() {
    return useContext(CompassContext)
}