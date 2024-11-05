import React, { useState } from "react";
import axios from './../../api/AxiosNoqApi';
import GuestDropdown from './GuestDropdown';
import IncheckadeButtons from './IncheckadeButtons';
import { StartdatumInput, SlutdatumInput } from './DatePicker';
import Pagination from './Pagination';
import SearchBtn from './SearchBtn';
import FetchUserStatistics from './UserStatistics';
import { addDays, addMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';


const StatisticsPageHeder = () => {
    const [startDate, setStartDate] = useState(new Date()); // Default to today 
    const [endDate, setEndDate] = useState(addMonths(new Date(), 1)); // Default to one month
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dateError, setDateError] = useState(null);
    const [searchExecuted, setSearchExecuted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 34;

    const caseworkerStatisticsUrl = "api/caseworker/guests/nights/count";
    const handleSearch = () => {
        if (!startDate || !endDate) {
            setDateError("Välj datum");
            return;
        }
        setDateError(null);
        setSearchExecuted(true);
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        const searchUrlUserStatistics = `${caseworkerStatisticsUrl}/${formattedStartDate}/${formattedEndDate}`;
        setLoading(true);
        setError(null);
        axios.get(searchUrlUserStatistics)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error while fetching data.");
                setLoading(false);
            });
    };

    const setToday =() => {
        const today = new Date();
        setStartDate(today);
        setEndDate(today);
        setSearchExecuted(false); 
    }

    const setThisWeek = () => {
        const today = new Date();
        setStartDate(startOfWeek(today, {weekStartsOn: 1}));
        setEndDate(endOfWeek(today, {weekStartsOn: 1}));
        setSearchExecuted(false); 
    }

    const setThisMonth =() => {
        const today = new Date();
        setStartDate(startOfMonth(today));
        setEndDate(endOfMonth(today));
        setSearchExecuted(false); 
    }

    const handleNewDateSelection = () => {
        if (startDate && endDate) {
            setSearchExecuted(false); 
        }
    };

    return (
        <div className="py-6 px-9">
            <div className="text-xl font-semibold font-sans leading-7">Användningsrapport av gäst</div>
            <div className="mb-6 mt-6 w-full h-px bg-secondary-soft"></div>
            <div className="flex gap-7 items-center justify-center">
                <div className="flex flex-col">
                    <div className="font-sans text-sm font-semibold leading-5 tracking-normal text-left mb-2">Gäst</div>
                    <GuestDropdown data={data} />
                </div>
                <div className="flex flex-col">
                    <div className="font-sans text-sm font-semibold leading-5 tracking-normal text-left mb-2">Incheckade</div>
                    <IncheckadeButtons 
                    setToday={setToday}
                    setThisWeek={setThisWeek}
                    setThisMonth={setThisMonth}
                    />
                </div>
                <div className="flex flex-col">
                    <StartdatumInput 
                        startDate={startDate} 
                        setStartDate={(date) => {
                            setStartDate(date);
                            handleNewDateSelection();
                        }} 
                    />
                </div>
                <div className="flex flex-col">
                    <SlutdatumInput 
                        endDate={endDate} 
                        setEndDate={(date) => {
                            setEndDate(date);
                            handleNewDateSelection();
                        }} 
                    />
                </div>
                <div className="flex justify-center items-center">
                    <SearchBtn 
                        onClick={handleSearch} 
                        disabled={!startDate || !endDate || loading || searchExecuted} 
                    />
                </div>             
            </div>
            
            {dateError && <div>{dateError}</div>}
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            
            <div className="border-t border-1 mt-7 py-8 w-full">
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                    stays={data}
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
            <div>
                <FetchUserStatistics data={data} />
            </div>
        </div>
    );
};

export default StatisticsPageHeder;
