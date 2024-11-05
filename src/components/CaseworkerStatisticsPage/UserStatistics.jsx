import React from "react";

export default function FetchUserStatistics({ data }) {
    const sortedData = data.sort((a, b) => {
        const nameA = a.first_name.toUpperCase();
        const nameB = b.first_name.toUpperCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });

    return (
        <div className='overflow-x-auto w-full rounded-xl text-lg'>
            <table className='bg-white border border-gray-300 w-full'>
                <thead className='border-b-2 border-gray-200'>
                    <tr>
                        <th className='text-left font-normal py-2 px-4 w-1/4'>Gäst</th>
                        <th className='text-left font-normal py-2 px-4 w-1/4'>Boende</th>
                        <th className='text-center font-normal py-2 px-4 w-1/6'>Nätter</th>
                        <th className='text-left font-normal py-2 px-4 w-1/4'>Region</th>
                    </tr>
                </thead>
                <tbody className='font-light'>
                    {sortedData.map((user, userIndex) => {
                        const stay = user.user_stay_counts[0];
                        return (
                            <tr key={userIndex} className='border-b border-gray-200'>
                                <td className='text-left py-2 px-4'>
                                    {user.first_name} {user.last_name}
                                </td>
                                <td className='text-left py-2 px-4'>{stay.host.name}</td>
                                <td className='text-center py-2 px-4'>{stay.total_nights}</td>
                                <td className='text-left py-2 px-4'>{stay.host.region.name}</td>
                                <td className='text-left py-2 px-4'>
                                    <button 
                                    className='bg-transparent border border-blue-600
                                     text-blue-600 text-sm px-3 py-1 m-2 rounded
                                      hover:text-blue-400'>
                                        Fakturera
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
