import React, { useState } from 'react';

const IncheckadeButtons = () => {
    const [selectedButton, setSelectedButton] = useState(null);
    const buttons = ['idag', 'denna vecka', 'denna månad'];

    const handleButtonClick = (button) => {
        // Якщо той самий кнопка була клікнута, скидаємо вибір
        setSelectedButton(selectedButton === button ? null : button);
    };

    return (
        <div
            className="flex overflow-hidden cursor-pointer"
            onClick={() => setSelectedButton(null)} // Скидання вибору при натисканні на контейнер
        >
            {buttons.map((button, index) => (
                <button
                    key={button}
                    className={`py-2 px-4 font-sans text-sm font-semibold leading-5 tracking-normal text-left focus:outline-none 
                        ${selectedButton === button ? 'bg-[#E5E7EB]' : 'bg-[#FDFDFD]'}
                        ${index < buttons.length - 1 ? 'border-r border-[#D1D5DB]' : ''} // Бордер праворуч, крім останньої кнопки
                        ${index === 0 ? 'rounded-l' : ''} // Заокруглений лівий край для першої кнопки
                        ${index === buttons.length - 1 ? 'rounded-r' : ''} // Заокруглений правий край для останньої кнопки
                    `}
                    onClick={(e) => {
                        e.stopPropagation(); // Зупиняємо подію кліку, щоб не зняти вибір
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
