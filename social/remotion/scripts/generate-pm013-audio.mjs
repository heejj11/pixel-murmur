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

const createTrack = ({ durationSeconds, seed, cutAt, revealAt }) => {
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

  const tone = ({ at, duration, frequency, amplitude, pan = 0, decay = 3 }) => {
    const start = Math.round(at * sampleRate);
    const length = Math.round(duration * sampleRate);
    for (let i = 0; i < length; i += 1) {
      const time = i / sampleRate;
      const attack = Math.min(1, time / 0.012);
      const release = Math.min(1, (duration - time) / 0.055);
      const envelope = Math.max(0, Math.min(attack, release)) * Math.exp(-time * decay);
      const sound =
        Math.sin(2 * Math.PI * frequency * time) +
        0.24 * Math.sin(2 * Math.PI * frequency * 2.002 * time + 0.24);
      mix(start + i, sound * envelope * amplitude, pan);
    }
  };

  const knock = ({ at, amplitude = 0.13, pan = 0 }) => {
    const start = Math.round(at * sampleRate);
    const length = Math.round(0.12 * sampleRate);
    let previous = 0;
    for (let i = 0; i < length; i += 1) {
      const time = i / sampleRate;
      const noise = random() * 2 - 1;
      const bright = noise - previous * 0.82;
      previous = noise;
      const body = Math.sin(2 * Math.PI * 102 * time) * Math.exp(-time * 32);
      mix(start + i, (bright * 0.42 + body * 0.58) * Math.exp(-time * 48) * amplitude, pan);
    }
  };

  const tapePull = ({ at, duration, amplitude = 0.05 }) => {
    const start = Math.round(at * sampleRate);
    const length = Math.round(duration * sampleRate);
    let previous = 0;
    for (let i = 0; i < length; i += 1) {
      const progress = i / Math.max(1, length - 1);
      const envelope = Math.sin(Math.PI * progress) ** 0.65;
      const noise = random() * 2 - 1;
      const smooth = previous * 0.76 + noise * 0.24;
      previous = smooth;
      const rib = 0.65 + 0.35 * Math.sin(2 * Math.PI * (15 + progress * 8) * (i / sampleRate));
      mix(start + i, smooth * rib * envelope * amplitude, -0.12 + progress * 0.24);
    }
  };

  const bell = ({ at, frequency, pan }) => {
    tone({ at, duration: 0.42, frequency, amplitude: 0.072, pan, decay: 2.8 });
    tone({ at, duration: 0.42, frequency: frequency * 1.507, amplitude: 0.036, pan: -pan, decay: 3.4 });
  };

  // A continuous 112 BPM warm mechanical bed; every sound is generated here.
  const beat = 60 / 112;
  const roots = [98, 116.54, 130.81, 110];
  for (let at = 0, step = 0; at < durationSeconds; at += beat / 2, step += 1) {
    const root = roots[Math.floor(step / 8) % roots.length];
    tone({
      at,
      duration: Math.min(beat * 0.7, durationSeconds - at),
      frequency: root * (step % 4 === 2 ? 2.5 : 2),
      amplitude: step % 4 === 0 ? 0.046 : 0.028,
      pan: step % 2 === 0 ? -0.2 : 0.2,
      decay: 2.2,
    });
    if (step % 2 === 0) {
      tone({ at, duration: Math.min(beat, durationSeconds - at), frequency: root, amplitude: 0.042, decay: 1.8 });
    }
  }

  for (let i = 0; i < sampleCount; i += 1) {
    const time = i / sampleRate;
    const fade = Math.max(0, Math.min(1, time / 0.035, (durationSeconds - time) / 0.06));
    const hum =
      Math.sin(2 * Math.PI * 49 * time) +
      0.3 * Math.sin(2 * Math.PI * 98.2 * time + 0.18);
    left[i] += hum * 0.014 * fade;
    right[i] += hum * 0.0135 * fade;
  }

  bell({ at: 0.08, frequency: 392, pan: -0.18 });
  bell({ at: 0.3, frequency: 493.88, pan: 0.18 });
  tapePull({ at: 0.55, duration: Math.max(0.8, cutAt - 0.82) });
  knock({ at: cutAt, amplitude: 0.16, pan: 0.08 });
  knock({ at: cutAt + 0.08, amplitude: 0.1, pan: -0.08 });
  bell({ at: revealAt, frequency: 523.25, pan: -0.12 });
  bell({ at: revealAt + 0.22, frequency: 659.25, pan: 0.12 });

  let peak = 0;
  for (let i = 0; i < sampleCount; i += 1) {
    peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
  }
  const targetPeak = 0.7;
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

const writeWave = ({ outputPath, durationSeconds, seed, cutAt, revealAt }) => {
  const { pcm, peakDbfs, rmsDbfs } = createTrack({ durationSeconds, seed, cutAt, revealAt });
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

console.log(
  JSON.stringify(
    [
      writeWave({
        outputPath: "public/pm013/audio/pm013-original-mechanical-9s.wav",
        durationSeconds: 9,
        seed: 13_009,
        cutAt: 3.22,
        revealAt: 5.82,
      }),
      writeWave({
        outputPath: "public/pm013/audio/pm013-original-mechanical-6s.wav",
        durationSeconds: 6,
        seed: 13_006,
        cutAt: 2.42,
        revealAt: 4.02,
      }),
    ],
    null,
    2,
  ),
);
