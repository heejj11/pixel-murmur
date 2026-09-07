import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve("../campaigns/2026-09-pilot/PM-001/retest-v04");
const frames = join(root, "qa");
mkdirSync(frames, { recursive: true });
const run = (tool, args) => {
  const result = spawnSync("npx", ["remotion", tool, ...args], {
    encoding: "utf8",
    maxBuffer: 8_000_000,
  });
  if (result.status !== 0) throw new Error(result.stderr);
  return { out: result.stdout, log: result.stderr };
};
const reports = [];
for (const [file, seconds, height, timestamps] of [
  ["pm-001_ig_08s_v04.mp4", 8, 1920, [0, 2.96, 3, 4.96, 5, 7.96]],
  ["pm-001_x_06s_v04.mp4", 6, 1350, [0, 1.96, 2, 3.96, 4, 5.96]],
]) {
  const path = join(root, "renders", file);
  const bytes = readFileSync(path);
  const metadata = JSON.parse(
    run("ffprobe", [
      "-v",
      "error",
      "-show_streams",
      "-show_format",
      "-of",
      "json",
      path,
    ]).out,
  );
  const video = metadata.streams.find(
    (stream) => stream.codec_type === "video",
  );
  const audio = metadata.streams.find(
    (stream) => stream.codec_type === "audio",
  );
  if (
    video.width !== 1080 ||
    video.height !== height ||
    video.r_frame_rate !== "30/1" ||
    video.codec_name !== "h264" ||
    audio?.codec_name !== "aac" ||
    Math.abs(Number(metadata.format.duration) - seconds) > 0.025
  )
    throw new Error(`Unexpected media metadata: ${file}`);
  const boxes = [];
  for (let offset = 0; offset + 8 <= bytes.length; ) {
    const size = bytes.readUInt32BE(offset);
    boxes.push(bytes.toString("ascii", offset + 4, offset + 8));
    if (size < 8) break;
    offset += size;
  }
  if (
    boxes.indexOf("moov") < 0 ||
    boxes.indexOf("moov") > boxes.indexOf("mdat")
  )
    throw new Error(`Missing faststart: ${file}`);
  const loudnessLog = run("ffmpeg", [
    "-hide_banner",
    "-i",
    path,
    "-map",
    "0:a",
    "-af",
    "loudnorm=print_format=json",
    "-f",
    "null",
    "/dev/null",
  ]).log;
  const loudness = JSON.parse(loudnessLog.match(/\{\s*"input_i"[\s\S]*?\}/)[0]);
  const silenceLog = run("ffmpeg", [
    "-hide_banner",
    "-i",
    path,
    "-map",
    "0:a",
    "-af",
    `silencedetect=noise=${loudness.input_thresh}dB:d=0.5`,
    "-f",
    "null",
    "/dev/null",
  ]).log;
  if (silenceLog.includes("silence_start:"))
    throw new Error(`Silence detected: ${file}`);
  // Decode every frame to catch a damaged final export.
  run("ffmpeg", [
    "-v",
    "error",
    "-i",
    path,
    "-c:v",
    "rawvideo",
    "-c:a",
    "pcm_s16le",
    "-f",
    "null",
    "/dev/null",
  ]);
  for (const timestamp of timestamps) {
    const outputFrame = join(frames, `${file}-${timestamp}.png`);
    run("ffmpeg", [
      "-v",
      "error",
      "-y",
      "-ss",
      String(timestamp),
      "-i",
      path,
      "-frames:v",
      "1",
      outputFrame,
    ]);
    if (readFileSync(outputFrame).length < 100)
      throw new Error(`Frame extraction failed: ${outputFrame}`);
  }
  reports.push({
    file,
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    durationSeconds: Number(metadata.format.duration),
    width: video.width,
    height: video.height,
    fps: 30,
    videoCodec: video.codec_name,
    pixelFormat: video.pix_fmt,
    audioCodec: audio.codec_name,
    faststart: true,
    loudnessLUFS: Number(loudness.input_i),
    truePeakDb: Number(loudness.input_tp),
    silenceThresholdDb: Number(loudness.input_thresh),
    silentSegmentsAtLeastHalfSecond: 0,
    decodedWithoutError: true,
    extractedFrameTimes: timestamps,
  });
}
writeFileSync(
  join(root, "media-check.json"),
  JSON.stringify(
    { checkedAt: new Date().toISOString(), files: reports },
    null,
    2,
  ) + "\n",
);
console.log(JSON.stringify(reports, null, 2));
