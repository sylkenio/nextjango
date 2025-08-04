import { existsSync } from "fs";
import path from "path";

export function detectPackageManager(
  targetDir: string
): "pnpm" | "yarn" | "npm" {
  const hasPnpm = existsSync(path.join(targetDir, "pnpm-lock.yaml"));
  const hasYarn = existsSync(path.join(targetDir, "yarn.lock"));

  if (hasPnpm) return "pnpm";
  if (hasYarn) return "yarn";
  return "npm"; // default fallback
}
