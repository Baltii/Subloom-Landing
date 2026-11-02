import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const oldHosts = [
  ["subloom-landing", "baltii", "tn"].join("."),
  ["subloom", "baltii", "tn"].join("."),
];
const files = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
  .split("\0").filter(Boolean);
const stale = files.filter((path) =>
  /\.(?:ts|tsx|js|jsx|mjs|cjs|json|md|html|ya?ml|css)$/i.test(path) &&
  oldHosts.some((host) => readFileSync(path, "utf8").includes(host))
);
if (stale.length) {
  console.error("Legacy Subloom domains remain in:\n" + stale.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Domain references OK: https://subloom.tn and https://app.subloom.tn.");
}
