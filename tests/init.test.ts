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

const promptPackageManagerMock = vi.fn().mockResolvedValue("pnpm");
vi.mock("../src/utils/promptPackageManager.ts", () => ({
  promptPackageManager: promptPackageManagerMock,
}));

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
    execaMock.mockClear();
    await init({ packageManager: "pnpm" });
    expect(execaMock).toHaveBeenCalledWith("pnpm", ["--version"], {
      stdio: "ignore",
    });
    expect(execaMock).toHaveBeenCalledWith("pnpm", ["install"], {
      cwd: frontend,
      stdout: "inherit",
      stderr: "pipe",
    });
    process.chdir(original);
    rmSync(tmp, { recursive: true, force: true });
  });

  it("prompts for a package manager when no lockfile is present", async () => {
    const tmp = mkdtempSync(path.join(tmpdir(), "init-"));
    const frontend = path.join(tmp, "frontend");
    mkdirSync(frontend, { recursive: true });
    writeFileSync(path.join(frontend, "package.json"), "{}");
    const original = process.cwd();
    process.chdir(tmp);
    promptPackageManagerMock.mockClear();
    execaMock.mockClear();
    await init();
    expect(promptPackageManagerMock).toHaveBeenCalled();
    expect(execaMock).toHaveBeenCalledWith("pnpm", ["--version"], {
      stdio: "ignore",
    });
    process.chdir(original);
    rmSync(tmp, { recursive: true, force: true });
  });

  it("aborts when package manager is missing", async () => {
    const tmp = mkdtempSync(path.join(tmpdir(), "init-"));
    const frontend = path.join(tmp, "frontend");
    mkdirSync(frontend, { recursive: true });
    writeFileSync(path.join(frontend, "package.json"), "{}");
    const original = process.cwd();
    process.chdir(tmp);

    execaMock.mockReset();
    execaMock.mockRejectedValueOnce(new Error("not found"));

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await init({ packageManager: "pnpm" });

    expect(errorSpy).toHaveBeenCalled();
    expect(execaMock).toHaveBeenCalledTimes(1);
    expect(execaMock.mock.calls[0][0]).toBe("pnpm");
    expect(execaMock.mock.calls[0][1]).toEqual(["--version"]);

    errorSpy.mockRestore();
    process.chdir(original);
    rmSync(tmp, { recursive: true, force: true });
  });

  it("aborts when Python is missing", async () => {
    const tmp = mkdtempSync(path.join(tmpdir(), "init-"));
    const backend = path.join(tmp, "backend");
    mkdirSync(backend, { recursive: true });
    writeFileSync(path.join(backend, "requirements.txt"), "");
    const original = process.cwd();
    process.chdir(tmp);

    execaMock.mockReset();
    execaMock.mockRejectedValueOnce(new Error("python not found"));
    execaMock.mockResolvedValue({});

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await init();

    expect(errorSpy).toHaveBeenCalled();
    expect(execaMock).toHaveBeenCalledTimes(1);
    expect(execaMock.mock.calls[0][0]).toBe("python");
    expect(execaMock.mock.calls[0][1]).toEqual(["--version"]);

    errorSpy.mockRestore();
    process.chdir(original);
    rmSync(tmp, { recursive: true, force: true });
  });

  it("logs stderr when backend dependency installation fails", async () => {
    const tmp = mkdtempSync(path.join(tmpdir(), "init-"));
    const backend = path.join(tmp, "backend");
    mkdirSync(backend, { recursive: true });
    writeFileSync(path.join(backend, "requirements.txt"), "");
    const original = process.cwd();
    process.chdir(tmp);

    const error = new Error("pip failed");
    // @ts-ignore
    error.stderr = "pip install error";
    execaMock.mockReset();
    execaMock
      .mockResolvedValueOnce({}) // python --version
      .mockRejectedValueOnce(error); // pip install

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await init();

    expect(errorSpy).toHaveBeenCalledWith("pip install error");

    errorSpy.mockRestore();
    process.chdir(original);
    rmSync(tmp, { recursive: true, force: true });
  });

  it("logs stderr when frontend dependency installation fails", async () => {
    const tmp = mkdtempSync(path.join(tmpdir(), "init-"));
    const frontend = path.join(tmp, "frontend");
    mkdirSync(frontend, { recursive: true });
    writeFileSync(path.join(frontend, "package.json"), "{}");
    const original = process.cwd();
    process.chdir(tmp);

    const error = new Error("install failed");
    // @ts-ignore
    error.stderr = "pnpm install error";
    execaMock.mockReset();
    execaMock
      .mockResolvedValueOnce({}) // pnpm --version
      .mockRejectedValueOnce(error); // pnpm install

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await init({ packageManager: "pnpm" });

    expect(errorSpy).toHaveBeenCalledWith("pnpm install error");

    errorSpy.mockRestore();
    process.chdir(original);
    rmSync(tmp, { recursive: true, force: true });
  });
});
