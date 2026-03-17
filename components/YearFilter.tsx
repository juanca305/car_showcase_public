"use client";

import RangeFilter from "./RangeFilter";  // adjust path if needed

const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1990;


export default function YearFilter() {
  return (
    <RangeFilter
      label="Year"
      paramKeyMin="yearMin"
      paramKeyMax="yearMax"
      min={MIN_YEAR}
      max={CURRENT_YEAR}
      step={1}
      format={(v) => v.toString()}
    />
  );
}

