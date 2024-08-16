import React, {useState, useEffect } from "react";
import axios from "../../api/AxiosNoqApi";
import freePlacesIcon from "./../../assets/images/freePlacesIcon.svg";
import Panel from "../Common/Panel";
import Card from "../Common/Card";

export default function WeeklyRoomStatus() {
    const [availableDates, setAvailableDates] = useState({})

    useEffect( () => {
        // Fetch data for one week
        axios.get ('/api/host/available/7')
        .then ((response) => {
        if (response.status === 200) {
            setAvailableDates(response.data.available_dates)
        } else {
            console.log('Error while fetching overview data.');
        }
        })
        .catch((error) => {
        console.log("Error while fetching overview data.", error);
        });
    }, []);

    const dates = Object.keys(availableDates).slice(0, 7);
    const productMap = new Map();
  
    Object.values(availableDates).forEach(day => {
      day.forEach(item => {
        if (!productMap.has(item.product.id)) {
          productMap.set(item.product.id, item.product);
        }
      });
    });
  
    const getCellColor = (placesLeft, totalPlaces) => {
      const ratio = placesLeft / totalPlaces;
      if (ratio >= 0.75) return 'bg-green-600';
      if (ratio >= 0.1) return 'bg-yellow-500';
      return 'bg-red-500';
    };
  
    const formatDate = (dateString) => {
      const [, month, day] = dateString.split('-');
      return `${month}/${day}`;
    };
  
    return (
        <Panel title="Lediga platser">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                <thead className='border-b-2'>
                    <tr>
                    <th className="py-2 px-4 font-normal tracking-tight text-left">Rum</th>
                    {dates.map(date => (
                        <th key={date} className="p-2 font-normal tracking-tight">{formatDate(date)}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from(productMap).map(([productId, product]) => (
                    <tr key={productId}>
                        <td className="py-2 px-4 font-normal tracking-tight">{product.description}</td>
                        {dates.map(date => {
                        const availability = availableDates[date].find(item => item.product.id === productId);
                        const cellColor = availability 
                            ? getCellColor(availability.places_left, product.total_places)
                            : 'bg-gray-200';
                        return (
                            <td key={date} className="py-3 px-2">
                            <div className="flex justify-center items-center">
                                <div className={`w-11 h-11 ${cellColor} rounded-md flex items-center justify-center text-white font-bold`}>
                                {availability ? availability.places_left : '-'}
                                </div>
                            </div>
                            </td>
                        );
                        })}
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </Panel>
    );
}