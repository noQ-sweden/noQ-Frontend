import React, { useState } from 'react';
import Select from 'react-select';

export default function GuestDropdown({ data }) {
    const [selectedGuest, setSelectedGuest] = useState(null);
    const guestsData = Array.isArray(data) ? data : [data];

    const customStyles = {
        container: (provided) => ({
            ...provided,
            width: '230px',
        }),
        control: (provided) => ({
            ...provided,
            height: '36px',
            padding: '2px 8px',
            borderColor: '#D1D5DB',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#A3A3A3',
            },
        }),
        menu: (provided) => ({
            ...provided,
            width: '178px',
            height: '324px',
            marginTop: '3px',
            border: '1px solid #D1D5DB',
        }),
        menuList: (provided) => ({
            ...provided,
            padding: 0,
            gap: '0px',
            maxHeight: '324px',
            overflowY: 'auto',
        }),
        option: (provided, state) => ({
            ...provided,
            padding: '8px 12px',
            backgroundColor: state.isFocused ? '#E5E7EB' : 'white',
            color: '#000000',
            cursor: 'pointer',
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '20px',
            textAlign: 'left',
        }),
    };

    const guests = [
        { value: 'all', label: 'All guests' },
        ...guestsData
            .map((list) => ({
                value: list.user_id,
                label: `${list.first_name} ${list.last_name}`,
            }))
            .sort((a, b) => {
                // Sort by first name then last name
                const nameA = `${a.label}`.toUpperCase(); // ignore case
                const nameB = `${b.label}`.toUpperCase(); // ignore case
                return nameA < nameB ? -1 : nameA > nameB ? 1 : 0; // Sort alphabetically
            }),
    ];

    return (
        <div>
            <Select
                options={guests} 
                value={selectedGuest}
                onChange={setSelectedGuest}
                styles={customStyles}
                placeholder="Alla gäster"
                components={{
                    IndicatorSeparator: () => null,
                }}
            />
        </div>
    );
}
