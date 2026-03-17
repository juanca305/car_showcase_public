const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCarMakes(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/cars/makes/distinct`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch makes");
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.error(err);
    return [];
  }
}
