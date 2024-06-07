import React from "react";
import useLogin from "./../../hooks/useLogin";
import PropTypes from 'prop-types';

User.propTypes = {
    isDropdownOpen: PropTypes.bool,
    onClick: PropTypes.func,
};

export default function User({ isDropdownOpen, onClick }) {
    const { login, setLogin } = useLogin();

    const handleLogout = () => {
      setLogin({});
    };

    return (
        <div className="relative">
            <button onClick={onClick} className="flex items-center">
                <span>Profile</span>
                <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isDropdownOpen && (
                <div className="
                    absolute
                    right-0
                    mt-2
                    w-48
                    bg-white
                    border
                    rounded
                    shadow-lg
                    py-1
                    z-10">
                    <div>
                        <p className="px-4 py-2 text-sm text-gray-700">
                           Welcome, {login?.username}
                        </p>
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
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
