"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="mt-8 flex justify-center space-x-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded px-4 py-2 ${
            currentPage === page
              ? "bg-[#bf935f] text-white"
              : "bg-white text-[#443227] hover:bg-[#bf935f]/20"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
