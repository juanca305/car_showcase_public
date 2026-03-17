"use client";

import CustomButton from "@/components/CustomButton";
import { CarProps } from "@/types";
//import Link from "next/link";

interface CarCTAProps {
    car: CarProps;
}

export default function CarCTA({ car }: CarCTAProps) {
    return (
        <div
            className="
                flex flex-col gap-6
                rounded-2xl
                bg-luxury-surface/80
                border border-luxury-border
                p-6
                backdrop-blur-sm
                mt-6 sm:mt-0

            "
        >

            {/* PRICE */}
            <div className="flex flex-col gap-1">
                <p className="text-xs uppercase tracking-widest text-luxury-muted">
                    Asking Price
                </p>
                <p className="text-xs text-luxury-muted">
                    Excludes taxes & registration
                </p>


                <p className="text-4xl font-extrabold text-luxury-text leading-none">
                    ${car.price.toLocaleString()}
                </p>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 text-sm">
                <span
                    className={`h-2 w-2 rounded-full ${car.available ? "bg-emerald-400" : "bg-red-400"
                        }`}
                />
                <span className="text-luxury-muted">
                    {car.available ? "Available for immediate test drive" : "Currently unavailable"}
                </span>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
                <CustomButton
                    title="Schedule a Test Drive"
                    containerStyles="
                        w-full
                        py-[15px]
                        rounded-full
                        bg-luxury-accent
                        hover:bg-luxury-accentHover
                        shadow-[0_10px_30px_rgba(240,207,126,0.45)]
                        transition all
                        duration-200
                        hover:-translate-y-[1px]
                        active:scale-[0.98]
                    "
                    textStyles="text-black text-[15px] font-semibold tracking-wide"
                />

                <CustomButton
                    title="Have Questions? Contact Dealer"
                    containerStyles="
                        w-full
                        py-[14px]
                        rounded-full
                        border border-luxury-border
                        bg-transparent
                        hover:bg-luxury-accent/10
                        transition
                    "
                    textStyles="text-luxury-text text-[14px] font-medium"
                />
            </div>
        </div>
    );
}
