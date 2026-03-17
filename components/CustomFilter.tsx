'use client'

import { Fragment } from 'react';
import Image from 'next/image';
import { Listbox, Transition } from '@headlessui/react';
import { CustomFilterProps } from '@/types';

const CustomFilter = ({ title, options, value, handleChange }: CustomFilterProps) => {
  return (
    <div className="w-full sm:w-auto overflow-visible relative">
      <Listbox value={value} onChange={handleChange}>
        <div className='w-full relative'>
          <Listbox.Button className="filter-shell group w-full min-w-[140px]">
            <span className='block truncate'>{options.find(opt => opt.value === value)?.title || options[0].title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={18}
              height={18}
              alt="chevron"
              className="
                  ml-3
                  shrink-0
                  opacity-70
                  invert
                  transition
                  group-hover:opacity-100
                "
            />
          </Listbox.Button>
          
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95 translate-y-1"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-1"
          >
            <Listbox.Options
              className="
                absolute
                top-full left-0 mt-2
                w-full max-h-64 overflow-auto
                rounded-xl
                bg-luxury-surface border border-luxury-border
                shadow-xl
                text-sm z-[2000]
                backdrop-blur-md
                ring-1 ring-black/5
              "
            >
              {options.map(option => (
                <Listbox.Option
                  key={`${option.title}-${option.value}`}
                  value={option.value}
                  disabled={option.value === ""}
                  className={({ active, disabled }) =>
                    `
          relative cursor-default select-none py-2 px-4 transition
          ${disabled ? 'text-gray-500 cursor-not-allowed' :
                      active
                        ? "bg-luxury-accent/15 text-luxury-text"
                        : "text-luxury-muted hover:bg-luxury-accent/10 hover:text-luxury-text"
                    }
        `
                  }
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>

        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter;


