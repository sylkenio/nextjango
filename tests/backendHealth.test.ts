import { describe, it, expect, test } from "vitest";
import { execa } from "execa";
import path from "path";

let hasPython = true;
try {
  await execa("python", ["--version"]);
} catch {
  hasPython = false;
}

if (!hasPython) {
  test.skip("Python is required to run backend health tests", () => {});
} else {
  describe("backend health endpoint", () => {
    it("returns status ok", async () => {
      const backendPath = path.join(process.cwd(), "templates", "backend");
      const script = [
        "import os, sys",
        `sys.path.insert(0, ${JSON.stringify(backendPath)})`,
        "os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')",
        "import django",
        "django.setup()",
        "from django.conf import settings",
        "settings.ALLOWED_HOSTS.append('testserver')",
        "from django.test import Client",
        "client = Client()",
        "response = client.get('/api/health/')",
        "print(response.status_code)",
        "import json",
        "print(json.dumps(response.json()))",
      ].join(";");

      const { stdout } = await execa("python", ["-c", script], {
        shell: false,
      });

      const [statusCode, jsonStr] = stdout.trim().split("\n");
      expect(Number(statusCode)).toBe(200);
      expect(JSON.parse(jsonStr)).toEqual({ status: "ok" });
    });
  });
}
