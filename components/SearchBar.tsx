"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import SearchManufacturer from "./SearchManufacturer";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function SearchBar() {
  const prevMakeRef = useRef<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { makeUrl } = useQueryParams();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync UI from URL
  useEffect(() => {
    setMake(searchParams.get("make") || "");
    setModel(searchParams.get("model") || "");
  }, [searchParams]);


  useEffect(() => {
    const prevMake = prevMakeRef.current;

    // 🛑 Do nothing if make didn't actually change
    if (prevMake === make) return;

    prevMakeRef.current = make;

    if (!make) {
      setModel("");
      setModelOptions([]);

      router.replace(
        makeUrl({ make: null, model: null, page: null }),
        { scroll: false }
      );
      return;
    }

    router.replace(
      makeUrl({ make: make.toLowerCase(), page: null }),
      { scroll: false }
    );

    const fetchModels = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/models/distinct?make=${encodeURIComponent(make)}`);

        if (!res.ok) {
          setModelOptions([]);
          return;
        }

        const data = await res.json();
        setModelOptions(data.data || []);
      } catch {
        setModelOptions([]);
      }
    };

    fetchModels();
  }, [make, makeUrl, router]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Typing → UI only
  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setModel(value);
    setDropdownOpen(true);

    if (value === "") {
      router.replace(
        makeUrl({ model: null, page: null }),
        { scroll: false }
      );
    }
  };

  // Confirm model
  const submitModelToUrl = (value: string) => {
    setModel(value);
    setDropdownOpen(false);

    router.replace(
      makeUrl({
        model: value ? value.toLowerCase() : null,
        page: null,
      }),
      { scroll: false }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownOpen || modelOptions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => (i + 1) % modelOptions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => (i - 1 + modelOptions.length) % modelOptions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      submitModelToUrl(
        highlightedIndex >= 0 ? modelOptions[highlightedIndex] : model
      );
    }
  };

  const filteredModels = modelOptions.filter((m) =>
    m.toLowerCase().includes(model.toLowerCase())
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <SearchManufacturer make={make} setMake={setMake} />

      <div ref={dropdownRef} className="relative w-full sm:w-[250px]">
        <div className="input-shell">
          <Image src="/model-icon.png" width={22} height={22} alt="" />
          <input
            value={model}
            onChange={handleModelChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setDropdownOpen(true)}
            placeholder="Model (optional)"
            className="input-shell__input"
          />
        </div>

        {dropdownOpen && filteredModels.length > 0 && (
          <ul className="absolute z-50 w-full mt-2 bg-luxury-surface rounded-xl border">
            {filteredModels.map((m, i) => (
              <li
                key={m}
                onClick={() => submitModelToUrl(m)}
                className={`px-4 py-2 cursor-pointer ${i === highlightedIndex ? "bg-luxury-accent/15" : ""
                  }`}
              >
                {m}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}




