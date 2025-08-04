import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { cwd } from "process";
import { execa } from "execa";
import {
  detectPackageManager,
  type PackageManager,
} from "../utils/detectPackageManager.js";
const { copy, existsSync } = fs;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATE_DIR = path.resolve(__dirname, "../../templates");

interface InitOptions {
  packageManager?: PackageManager;
}

export async function init(options: InitOptions = {}) {
  const destination = cwd();

  console.log("🚀 Initializing your Nextjango project...\n");

  try {
    await copy(TEMPLATE_DIR, destination, { overwrite: true });
    console.log("✅ Project files copied successfully.");
  } catch (err) {
    console.error("❌ Failed to copy template files:", err);
    process.exit(1);
  }

  // Check for package.json in frontend/
  const frontendDir = path.join(destination, "frontend");
  const packageJsonPath = path.join(frontendDir, "package.json");
  const hasPackageJson = existsSync(packageJsonPath);

  if (!hasPackageJson) {
    console.warn(
      "⚠️  No package.json found in frontend/. Skipping dependency installation."
    );
    return;
  }

  const packageManager = detectPackageManager(
    frontendDir,
    options.packageManager
  );

  if (!packageManager) {
    console.error(
      "❌ No lockfile found in frontend/. Please specify a package manager with --package-manager."
    );
    return;
  }

  console.log(
    `📦 Installing frontend dependencies using ${packageManager}...\n`
  );

  try {
    await execa(packageManager, ["install"], {
      cwd: frontendDir,
      stdio: "inherit",
    });
    console.log(
      `✅ Dependencies installed in frontend/ using ${packageManager}`
    );
  } catch (err) {
    console.error("❌ Failed to install frontend dependencies:", err);
  }
}
