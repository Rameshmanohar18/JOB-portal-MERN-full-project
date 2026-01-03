import React from "react";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageRangeDisplayed = 5,
  marginPagesDisplayed = 2,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const handlePageClick = (data) => {
    onPageChange(data.selected + 1);
  };

  return (
    <div className={className}>
      <ReactPaginate
        previousLabel={<FiChevronLeft className="h-5 w-5" />}
        nextLabel={<FiChevronRight className="h-5 w-5" />}
        breakLabel="..."
        pageCount={totalPages}
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageRangeDisplayed}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1}
        containerClassName="flex items-center justify-center space-x-1"
        pageClassName="hidden sm:inline-flex"
        pageLinkClassName="flex items-center justify-center h-10 w-10 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        activeLinkClassName="!bg-primary-600 !text-white hover:!bg-primary-700"
        previousClassName="inline-flex"
        previousLinkClassName="flex items-center justify-center h-10 w-10 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        nextClassName="inline-flex"
        nextLinkClassName="flex items-center justify-center h-10 w-10 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        disabledClassName="opacity-50 cursor-not-allowed"
        disabledLinkClassName="cursor-not-allowed"
        breakClassName="hidden sm:inline-flex"
        breakLinkClassName="flex items-center justify-center h-10 w-10 rounded-lg text-gray-700"
      />

      <div className="mt-4 text-center text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
    