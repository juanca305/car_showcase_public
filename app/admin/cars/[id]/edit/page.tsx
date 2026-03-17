export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";

import { fetchCarById } from "@/utils/fetchCarById";
import EditCarForm from "@/app/admin/components/EditCarForm";
import CarMainImagePreview from "@/app/admin/components/CarMainImagePreview";



export default async function EditCarPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    const { id } = await params;

    const car = await fetchCarById(id);


    if (!car) {
        notFound();
    }

    /**
     * Extract main image safely.
     * Defensive programming prevents runtime crashes if images array is missing.
     */
    const mainImageUrl =
        car.images?.find((img) => img.angle === "main")?.url;

    const carTitle = `${car.make} ${car.model} ${car.year}`;

    return (
        <main className="pt-[96px]">

            <section className="max-width padding-x padding-y space-y-8">

                {/* ================= HEADER ================= */}

                {/* Displays car identity and status indicators */}
                <header className="space-y-2">

                    <h1 className="text-2xl font-bold text-luxury-text">
                        Edit Car — {carTitle}
                    </h1>

                    <div className="flex flex-wrap gap-3 text-sm">

                        {/* Trash status indicator */}
                        {car.isDeleted && (
                            <span className="px-3 py-1 rounded-md bg-red-500/15 text-red-400">
                                Deleted
                            </span>
                        )}

                        {/* Public visibility indicator */}
                        {car.available && (
                            <span className="px-3 py-1 rounded-md bg-emerald-500/15 text-emerald-400">
                                Publicly Visible
                            </span>
                        )}

                        {/* Slug identifier (useful for debugging and SEO reference) */}
                        {car.slug && (
                            <span className="px-3 py-1 rounded-md bg-black/30 text-luxury-muted">
                                Slug: {car.slug}
                            </span>
                        )}

                    </div>

                </header>

                {/* ================= WARNING ================= */}

                {/* Prevent editing deleted cars to maintain data integrity */}
                {car.isDeleted && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                        This car is in Trash. Restore it before editing.
                    </div>
                )}

                {/* ================= MAIN CONTENT ================= */}

                <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">

                    {/* Left column: Main image preview */}
                    <CarMainImagePreview
                        url={mainImageUrl}
                        title={carTitle}
                    />

                    {/* Right column: Edit form */}
                    <EditCarForm
                        car={car}
                        disabled={car.isDeleted}
                    />

                </div>

                {/* ================= FOOTER ================= */}

                {/* Navigation actions */}
                <footer className="flex justify-between pt-6 border-t border-luxury-border">

                    <Link
                        href="/admin/cars"
                        className="px-4 py-2 rounded-xl border border-luxury-border text-luxury-muted hover:text-luxury-text transition"
                    >
                        Back to inventory
                    </Link>

                    <Link
                        href={`/admin/cars/${car._id}/images`}
                        className="px-4 py-2 rounded-xl bg-black/30 text-luxury-text hover:bg-black/50 transition"
                    >
                        Manage images
                    </Link>

                </footer>

            </section>

        </main>
    );
}


