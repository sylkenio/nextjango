import { describe, it, expect } from "vitest";
import path from "path";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "fs";
import { tmpdir } from "os";
import { findConflicts } from "../src/commands/init.ts";

describe("findConflicts", () => {
  it("ignores specified directories", async () => {
    const src = mkdtempSync(path.join(tmpdir(), "src-"));
    const dest = mkdtempSync(path.join(tmpdir(), "dest-"));

    // regular conflict
    writeFileSync(path.join(src, "regular.txt"), "src");
    writeFileSync(path.join(dest, "regular.txt"), "dest");

    // ignored .git directory
    mkdirSync(path.join(src, ".git"), { recursive: true });
    mkdirSync(path.join(dest, ".git"), { recursive: true });
    writeFileSync(path.join(src, ".git", "config"), "");
    writeFileSync(path.join(dest, ".git", "config"), "");

    // nested node_modules directory
    const nestedNodeModulesSrc = path.join(
      src,
      "nested",
      "node_modules",
      "pkg"
    );
    const nestedNodeModulesDest = path.join(
      dest,
      "nested",
      "node_modules",
      "pkg"
    );
    mkdirSync(nestedNodeModulesSrc, { recursive: true });
    mkdirSync(nestedNodeModulesDest, { recursive: true });
    writeFileSync(path.join(nestedNodeModulesSrc, "index.js"), "");
    writeFileSync(path.join(nestedNodeModulesDest, "index.js"), "");

    const conflicts = await findConflicts(src, dest);

    expect(conflicts).toContain(path.join(dest, "regular.txt"));
    expect(conflicts).not.toContain(path.join(dest, ".git"));
    expect(conflicts).not.toContain(path.join(dest, ".git", "config"));
    expect(conflicts).not.toContain(path.join(dest, "nested", "node_modules"));
    expect(conflicts).not.toContain(
      path.join(dest, "nested", "node_modules", "pkg", "index.js")
    );

    rmSync(src, { recursive: true, force: true });
    rmSync(dest, { recursive: true, force: true });
  });
});
