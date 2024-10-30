import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange,stays}) {
  const generatePageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage > 3) pageNumbers.push(1);
      if (currentPage > 4) pageNumbers.push("...");
  
      
      const startPage = Math.max(1, currentPage - 1);
      const endPage = Math.min(totalPages, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 3) pageNumbers.push("...");
      if (currentPage < totalPages - 2) pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const handlePageChange = (page) => {
    if (page !== "..." && page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-end font-sans text-sm font-semibold ">
      <div className="bg-white border border-gray-00 rounded-lg">
      <button className="bg-white text-black py-2 px-4"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button >
      {pageNumbers.map((page, index) => (
        <button 
        key={index}
        onClick={() => handlePageChange(page)}
        className={`${
          page === currentPage ? "bg-blue-600 text-white py-2 px-3"  
          : "bg-white border border-gray-200 py-2 px-2"}`}
        
        disabled={page === "..."} 
      >
        {page}
      </button >
      ))}
      <button className="bg-white text-black py-2 px-4"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
      </div>
      
    </div>
  );
};
