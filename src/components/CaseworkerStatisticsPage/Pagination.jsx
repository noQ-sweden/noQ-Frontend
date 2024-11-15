import React from "react";

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange
}) {
    return (
        <div className="flex mb-4 justify-end">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-3 py-2 border rounded-l text-black border-gray-200 hover:bg-gray-100"
            >
                &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    className={`px-3 py-2 border ${currentPage === i + 1 ? "bg-blue-600 text-white py-2 px-3"
                    : "bg-white border border-gray-200 py-2 px-2"}`}
                >
                    {i + 1}
                </button>
            ))}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-3 py-2 border rounded-r text-black border-gray-200 hover:bg-gray-100"
            >
                &gt;
            </button>
        </div>
    );
}
