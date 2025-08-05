export async function checkHealth() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    new URL(apiUrl);
  } catch {
    throw new Error("NEXT_PUBLIC_API_URL is not a valid URL");
  }

  let res: Response;
  try {
    res = await fetch(`${apiUrl}/api/health/`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to fetch backend status: ${message}`);
  }
  if (!res.ok) {
    throw new Error("Failed to fetch backend status");
  }
  return res.json();
}
