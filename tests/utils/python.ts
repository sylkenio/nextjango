import { execa } from "execa";

export async function isPythonAvailable(): Promise<boolean> {
  try {
    await execa("python", ["--version"], { shell: false });
    return true;
  } catch {
    return false;
  }
}
