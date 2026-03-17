"use client";

import ClearFiltersButton from "./ClearFiltersButton";

interface ResultsHeaderProps {
  total: number;
  page: number;
  limit: number;
}

export default function ResultsHeader({ total, page, limit }: ResultsHeaderProps) {

  if (total === 0) {
    return (
      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          gap-6
          mb-2
          mt-16
        "
      >
        <p className="results-text--badge results-animate">
          Showing{" "}
          <span className="results-number--strong">0</span>{" "}
          vehicles
        </p>

        <div className="flex justify-start">
          <ClearFiltersButton />
        </div>
      </div>
    );
  }

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div
      className="
        flex
        flex-col
        sm:flex-row
        sm:items-center     
        gap-6
        mb-2
        mt-16
      "
    >
      {/* Left: results count */}
      <div className="flex items-center gap-3">

        {/* <p className="results-text--badge results-animate">
          Showing <span className="results-number--strong">{total}</span> vehicles
        </p> */}
        <p className="results-text--badge results-animate">
          Showing{" "}
          <span className="results-number--strong">
            {start}–{end}
          </span>{" "}
          of{" "}
          <span className="results-number--strong">
            {total}
          </span>{" "}
          vehicles
        </p>

      </div>

      <div className="flex justify-start">
        <ClearFiltersButton />
      </div>
    </div>
  );
}
