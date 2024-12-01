import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { regions, kommunerMap } from "./KommunData";

const CustomDropdownRegion = ({ name, number, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isKommunerOpen, setIsKommunerOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(value?.region || "");
  const [kommuner, setKommuner] = useState([]);
  const [selectedKommun, setSelectedKommun] = useState(value?.kommun || "");

  const regionDropdownRef = useRef(null);
  const kommunerDropdownRef = useRef(null);

  // Update kommuner when the region changes
  useEffect(() => {
    setKommuner(kommunerMap[selectedRegion] || []);
  }, [selectedRegion]);

  // Close dropdown when clicking outside
  useEffect(() => {
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle the region dropdown
  const regionClickHandler = () => {
    setIsOpen(!isOpen);
  };

  // Select a Region
  const selectedRegionHandler = (region) => {
    setSelectedRegion(region);

    setKommuner(kommunerMap[region] || []);

    setIsOpen(false);
    setIsKommunerOpen(false);
    setSelectedKommun("");
    onChange({ region, kommun: "" });
  };

  // Toggle the kommuner dropdown
  const kommunClickHandler = () => {
    if (kommuner.length > 0) {
      setIsKommunerOpen(!isKommunerOpen);
    }
  };

  // Select a Kommun
  const selectKommunHandler = (kommun) => {
    setSelectedKommun(kommun);
    setIsKommunerOpen(false); //close the kommuner dropdown
    onChange({ region: selectedRegion, kommun }); //Notify parent of Changes
  };

  return (
    <div className="relative mt-5">
      {/* Regions Dropdown */}
      <div className="flex items-start space-x-4">
        <div ref={regionDropdownRef} className="w-1/2 relative">
          <label className="block text-md font-semibold text-gray-700 mb-1">
            Region <span className="text-red-500">*</span>
          </label>

          <div
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            onClick={regionClickHandler}
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
              {regions.map((region) => (
                <li
                  key={region}
                  role="option"
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                  onClick={() => selectedRegionHandler(region)}
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
            onClick={kommunClickHandler}
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
                  onClick={() => selectKommunHandler(kommun)}
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
  value: PropTypes.shape({
    region: PropTypes.string.isRequired,
    kommun: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomDropdownRegion;
