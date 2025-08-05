import readline from "readline";
import type { PackageManager } from "./detectPackageManager.js";

export async function promptPackageManager(): Promise<PackageManager> {
  const managers: PackageManager[] = ["pnpm", "yarn", "npm", "bun"];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }

    let index = 0;

    function render() {
      console.clear();
      console.log("Select a package manager:");
      managers.forEach((m, i) => {
        console.log(`${i === index ? ">" : " "} ${m}`);
      });
    }

    function cleanup() {
      rl.close();
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
      }
    }

    render();

    process.stdin.on("keypress", (_str, key) => {
      if (key.name === "up") {
        index = (index - 1 + managers.length) % managers.length;
        render();
      } else if (key.name === "down") {
        index = (index + 1) % managers.length;
        render();
      } else if (key.name === "return") {
        cleanup();
        resolve(managers[index]);
      } else if (key.name === "c" && key.ctrl) {
        cleanup();
        process.exit();
      }
    });
  });
}
