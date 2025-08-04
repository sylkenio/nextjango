import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { cwd } from "process";
import { execa } from "execa";
import chalk from "chalk";
import ora from "ora";
import readline from "readline";
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

async function findConflicts(src: string, dest: string): Promise<string[]> {
  const entries = await fs.readdir(src, { withFileTypes: true });
  const conflicts: string[] = [];
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (await fs.pathExists(destPath)) {
      conflicts.push(destPath);
    }
    if (entry.isDirectory()) {
      conflicts.push(...(await findConflicts(srcPath, destPath)));
    }
  }
  return conflicts;
}

function promptYesNo(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(/^y(es)?$/i.test(answer.trim()));
    });
  });
}

export async function init(options: InitOptions = {}) {
  const destination = cwd();

  console.log(chalk.blue("🚀 Initializing your Nextjango project...\n"));

  const conflicts = await findConflicts(TEMPLATE_DIR, destination);
  if (conflicts.length > 0) {
    console.log(
      chalk.yellow("The following files already exist:\n") +
        conflicts
          .map((file) => `  - ${path.relative(destination, file)}`)
          .join("\n")
    );
    const overwrite = await promptYesNo(
      chalk.yellow("\nOverwrite these files? (y/N): ")
    );
    if (!overwrite) {
      console.log(chalk.red("Aborting."));
      return;
    }
  }

  const copySpinner = ora("Copying project files...").start();
  try {
    await copy(TEMPLATE_DIR, destination, { overwrite: true });
    copySpinner.succeed(chalk.green("Project files copied successfully."));
  } catch (err) {
    copySpinner.fail(chalk.red("Failed to copy template files."));
    console.error(err);
    process.exit(1);
  }

  // Check for package.json in frontend/
  const frontendDir = path.join(destination, "frontend");
  const packageJsonPath = path.join(frontendDir, "package.json");
  const hasPackageJson = existsSync(packageJsonPath);

  if (!hasPackageJson) {
    console.warn(
      chalk.yellow(
        "⚠️  No package.json found in frontend/. Skipping dependency installation."
      )
    );
    return;
  }

  const packageManager = detectPackageManager(
    frontendDir,
    options.packageManager
  );

  if (!packageManager) {
    console.error(
      chalk.red(
        "❌ No lockfile found in frontend/. Please specify a package manager with --package-manager."
      )
    );
    return;
  }

  const installSpinner = ora(
    `Installing frontend dependencies using ${packageManager}...`
  ).start();

  try {
    await execa(packageManager, ["install"], {
      cwd: frontendDir,
      stdio: "ignore",
    });
    installSpinner.succeed(
      chalk.green(`Dependencies installed in frontend/ using ${packageManager}`)
    );
  } catch (err) {
    installSpinner.fail(chalk.red("Failed to install frontend dependencies."));
    console.error(err);
  }
}
