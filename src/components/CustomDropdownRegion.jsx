import React, { useState, useEffect, useRef } from "react";
import PropTypes, { number } from "prop-types";

import { regions, kommunerMap } from "./KommunData";

const CustomDropdownRegion = ({ name, number, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isKommunerOpen, setIsKommunerOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(value?.region || "");
  const [kommuner, setKommuner] = useState([]);
  const [selectedKommun, setSelectedKommun] = useState(value?.kommun || "");

  const regionDropdownRef = useRef(null);
  const kommunerDropdownRef = useRef(null);

  useEffect(() => {
    // Update kommuner when the region changes
    if (selectedRegion) {
      setKommuner(kommunerMap[selectedRegion] || []);
    } else {
      setKommuner([]);
    }
  }, [selectedRegion]);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);

    const relatedKommuner = kommunerMap[region] || [];
    setKommuner(relatedKommuner);

    setIsOpen(false);
    setIsKommunerOpen(false);
    onChange(region);
  };

  const handleKommunClick = (kommun) => {
    /*  if (!kommun || !kommun.name) {
      console.log("Selected kommun:", kommun);
      return;
    } */
    setSelectedKommun(kommun);
    setIsKommunerOpen(false);

    // Notify the parent component of the change
    onChange({ region: selectedRegion, kommun });
  };

  const handleClickOutside = (event) => {
    if (
      regionDropdownRef.current &&
      !regionDropdownRef.current.contains(event.target) &&
      kommunerDropdownRef.current &&
      !kommunerDropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
      setIsKommunerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mt-5">
      {/* Regions Dropdown */}
      <div className="flex items-start space-x-4">
        <div ref={regionDropdownRef} className="w-1/2 relative">
          <label className="block text-md font-semibold text-gray-700 mb-1">
            Region <span className="text-red-500">*</span>
          </label>

          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`border rounded border-gray-400 text-gray-400 py-1 px-2 cursor-pointer ${
              selectedRegion ? "text-blacj" : "text-gray-400"
            }`}
          >
            {selectedRegion || "Välj Region"}
          </div>

          {isOpen && (
            <ul
              className="absolute top-full left-0 w-full bg-white border border-gray-400 rounded mt-1 shadow-lg z-10"
              style={{
                maxHeight: "150px",
                overflowY: "auto",
                paddingBottom: "8px",
              }}
            >
              {regions.map((region, index) => (
                <li
                  key={index}
                  role="option"
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleRegionClick(region)}
                >
                  {region}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Kommuner Dropdown */}
        <div ref={kommunerDropdownRef} className="w-1/2 relative">
          <label className="block text-md font-semibold text-gray-700 mb-1">
            Kommun <span className="text-red-500">*</span>
          </label>

          <div
            role="button"
            tabIndex={0}
            aria-expanded={isKommunerOpen}
            onClick={() =>
              kommuner.length > 0 && setIsKommunerOpen(!isKommunerOpen)
            }
            className={`border rounded border-gray-400 py-1 px-2 cursor-pointer ${
              kommuner.length === 0 ? "text-gray-400 cursor-not-allowed" : ""
            }`}
          >
            {selectedKommun ||
              (kommuner.length > 0
                ? "Välj Kommun"
                : "Inga kommuner tillgängliga")}
          </div>
          {isKommunerOpen && kommuner.length > 0 && (
            <ul
              className="absolute top-full left-0 w-full bg-white border border-gray-400 rounded mt-1 shadow-lg z-10"
              style={{
                maxHeight: "150px",
                overflowY: "auto",
                paddingBottom: "8px",
              }}
            >
              {kommuner.map((kommun) => (
                <li
                  key={kommun}
                  role="option"
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer focus:bg-gray-300"
                  onClick={() => handleKommunClick(kommun)}
                >
                  {kommun}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

CustomDropdownRegion.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number,
  value: PropTypes.shape({
    region: PropTypes.string.isRequired,
    kommun: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomDropdownRegion;
