import { resolve } from "node:path";
import { ALL_FORMATS, FilePathSource, Input } from "mediabunny";

const paths = process.argv.slice(2);

if (paths.length === 0) {
  throw new Error("Pass at least one video path.");
}

for (const path of paths) {
  const absolutePath = resolve(path);
  const input = new Input({
    formats: ALL_FORMATS,
    source: new FilePathSource(absolutePath),
  });
  const videoTrack = await input.getPrimaryVideoTrack();

  if (!videoTrack) {
    throw new Error(`No video track found in ${absolutePath}`);
  }

  const audioTrack = await input.getPrimaryAudioTrack();
  const duration = await input.computeDuration();
  const frameRate = await videoTrack.computeFrameRateMetrics();

  console.log(
    JSON.stringify({
      file: absolutePath,
      durationSeconds: duration,
      width: videoTrack.displayWidth,
      height: videoTrack.displayHeight,
      frameRate: frameRate.bestGuessFrameRate,
      hasAudio: Boolean(audioTrack),
    }),
  );

  input.dispose();
}
