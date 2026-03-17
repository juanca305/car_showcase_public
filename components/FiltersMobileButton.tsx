"use client";

import { Dispatch, SetStateAction } from "react";

export default function FiltersMobileButton({
    setOpen,
}: {
    setOpen: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <div className="sm:hidden w-full mt-4 flex-none block">
            <button
                onClick={() => setOpen(true)}
                className="
                    w-full
                    py-3
                    px-4
                    rounded-xl
                    bg-luxury-accent
                    text-white
                    text-sm
                    font-semibold
                    shadow-lg
                    hover:bg-luxury-accent/90
                    active:scale-[.97]
                    transition-all
                    flex items-center justify-center gap-2
                "
            >
                Filters
            </button>
        </div>
    );
}
