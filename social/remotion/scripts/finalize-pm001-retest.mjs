import { copyFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const destination = resolve(
  "../campaigns/2026-09-pilot/PM-001/retest-v04/renders",
);
const temporary = mkdtempSync(join(tmpdir(), "pm001-retest-"));
for (const [file, seconds] of [
  ["pm-001_ig_08s_v04.mp4", 8],
  ["pm-001_x_06s_v04.mp4", 6],
]) {
  const source = join(destination, file);
  const result = spawnSync(
    "npx",
    [
      "remotion",
      "ffmpeg",
      "-y",
      "-i",
      source,
      "-t",
      String(seconds),
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      "18",
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      "192k",
      "-af",
      `volume='min(1,max(0,(${seconds}-t)/0.04))':eval=frame`,
      "-movflags",
      "+faststart",
      join(temporary, file),
    ],
    { stdio: "inherit" },
  );
  if (result.status !== 0) throw new Error(`Could not finalize ${file}`);
  copyFileSync(join(temporary, file), source);
}
