import { copy } from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesSrc = path.resolve(__dirname, "../templates");
const templatesDest = path.resolve(__dirname, "../dist/templates");
const pkgSrc = path.resolve(__dirname, "../package.json");
const pkgDest = path.resolve(__dirname, "../dist/package.json");

console.log("📁 Copying templates and package.json to dist...");

try {
  await copy(templatesSrc, templatesDest);
  await copy(pkgSrc, pkgDest);
  console.log("✅ Templates copied to dist/templates");
  console.log("✅ package.json copied to dist/");
} catch (err) {
  console.error("❌ Failed to copy files:", err);
  process.exit(1);
}
