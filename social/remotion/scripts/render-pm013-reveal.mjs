import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const destination = resolve(
  "../campaigns/2026-09-pilot/PM-013/ig-reveal-v03/renders",
);
mkdirSync(destination, { recursive: true });
const run = (args) => {
  const r = spawnSync("npx", ["remotion", ...args], { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`Render failed: ${args.join(" ")}`);
};
run([
  "still",
  "src/index.ts",
  "PM013-Reveal-Cover",
  resolve(destination, "pm-013_reveal_cover_v03.png"),
]);
for (const f of [0, 30, 50, 70, 145, 209])
  run([
    "still",
    "src/index.ts",
    "PM013-Reveal-Reel",
    resolve(destination, `qa_frame_${String(f).padStart(3, "0")}.png`),
    `--frame=${f}`,
  ]);
run([
  "render",
  "src/index.ts",
  "PM013-Reveal-Reel",
  resolve(destination, "pm-013_ig_reveal_07s_v03.raw.mp4"),
  "--codec=h264",
  "--crf=18",
  "--pixel-format=yuv420p",
  "--concurrency=2",
]);
run([
  "ffmpeg",
  "-hide_banner",
  "-y",
  "-i",
  resolve(destination, "pm-013_ig_reveal_07s_v03.raw.mp4"),
  "-t",
  "7",
  "-c:v",
  "libx264",
  "-crf",
  "18",
  "-pix_fmt",
  "yuv420p",
  "-c:a",
  "aac",
  "-b:a",
  "192k",
  "-movflags",
  "+faststart",
  resolve(destination, "pm-013_ig_reveal_07s_v03.mp4"),
]);
