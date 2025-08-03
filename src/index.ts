import { Command } from "commander";
import { init } from "./commands/init";

const program = new Command();

program
  .name("nextjango")
  .description("Scaffold a fullstack Next.js + Django project")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize a new Nextjango project")
  .action(init);

program.parse();
