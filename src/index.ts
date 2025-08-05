import { Command } from "commander";
import { readFileSync } from "node:fs";
import { init } from "./commands/init.js";

const pkgPaths = [
  "../../package.json",
  "../package.json",
  "./package.json",
] as const;
let pkgVersion = "0.0.0";
for (const p of pkgPaths) {
  try {
    const json = readFileSync(new URL(p, import.meta.url), "utf-8");
    pkgVersion = JSON.parse(json).version;
    break;
  } catch {
    // Continue trying other paths
  }
}

const program = new Command();

program
  .name("nextjango")
  .description("Scaffold a fullstack Next.js + Django project")
  .version(pkgVersion);

program
  .command("init")
  .description("Initialize a new Nextjango project")
  .option(
    "-p, --package-manager <pm>",
    "Manually specify the package manager (pnpm, yarn, npm, bun)"
  )
  .action((opts) => init(opts));

program.parse();
