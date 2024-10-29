import React, { useState } from 'react';
import GuestDropdown from './GuestDropdown';
import IncheckadeButtons from './IncheckadeButtons';
import { StartdatumInput, SlutdatumInput } from './DatePicker'; // Ensure correct import path
import { addDays } from 'date-fns'; // Import addDays from date-fns
import Pagination from './Pagination';
import SearchBtn from './SearchBtn';
import FetchUserStatistics from './UserStatistics';
//import useHeader from "./../../hooks/useHeader";
//import FetchTotalNights from './FetchTotalNights';

const StatisticsPageHeder = () => {
    // Define state for start and end dates
    const [startDate, setStartDate] = useState(addDays(new Date(), -7)); // Default to 7 days ago
    const [endDate, setEndDate] = useState(new Date()); // Default to today
    const[currentPage, setCurrentPage] = useState(1)
    const totalPages = 34

    const handlePagechange = (page) => {
        setCurrentPage(page)
    }
    //const { setHeader } = useHeader();
    //setHeader("Statistik");
    return (
        <div className="py-6 px-9">
            <div className="text-xl font-semibold font-sans leading-7">Användningsrapport av gäst</div>
            <div className="mb-6 mt-6 w-[1000px] h-px bg-secondary-soft"></div>
            <div className="flex gap-5 items-center">
                <div className="flex flex-col">
                    <div className="font-sans text-sm font-semibold leading-5 tracking-normal text-left mb-2">Gäst</div>
                    <GuestDropdown />
                </div>
                <div className="flex flex-col">
                    <div className="font-sans text-sm font-semibold leading-5 tracking-normal text-left mb-2">Incheckade</div>
                    <IncheckadeButtons />
                </div>
                <div className="flex flex-col">
                    {/* <div className="font-sans text-sm font-semibold leading-5 tracking-normal text-left mb-2">Startdatum</div> */}
                    <StartdatumInput startDate={startDate} setStartDate={setStartDate} />
                </div>
                <div className="flex flex-col">
                    {/* <div className="font-sans text-sm font-semibold leading-5 tracking-normal text-left mb-2">Slutdatum</div> */}
                    <SlutdatumInput endDate={endDate} setEndDate={setEndDate} />
                </div>
                <div className='flex justify-center items-center'>
                    <SearchBtn />
                </div>
                
            </div>
            
            <div className='border-t border-1 mt-7 py-8 w-[1000px]'>
              <div>
               <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePagechange}
               />
            </div>
            </div>
            <div>
                <FetchUserStatistics />
            </div>
            
        </div>
    );
};

export default StatisticsPageHeder;
