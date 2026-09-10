import { mkdirSync, renameSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const destination = resolve(
  "../campaigns/2026-09-pilot/PM-013/explain-v02/renders",
);
mkdirSync(destination, { recursive: true });
const tasks = [
  ["still", "PM013-Explain-Cover", "pm-013_cover_v02.png", 0],
  ["still", "PM013-Explain-X-Card", "pm-013_x_card_v02.png", 0],
  ["still", "PM013-Explain-Reel", "qa_scene_01.png", 0],
  ["still", "PM013-Explain-Reel", "qa_scene_02.png", 100],
  ["still", "PM013-Explain-Reel", "qa_scene_03.png", 190],
  ["render", "PM013-Explain-Reel", "pm-013_ig_09s_v02.mp4", 0],
];
for (const [command, composition, file, frame] of tasks) {
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
        : [`--frame=${frame}`]),
    ],
    { stdio: "inherit" },
  );
  if (result.status !== 0) throw new Error(`Failed to render ${file}`);
}

// Normalize upload format and trim the AAC encoder padding. Only this v02 output is touched.
const rendered = resolve(destination, "pm-013_ig_09s_v02.mp4");
const uploadReady = resolve(destination, "pm-013_ig_09s_v02.upload-ready.mp4");
const finalized = spawnSync(
  "npx",
  [
    "remotion",
    "ffmpeg",
    "-hide_banner",
    "-y",
    "-i",
    rendered,
    "-t",
    "9",
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
    uploadReady,
  ],
  { stdio: "inherit" },
);
if (finalized.status !== 0) throw new Error("PM013 upload finalization failed");
renameSync(uploadReady, rendered);
