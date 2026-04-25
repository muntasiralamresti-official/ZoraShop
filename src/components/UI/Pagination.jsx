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
  return (
    <div className="flex items-center gap-4 mt-10 justify-center">
      <Button
        className="flex items-center gap-2 rounded-full whitespace-nowrap"
        onClick={prev}
        disabled={pageNumber === 1}
      >
        <FaArrowLeft strokeWidth={2} className="h-4 w-4" />

        Previous
      </Button>
      <div className="flex flex-wrap gap-2">
        {[...Array(totalPage)].map((i, index) => (
          <Button
            variant={pageNumber == index + 1 ? "primary" : "secondary"}
            className="rounded-full "
            onClick={() => handleChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      <Button
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={pageNumber === totalPage}
      >
        Next
                <FaArrowRight strokeWidth={2} className="h-4 w-4" />

      </Button>
    </div>
  );
}
