import { CarProps, FilterProps } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchCarsResponse {
  data: CarProps[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export async function fetchCars(
  filters: FilterProps,
): Promise<{ data: CarProps[]; meta: FetchCarsResponse["meta"] }> {
  const {
    make,
    model,
    fuelType,
    transmission,
    seats,
    yearMin,
    yearMax,
    priceMin,
    priceMax,
    mileageMin,
    mileageMax,
    page = 1,
    limit = 12,
    category,
    branch,
    condition,
    sort,
    includeDeleted,
    includeHidden,
    onlyDeleted,
    onlyActive,
  } = filters;

  if (!BASE_URL) {
    console.error("Missing NEXT_PUBLIC_API_URL");
    return {
      data: [],
      // meta: { total: 0, page: 1, limit: 12, pages: 1 },
      meta: { total: 0, page, limit, pages: 1 },
    };
  }

  try {
    const query = new URLSearchParams();

    if (seats) query.append("seats", seats.toString());

    if (make) query.append("make", make);
    if (model) query.append("model", model);
    if (fuelType) query.append("fuelType", fuelType);
    if (transmission) query.append("transmission", transmission);

    if (yearMin) query.append("yearMin", yearMin.toString());
    if (yearMax) query.append("yearMax", yearMax.toString());

    if (priceMin) query.append("priceMin", priceMin.toString());
    if (priceMax) query.append("priceMax", priceMax.toString());

    if (mileageMin) query.append("mileageMin", mileageMin.toString());
    if (mileageMax) query.append("mileageMax", mileageMax.toString());

    if (category) query.append("category", category);
    if (branch) query.append("branch", branch);
    if (condition) query.append("condition", condition);
    if (sort) query.append("sort", sort);

    if (includeDeleted) query.append("includeDeleted", "true");

    if (onlyDeleted) query.append("onlyDeleted", "true");

    if (onlyActive) query.append("onlyActive", "true");

    // Prevent conflicting flags
    if (onlyDeleted && onlyActive) {
      query.delete("onlyActive");
    }

    if (includeHidden) query.append("includeHidden", "true");

    query.append("page", page.toString());
    query.append("limit", limit.toString());

    const response = await fetch(`${BASE_URL}/api/cars?${query.toString()}`, {
      cache: "no-store",
    });

    // if (!response.ok) {
    //   throw new Error(
    //     `fetchCars failed: ${response.status} ${response.statusText}`,
    //   );
    // }

    if (!response.ok) {
      console.error(
        `fetchCars failed: ${response.status} ${response.statusText}`,
      );
      return {
        data: [],
        meta: { total: 0, page, limit, pages: 1 },
      };
    }

    const json: FetchCarsResponse = await response.json();

    if (!json || !Array.isArray(json.data)) {
      console.error("Invalid fetchCars response:", json);

      return {
        data: [],
        meta: { total: 0, page, limit, pages: 1 },
      };
    }

    const cars: CarProps[] = json.data.map((car) => ({
      _id: car._id,
      make: car.make,
      model: car.model,
      trim: car.trim || "",
      year: car.year,
      price: car.price,
      color: car.color || "Unknown",
      seats: car.seats ?? 0,
      fuelType: car.fuelType || "Gasoline",
      transmission: car.transmission || "Manual",
      mileage: car.mileage ?? 0,
      pricePerDay: car.pricePerDay,
      images: Array.isArray(car.images) ? car.images : [],
      description: car.description || "",
      features: Array.isArray(car.features) ? car.features : [],
      available: car.available ?? true,
      createdAt: car.createdAt || "",
      slug: car.slug || "",
      condition: car.condition,
      certified: car.certified ?? false,
      location: car.location,
      drivetrain: car.drivetrain,
      isDeleted: car.isDeleted ?? false,
    }));

    return {
      data: cars,
      meta: json.meta || {
        total: cars.length,
        page,
        limit,
        pages: 1,
      },
    };
  } catch (error) {
    console.error("fetchCars exception:", error);

    // return {
    //   data: [],
    //   meta: { total: 0, page: 1, limit: 12, pages: 1 },
    // };

    return {
      data: [],
      meta: { total: 0, page, limit, pages: 1 },
    };
  }
}

export function updateSearchParams(type: string, value: string) {
  if (typeof window === "undefined") return "";

  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  return `${window.location.pathname}?${searchParams.toString()}`;
}
