"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
    vehicleCatalog,
    yearsOfProduction,
    dealerBranches,
} from "@/constants";

export default function AddCarForm() {
    const router = useRouter();

    const [form, setForm] = useState({
        make: "",
        model: "",
        price: "",
        year: "",
        condition: "",
        branch: "",
    });

    const [loading, setLoading] = useState(false);

    // 🔹 derive models based on selected make
    const selectedMake = vehicleCatalog.find(
        (item) => item.make === form.make
    );
    const availableModels = selectedMake?.models || [];

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value, type } = e.target;

        setForm((prev) => {
            // ✅ reset model if make changes
            if (name === "make") {
                return {
                    ...prev,
                    make: value,
                    model: "",
                };
            }

            return {
                ...prev,
                [name]:
                    type === "checkbox"
                        ? (e.target as HTMLInputElement).checked
                        : value,
            };
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        const toastId = toast.loading("Creating car...");

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cars`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY!,
                    },
                    body: JSON.stringify({
                        make: form.make,
                        model: form.model,
                        price: Number(form.price),
                        year: form.year ? Number(form.year) : undefined,
                        condition: form.condition,
                        // available: form.available,

                        location: {
                            branch: form.branch,
                        },

                        // legacy (temporary)
                        pricePerDay: Number(form.price),
                        category: "SUV",
                    }),
                }
            );

            const json = await res.json();

            if (!res.ok) {
                toast.error(json?.message || "Failed to create car");
                return;
            }

            toast.success("Car created successfully 🚗");
            // router.push("/admin/cars");
            router.push(`/admin/cars/${json.data._id}/images`);
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
        max-w-2xl
        rounded-2xl
        border border-luxury-border
        bg-luxury-surface/80
        p-6
        space-y-5
      "
        >
            {/* MAKE */}
            <select
                name="make"
                value={form.make}
                onChange={handleChange}
                required
                className="filter-input"
            >
                <option value="">Select make</option>
                {vehicleCatalog.map((item) => (
                    <option key={item.make} value={item.make}>
                        {item.make}
                    </option>
                ))}
            </select>

            {/* MODEL */}
            <select
                name="model"
                value={form.model}
                onChange={handleChange}
                required
                disabled={!form.make}
                className={`filter-input ${!form.make ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                <option value="">
                    {form.make ? "Select model" : "Select make first"}
                </option>

                {availableModels.map((model) => (
                    <option key={model} value={model}>
                        {model}
                    </option>
                ))}
            </select>

            {/* PRICE */}
            <input
                name="price"
                type="number"
                min={0}
                step={500}
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
                className="filter-input"
            />


            {/* YEAR */}
            <select
                name="year"
                value={form.year}
                onChange={handleChange}
                required
                className="filter-input"
            >
                <option value="">Select year (optional)</option>
                {yearsOfProduction.map((y) => (
                    <option key={y.value} value={y.value}>
                        {y.title}
                    </option>
                ))}
            </select>

            {/* CONDITION */}
            <select
                name="condition"
                value={form.condition}
                onChange={handleChange}
                required
                className="filter-input"
            >
                <option value="" disabled>Condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
            </select>

            {/* BRANCH */}
            <select
                name="branch"
                value={form.branch}
                onChange={handleChange}
                required
                className="filter-input"
            >
                <option value="">Select dealership</option>
                {dealerBranches
                    .filter((b) => b.value)
                    .map((b) => (
                        <option key={b.value} value={b.value}>
                            {b.title}
                        </option>
                    ))}
            </select>

            {/* AVAILABLE */}
            {/* <label className="flex items-center gap-3 text-sm text-luxury-text">
                <input
                    type="checkbox"
                    name="available"
                    checked={form.available}
                    onChange={handleChange}
                />
                Publish to public site
            </label> */}

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 rounded-xl border border-luxury-border text-luxury-muted"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="
            px-5 py-2 rounded-xl
            bg-luxury-accent text-black
            font-semibold
            hover:bg-luxury-accentHover
            disabled:opacity-50
          "
                >
                    Create Car
                </button>
            </div>
        </form>
    );
}



