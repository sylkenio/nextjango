import { describe, it, expect, test } from "vitest";
import { execa } from "execa";
import path from "path";

let hasPython = true;
try {
  await execa("python", ["--version"], { shell: false });
} catch {
  hasPython = false;
}
if (!hasPython) {
  test.skip("Python is required to run CORS origin tests", () => {});
} else {
  describe("CORS_ALLOWED_ORIGINS default", () => {
    it("allows http://localhost:3000 by default", async () => {
      const backendPath = path.join(process.cwd(), "templates", "backend");
      const script = [
        "import os, sys",
        `sys.path.insert(0, ${JSON.stringify(backendPath)})`,
        "os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')",
        "import django",
        "django.setup()",
        "from django.conf import settings",
        "print(','.join(settings.CORS_ALLOWED_ORIGINS))",
      ].join(";");

      const env = { ...process.env };
      delete env.CORS_ALLOWED_ORIGINS;
      const { stdout } = await execa("python", ["-c", script], {
        env,
        shell: false,
      });
      expect(stdout.trim()).toBe("http://localhost:3000");
    });
  });
}
