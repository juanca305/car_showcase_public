export const dynamic = "force-dynamic";

import { fetchCars } from "@/utils";
import AdminCarTable from "../components/AdminCarTable";
import Pagination from "../../../components/Pagination";
import AdminFiltersPanelWrapper from "../components/AdminFiltersPanelWrapper";

// Import or define SortOption type
import type { SortOption } from "@/types"; // Adjust the path if needed

// export default async function AdminCarsPage({
//   searchParams,
// }: {
//   searchParams: {
//     page?: string;
//     limit?: string;

//     make?: string;
//     model?: string;
//     condition?: string;
//     branch?: string;
//     sort?: string;
//     transmission?: string;

//     yearMin?: string;
//     yearMax?: string;

//     mileageMin?: string;
//     mileageMax?: string;
//   };
// }) {
//   const page = Number(searchParams.page || 1);
//   const limit = Number(searchParams.limit || 10);

//   const { data: cars, meta } = await fetchCars({
//     onlyActive: true,
//     includeHidden: true, // ✅ admin sees hidden too
//     page,
//     limit,

//     // ✅ admin filters (optional)
//     make: searchParams.make || "",
//     model: searchParams.model || "",
//     condition: searchParams.condition || "",
//     branch: searchParams.branch || "",
//     transmission: searchParams.transmission as any || undefined,
//     sort: searchParams.sort as SortOption || undefined,

//     yearMin: searchParams.yearMin ? Number(searchParams.yearMin) : undefined,
//     yearMax: searchParams.yearMax ? Number(searchParams.yearMax) : undefined,

//     mileageMin: searchParams.mileageMin ? Number(searchParams.mileageMin) : undefined,
//     mileageMax: searchParams.mileageMax ? Number(searchParams.mileageMax) : undefined,
//   });

export default async function AdminCarsPage({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {

  const params = await searchParams;

  const page = Number(params.page || 1);
  const limit = Number(params.limit || 10);

  const { data: cars, meta } = await fetchCars({
    onlyActive: true,
    includeHidden: true,
    page,
    limit,

    make: params.make || "",
    model: params.model || "",
    condition: params.condition || "",
    branch: params.branch || "",
    transmission: params.transmission || undefined,
    sort: params.sort as SortOption || undefined,

    yearMin: params.yearMin ? Number(params.yearMin) : undefined,
    yearMax: params.yearMax ? Number(params.yearMax) : undefined,

    mileageMin: params.mileageMin ? Number(params.mileageMin) : undefined,
    mileageMax: params.mileageMax ? Number(params.mileageMax) : undefined,
  });

  return (
    <main className="pt-[96px]">
      <section className="max-width padding-x padding-y">
        {/* HEADER */}
        <div className="mb-6">
          <div
            className="
                flex flex-col gap-4
                md:flex-row md:items-center md:justify-between
              "
          >
            {/* Left: title + stats */}
            <div>
              <h1 className="text-2xl font-bold text-white">Cars Inventory</h1>

              <p className="text-sm text-luxury-muted mt-1">
                Active cars:{" "}
                <span className="text-white font-semibold">
                  {meta.total ?? cars.length}
                </span>
              </p>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-3">
              <a
                href="/admin/cars/trash"
                className="
                px-4 py-2 rounded-xl text-sm font-medium
                border border-red-500/30
                bg-red-500/10 text-red-300
                hover:bg-red-500/15 transition
              "
              >
                Trash
              </a>

              <a
                href="/admin/cars/new"
                className="
          px-4 py-2 rounded-full
          bg-luxury-accent
          text-black text-sm font-semibold
          hover:bg-luxury-accentHover transition
        "
              >
                + Add Car
              </a>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <AdminFiltersPanelWrapper />
        {/* <AdminCarsFilters /> */}

        {/* TABLE */}
        <AdminCarTable cars={cars} mode="active" />

        {/* PAGINATION */}
        <Pagination page={meta.page} pages={meta.pages} />
      </section>
    </main>
  );
}


