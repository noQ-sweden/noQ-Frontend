import React from "react";
export default function FetchUserStatistics({data}) {
     
      return(
            <div className='overflow-x-auto w-full rounded-xl'>
            <table className=' bg-white border border-gray-200 w-full'>
              <thead className='border-b-2 border-gray-200'>
                <tr>
                  <th className='text-left font-normal py-2 px-4 w-1/4'>Gäst</th>
                  <th className='text-left font-normal py-2 px-4 w-1/4'>Boende</th>
                  <th className='text-center font-normal py-2 px-4 w-1/6'>Nätter</th>
                  <th className='text-left font-normal py-2 px-4 w-1/4'>Region</th>
                </tr>
              </thead>
              <tbody className='font-light'>
                {data.user_stay_counts && data.user_stay_counts.map((stay, index) => (
                    <tr key={index} className='border-b border-gray-200'>
                    <td className='text-left py-2 px-4'>{data.first_name} {data.last_name}</td>
                    <td className='text-left py-2 px-4'>{stay.host.name}</td>
                    <td className='text-center py-2 px-4'>{stay.total_nights}</td>
                    <td className='text-left py-2 px-4'>{stay.host.region.name}</td>
                    <button className='bg-transparent border border-blue-400 text-blue-400 text-sm px-2 py-0 m-2 rounded hover:text-blue-500'>
                        Fakturera
                    </button>
          
                  </tr>
                  
                ))}
              </tbody>
            </table>
          </div>

  );
      
}