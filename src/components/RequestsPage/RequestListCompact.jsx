import React from 'react';
import { getDayNumber, getMonth, getStatus } from '../../utility/utilityFunctions';
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function RequestListCompact({requests}) {
    RequestListCompact.propTypes = {
        requests: PropTypes.any
    };
    const navigate = useNavigate()

    return (
        <div>
            <div className='text-sm'>
                <table className='table-fixed'>
                    <thead className='border-b-2'>
                        <tr className='text-left'>
                            <th className='font-normal tracking-tight w-2/5'>Namn</th>
                            <th className='p-2 font-normal tracking-tight w-1/5'>Incheckning</th>
                            <th className='p-2 font-normal tracking-tight w-1/5'>Utchecking</th>
                            <th className='p-2 font-normal tracking-tight w-1/5'>Bokningsstatus</th>
                        </tr>
                    </thead>
                    <tbody className='border-b-2'>
                        { requests.map(request => (
                            <tr key={request.id}>
                                <td className='tracking-tight'>{request.user.first_name + " " + request.user.last_name}</td>
                                <td className='p-2 tracking-tight text-center'>{getDayNumber(request.start_date) + " " + getMonth(request.start_date)}</td>
                                <td className='p-2 tracking-tight text-center'>end date</td>
                                <td className='p-2 tracking-tight text-center'>{getStatus(request.status.description)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='mt-3 text-right text-sm'>
                <button className="
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    font-semibold
                    text-m
                    align-middle
                    w-40
                    h-8
                    rounded
                    focus:outline-none
                    focus:shadow-outline"
                    onClick={() => navigate("/host/requests")}>
                    Hantera förfrågningar
                </button>
            </div>
        </div>
    );
}
