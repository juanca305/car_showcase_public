export const dynamic = "force-dynamic";

import { Hero, SearchBar, CarCard, BackToTop } from "@/components";

import ConditionFilter from "@/components/ConditionFilter";
import FiltersPanelWrapper from "@/components/FiltersPanelWrapper";
import Pagination from "@/components/Pagination";
import RefinementBar from "@/components/RefinementBar";
import ResultsHeader from "@/components/ResultsHeader";

import { fetchCars } from "@/utils";

// export default async function Home({ searchParams }: { searchParams: any }) {
//   // Extract filters with defaults
//   const make = searchParams?.make || "";
//   const model = searchParams?.model || "";
//   const category = searchParams?.category || "";
//   const fuelType = searchParams?.fuelType || "";
//   const transmission = searchParams?.transmission || "";

//   const yearMin = searchParams?.yearMin || "";
//   const yearMax = searchParams?.yearMax || "";

//   const seats = searchParams?.seats || "";

//   const priceMin = searchParams?.priceMin || "";
//   const priceMax = searchParams?.priceMax || "";

//   const mileageMin = searchParams?.mileageMin || "";
//   const mileageMax = searchParams?.mileageMax || ""; // ✅ fixed optional chaining

//   const branch = searchParams?.branch || "";
//   const condition = searchParams?.condition || "";
//   const sort = searchParams?.sort || "";

//   const page = Number(searchParams?.page) || 1;
//   const limit = Number(searchParams?.limit) || 8;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {

  const params = await searchParams;

  const make = params?.make || "";
  const model = params?.model || "";
  const category = params?.category || "";
  const fuelType = params?.fuelType || "";
  const transmission = params?.transmission || "";

  const yearMin = params?.yearMin || "";
  const yearMax = params?.yearMax || "";

  const seats = params?.seats || "";

  const priceMin = params?.priceMin || "";
  const priceMax = params?.priceMax || "";

  const mileageMin = params?.mileageMin || "";
  const mileageMax = params?.mileageMax || "";

  const branch = params?.branch || "";
  const condition = params?.condition || "";
  const sort = params?.sort || "";

  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 8;



  // Fetch filtered cars
  const { data: allCars, meta } = await fetchCars({
    make,
    model,
    fuelType,
    transmission,
    yearMin,
    yearMax,
    seats,
    priceMin,
    priceMax,
    mileageMin,
    mileageMax,
    page,
    limit,
    category,
    branch,
    condition,
    sort,
  });

  // Safe meta defaults (prevents crashes)
  const safeMeta = {
    total: meta?.total ?? 0,
    page: meta?.page ?? page,
    limit: meta?.limit ?? limit,
    pages: meta?.pages ?? 1,
  };

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1;

  return (
    <main className="overflow-visible">
      <Hero />

      <div
        id="discover"
        className="
          mt-12 sm:mt-16 xl:mt-20
          padding-x padding-y max-width
          bg-luxury-bg border-t border-luxury-divider
        "
      >
        <div className="home__text-container">
          <h1 className="section__title">Find Your Next Vehicle</h1>
          <p className="section__subtitle">
            Compare models, features, and pricing — all in one place
          </p>
        </div>

        {/* Filters */}
        <div className="home__filters">
          <div
            className="
              w-full mt-8 p-4 sm:p-5 rounded-2xl
              bg-luxury-surface border border-luxury-border shadow-sm
            "
          >
            <div
              className="
                flex flex-col xl:flex-row
                gap-4 xl:gap-6
                items-stretch
              "
            >
              <div className="flex-1 flex items-center">
                <SearchBar />
              </div>

              <div className="block xl:hidden">
                <div className="my-2 h-px bg-luxury-border/60" />
              </div>

              <div className="xl:w-[260px] flex items-center justify-center">
                <ConditionFilter />
              </div>
            </div>
          </div>

          <div className="w-full block mt-4">
            <FiltersPanelWrapper />
          </div>
        </div>

        {/* Results */}
        <section>
          <RefinementBar />

          <ResultsHeader
            total={safeMeta.total}
            page={safeMeta.page}
            limit={safeMeta.limit}
          />

          {!isDataEmpty ? (
            <>
              <div className="home__cars-wrapper">
                {allCars.map((car: any, index: number) => (
                  <CarCard key={car?._id || index} car={car} />
                ))}
              </div>

              <Pagination page={safeMeta.page} pages={safeMeta.pages} />
            </>
          ) : (
            <div className="home__error-container">
              <h2 className="text-white text-xl font-bold">Ooops, no results</h2>
              <p>Try adjusting or clearing your filters.</p>
            </div>
          )}
        </section>
      </div>

      <BackToTop />
    </main>
  );
}






