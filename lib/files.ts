import fs from "node:fs";
import path from "node:path";

/**
 * Whether a public path like "/signs/x/step-1.png" exists with this exact spelling.
 * macOS ignores letter case but Vercel (Linux) does not, so compare names directly.
 */
export function publicFileExists(publicPath: string): boolean {
  let dir = path.resolve("public");
  for (const part of publicPath.split("/").filter(Boolean)) {
    if (!fs.existsSync(dir) || !fs.readdirSync(dir).includes(part)) return false;
    dir = path.join(dir, part);
  }
  return fs.statSync(dir).isFile();
}
