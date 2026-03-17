"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function AdminCarsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { makeUrl } = useQueryParams();

  // ✅ local state (controlled inputs)
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [branch, setBranch] = useState("");
  const [condition, setCondition] = useState("");
  const [sort, setSort] = useState("");

  // ✅ Sync UI from URL when page loads or URL changes
  useEffect(() => {
    setMake(searchParams.get("make") || "");
    setModel(searchParams.get("model") || "");
    setBranch(searchParams.get("branch") || "");
    setCondition(searchParams.get("condition") || "");
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);

  // ✅ Apply filters (only when user clicks Apply)
  function handleApply() {
    router.push(
      makeUrl({
        make: make.trim() || null,
        model: model.trim() || null,
        branch: branch || null,
        condition: condition || null,
        sort: sort || null,

        // ✅ Reset pagination so results start from page 1
        page: null,
      }),
      { scroll: false }
    );
  }

  // ✅ Clear filters (reset everything)
  function handleClear() {
    setMake("");
    setModel("");
    setBranch("");
    setCondition("");
    setSort("");

    router.push(
      makeUrl({
        make: null,
        model: null,
        branch: null,
        condition: null,
        sort: null,
        page: null,
      }),
      { scroll: false }
    );
  }

  return (
    <div className="mb-4 rounded-2xl border border-luxury-border bg-luxury-surface/70 p-4">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        {/* Make */}
        <input
          value={make}
          onChange={(e) => setMake(e.target.value)}
          placeholder="Make (e.g. Toyota)"
          className="w-full rounded-xl bg-black/30 border border-luxury-border px-3 py-2 text-sm text-white outline-none"
        />

        {/* Model */}
        <input
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model (e.g. Camry)"
          className="w-full rounded-xl bg-black/30 border border-luxury-border px-3 py-2 text-sm text-white outline-none"
        />

        {/* Branch */}
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="w-full rounded-xl bg-black/30 border border-luxury-border px-3 py-2 text-sm text-white outline-none"
        >
          <option value="">All Branches</option>
          <option value="Miami">Miami</option>
          <option value="Orlando">Orlando</option>
          <option value="Tampa">Tampa</option>
        </select>

        {/* Condition */}
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full rounded-xl bg-black/30 border border-luxury-border px-3 py-2 text-sm text-white outline-none"
        >
          <option value="">All Conditions</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-xl bg-black/30 border border-luxury-border px-3 py-2 text-sm text-white outline-none"
        >
          <option value="">Sort: Newest</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="year-desc">Year ↓</option>
          <option value="year-asc">Year ↑</option>
          <option value="mileage-asc">Mileage ↑</option>
          <option value="mileage-desc">Mileage ↓</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={handleClear}
          className="px-4 py-2 rounded-xl text-sm font-medium border border-luxury-border bg-black/30 text-luxury-text hover:bg-white/5 transition"
        >
          Clear
        </button>

        <button
          onClick={handleApply}
          className="px-4 py-2 rounded-xl text-sm font-medium bg-luxury-accent text-black hover:bg-luxury-accentHover transition"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
