"use client";

import RangeFilter from "./RangeFilter";

const MIN_PRICE = 0;
const MAX_PRICE = 100000;
const STEP = 1000;

const formatPrice = (value: number) => `$${Math.round(value / 1000)}k`;

export default function PriceFilter() {
  return (
    <RangeFilter
      label="Price"
      paramKeyMin="priceMin"
      paramKeyMax="priceMax"
      min={MIN_PRICE}
      max={MAX_PRICE}
      step={STEP}
      format={formatPrice}
    />
  );
}















