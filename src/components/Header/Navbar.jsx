import React, { useState } from "react";
import useLogin from "./../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";
import { FaRegEnvelope, FaBell, FaCaretDown, FaCaretUp, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { login } = useLogin();


  //TODO: Functionality for messages and alerts is not in place yet.
  //      Displaying 0 messages and alerts for now.
  const [nrOfMessages, /*setNrOfMessages*/] = useState(0);
  const [nrOfAlerts, /*setNrOfAlert*/] = useState(0);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleUserDropdown = () => {
      setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
      // Clear user session data here (localStorage, cookies, etc.)
      localStorage.clear();
      // Redirect to the starting page
      navigate("/", { replace: true });
      // Reload the page to reset the application state
      window.location.reload();
  };

  const getInitials = (username) => {
      const names = username.split('.');
      let initials = "";
      return initials.concat(names[0][0], names[1][0]).toUpperCase();
  }

  return (
    <>
        <nav className="flex items-center justify-between p-4 bg-white">
            <PageTitle/>
            <div className="flex items-center space-x-10"> {/* Adjusted space-x value */}
                <div className="relative">
                    <FaRegEnvelope className="size-6 fill-almost-black" />
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{nrOfMessages}</span>
                </div>
                <div className="relative">
                    <FaBell className="size-6 fill-almost-black" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{nrOfAlerts}</span>
                </div>

                <div className="relative flex items-center space-x-2">
                    <div className="bg-green-noQ text-white rounded-full w-8 h-8 flex items-center justify-center">{getInitials(login?.username)}</div>
                    {isUserDropdownOpen && (
                      <div className="
                          absolute
                          right-0
                          top-10
                          z-10
                          w-48
                          bg-white
                          shadow-lg">
                          <div>
                              <button
                                  onClick={handleLogout}
                                  className="
                                      w-full
                                      text-left
                                      px-4
                                      py-2
                                      text-sm
                                      text-gray-700
                                      hover:bg-gray-100">
                                  <span className="flex gap-4 pl-1 pr-1 text-l">
                                      <FaSignOutAlt className="mt-1" />
                                      <span>Logout</span>
                                  </span>
                              </button>
                          </div>
                      </div>
                    )}
                    <div className="text-sm">{login?.username}</div>
                    <div className="pr-1 pl-1">
                        {isUserDropdownOpen ?
                            ( <FaCaretUp onClick={toggleUserDropdown} /> )
                            :
                            ( <FaCaretDown onClick={toggleUserDropdown} /> )
                        }
                    </div>
                </div>
                <FaQuestionCircle className="text-2xl text-green-noQ ml-4" />

            </div>
        </nav>
    </>
  );
}
