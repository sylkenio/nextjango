import { describe, it, expect } from "vitest";
import { execa } from "execa";
import path from "path";

describe("CORS_ALLOWED_ORIGINS default", () => {
  it("allows http://localhost:3000 by default", async () => {
    const backendPath = path.join(process.cwd(), "templates", "backend");
    const script =
      `import os, sys\n` +
      `sys.path.insert(0, ${JSON.stringify(backendPath)})\n` +
      `os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')\n` +
      `import django\n` +
      `django.setup()\n` +
      `from django.conf import settings\n` +
      `print(','.join(settings.CORS_ALLOWED_ORIGINS))`;

    const env = { ...process.env };
    delete env.CORS_ALLOWED_ORIGINS;
    const { stdout } = await execa("python", ["-c", script], { env });
    expect(stdout.trim()).toBe("http://localhost:3000");
  });
});
