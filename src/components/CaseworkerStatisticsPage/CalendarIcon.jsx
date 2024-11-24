import React from 'react';
import PropTypes from 'prop-types';

const CalendarIcon = ({ fill = "#AFAFAF", className = "" }) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={fill}
            className={className}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.625 1.875C5.97018 1.875 6.25 2.15482 6.25 2.5V3.75H13.75V2.5C13.75 2.15482 14.0298 1.875 14.375 1.875C14.7202 1.875 15 2.15482 15 2.5V3.75H15.625C17.0057 3.75 18.125 4.86929 18.125 6.25V15.625C18.125 17.0057 17.0057 18.125 15.625 18.125H4.375C2.99429 18.125 1.875 17.0057 1.875 15.625V6.25C1.875 4.86929 2.99429 3.75 4.375 3.75H5V2.5C5 2.15482 5.27982 1.875 5.625 1.875ZM16.875 9.375C16.875 8.68464 16.3154 8.125 15.625 8.125H4.375C3.68464 8.125 3.125 8.68464 3.125 9.375V15.625C3.125 16.3154 3.68464 16.875 4.375 16.875H15.625C16.3154 16.875 16.875 16.3154 16.875 15.625V9.375Z"
            />
        </svg>
    );
};

CalendarIcon.propTypes = {
    fill: PropTypes.string,
    className: PropTypes.string,
};

export default CalendarIcon;
