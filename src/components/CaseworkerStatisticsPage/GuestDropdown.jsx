import React, { useState } from 'react';
import Select from 'react-select';
import { startOfMonth } from 'date-fns';
import PropTypes from 'prop-types';
export default function GuestDropdown({ data, setSelectedGuest, setStartDate, setEndDate }) {
    const [selectedGuestLocal, setSelectedGuestLocal] = useState(null);

    const guestsData = Array.isArray(data) ? data : [data];
    const sortedGuests = guestsData
        .map((list) => ({
            value: list.user_id,
            label: `${list.first_name} ${list.last_name}`,
        }))
        .sort((a, b) => {
            const nameA = `${a.label}`.toUpperCase();
            const nameB = `${b.label}`.toUpperCase();
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        });

    const guests = [
        { value: 'all', label: 'All guests' },
        ...sortedGuests,
    ];

    const customStyles = {
        container: (provided) => ({
            ...provided,
            width: '200px',
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

    const handleSelectChange = (selectedOption) => {
        setSelectedGuestLocal(selectedOption);
        setSelectedGuest(selectedOption);

        if (selectedOption.value === 'all') {
            const startOfMonthDate = startOfMonth(new Date());
            const endOfMonthDate = new Date();
            setStartDate(startOfMonthDate);
            setEndDate(endOfMonthDate);
        }
    };

    return (
        <div>
            <Select
                options={guests}
                value={selectedGuestLocal}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Alla gäster"
                components={{
                    IndicatorSeparator: () => null,
                }}
            />
        </div>
    );
}

GuestDropdown.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    setSelectedGuest: PropTypes.func.isRequired,
    setStartDate: PropTypes.func.isRequired,
    setEndDate: PropTypes.func.isRequired,
};
