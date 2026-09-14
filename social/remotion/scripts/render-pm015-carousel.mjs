import { copyFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(
  root,
  "../../public/images/objects/pm-015-disposable-camera-date-stamp",
);
const assets = resolve(root, "public/pm015");
const destination = resolve(
  root,
  "../campaigns/2026-09-pilot/PM-015/planner-v01/renders",
);
mkdirSync(assets, { recursive: true });
mkdirSync(destination, { recursive: true });
for (const file of [
  "01-hero.webp",
  "02-press-to-stamp.webp",
  "07-ink-colors.webp",
]) {
  copyFileSync(resolve(source, file), resolve(assets, file));
}
for (const page of ["01", "02", "03"]) {
  const args = [
    "--no-install",
    "remotion",
    "still",
    "src/index-pm015.ts",
    `PM015-Planner-${page}`,
    resolve(destination, `pm-015_planner_${page}_v01.png`),
    "--image-format=png",
  ];
  const result = spawnSync("npx", args, { cwd: root, stdio: "inherit" });
  if (result.status !== 0) throw new Error(`PM015 page ${page} render failed`);
}
