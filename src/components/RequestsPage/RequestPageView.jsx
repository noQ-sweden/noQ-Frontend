import { useState, useEffect, React } from 'react';
import RequestList from './RequestList';
import AssignPage from './AssignPage';

export default function RequestPageView() {

    return (
        <div className='p-4'>
            <h2 className='text-2xl mb-4'>'Förfrågningar'</h2>
            <RequestList />
        </div>
    );
}
