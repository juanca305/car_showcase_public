"use client";

import Image from "next/image";
import { useState } from "react";
import { CarProps } from "@/types";
import CarDetails from "./CarDetails";
import CustomButton from "./CustomButton";
import { formatPrice } from "@/utils/formatPrice";

import { useRouter } from "next/navigation";


interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const isCertified =
    car.condition?.toLowerCase() === "used" && car.certified === true;

  const mainImage =
    car.images?.find((img) => img.angle === "main")?.url ??
    car.images?.[0]?.url ??
    "/hero.png";

  const specs = [
    {
      key: "transmission",
      label: car.transmission ?? "—",
      icon: "/steering-wheel.svg",
    },
    {
      key: "drivetrain",
      label: car.drivetrain ?? "—",
      icon: "/tire.svg", // you can reuse tire icon if needed
    },
    {
      key: "fuel",
      label: car.fuelType ?? "—",
      icon: "/gas.svg",
    },
  ];


  return (
    <div className="car-card-dark group">
      <div className="car-card-dark__content flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="car-year-badge">{car.year}</span>
          <h2 className="car-card-dark__title">
            {car.make} {car.model}
          </h2>
        </div>

        {isCertified && <span className="certified-badge">Certified</span>}
      </div>

      {/* Price + Mileage row */}
      <div className="car-price-row">
        <p className="car-card-dark__price">{formatPrice(car.price)}</p>

        {typeof car.mileage === "number" && (
          <span className="mileage-inline">{Math.round(car.mileage / 1000)}k mi</span>
        )}
      </div>

      {/* Main image */}
      <div className="car-card-dark__media">
        <div className="absolute inset-0 z-10" />
        <Image
          src={mainImage}
          alt={`${car.make} ${car.model}`}
          fill
          priority
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.015] z-20"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div
          className="
            car-card-dark__specs
            transition-all duration-300
            group-hover:opacity-60
            group-hover:scale-[0.97]
          "
        >
          {specs.map((spec) => (
            <div key={spec.key} className="car-card-dark__spec">
              <Image
                src={spec.icon}
                width={20}
                height={20}
                alt={spec.key}
              />
              <p className="text-[14px] font-medium text-luxury-muted">
                {spec.label}
              </p>
            </div>
          ))}
        </div>

        {/* Wrapper behind CTA  */}
        <div
          className="
            absolute inset-0
            rounded-2xl
            bg-black/10
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300
            pointer-events-none
          "
        />
        <div
          className="
              car-card-dark__btn-container
              relative z-10
              pointer-events-none
              group-hover:pointer-events-auto
              opacity-0 translate-y-4
              group-hover:opacity-100
              group-hover:translate-y-0
              transition-all duration-300
            "
        >
          <CustomButton
            title="View More"
            containerStyles="
              w-[90%]
              py-[14px]
              rounded-full
              bg-luxury-accent
              hover:bg-luxury-accentHover
              shadow-[0_8px_24px_rgba(240,207,126,0.45)]
              transition
            "
            textStyles="text-black text-[14px] font-semibold"
            rightIcon="/right-arrow.svg"
            handleClick={() => router.push(`/cars/${car.slug}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default CarCard;



