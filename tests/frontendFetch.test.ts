import { describe, it, expect, vi, beforeEach } from "vitest";
import { checkHealth } from "../templates/frontend/app/health";

describe("frontend fetch logic", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    process.env.NEXT_PUBLIC_API_URL = "http://example.com";
  });

  it("fetches backend health successfully", async () => {
    const data = { status: "ok" };
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
    });
    (global as any).fetch = mockFetch;

    const result = await checkHealth();
    expect(result).toEqual(data);
    expect(mockFetch).toHaveBeenCalledWith("http://example.com/api/health");
  });

  it("throws when backend is unreachable", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("fail"));
    (global as any).fetch = mockFetch;

    await expect(checkHealth()).rejects.toThrow();
  });
});
