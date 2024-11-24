import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const CustomDropdownRegion = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isKommunerOpen, setIsKommunerOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [kommuner, setKommuner] = useState([]);
  const [selectedKommun, setSelectedKommun] = useState(null);

  const regions = [
    "Stockholm",
    "Skåne",
    "Västmanland",
    "Västra Götaland",
    "Östergötlands",
    "Södermanland",
    "Halland",
    "Örebro",
    "Jönköping",
    "Uppsala",
    "Blekinge",
    "Dalarna",
    "Norrbotten",
    "Gävleborg",
    "Kronoberg",
    "Kalmar",
    "Västerbotten",
    "Västernorrland",
    "Värmland",
    "Jämtland",
    "Gotland",
  ];

  const stockholmKommuner = [
    "Botkyrka",
    "Danderyd",
    "Ekerö",
    "Haninge",
    "Huddinge",
    "Järfälla",
    "Lidingö",
    "Nacka",
    "Norrtälje",
    "Nykvarn",
    "Nynäshamn",
    "Salem",
    "Sigtuna",
    "Sollentuna",
    "Solna",
    "Stockholm",
    "Sundbyberg",
    "Södertälje",
    "Tyresö",
    "Täby",
    "Upplands-Bro",
    "Upplands",
    "Väsby",
    "Vallentuna",
    "Vaxholm",
    "Värmdö",
    "Österåker",
  ];

  const kommunerMap = {
    Stockholm: stockholmKommuner,
  };

  const regionDropdownRef = useRef(null);
  const kommunerDropdownRef = useRef(null);

  const handleRegionClick = (region) => {
    /* console.log(`Region selected: ${region}`); */
    setSelectedRegion(region);
    const relatedKommuner = kommunerMap[region] || [];
    /* console.log(`Kommuner for ${region}:`, relatedKommuner); */
    setKommuner(relatedKommuner);
    setIsOpen(false);
    setIsKommunerOpen(false);
    onChange(region);
  };

  const handleKommunClick = (kommun) => {
    /* console.log(`Kommuner selected: ${kommun}`); */
    setSelectedKommun(kommun);
    setIsKommunerOpen(false);
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
            className="border rounded border-gray-400 text-gray-400 py-1 px-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
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
        {kommuner && (
          <div ref={kommunerDropdownRef} className="w-1/2 relative">
            <label className="block text-md font-semibold text-gray-700 mb-1">
              Kommun <span className="text-red-500">*</span>
            </label>

            <div
              className={`border rounded border-gray-400 py-1 px-2 cursor-pointer ${
                kommuner.length === 0 ? "text-gray-400 cursor-not-allowed" : ""
              }`}
              onClick={() =>
                kommuner.length > 0 && setIsKommunerOpen(!isKommunerOpen)
              }
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
                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer focus:bg-gray-300"
                    onClick={() => handleKommunClick(kommun)}
                  >
                    {kommun}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

CustomDropdownRegion.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomDropdownRegion;
