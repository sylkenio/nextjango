import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "../dist/src/bin/nextjango.js");

if (!fs.existsSync(filePath)) {
  console.error("❌ Build output not found. Did tsc fail?");
  process.exit(1);
}

const contents = fs.readFileSync(filePath, "utf8");

if (!contents.startsWith("#!/usr/bin/env node")) {
  fs.writeFileSync(filePath, `#!/usr/bin/env node\n${contents}`);
  console.log("✅ Injected shebang into nextjango.js");
} else {
  console.log("ℹ️ Shebang already present");
}
