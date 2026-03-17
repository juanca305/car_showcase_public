export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";

import { fetchCarById } from "@/utils/fetchCarById";
import UploadSingleImage from "@/app/admin/components/UploadSingleImage";
import ImageCard from "./ImageCard";

import { CarImage } from "@/types";


// interface PageProps {
//   params: { id: string };
// }

// export default async function AddCarImagesPage({ params }: PageProps) {
//   const car = await fetchCarById(params.id);

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AddCarImagesPage({ params }: PageProps) {

  const { id } = await params;

  const car = await fetchCarById(id);

  if (!car) notFound();

  return (
    <main className="pt-[96px]">
      <section className="max-width padding-x padding-y space-y-8">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-luxury-text">
            Add Images — {car.year} {car.make} {car.model}
          </h1>
          <p className="text-sm text-luxury-muted">
            Upload photos to publish this vehicle
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
      ${car.available
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-zinc-500/15 text-zinc-400"}
    `}
          >
            {car.available ? "Publicly visible" : "Hidden (draft)"}
          </span>
        </div>

        <p className="text-sm text-luxury-muted mt-1">
          {car.available
            ? "Image changes are reflected immediately on the public site."
            : "This car is hidden. Publish it from the Inventory list when ready."}
        </p>



        {/* ================= UPLOAD AREA ================= */}
        <div
          className="
            flex flex-col items-center justify-center
            h-[180px]
            rounded-2xl
            border border-dashed border-luxury-border
            bg-luxury-surface/40
            text-center
            gap-3
          "
        >
          <p className="font-medium text-luxury-text">
            Upload vehicle images
          </p>

          <p className="text-sm text-luxury-muted">
            JPG / PNG · Max 4 images
          </p>

          <UploadSingleImage
            carId={id}
            disabled={car.images?.length >= 4}
          />
        </div>

        {/* ================= IMAGES GRID ================= */}
        <div>
          <h2 className="text-lg font-semibold text-luxury-text mb-3">
            Uploaded Images
          </h2>

          {car.images?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {car.images.map((img: CarImage) => (
                // <ImageCard key={img._id} image={img} />
                <ImageCard
                  key={img._id}
                  image={img}
                  carId={id}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-luxury-muted">
              No images uploaded yet.
            </p>
          )}
        </div>

        {/* ================= FOOTER ACTIONS ================= */}
        <div className="flex items-center justify-between pt-6 border-t border-luxury-border">
          <span className="text-xs text-luxury-muted">
            You can upload up to 4 images
          </span>

          <div className="flex gap-3">
            <Link
              href="/admin/cars"
              className="
                px-4 py-2 rounded-xl
                border border-luxury-border
                text-luxury-muted
              "
            >
              Back to inventory
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
