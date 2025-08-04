import { existsSync } from "fs";
import path from "path";

export type PackageManager = "pnpm" | "yarn" | "npm" | "bun";

export function detectPackageManager(
  targetDir: string,
  override?: PackageManager
): PackageManager | null {
  if (override) return override;

  const hasPnpm = existsSync(path.join(targetDir, "pnpm-lock.yaml"));
  const hasYarn = existsSync(path.join(targetDir, "yarn.lock"));
  const hasBun = existsSync(path.join(targetDir, "bun.lockb"));
  const hasNpm = existsSync(path.join(targetDir, "package-lock.json"));

  if (hasPnpm) return "pnpm";
  if (hasYarn) return "yarn";
  if (hasBun) return "bun";
  if (hasNpm) return "npm";

  return null; // No known lockfile found
}
