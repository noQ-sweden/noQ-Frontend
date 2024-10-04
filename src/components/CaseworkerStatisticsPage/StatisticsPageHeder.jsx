import React, { useState, useEffect } from 'react';
import GuestDropdown from './GuestDropdown'
import IncheckadeButtons from './IncheckadeButtons'


const StatisticsPageHeder = () => {
    
    

    return (
    <div className="py-6 px-9">
            <div class="text-xl font-semibold font-sans leading-7">Användningsrapport av gäst</div>
            <div class="mb-6 mt-6 w-[982px] h-px bg-secondary-soft "></div>
            <div class="flex gap-5">
    <div class="flex flex-col">
        <div class="font-sans text-sm font-semibold leading-5 tracking-normal text-left mb-2">Gäst</div>
        <GuestDropdown/>
    </div>
    <div class="flex flex-col">
        <div class="font-sans text-sm font-semibold leading-5 tracking-normal text-left mb-2">Incheckade</div>
    <IncheckadeButtons/>
    </div>
    <div class="flex flex-col">
        <div class="font-sans text-sm font-semibold leading-5 tracking-normal text-left mb-2">Startdatum</div>
        
    </div>
    <div class="flex flex-col">
        <div class="font-sans text-sm font-semibold leading-5 tracking-normal text-left mb-2">Slutdatum</div>
        
    </div>
</div>

    </div>
    );
};

export default StatisticsPageHeder;