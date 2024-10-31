import React, { useEffect, useState } from "react";
import axios from './../../api/AxiosNoqApi';
import GuestDropdown from './GuestDropdown';
import IncheckadeButtons from './IncheckadeButtons';
import { StartdatumInput, SlutdatumInput } from './DatePicker'; // Ensure correct import path
import { addDays } from 'date-fns'; // Import addDays from date-fns
import Pagination from './Pagination';
import SearchBtn from './SearchBtn';
import FetchUserStatistics from './UserStatistics'

const StatisticsPageHeder = () => {
    // Define state for start and end dates
    const [startDate, setStartDate] = useState(addDays(new Date(), -7)); // Default to 7 days ago
    const [endDate, setEndDate] = useState(new Date()); // Default to today
    const[data,Setdata] = useState([])
    const[error,SetError] = useState(null)
    const[loading,SetLoading] = useState(true)
    const[currentPage, setCurrentPage] = useState(1)
    const totalPages = 34

    const caseworkerStatisticsUrl = "api/caseworker/guests/nights/count"
    const urlUserStatistics = `${caseworkerStatisticsUrl}/2/2023-01-01/2023-12-31`
    useEffect(() => {
        SetLoading(true)
          axios.get(urlUserStatistics)
          .then((response) =>  {
                Setdata(response.data)
                console.log(response.data)
                SetLoading(false)
          })
          .catch(() => SetError(true))
    },[])
    if (error) return <div>Error</div>
    if (loading) return <div>Loading...</div>

    const handleSearch = () => {
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        const searchUrlUserStatistics = `${caseworkerStatisticsUrl}/5/${formattedStartDate}/${formattedEndDate}`;

        SetLoading(true); // Set loading state to true while fetching data
        axios.get(searchUrlUserStatistics)
            .then((response) => {
                Setdata(response.data); // Update state with the new data
                SetLoading(false); // Set loading state to false after fetching
            })
            .catch(() => {
                SetError(true); // Handle any errors
                SetLoading(false);
            });
    };

    const handlePagechange = (page) => {
        setCurrentPage(page)
    }
    return (
        <div className="py-6 px-9">
            <div className="text-xl font-semibold font-sans leading-7">Användningsrapport av gäst</div>
            <div className="mb-6 mt-6 w-full h-px bg-secondary-soft"></div>
            <div className="flex gap-7 items-center justify-center">
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
                    <SearchBtn onClick={handleSearch} />
                </div>
                
            </div>
            
            <div className='border-t border-1 mt-7 py-8 w-full'>
              <div>
               <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePagechange}
                stays={data}
               />
            </div>
            </div>
            <div>
                <FetchUserStatistics data={data}/>
            </div>
            
        </div>
    );
};

export default StatisticsPageHeder;
