import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger icon and close icon

function VolunteerHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle hamburger menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#255B57] p-4">
      {/* Logo Section */}
      <div className="flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          {/* Logo Area */}
          VolunteerApp
        </div>

        {/* Hamburger Icon for Mobile View */}
        <div className="lg:hidden" onClick={toggleMenu}>
          <FaBars className="text-white text-3xl cursor-pointer" />
        </div>
      </div>

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 bg-white p-4">
          <div onClick={toggleMenu}>
            <FaTimes className="text-black text-3xl cursor-pointer" />
          </div>
         
        </div>
      )}
    </header>
  );
}

export default VolunteerHeader;
