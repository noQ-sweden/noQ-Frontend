import React from 'react'

export default function User({ isDropdownOpen, onClick }) {
  return (
    < >
      <span className="hidden md:block ">Användare</span>
      <div className="relative ml-5 mr-5  ">
        <button
          className="block h-8 w-8 rounded-full overflow-hidden focus:outline-none focus:border-white"
          onClick={onClick}
        >
          <img src="user.png" className="h-8 w-8 object-cover" alt="user" />
        </button >
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden ">
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white ">
              Logga in / Logga ut
            </a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white">
              Konto
            </a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-500 hover:text-white">
              Baka bröd
            </a>
          </div>
        )}
      </div>
    </>)
}
