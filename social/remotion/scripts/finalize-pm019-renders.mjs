import { copyFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const renderDirectory = resolve(
  "../campaigns/2026-09-pilot/PM-019/video/renders",
);
const temporaryDirectory = mkdtempSync(join(tmpdir(), "pm019-renders-"));
const renders = [
  { file: "pm-019_ig_09s_v03.mp4", duration: "9" },
  { file: "pm-019_x_loop_06s_v03.mp4", duration: "6" },
];

for (const render of renders) {
  const source = join(renderDirectory, render.file);
  const destination = join(temporaryDirectory, basename(render.file));
  const result = spawnSync(
    "npx",
    [
      "remotion",
      "ffmpeg",
      "-y",
      "-i",
      source,
      "-t",
      render.duration,
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      "18",
      "-c:a",
      "aac",
      "-b:a",
      "192k",
      "-movflags",
      "+faststart",
      destination,
    ],
    { stdio: "inherit" },
  );

  if (result.status !== 0) {
    throw new Error(`Could not finalize ${render.file}.`);
  }

  copyFileSync(destination, source);
}

console.log(`Finalized ${renders.length} PM-019 renders to exact durations.`);
