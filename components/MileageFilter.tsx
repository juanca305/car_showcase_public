"use client";

import RangeFilter from "./RangeFilter";

const MIN_MILEAGE = 0;
const MAX_MILEAGE = 200000;
const STEP = 5000;

const formatMileage = (value: number) => `${Math.round(value / 1000)}k`;

export default function MileageFilter() {
  return (
    <RangeFilter
      label="Mileage"
      paramKeyMin="mileageMin"
      paramKeyMax="mileageMax"
      min={MIN_MILEAGE}
      max={MAX_MILEAGE}
      step={STEP}
      format={formatMileage}
    />
  );
}

