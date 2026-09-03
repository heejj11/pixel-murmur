import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const sampleRate = 48_000;

const seededRandom = (seed) => {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
};

const createTrack = ({ durationSeconds, seed, accents }) => {
  const sampleCount = Math.round(durationSeconds * sampleRate);
  const left = new Float64Array(sampleCount);
  const right = new Float64Array(sampleCount);
  const random = seededRandom(seed);

  const mix = (index, value, pan = 0) => {
    if (index < 0 || index >= sampleCount) return;
    const angle = ((pan + 1) * Math.PI) / 4;
    left[index] += value * Math.cos(angle);
    right[index] += value * Math.sin(angle);
  };

  const tone = ({ at, duration, frequency, amplitude, pan = 0 }) => {
    const start = Math.round(at * sampleRate);
    const length = Math.round(duration * sampleRate);
    for (let i = 0; i < length; i += 1) {
      const time = i / sampleRate;
      const attack = Math.min(1, time / 0.018);
      const release = Math.min(1, (duration - time) / 0.08);
      const envelope = Math.max(0, Math.min(attack, release));
      const sound =
        Math.sin(2 * Math.PI * frequency * time) +
        0.22 * Math.sin(2 * Math.PI * frequency * 2.01 * time + 0.3);
      mix(start + i, sound * envelope * amplitude, pan);
    }
  };

  const click = ({ at, amplitude = 0.075, pan = 0 }) => {
    const start = Math.round(at * sampleRate);
    const length = Math.round(0.065 * sampleRate);
    let previous = 0;
    for (let i = 0; i < length; i += 1) {
      const time = i / sampleRate;
      const noise = random() * 2 - 1;
      const bright = noise - previous * 0.88;
      previous = noise;
      const body = Math.sin(2 * Math.PI * 124 * time) * Math.exp(-time * 42);
      mix(start + i, (bright * 0.72 + body * 0.28) * Math.exp(-time * 78) * amplitude, pan);
    }
  };

  const crank = ({ at, duration, pan = 0.2, amplitude = 0.052 }) => {
    const start = Math.round(at * sampleRate);
    const length = Math.round(duration * sampleRate);
    let phase = 0;
    for (let i = 0; i < length; i += 1) {
      const progress = i / Math.max(1, length - 1);
      const time = i / sampleRate;
      const envelope = Math.sin(Math.PI * progress) ** 1.4;
      const frequency = 92 + 22 * Math.sin(2 * Math.PI * 4.4 * time);
      phase += (2 * Math.PI * frequency) / sampleRate;
      const grit = (random() * 2 - 1) * 0.18;
      mix(start + i, (Math.sin(phase) + grit) * envelope * amplitude, pan);
    }
  };

  // Original 118 BPM retro-mechanical bed. It runs for the full duration.
  const beat = 60 / 118;
  const roots = [110, 130.81, 98, 146.83];
  const notes = [2, 2.5, 3, 4, 3, 2.5, 2.25, 3.5];
  for (let at = 0, step = 0; at < durationSeconds; at += beat / 2, step += 1) {
    const root = roots[Math.floor(step / 8) % roots.length];
    tone({
      at,
      duration: Math.min(beat * 0.43, durationSeconds - at),
      frequency: root * notes[step % notes.length],
      amplitude: step % 4 === 0 ? 0.052 : 0.037,
      pan: step % 2 === 0 ? -0.24 : 0.24,
    });
    if (step % 2 === 0) {
      tone({
        at,
        duration: Math.min(beat * 0.88, durationSeconds - at),
        frequency: root,
        amplitude: 0.045,
      });
    }
    click({
      at: at + beat / 4,
      amplitude: step % 4 === 3 ? 0.052 : 0.031,
      pan: step % 2 === 0 ? 0.28 : -0.28,
    });
  }

  // A quiet projector-like motor tone prevents empty gaps between notes.
  for (let i = 0; i < sampleCount; i += 1) {
    const time = i / sampleRate;
    const fadeIn = Math.min(1, time / 0.03);
    const fadeOut = Math.min(1, (durationSeconds - time) / 0.05);
    const envelope = Math.max(0, Math.min(fadeIn, fadeOut));
    const wobble = 0.78 + 0.22 * Math.sin(2 * Math.PI * 0.31 * time);
    left[i] +=
      (Math.sin(2 * Math.PI * 55 * time) +
        0.24 * Math.sin(2 * Math.PI * 110.3 * time + 0.18)) *
      0.017 *
      wobble *
      envelope;
    right[i] +=
      (Math.sin(2 * Math.PI * 55 * time + 0.03) +
        0.24 * Math.sin(2 * Math.PI * 109.8 * time + 0.24)) *
      0.017 *
      wobble *
      envelope;
  }

  for (const accent of accents) {
    if (accent.type === "click") click(accent);
    if (accent.type === "crank") crank(accent);
    if (accent.type === "tone") tone(accent);
  }

  let peak = 0;
  for (let i = 0; i < sampleCount; i += 1) {
    peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
  }
  const targetPeak = 0.68;
  const gain = peak === 0 ? 1 : targetPeak / peak;
  const pcm = Buffer.alloc(sampleCount * 4);
  let sumOfSquares = 0;
  for (let i = 0; i < sampleCount; i += 1) {
    const leftSample = Math.max(-1, Math.min(1, left[i] * gain));
    const rightSample = Math.max(-1, Math.min(1, right[i] * gain));
    sumOfSquares += leftSample ** 2 + rightSample ** 2;
    pcm.writeInt16LE(Math.round(leftSample * 32_767), i * 4);
    pcm.writeInt16LE(Math.round(rightSample * 32_767), i * 4 + 2);
  }

  return {
    pcm,
    peakDbfs: 20 * Math.log10(targetPeak),
    rmsDbfs: 20 * Math.log10(Math.sqrt(sumOfSquares / (sampleCount * 2))),
  };
};

