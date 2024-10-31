import React, { useState } from 'react';

const IncheckadeButtons = () => {
    const [selectedButton, setSelectedButton] = useState(null);
    const buttons = ['idag', 'denna vecka', 'denna månad'];

    const handleButtonClick = (button) => {
        setSelectedButton(selectedButton === button ? null : button);
    };

    return (
        <div
            className="flex overflow-hidden cursor-pointer"
            onClick={() => setSelectedButton(null)}
        >
            {buttons.map((button, index) => (
                <button
                    key={button}
                    className={`py-2 px-4 font-sans text-sm font-semibold leading-5 tracking-normal text-left focus:outline-none 
                        ${selectedButton === button ? 'bg-[#E5E7EB] ' : 'bg-[#FDFDFD]'}
                        ${index < buttons.length - 1 ? 'border-r border-[#D1D5DB]' : ''}
                        ${index === 0 ? 'rounded-l' : ''}
                        ${index === buttons.length - 1 ? 'rounded-r' : ''}
                    `}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleButtonClick(button);
                    }}
                    style={{
                        border: selectedButton === button ? '1px solid transparent' : '1px solid #D1D5DB',
                    }}
                >
                    {button}
                </button>
            ))}
        </div>
    );
};

export default IncheckadeButtons;
