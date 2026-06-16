import React from "react";
import Button from "./Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function Pagination({ handleChange, pageNumber, totalPage }) {
  const next = () => {
    if (pageNumber === totalPage) return;
    handleChange(pageNumber + 1);
  };

  const prev = () => {
    if (pageNumber === 1) return;
    handleChange(pageNumber - 1);
  };

  const pageCount = Number(totalPage);
  const current = Number(pageNumber);

  // Show max 4 page numbers.
  // If pageCount <= 4 => show all.
  // Else show a sliding window of 4 pages near current.
  const pages = (() => {
    if (pageCount <= 4) return Array.from({ length: pageCount }, (_, i) => i + 1);

    const start = Math.max(1, current - 1);
    const end = Math.min(pageCount, start + 3);
    const finalStart = Math.max(1, end - 3);

    const out = [];
    for (let n = finalStart; n <= end; n++) out.push(n);
    return out;
  })();

  return (
    <div className="flex items-center gap-4 mt-10 justify-center">
      <Button
        className="flex items-center gap-2 rounded-full whitespace-nowrap"
        onClick={prev}
        disabled={current === 1}
      >
        <FaArrowLeft strokeWidth={2} className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex flex-wrap gap-2">
        {pages.map((n) => (
          <Button
            key={n}
            variant={current === n ? "primary" : "secondary"}
            className="rounded-full"
            onClick={() => handleChange(n)}
          >
            {n}
          </Button>
        ))}
      </div>

      <Button
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={current === pageCount}
      >
        Next
        <FaArrowRight strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

