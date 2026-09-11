import { mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve, dirname } from "node:path";

// Original synthesis only: no external recordings, melodies or sound libraries.
const rate = 48000,
  seconds = 7,
  count = rate * seconds;
const left = new Float64Array(count),
  right = new Float64Array(count);
let seed = 130311;
const random = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return (seed / 4294967296) * 2 - 1;
};
const mix = (i, value, pan = 0) => {
  if (i < 0 || i >= count) return;
  left[i] += value * Math.sqrt((1 - pan) / 2);
  right[i] += value * Math.sqrt((1 + pan) / 2);
};
const tone = (at, duration, frequency, amplitude, decay = 3, pan = 0) => {
  for (let j = 0; j < duration * rate; j++) {
    const t = j / rate,
      env =
        Math.min(1, t / 0.008, (duration - t) / 0.04) * Math.exp(-t * decay);
    const wave =
      Math.sin(2 * Math.PI * frequency * t) +
      0.15 * Math.sin(2 * Math.PI * frequency * 2.001 * t);
    mix(Math.round(at * rate) + j, wave * Math.max(0, env) * amplitude, pan);
  }
};
// Light, continuous original accompaniment at 120 BPM.
for (let step = 0; step < 28; step++) {
  const at = step * 0.25,
    f = [196, 246.9417, 293.6648, 246.9417][step % 4];
  tone(
    at,
    Math.min(0.45, seconds - at),
    f,
    step % 2 ? 0.025 : 0.037,
    3,
    step % 2 ? 0.15 : -0.15,
  );
  if (step % 4 === 0) tone(at, 0.9, 98, 0.039, 1.8);
}
// A short double-bell pattern, stopped exactly at the reveal edit (1.4s).
for (const at of [0.04, 0.19, 0.34, 0.69, 0.84, 0.99]) {
  tone(at, Math.min(0.23, 1.4 - at), 870, 0.061, 5, -0.12);
  tone(at, Math.min(0.23, 1.4 - at), 1293, 0.038, 6, 0.12);
}
// Stylized paper/tape peel synced to the graphic wipe, not a prototype recording.
let smoothed = 0;
for (let j = 0; j < rate * 0.76; j++) {
  const t = j / rate,
    p = t / 0.76;
  smoothed = 0.66 * smoothed + 0.34 * random();
  mix(
    Math.round(1.4 * rate) + j,
    smoothed *
      Math.sin(Math.PI * p) ** 0.6 *
      (0.5 + 0.5 * Math.sin(2 * Math.PI * 33 * t)) *
      0.075,
    -0.12,
  );
}
for (const [at, f] of [
  [1.9, 523.251],
  [2.08, 659.255],
  [4.8, 391.995],
])
  tone(at, 0.42, f, 0.06, 4.5);
// Soft mechanical punctuation at the closing edit.
for (let j = 0; j < rate * 0.12; j++) {
  const t = j / rate;
  mix(
    Math.round(4.8 * rate) + j,
    (0.25 * random() + 0.5 * Math.sin(2 * Math.PI * 110 * t)) *
      Math.exp(-t * 50) *
      0.11,
  );
}
for (let i = 0; i < count; i++) {
  const t = i / rate,
    fade = Math.min(1, t / 0.012, (seconds - t) / 0.035);
  const bed =
    (Math.sin(2 * Math.PI * 98 * t) + 0.18 * Math.sin(2 * Math.PI * 196 * t)) *
    0.013;
  left[i] = (left[i] + bed) * fade;
  right[i] = (right[i] + bed) * fade;
}
let peak = 0;
for (let i = 0; i < count; i++)
  peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
const gain = 0.65 / peak,
  pcm = Buffer.alloc(count * 4);
let squares = 0;
for (let i = 0; i < count; i++) {
  const l = left[i] * gain,
    r = right[i] * gain;
  squares += l * l + r * r;
  pcm.writeInt16LE(Math.round(l * 32767), i * 4);
  pcm.writeInt16LE(Math.round(r * 32767), i * 4 + 2);
}
const h = Buffer.alloc(44);
h.write("RIFF");
h.writeUInt32LE(36 + pcm.length, 4);
h.write("WAVE", 8);
h.write("fmt ", 12);
h.writeUInt32LE(16, 16);
h.writeUInt16LE(1, 20);
h.writeUInt16LE(2, 22);
h.writeUInt32LE(rate, 24);
h.writeUInt32LE(rate * 4, 28);
h.writeUInt16LE(4, 32);
h.writeUInt16LE(16, 34);
h.write("data", 36);
h.writeUInt32LE(pcm.length, 40);
const file = resolve("public/pm013/audio/pm013-original-reveal-7s.wav"),
  wav = Buffer.concat([h, pcm]);
mkdirSync(dirname(file), { recursive: true });
writeFileSync(file, wav);
console.log(
  JSON.stringify(
    {
      file,
      durationSeconds: seconds,
      sampleRate: rate,
      channels: 2,
      peakDbfs: 20 * Math.log10(0.65),
      rmsDbfs: 20 * Math.log10(Math.sqrt(squares / (count * 2))),
      sha256: createHash("sha256").update(wav).digest("hex"),
    },
    null,
    2,
  ),
);
