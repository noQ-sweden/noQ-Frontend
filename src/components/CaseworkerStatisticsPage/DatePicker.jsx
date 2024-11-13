
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from './CalendarIcon';

const StartdatumInput = ({ startDate, setStartDate }) => {
    return (
        <div className="flex flex-col">
            <label className="font-sans text-sm font-semibold leading-5 tracking-normal text-left mb-2">Startdatum</label>
            <div className="relative flex items-center w-[220px] h-[36px]  p-2  bg-white  border rounded border-gray-300">
                <CalendarIcon className="w-[20px] h-[20px]"/>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="w-full h-full"
                />
            </div>
        </div>
    );
};

const SlutdatumInput = ({startDate, endDate, setEndDate }) => {
    return (
        <div className="flex flex-col">
            <label className="font-sans text-sm font-semibold leading-5 tracking-normal text-left mb-2">Slutdatum</label>
            <div className="relative flex items-center w-[220px] h-[36px] p-2  bg-white border rounded border-gray-300">
                <CalendarIcon className="w-[20px] h-[20px]"/>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                    minDate={startDate}
                    className="w-full h-full"
                />
            </div>
        </div>
    );
};

export { StartdatumInput, SlutdatumInput };


