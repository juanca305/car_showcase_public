"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryParams } from "@/hooks/useQueryParams";

type RangeFilterProps = {
  label: string;        // e.g. "Mileage", "Price"
  paramKeyMin: string;  // e.g. "mileageMin", "priceMin"
  paramKeyMax: string;  // e.g. "mileageMax", "priceMax"
  min: number;          // numeric lower bound
  max: number;          // numeric upper bound
  step: number;         // slider step
  format?: (value: number) => string; // how to show the value
};

export default function RangeFilter({
  label,
  paramKeyMin,
  paramKeyMax,
  min,
  max,
  step,
  format = (v) => `${v}`,
}: RangeFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { makeUrl } = useQueryParams();

  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);

  // ✅ Sync local state from URL anytime the URL changes
  useEffect(() => {
    const minParam = searchParams.get(paramKeyMin);
    const maxParam = searchParams.get(paramKeyMax);

    setMinValue(minParam ? Number(minParam) : min);
    setMaxValue(maxParam ? Number(maxParam) : max);
  }, [searchParams, paramKeyMin, paramKeyMax, min, max]);

  // ✅ Min cannot exceed Max
  const handleMinChange = (value: number) => {
    setMinValue(Math.min(value, maxValue));
  };

  // ✅ Max cannot be below Min
  const handleMaxChange = (value: number) => {
    setMaxValue(Math.max(value, minValue));
  };

  // ✅ Apply -> update query params + reset pagination
  const applyFilter = () => {
    router.push(
      makeUrl({
        [paramKeyMin]: minValue > min ? minValue : null,
        [paramKeyMax]: maxValue < max ? maxValue : null,
        page: null, // ✅ reset pagination
      }),
      { scroll: false }
    );
  };

  // ✅ Slider fill calculation
  const range = max - min;
  const leftPct = ((minValue - min) / range) * 100;
  const widthPct = ((maxValue - minValue) / range) * 100;

  return (
    <div className="range-filter">
      {/* Label row */}
      <div className="flex items-center justify-between mb-1">
        <span className="range-label">{label}</span>
        <span className="text-xs text-luxury-muted">
          {minValue > min || maxValue < max
            ? `${format(minValue)} – ${format(maxValue)}`
            : "Any"}
        </span>
      </div>

      {/* Slider controls */}
      <div className="range-slider mt-2 mb-1 relative">
        {/* Track */}
        <div className="slider-track">
          <div
            className="slider-track-fill"
            style={{
              left: `${leftPct}%`,
              width: `${widthPct}%`,
            }}
          />
        </div>

        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="range-slider__range"
        />

        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="range-slider__range range-slider__range--upper"
        />
      </div>

      {/* Apply button */}
      <div className="range-footer flex justify-end">
        <button type="button" onClick={applyFilter} className="range-apply-btn">
          Apply
        </button>
      </div>
    </div>
  );
}
