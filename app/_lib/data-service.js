const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function fetchData(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`Fail to fetch ${endpoint}: ${res.status}`);
    }
    const data = await res.json();
    return { data: data.data.data, error: null };
  } catch (err) {
    console.log("Error:", err.message);
    return { data: null, error: "Network error: Can't fetch data" };
  }
}
// Tours
export async function getTours() {
  const { data, error } = await fetchData("tours");
  if (error) {
    console.error(error);
    throw new Error("Tours could not get loaded");
  }
  return data;
}
export async function getTour(id) {
  const { data, error } = await fetchData(`tours/${id}`);
  if (error) {
    console.error(error);
    throw new Error(`Can't fetch ${data.name}`);
  }
  return data;
}
