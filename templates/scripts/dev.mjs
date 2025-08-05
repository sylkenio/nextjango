import { spawn } from "child_process";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

function detectPackageManager(targetDir) {
  if (existsSync(path.join(targetDir, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(path.join(targetDir, "yarn.lock"))) return "yarn";
  if (existsSync(path.join(targetDir, "bun.lockb"))) return "bun";
  if (existsSync(path.join(targetDir, "package-lock.json"))) return "npm";
  return null;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const backendDir = path.join(rootDir, "backend");
const frontendDir = path.join(rootDir, "frontend");

const packageManager = detectPackageManager(frontendDir) || "npm";
const frontendArgs = packageManager === "npm" ? ["run", "dev"] : ["dev"];

const backend = spawn("python", ["manage.py", "runserver"], {
  cwd: backendDir,
  stdio: "inherit",
  shell: true,
});

const frontend = spawn(packageManager, frontendArgs, {
  cwd: frontendDir,
  stdio: "inherit",
  shell: true,
});

function shutdown() {
  backend.kill("SIGTERM");
  frontend.kill("SIGTERM");
}

function handleExit(code) {
  shutdown();
  process.exit(code ?? 0);
}

backend.on("exit", handleExit);
frontend.on("exit", handleExit);
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
