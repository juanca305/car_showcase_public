"use client";

import { useState, useEffect, Fragment } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import Image from "next/image";

import { fetchCarMakes } from "@/utils/fetchCarMakes";

interface SearchMakeProps {
  make: string;
  setMake: (make: string) => void;
}

const SearchManufacturer = ({ make, setMake }: SearchMakeProps) => {
  const [query, setQuery] = useState("");
  const [makes, setMakes] = useState<string[]>([]);

  useEffect(() => {
    const loadMakes = async () => {
      const data = await fetchCarMakes();
      setMakes(data);
      console.log("Loaded makes:", data);
    };
    loadMakes();
  }, []);


  const filteredMakes =
    query === ""
      ? makes
      : makes.filter((item) =>
        item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
      );

  return (
    <div className="search-manufacturer">
      <Combobox value={make} onChange={(value) => {
        setMake(value ?? "");
        setQuery("");
      }}
      >
        <div className="relative w-full">
          <div className="input-shell">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              alt="Car Logo"
              className="input-shell__icon"
            />
            <ComboboxInput
              className="input-shell__input"
              placeholder="Volkswagen"
              displayValue={(make: string) => make}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {filteredMakes.length > 0 && (
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <ComboboxOptions
                className="
                absolute
                top-full
                left-0
                z-50
                mt-2
                max-h-64
                w-full
                overflow-auto
                rounded-xl
                bg-luxury-surface
                border
                border-luxury-border
                shadow-xl
                text-sm
                focus:outline-none
              "
              >
                {filteredMakes.map((item) => (
                  <ComboboxOption
                    key={item}
                    value={item}
                    className={({ active, selected }) =>
                      `relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors duration-150 ease-out
                    ${active
                        ? "bg-luxury-accent/15 text-luxury-text"
                        : "text-luxury-muted hover:bg-luxury-accent/10 hover:text-luxury-text"
                      }

                    ${selected ? "font-semibold text-luxury-text" : ""} `
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span className="block truncate">{item}</span>
                        {selected && (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-luxury-text" : "text-luxury-accent"
                              }`}
                          >
                            ✔
                          </span>
                        )}
                      </>
                    )}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Transition>
          )}

        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;



