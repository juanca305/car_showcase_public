export const dynamic = "force-dynamic";

import { fetchCars } from "@/utils";
import AdminCarTable from "../../components/AdminCarTable";
import Pagination from "../../../../components/Pagination";

export default async function TrashCarsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {

  const params = await searchParams;

  const page = Number(params.page || 1);
  const limit = 2;

  const { data: deletedCars, meta } = await fetchCars({
    onlyDeleted: true,
    page,
    limit,
  });

  return (
    <main className="pt-[96px]">
      <section className="max-width padding-x padding-y">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Trash</h1>

            <p className="text-md text-luxury-muted mt-1">
              Deleted cars:{" "}
              <span className="text-white font-semibold">
                {meta?.total ?? deletedCars.length}
              </span>
            </p>
          </div>

          <a
            href="/admin/cars"
            className="px-5 py-2 rounded-full border border-white/10 text-white hover:bg-white/5 transition"
          >
            Back to Inventory
          </a>
        </div>

        <AdminCarTable cars={deletedCars} mode="trash" />

        <Pagination
          page={meta.page}
          pages={meta.pages}
        />

      </section>
    </main>
  );
}
