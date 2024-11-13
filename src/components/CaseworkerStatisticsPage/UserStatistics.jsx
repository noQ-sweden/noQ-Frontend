import React from "react";
import Icons from "./Icons";

export default function FetchUserStatistics({ data }) {

    const groupedData = {};

    data.forEach(user => {
        if (Array.isArray(user.user_stay_counts)) {
            user.user_stay_counts.forEach(stay => {
                if (stay.total_nights > 0) {
                    const key = `${user.first_name}-${stay.host?.name}`;
                    if (!groupedData[key]) {
                        groupedData[key] = {
                            user,
                            accommodation: stay.host?.name || 'Unknown',
                            region: stay.host?.region?.name || 'Unknown',
                            totalNights: 0,
                        };
                    }
                    groupedData[key].totalNights += stay.total_nights;
                }
            });
        }
    });

    const groupedDataArray = Object.values(groupedData);

    groupedDataArray.sort((a, b) => {
        const nameA = a.user.first_name?.toUpperCase() || '';
        const nameB = b.user.first_name?.toUpperCase() || ''; 
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });

    return (
        <div className="overflow-x-auto w-full rounded-xl text-lg h-[780px] shadow-xl">
            <table className="bg-white border border-gray-300 w-full">
                <thead className="border-2 border-gray-200 shadow-sm">
                    <tr className="font-medium">
                        <th className="text-left font-bold py-2 px-4 w-1/4 ">
                            <div className="flex items-center space-x-4">
                                <span>Gäst</span>
                                <Icons iconName="gäst" />
                            </div>
                        </th>
                        <th className="text-left py-2 px-4 w-1/4">
                            <div className="flex items-center space-x-4">
                                <span>Boende</span>
                                <Icons iconName="boende" />
                            </div>
                        </th>
                        <th className="text-center py-2 px-4 w-1/6">
                            <div className="flex items-center justify-center space-x-4">
                                <span>Nätter</span>
                                <Icons iconName="nätter" />
                            </div>
                        </th>
                        <th className="text-left py-2 px-4 w-1/4">
                            <div className="flex items-center space-x-4">
                                <span>Region</span>
                                <Icons iconName="region" />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="font-light">
                    {groupedDataArray.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="text-left py-2 px-4">
                                {item.user.first_name} {item.user.last_name}
                            </td>
                            <td className="text-left py-2 px-4">{item.accommodation}</td>
                            <td className="text-center py-2 px-4">{item.totalNights}</td>
                            <td className="text-left py-2 px-4">{item.region}</td>
                            <td className="text-left py-2 px-4">
                                <button
                                    className="bg-transparent border border-blue-600 text-blue-600 text-sm px-3 py-1 m-2 rounded hover:text-blue-400"
                                    onClick={() => console.log('clicked')}
                                >
                                    Fakturera
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
