import React, { useState } from 'react';

const IncheckadeButtons = ({ setToday, setThisWeek, setThisMonth }) => {
    const [selectedButton, setSelectedButton] = useState(null);

    const buttons = [
        { label: 'Idag', action: setToday },
        { label: 'Denna vecka', action: setThisWeek },
        { label: 'Denna månad', action: setThisMonth },
    ];

    const handleButtonClick = (buttonLabel, action) => {
        setSelectedButton(selectedButton === buttonLabel ? null : buttonLabel);
        if (action) action();
    };

    return (
        <div
            className="flex overflow-hidden cursor-pointer"
            onClick={() => setSelectedButton(null)}
        >
            {buttons.map((button, index) => {
                const isSelected = selectedButton === button.label;
                return (
                    <button
                        key={button.label}
                        className={`
                            py-2 px-4 font-sans text-sm font-semibold leading-5 tracking-normal text-left focus:outline-none
                            ${isSelected ? 'bg-[#E5E7EB]' : 'bg-[#FDFDFD]'}
                            ${index < buttons.length - 1 ? 'border-r border-[#D1D5DB]' : ''}
                            ${index === 0 ? 'rounded-l' : ''}
                            ${index === buttons.length - 1 ? 'rounded-r' : ''}
                        `}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleButtonClick(button.label, button.action);
                        }}
                        style={{
                            border: isSelected ? '1px solid transparent' : '1px solid #D1D5DB',
                        }}
                    >
                        {button.label}
                    </button>
                );
            })}
        </div>
    );
};

export default IncheckadeButtons;
