import React, { useState } from "react";
import PropTypes from "prop-types";
import Icons from "./Icons";
import Pagination from "./Pagination";
import TotalNightStay from "./TotalNightStay";
import * as xlsx from "xlsx";

export default function FetchUserStatistics({ data, startDate, endDate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const groupedData = {};
  data.forEach((user) => {
    if (Array.isArray(user.user_stay_counts)) {
      user.user_stay_counts.forEach((stay) => {
        if (stay.total_nights > 0) {
          const key = `${user.first_name}-${stay.host?.name}`;
          if (!groupedData[key]) {
            groupedData[key] = {
              user,
              accommodation: stay.host?.name || "Unknown",
              region: stay.host?.region?.name || "Unknown",
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
    const nameA = a.user.first_name?.toUpperCase() || "";
    const nameB = b.user.first_name?.toUpperCase() || "";
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });

  const totalPages = Math.ceil(groupedDataArray.length / itemsPerPage);
  const paginatedData = groupedDataArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //function for export users data
  const handleExportForUser = (userData) => {
    const formattedData = [
      {
        FirstName: userData.user.first_name,
        LastName: userData.user.last_name,
        Accommodation: userData.accommodation,
        Region: userData.region,
        TotalNights: userData.totalNights,
      },
    ];

    const worksheet = xlsx.utils.json_to_sheet(formattedData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(
      workbook,
      worksheet,
      `${userData.user.first_name}`
    );
    xlsx.writeFile(
      workbook,
      `User_Statistics_${userData.user.first_name}_${userData.user.last_name}.xlsx`
    );
  };

  //function for export all data
  const handleExportAll = () => {
    const formattedData = groupedDataArray.map((item) => ({
      FirstName: item.user.first_name,
      LastName: item.user.last_name,
      Accommodation: item.accommodation,
      Region: item.region,
      TotalNights: item.totalNights,
    }));

    const worksheet = xlsx.utils.json_to_sheet(formattedData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "All_Users");
    xlsx.writeFile(
      workbook,
      `All_User_Statistics_${startDate}_to_${endDate}.xlsx`
    );
  };

  return (
    <div className="overflow-x-auto w-full text-lg rounded-lg">
      <div className="flex justify-between mt-10 py-6 border-t-2 w-full">
        <TotalNightStay stays={data} startDate={startDate} endDate={endDate} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="rounded-t-md border-2 border-gray-300 overflow-hidden">
        <table className="w-full">
          <thead className="border-b-2 border-gray-300">
            <tr className="font-medium">
              <th className="text-left font-bold py-2 px-4 w-1/4">
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
              <th className="text-left py-2 px-4 w-1/4">
                <button
                  className=" bg-transparent font-light border border-blue-600 text-blue-600 text-sm px-1 py-1  rounded hover:text-blue-400"
                  onClick={handleExportAll}
                >
                  Fakturera Alla
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="font-light">
            {paginatedData.map((item, index) => (
              <tr key={index} className="border-b border-gray-400">
                <td className="text-left py-2 px-4">
                  {item.user.first_name} {item.user.last_name}
                </td>
                <td className="text-left py-2 px-4">{item.accommodation}</td>
                <td className="text-center py-2 px-4">{item.totalNights}</td>
                <td className="text-left py-2 px-4">{item.region}</td>
                <td className="text-left py-2 px-4">
                  <button
                    className="bg-transparent border border-blue-600 text-blue-600 text-sm px-3 py-1 m-2 rounded hover:text-blue-400"
                    onClick={() => handleExportForUser(item)}
                  >
                    Fakturera
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

FetchUserStatistics.propTypes = {
  data: PropTypes.array.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};
