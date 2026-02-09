export const API_URL = "http://localhost:5000"; // Use backend URL in production

export async function fetchHello() {
  const res = await fetch(`${API_URL}/api/hello`);
  const data = await res.json();
  return data;
}
