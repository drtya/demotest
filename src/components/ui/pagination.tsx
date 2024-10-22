'use client';
import { setCurrentPage } from '@/store/globalStore';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  className,
}: {
  currentPage: string;
  totalPages: string;
  className?: string;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className={`flex items-center justify-end gap-custom16 ${className}`}>
      <button
        className={`w-9 h-9 flex items-center justify-center ${
          currentPage <= '1' && 'cursor-not-allowed'
        }`}
        disabled={currentPage <= '1'}
        onClick={() => {
          dispatch(setCurrentPage(`${Number(currentPage) - 1}`));
        }}
      >
        <ChevronLeftIcon className="menuIconSize" />
      </button>
      <div className="w-9 h-9 flex items-center justify-center rounded-md border">
        {currentPage}
      </div>
      <p>of</p>
      <div className="w-9 h-9 flex items-center justify-center rounded-md border">
        {totalPages}
      </div>
      <button
        className={`w-9 h-9 flex items-center justify-center ${
          currentPage >= totalPages && 'cursor-not-allowed'
        }`}
        disabled={currentPage >= totalPages}
        onClick={() => {
          dispatch(setCurrentPage(`${Number(currentPage) + 1}`));
        }}
      >
        <ChevronRightIcon className="menuIconSize" />
      </button>
    </div>
  );
};

export default Pagination;
