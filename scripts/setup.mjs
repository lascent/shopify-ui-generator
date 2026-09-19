import { existsSync, copyFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const major = Number(process.versions.node.split(".")[0] || 0);
if (major < 20) {
  console.error(`\nNode.js ${process.versions.node} detected.`);
  console.error("shopify-ui-generator requires Node.js 20 or newer.\n");
  process.exit(1);
}

console.log(`\n✓ Node.js ${process.versions.node}`);

if (!existsSync(".env.local") && existsSync(".env.example")) {
  copyFileSync(".env.example", ".env.local");
  console.log("✓ Created .env.local from .env.example");
  console.log("  The app works without an API key. Add OPENAI_API_KEY only if you want the optional AI planner.\n");
}

console.log("Installing dependencies...\n");

// Prefer the npm CLI that launched this script. This avoids spawning npm.cmd
// directly on Windows, which can fail with EINVAL on newer Node.js versions.
const npmExecPath = process.env.npm_execpath;
let result;

if (npmExecPath && existsSync(npmExecPath)) {
  result = spawnSync(process.execPath, [npmExecPath, "install"], {
    stdio: "inherit",
    shell: false,
  });
} else if (process.platform === "win32") {
  result = spawnSync("cmd.exe", ["/d", "/s", "/c", "npm install"], {
    stdio: "inherit",
    shell: false,
  });
} else {
  result = spawnSync("npm", ["install"], {
    stdio: "inherit",
    shell: false,
  });
}

if (result.error) {
  console.error(`\nSetup failed: ${result.error.message}`);
  process.exit(1);
}

if ((result.status ?? 1) !== 0) {
  console.error("\nnpm install failed. Check your internet connection, Node.js version, and npm configuration.");
  process.exit(result.status ?? 1);
}

console.log("\n✓ Dependencies installed");
console.log("\nStart the app with:\n  npm run dev\n");
console.log("Then open:\n  http://localhost:3000\n");
