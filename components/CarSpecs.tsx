import { CarProps } from "@/types";

interface CarSpecsProps {
  car: CarProps;
}

export default function CarSpecs({ car }: CarSpecsProps) {
  return (
    <div className="flex flex-col gap-6">

      {/* BADGES */}
      <div className="flex flex-wrap gap-2">
        <span className="car-year-badge">{car.year}</span>

        <span className="px-2.5 py-[3px] rounded-md text-[11px] font-semibold tracking-wide
          bg-white/5 border border-white/10 text-luxury-muted">
          {car.condition === "new" ? "New" : "Used"}
        </span>

        {car.certified && (
          <span className="certified-badge">Certified</span>
        )}
      </div>

      {/* CORE SPECS GRID */}
      <div className="grid grid-cols-2 gap-4 pt-2">

        <Spec
          label="Mileage"
          value={
            typeof car.mileage === "number"
              ? car.mileage < 1000
                ? `${car.mileage} mi`
                : `${Math.round(car.mileage / 1000)}k mi`
              : "—"
          }
        /> 
        <Spec label="Drivetrain" value={car.drivetrain ?? "—"} />
        <Spec label="Transmission" value={car.transmission ?? "—"} />
        <Spec label="Fuel Type" value={car.fuelType ?? "—"} />
        <Spec label="Seats" value={car.seats ? `${car.seats}` : "—"} />
        <Spec label="Color" value={car.color ?? "—"} />
        {/* <Spec label="Mileage" value={car.mileage ?? "—"} /> */}
      </div>

    </div>
  );
}

/* ---------------------------------- */
/* Small internal component (clean)   */
/* ---------------------------------- */
function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wide text-luxury-muted">
        {label}
      </span>
      <span className="text-sm font-semibold text-luxury-text">
        {value}
      </span>
    </div>
  );
}
