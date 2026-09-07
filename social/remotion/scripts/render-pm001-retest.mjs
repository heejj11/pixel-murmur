import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const destination = resolve(
  "../campaigns/2026-09-pilot/PM-001/retest-v04/renders",
);
mkdirSync(destination, { recursive: true });
const tasks = [
  ["still", "PM001-Retest-Cover", "pm-001_cover_v04.png"],
  ["still", "PM001-Retest-Card-1", "pm-001_card_01_v04.png"],
  ["still", "PM001-Retest-Card-2", "pm-001_card_02_v04.png"],
  ["still", "PM001-Retest-Card-3", "pm-001_card_03_v04.png"],
  ["render", "PM001-Retest-Reel", "pm-001_ig_08s_v04.mp4"],
  ["render", "PM001-Retest-X", "pm-001_x_06s_v04.mp4"],
];
for (const [command, composition, file] of tasks) {
  const result = spawnSync(
    "npx",
    [
      "remotion",
      command,
      "src/index.ts",
      composition,
      resolve(destination, file),
      ...(command === "render"
        ? [
            "--codec=h264",
            "--crf=18",
            "--pixel-format=yuv420p",
            "--concurrency=2",
          ]
        : ["--frame=0"]),
    ],
    { stdio: "inherit" },
  );
  if (result.status !== 0) throw new Error(`Failed to render ${file}`);
}
const finalized = spawnSync("node", ["scripts/finalize-pm001-retest.mjs"], {
  stdio: "inherit",
});
if (finalized.status !== 0)
  throw new Error("Could not finalize the retest videos.");
