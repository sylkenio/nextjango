import { Command } from "commander";
import { init } from "./commands/init.js";

const program = new Command();

program
  .name("nextjango")
  .description("Scaffold a fullstack Next.js + Django project")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize a new Nextjango project")
  .option(
    "-p, --package-manager <pm>",
    "Manually specify the package manager (pnpm, yarn, npm, bun)"
  )
  .action((opts) => init(opts));

program.parse();
