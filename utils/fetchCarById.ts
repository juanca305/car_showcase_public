import { CarProps } from "@/types";

/**
 * Base API URL from environment.
 * Using a constant avoids repeated env lookups and improves clarity.
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch a single car by ID from admin API.
 *
 * Used by:
 * - EditCarPage (Server Component)
 * - Admin car detail views
 *
 * Behavior:
 * - Returns CarProps if found
 * - Returns null if not found or error occurs
 * * Always bypasses cache to ensure fresh admin data
 */
export async function fetchCarById(
  id: string
): Promise<CarProps | null> {

  // Defensive guard against invalid input
  if (!id) {
    console.error("fetchCarById called without id");
    return null;
  }

  // Defensive guard against missing env configuration
  if (!BASE_URL) {
    console.error("Missing NEXT_PUBLIC_API_URL");
    return null;
  }

  try {

    const res = await fetch(
      `${BASE_URL}/api/admin/cars/${id}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY!,
        },

        /**
         * Critical for admin panels:
         * Always fetch fresh data.
         */
        cache: "no-store",
      }
    );

    if (!res.ok) {

      console.error(
        `fetchCarById failed: ${res.status} ${res.statusText}`
      );

      return null;
    }

    const json = await res.json();

    /**
     * Backend contract validation.
     * Ensures expected shape before returning.
     */
    if (!json || typeof json !== "object" || !json.data) {
      console.error("Invalid API response shape:", json);
      return null;
    }

    return json.data as CarProps;

  } catch (error) {

    console.error("fetchCarById exception:", error);

    return null;

  }

}