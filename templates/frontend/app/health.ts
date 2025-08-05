export async function checkHealth() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    new URL(apiUrl);
  } catch {
    throw new Error("NEXT_PUBLIC_API_URL is not a valid URL");
  }

  const res = await fetch(`${apiUrl}/api/health`);
  if (!res.ok) {
    throw new Error("Failed to fetch backend status");
  }
  return res.json();
}
