"use client";

/**
 * EditCarForm
 *
 * UX improvements:
 * - Persistent labels (placeholders are not relied on)
 * - Clear sections and grouping (like dealership admin tools)
 * - Fully responsive: 1 col → 2 cols → 3 cols
 *
 * Functional behavior:
 * - Safe numeric conversions
 * - Same API endpoint and router.refresh workflow
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { dealerBranches } from "@/constants";
import { CarProps } from "@/types";

interface Props {
  car: CarProps;
  disabled?: boolean;
}

type FormState = {
  price: number | "";
  mileage: number | "";
  condition: string;
  certified: boolean;
  drivetrain: string;
  fuelType: string;
  transmission: string;
  seats: number | "";
  color: string;
  category: string;
  branch: string;
  description: string;
  features: string;
};

export default function EditCarForm({ car, disabled = false }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>({
    price: car.price ?? "",
    mileage: car.mileage ?? "",
    condition: car.condition ?? "used",
    certified: car.certified ?? false,
    drivetrain: car.drivetrain ?? "",
    fuelType: car.fuelType ?? "",
    transmission: car.transmission ?? "",
    seats: car.seats ?? "",
    color: car.color ?? "",
    category: car.category ?? "",
    branch: car.location?.branch ?? "",
    description: car.description ?? "",
    features: car.features?.join(", ") ?? "",
  });

  const labelClass =
    "text-[11px] font-semibold text-luxury-muted uppercase tracking-wide";

  const fieldWrap = "space-y-1";

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || disabled) return;

    setLoading(true);
    const toastId = toast.loading("Saving changes...");

    try {
      const payload = {
        price: Number(form.price),
        mileage: Number(form.mileage),
        condition: form.condition,

        // ✅ FIX: spelling bug
        certified: form.certified,

        drivetrain: form.drivetrain || undefined,
        fuelType: form.fuelType || undefined,
        transmission: form.transmission || undefined,
        seats: form.seats !== "" ? Number(form.seats) : undefined,
        color: form.color || undefined,
        category: form.category || undefined,
        location: { branch: form.branch || undefined },
        description: form.description || undefined,
        features: form.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars/${car._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY!,
          },
          body: JSON.stringify(payload),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        toast.error(json?.message || "Update failed");
        return;
      }

      toast.success("Car updated successfully ✅");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        max-w-3xl
        rounded-2xl
        border border-luxury-border
        bg-luxury-surface/80
        p-6
        space-y-8
      "
    >
      {/* ================= VEHICLE IDENTITY ================= */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-luxury-text">
          Vehicle Identity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={fieldWrap}>
            <label className={labelClass}>Make</label>
            <input value={car.make} disabled className="filter-input opacity-60" />
          </div>

          <div className={fieldWrap}>
            <label className={labelClass}>Model</label>
            <input value={car.model} disabled className="filter-input opacity-60" />
          </div>

          <div className={fieldWrap}>
            <label className={labelClass}>Year</label>
            <input value={car.year} disabled className="filter-input opacity-60" />
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-luxury-text">
          Pricing & Usage
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={fieldWrap}>
            <label className={labelClass}>Price</label>
            <input
              name="price"
              type="number"
              min={0}
              value={form.price}
              onChange={handleChange}
              disabled={disabled}
              className="filter-input"
            />
          </div>

          <div className={fieldWrap}>
            <label className={labelClass}>Mileage</label>
            <input
              name="mileage"
              type="number"
              min={0}
              value={form.mileage}
              onChange={handleChange}
              disabled={disabled}
              className="filter-input"
            />
          </div>
        </div>
      </section>

      {/* ================= VEHICLE SPECS ================= */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-luxury-text">
          Specifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className={fieldWrap}>
            <label className={labelClass}>Condition</label>
            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              disabled={disabled}
              className="filter-input"
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>

          <div className={fieldWrap}>
            <label className={labelClass}>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              disabled={disabled}
              className="filter-input"
            >
              <option value="">Select category</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Coupe">Coupe</option>
              <option value="Convertible">Convertible</option>
              <option value="Truck">Pickup</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Sports Car">Sports Car</option>
              <option value="Minivan">Minivan</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div className={fieldWrap}>
            <label className={labelClass}>Drivetrain</label>
            <select
              name="drivetrain"
              value={form.drivetrain}
              onChange={handleChange}
              disabled={disabled}
              className="filter-input"
            >
              <option value="">Select drivetrain</option>
              <option value="RWD">RWD</option>
              <option value="FWD">FWD</option>
              <option value="AWD">AWD</option>
              <option value="4WD">4WD</option>
            </select>
          </div>

          <div className={fieldWrap}>
            <label className={labelClass}>Fuel Type</label>
            <select
              name="fuelType"
              value={form.fuelType}
              onChange={handleChange}
              disabled={disabled}
              className="filter-input"
            >
              <option value="">Select fuel type</option>
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div className={fieldWrap}>
            <label className={labelClass}>Transmission</label>
            <select
              name="transmission"
              value={form.transmission}
              onChange={handleChange}
              disabled={disabled}
              className="filter-input"
            >
              <option value="">Select transmission</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>

          <div className={fieldWrap}>
            <label className={labelClass}>Certified</label>
            <label className="flex items-center gap-3 text-sm text-luxury-text">
              <input
                type="checkbox"
                name="certified"
                checked={form.certified}
                onChange={handleCheckboxChange}
                disabled={disabled}
              />
              Certified vehicle
            </label>
          </div>
        </div>
      </section>

      {/* ================= SEATS & COLOR ================= */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-luxury-text">
          Interior & Appearance
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className={fieldWrap}>
            <label className={labelClass}>Seats</label>
            <input
              name="seats"
              type="number"
              min={1}
              value={form.seats}
              onChange={handleChange}
              disabled={disabled}
              className="filter-input"
            />
          </div>

          <div className={fieldWrap}>
            <label className={labelClass}>Color</label>
            <input
              name="color"
              value={form.color}
              onChange={handleChange}
              disabled={disabled}
              className="filter-input"
            />
          </div>
        </div>
      </section>

      {/* ================= LOCATION ================= */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-luxury-text">
          Location
        </h2>

        <div className={fieldWrap}>
          <label className={labelClass}>Dealership Branch</label>
          <select
            name="branch"
            value={form.branch}
            onChange={handleChange}
            disabled={disabled}
            className="filter-input"
          >
            <option value="">Select dealership</option>
            {dealerBranches.map((b) => (
              <option key={b.value} value={b.value}>
                {b.title}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* ================= DESCRIPTION & FEATURES ================= */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-luxury-text">
          Description & Features
        </h2>

        <div className={fieldWrap}>
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            disabled={disabled}
            rows={4}
            className="filter-input resize-none"
          />
        </div>

        <div className={fieldWrap}>
          <label className={labelClass}>Features (comma separated)</label>
          <input
            name="features"
            value={form.features}
            onChange={handleChange}
            disabled={disabled}
            className="filter-input"
          />
        </div>
      </section>

      {/* ================= ACTIONS ================= */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="
            px-4 py-2 rounded-xl
            border border-luxury-border
            text-luxury-muted
            hover:text-luxury-text
            transition
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || disabled}
          className="
            px-5 py-2 rounded-xl
            bg-luxury-accent
            text-black
            font-semibold
            disabled:opacity-50
            hover:brightness-110
            transition
          "
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

