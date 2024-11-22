import React, { useState } from "react";
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

  return (
    <div className="relative mt-5">
      {/* Regions Dropdown */}
      <div className="relative inline-block w-1/3">
        <div
          className="border rounded border-gray-400 py-1 px-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedRegion || "Välj Region"}
        </div>

        {isOpen && (
          <ul
            className="absolute top-full left-0 w-full bg-white border border-gray-400 rounded mt-1 shadow-lg z-10"
            style={{
              maxHeight: "100px",
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
      {kommuner.length > 0 && (
        <div className="relative inline-block w-1/3 ml-4">
          <div
            className="border rounded border-gray-400 py-1 px-2 cursor-pointer"
            onClick={() => setIsKommunerOpen(!isKommunerOpen)}
          >
            {selectedKommun || "Välj Kommun"}
          </div>
          {isKommunerOpen && (
            <ul
              className="absolute top-full left-0 w-full bg-white border border-gray-400 rounded mt-1 shadow-lg z-10"
              style={{
                maxHeight: "100px",
                overflowY: "auto",
                paddingBottom: "8px",
              }}
            >
              {kommuner.map((kommun) => (
                <li
                  key={kommun}
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
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
  );
};

CustomDropdownRegion.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomDropdownRegion;
