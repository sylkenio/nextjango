import { execSync } from "node:child_process";
import fs from "node:fs";

const files = execSync("git ls-files", { encoding: "utf8" }).trim().split("\n");
let hasError = false;

for (const file of files) {
  const stats = fs.statSync(file);
  if (stats.size === 0) continue;
  const buffer = fs.readFileSync(file);
  if (buffer.includes(0)) continue; // skip binary files
  if (!buffer.toString("utf8").endsWith("\n")) {
    console.error(`No newline at end of file: ${file}`);
    hasError = true;
  }
}

if (hasError) {
  process.exit(1);
}