const writeWave = ({ outputPath, durationSeconds, seed, accents }) => {
  const { pcm, peakDbfs, rmsDbfs } = createTrack({ durationSeconds, seed, accents });
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(2, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 4, 28);
  header.writeUInt16LE(4, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);

  const wave = Buffer.concat([header, pcm]);
  const absolutePath = resolve(outputPath);
  mkdirSync(dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, wave);
  return {
    file: absolutePath,
    durationSeconds,
    peakDbfs: Number(peakDbfs.toFixed(2)),
    rmsDbfs: Number(rmsDbfs.toFixed(2)),
    sha256: createHash("sha256").update(wave).digest("hex"),
  };
};

const reelAccents = [
  { type: "click", at: 0.12, amplitude: 0.12, pan: -0.2 },
  { type: "crank", at: 1.65, duration: 1.45, pan: 0.22 },
  { type: "click", at: 4.35, amplitude: 0.11, pan: 0.12 },
  { type: "crank", at: 4.5, duration: 1.35, pan: -0.14, amplitude: 0.045 },
  { type: "click", at: 7.0, amplitude: 0.1, pan: -0.24 },
  { type: "tone", at: 9.08, duration: 0.55, frequency: 523.25, amplitude: 0.055 },
  { type: "tone", at: 9.62, duration: 0.55, frequency: 659.25, amplitude: 0.052 },
];

const loopAccents = [
  { type: "click", at: 0.1, amplitude: 0.11, pan: -0.2 },
  { type: "crank", at: 1.82, duration: 1.6, pan: 0.22 },
  { type: "click", at: 3.55, amplitude: 0.095, pan: 0.15 },
  { type: "tone", at: 4.6, duration: 0.55, frequency: 523.25, amplitude: 0.05 },
];

console.log(
  JSON.stringify(
    [
      writeWave({
        outputPath: "public/pm019/audio/pm019-original-music-12s.wav",
        durationSeconds: 12,
        seed: 19_012,
        accents: reelAccents,
      }),
      writeWave({
        outputPath: "public/pm019/audio/pm019-original-music-loop-6s.wav",
        durationSeconds: 6,
        seed: 19_006,
        accents: loopAccents,
      }),
    ],
    null,
    2,
  ),
);
