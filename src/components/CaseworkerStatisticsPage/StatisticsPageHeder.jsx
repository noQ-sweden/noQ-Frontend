import React, { useState, useEffect } from "react";
import axios from './../../api/AxiosNoqApi';
import GuestDropdown from './GuestDropdown';
import IncheckadeButtons from './IncheckadeButtons';
import { StartdatumInput, SlutdatumInput } from './DatePicker';
import Pagination from './Pagination';
import SearchBtn from './SearchBtn';
import FetchUserStatistics from './UserStatistics';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

const StatisticsPageHeder = () => {
    const [startDate, setStartDate] = useState(startOfMonth(new Date())); 
    const [endDate, setEndDate] = useState(new Date()); 
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dateError, setDateError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [selectedGuest, setSelectedGuest] = useState(null);

    const caseworkerStatisticsUrl = "api/caseworker/guests/nights/count";
    const handleSearch = () => {
        if (!startDate || !endDate) {
            setDateError(true);
            return;
        }
        setDateError(null);
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        const searchUrlUserStatistics = `${caseworkerStatisticsUrl}/${formattedStartDate}/${formattedEndDate}`;
        setLoading(true);
        setError(null);
        axios.get(searchUrlUserStatistics)
            .then((response) => {
                setData(response.data);
                console.log(response.data)
                setLoading(false);
            })
            .catch((err) => {
                setError(err?.response?.data?.message || "Error while fetching data.");
                setLoading(false);
            });
    };

    const handleGuestChange = (guest) => {
        setSelectedGuest(guest);
        if (guest.value === 'all') {
            setThisMonth();
        }
    };

    const setToday = () => {
        const today = new Date();
        setStartDate(today);
        setEndDate(today);
    };

    const setThisWeek = () => {
        const today = new Date();
        setStartDate(startOfWeek(today, { weekStartsOn: 1 }));
        setEndDate(endOfWeek(today, { weekStartsOn: 1 }));
    };

    const setThisMonth = () => {
        const today = new Date();
        setStartDate(startOfMonth(today));
        setEndDate(today);
    };

    const filteredData = selectedGuest && selectedGuest.value !== 'all'
        ? data.filter(user => user.user_id === selectedGuest.value)
        : data;

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="py-6 px-6">
            <div className="text-xl font-semibold font-sans leading-7">Användningsrapport av gäst</div>
            <div className="mb-6 mt-6 w-full h-px bg-secondary-soft"></div>
            <div className="flex flex-row gap-4 items-center justify-between ">
                <div className="flex flex-col">
                    <div className="font-sans text-sm font-semibold leading-5 tracking-normal text-left mb-2">Gäst</div>
                    <GuestDropdown
                        data={data}
                        selectedGuest={selectedGuest}
                        setSelectedGuest={handleGuestChange}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />
                </div>
                <div className="flex flex-col">
                    <div className="font-sans text-sm font-semibold leading-5 tracking-normal text-left mb-2">Incheckade</div>
                    <IncheckadeButtons
                        setToday={setToday}
                        setThisWeek={setThisWeek}
                        setThisMonth={setThisMonth}
                    />
                </div>
                <div className="flex gap-2">
                <div className="flex flex-col">
                    <StartdatumInput
                        startDate={startDate}
                        setStartDate={(date) => {
                            setStartDate(date);
                        }}
                    />
                </div>
                <div className="flex flex-col">
                    <SlutdatumInput
                        startDate={startDate}
                        endDate={endDate}
                        setEndDate={(date) => {
                            setEndDate(date);
                        }}
                    />
                </div>
                </div>
                <div className="flex justify-center items-center">
                    <SearchBtn
                        onClick={handleSearch}
                    />
                </div>
            </div>

            {dateError && <div>{dateError}</div>}
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}

            <div className="border-t border-1 mt-7 py-7 w-full">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                    stays={currentData}
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
            <div>
                <FetchUserStatistics data={currentData} />
            </div>
        </div>
    );
};

export default StatisticsPageHeder;