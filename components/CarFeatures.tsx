import { CarProps } from "@/types";
import { CheckCircle } from "lucide-react";

interface Props {
  car: CarProps;
}

export default function CarFeatures({ car }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10">

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-luxury-text tracking-tight">
          Description
        </h2>

        <p className="
          text-[15px]
          sm:text-[16px]
          leading-[1.75]
          text-luxury-muted
          max-w-prose
        ">
          {car.description || (
            <span className="italic opacity-80">
              No description available for this vehicle.
            </span>
          )}
        </p>
      </div>


      {/* FEATURES */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-luxury-text">
          Key Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {car.features?.map((feature) => (
            <div
              key={feature}
              className="
                flex items-center gap-3
                px-3 py-2
                rounded-lg
                bg-luxury-surface/40
                border border-luxury-border
              "
            >
              <CheckCircle
                size={18}
                className="text-luxury-accent shrink-0"
              />

              <span className="text-sm font-medium text-luxury-text">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

