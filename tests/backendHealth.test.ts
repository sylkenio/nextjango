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
      const script =
        `import os, sys\n` +
        `sys.path.insert(0, ${JSON.stringify(backendPath)})\n` +
        `os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')\n` +
        `import django\n` +
        `django.setup()\n` +
        `from django.conf import settings\n` +
        `settings.ALLOWED_HOSTS.append('testserver')\n` +
        `from django.test import Client\n` +
        `client = Client()\n` +
        `response = client.get('/api/health/')\n` +
        `print(response.status_code)\n` +
        `import json\n` +
        `print(json.dumps(response.json()))`;

      const { stdout } = await execa("python", ["-c", script]);
      const [statusCode, jsonStr] = stdout.trim().split("\n");
      expect(Number(statusCode)).toBe(200);
      expect(JSON.parse(jsonStr)).toEqual({ status: "ok" });
    });
  });
}
