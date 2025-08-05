import { describe, it, expect, vi, beforeAll } from "vitest";
import path from "path";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "fs";
import { tmpdir } from "os";

vi.mock("fs-extra", async () => {
  const fs = await import("fs");
  return {
    __esModule: true,
    default: {
      copy: vi.fn().mockResolvedValue(undefined),
      readdir: vi.fn().mockResolvedValue([]),
      pathExists: vi.fn().mockResolvedValue(false),
      existsSync: fs.existsSync,
    },
  };
});

const execaMock = vi.fn().mockResolvedValue({});
vi.mock("execa", () => ({ execa: execaMock }));

const oraMock = vi.fn(() => ({
  start: vi.fn().mockReturnThis(),
  succeed: vi.fn(),
  fail: vi.fn(),
}));
vi.mock("ora", () => ({ default: oraMock }));

let init: typeof import("../src/commands/init.ts")["init"];

beforeAll(async () => {
  ({ init } = await import("../src/commands/init.ts"));
});

describe("init command", () => {
  it("warns when frontend/package.json is missing", async () => {
    const tmp = mkdtempSync(path.join(tmpdir(), "init-"));
    mkdirSync(path.join(tmp, "frontend"), { recursive: true });
    const original = process.cwd();
    process.chdir(tmp);
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    await init();
    expect(warnSpy).toHaveBeenCalled();
    expect(execaMock).not.toHaveBeenCalled();
    warnSpy.mockRestore();
    process.chdir(original);
    rmSync(tmp, { recursive: true, force: true });
  });

  it("installs dependencies when package.json exists", async () => {
    const tmp = mkdtempSync(path.join(tmpdir(), "init-"));
    const frontend = path.join(tmp, "frontend");
    mkdirSync(frontend, { recursive: true });
    writeFileSync(path.join(frontend, "package.json"), "{}");
    const original = process.cwd();
    process.chdir(tmp);
    await init({ packageManager: "pnpm" });
    expect(execaMock).toHaveBeenCalledWith("pnpm", ["install"], {
      cwd: frontend,
      stdio: "ignore",
    });
    process.chdir(original);
    rmSync(tmp, { recursive: true, force: true });
  });
});
