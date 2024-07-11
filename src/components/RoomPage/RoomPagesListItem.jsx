import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ArrowButton from './ArrowButton';

const RoomPagesListItem = ({ itemTitle, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleArrowButton = () => {
        setIsOpen(!isOpen);
    };

    const paddingClasses = isOpen ? 'py-[17px] px-[17px]' : 'py-[23px] px-[22px]';
    const isOpenClasses = isOpen ? '' : "flex   justify-between items-center ";
   

    return (
        <li className={`bg-white mb-8 sm:last:mb-0 sm:first:mt-4 rounded-lg w-[970px] ${paddingClasses}`}>
            <div className={`${isOpenClasses}`}>
                <div className="font-inter text-base font-medium leading-6 text-left">{itemTitle}</div>
            
            {isOpen && (
                    <div className="border border-gray-300">
                        {children}
                    </div>
            )}
                  <div className="flex justify-end">
                <button onClick={handleArrowButton} className={`focus:outline-none`}>
                    <ArrowButton isOpen={isOpen} />
                </button>
                  </div>
                </div>
        </li>
    );
};

RoomPagesListItem.propTypes = {
    itemTitle: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default RoomPagesListItem;
