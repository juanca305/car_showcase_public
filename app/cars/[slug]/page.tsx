export const dynamic = "force-dynamic";

import { fetchCarBySlug } from "@/utils/fetchCarBySlug";
import { notFound } from "next/navigation";

import CarGallery from "@/components/CarGallery";
import CarSpecs from "@/components/CarSpecs";
import CarFeatures from "@/components/CarFeatures";
import CarCTA from "@/components/CarCTA";

import Link from "next/link";



// export default async function CarDetailsPage({
//     params,
// }: {
//     params: { slug: string };
// }) {
//     const car = await fetchCarBySlug(params.slug);
    //console.log("CAR DETAILS:", car);

    export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const car = await fetchCarBySlug(slug);


    if (!car) {
        notFound();
    }

    return (
        <main className="pt-[96px]">
            <section className="max-width padding-x padding-y">

                {/* BACK TO INVENTORY */}
                <div className="mb-8 md:px-6 md:py-[15px]
">
                    <Link
                        href="/"
                        className="
                        inline-flex items-center gap-2
                        px-5 py-[14px]
                        rounded-full
                        bg-luxury-accent/15
                        border border-luxury-accent/40
                        text-luxury-accent
                        text-sm font-semibold
                        transition-all duration-200
                        hover:bg-luxury-accent/25
                        hover:-translate-y-[1px]
                        active:translate-y-0
                        "
                    >
                        <span className="text-base">←</span>
                        Browse inventory
                    </Link>
                </div>


                {/* TITLE */}
                <div className="mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white">
                        {car.make} {car.model}
                    </h1>

                    <p className="mt-1 text-luxury-muted">
                        {car.year} · {car.category}
                    </p>
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-stretch">

                    {/* LEFT — GALLERY */}
                    <div className="h-full">
                        <CarGallery
                            images={car.images}
                            title={`${car.make} ${car.model}`}
                        />
                    </div>

                    {/* RIGHT — SPECS */}

                       <div className="flex flex-col gap-6">
                        <div
                            className="
                                flex flex-col
                                h-full
                                rounded-2xl
                                bg-luxury-surface/60
                                border border-luxury-border
                                p-6
                            "
                        >
                            <CarSpecs car={car} />

                            {/* Spacer */}
                            <div className="flex-1" />

                            {/* CTA */}
                            <div className="mt-10 lg:mt-0">
                                <CarCTA car={car} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* FEATURES + DESCRIPTION */}
                <div className="mt-16 rounded-2xl bg-luxury-surface/60 border border-luxury-border p-6">
                    <CarFeatures car={car} />
                </div>
            </section>
        </main>
    );
}



