import { describe, it, expect } from "vitest";
import { detectPackageManager } from "../src/utils/detectPackageManager.ts";
import { mkdtempSync, writeFileSync, rmSync } from "fs";
import { tmpdir } from "os";
import path from "path";

describe("detectPackageManager", () => {
  it("returns override when provided", () => {
    const result = detectPackageManager("/tmp/does-not-exist", "yarn");
    expect(result).toBe("yarn");
  });

  it("detects pnpm via lockfile", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "pm-"));
    writeFileSync(path.join(dir, "pnpm-lock.yaml"), "");
    const result = detectPackageManager(dir);
    expect(result).toBe("pnpm");
    rmSync(dir, { recursive: true, force: true });
  });
});
