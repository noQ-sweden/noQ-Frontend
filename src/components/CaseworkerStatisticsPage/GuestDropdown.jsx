import React, { useState } from 'react';
import Select from 'react-select';

export default function GuestDropdown(){
    const [selectedGuest, setSelectedGuest] = useState(null);

const guests = [
    { value: 'all', label: 'All guests' },
    { value: 'guest1', label: 'John Smith' },
    { value: 'guest2', label: 'Emily Johnson' },
    { value: 'guest3', label: 'Michael Williams' },
    { value: 'guest4', label: 'Olivia Brown' },
    { value: 'guest5', label: 'James Jones' },
    { value: 'guest6', label: 'Sophia Garcia' },
    { value: 'guest7', label: 'Benjamin Miller' },
    { value: 'guest8', label: 'Emma Davis' },
    { value: 'guest9', label: 'William Rodriguez' },
    { value: 'guest10', label: 'Charlotte Martinez' },
    { value: 'guest11', label: 'Henry Lopez' },
    { value: 'guest12', label: 'Amelia Wilson' },
    { value: 'guest13', label: 'Liam Anderson' },
    { value: 'guest14', label: 'Mia Thomas' },
    { value: 'guest15', label: 'Ethan Lee' },
    { value: 'guest16', label: 'Ava Taylor' },
    { value: 'guest17', label: 'Lucas Harris' },
    { value: 'guest18', label: 'Isabella Clark' },
    { value: 'guest19', label: 'Noah Walker' },
    { value: 'guest20', label: 'Sophia Young' },
];


    // Стилі для кастомізації React Select
    const customStyles = {
        container: (provided) => ({
            ...provided,
            width: '174px', // Встановлює ширину
        }),
        control: (provided) => ({
            ...provided,
            height: '36px', 
            padding: '2px 8px', // Внутрішні відступи
            borderColor: '#D1D5DB', 
            boxShadow: 'none', // Прибирає тінь на фокусі
            '&:hover': {
                borderColor: '#A3A3A3', // Колір бордюру при наведенні (Tailwind gray-400)
            },
        }),
        menu: (provided) => ({
            ...provided,
            width: '178px', // Ширина меню
            height: '324px', // Висота меню
            marginTop: '3px',// Залишає меню прямо під select
            border: '1px solid #D1D5DB', // Колір бордюру меню (gray-300)
        }),
        menuList: (provided) => ({
            ...provided,
            padding: 0, // Забирає внутрішні відступи у списку
            gap: '0px', // Забирає проміжок між опціями
            maxHeight: '324px', // Максимальна висота списку
            overflowY: 'auto', // Додає прокрутку, якщо список великий
        }),
        option: (provided, state) => ({
            ...provided,
            padding: '8px 12px', // Відступи для кожної опції
            backgroundColor: state.isFocused ? '#E5E7EB' : 'white', // Колір при фокусі (gray-200)
            color: '#000000', // Чорний текст
            cursor: 'pointer', // Курсор при наведенні
            fontFamily: 'Inter', // Задає шрифт Inter
            fontSize: '14px', // Задає розмір шрифту 14px
            fontWeight: '400', // Задає вагу шрифту 400
            lineHeight: '20px', // Задає висоту рядка 20px
            textAlign: 'left', // Вирівнювання тексту зліва
        }),
    };

    return (
        <div>
            <Select
                options={guests} // Передаємо список гостей
                value={selectedGuest} // Відображення вибраного гостя
                onChange={setSelectedGuest} // Зміна вибору
                styles={customStyles} // Використовуємо кастомні стилі
                placeholder="Alla gäster" // Плейсхолдер
                components={{
                    // DropdownIndicator: () => null, 
                    IndicatorSeparator: () => null, 
                }}
            />
        </div>
    );
};