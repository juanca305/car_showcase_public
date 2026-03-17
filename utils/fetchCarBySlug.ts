// import { CarProps } from "@/types";

// export async function fetchCarBySlug(slug: string): Promise<CarProps | null> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/cars/${slug}`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) {
//       return null;
//     }

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching car by slug:", error);
//     return null;
//   }
// }
/***************************** */
// import { CarProps } from "@/types";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// export async function fetchCarBySlug(slug: string): Promise<CarProps | null> {
//   try {
//     const res = await fetch(
//       `${BASE_URL}/api/cars?slug=${slug}`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) {
//       return null;
//     }

//     const json = await res.json();

//     // Backend returns { data: CarProps[], meta: {...} }
//     if (!json || !Array.isArray(json.data)) {
//       console.warn("Unexpected backend response:", json);
//       return null;
//     }

//     return json.data.length > 0 ? json.data[0] : null;
//   } catch (error) {
//     console.error("Error fetching car by slug:", error);
//     return null;
//   }
// }
/********************************* */
import { CarProps } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCarBySlug(
  slug: string
): Promise<CarProps | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/cars?slug=${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Failed to fetch car by slug:", res.statusText);
      return null;
    }

    const json = await res.json();

    // Backend returns { data: [...], meta: {...} }
    if (!json?.data || json.data.length === 0) {
      return null;
    }

    return json.data[0]; // ✅ exactly one car
  } catch (error) {
    console.error("Error fetching car by slug:", error);
    return null;
  }
}

