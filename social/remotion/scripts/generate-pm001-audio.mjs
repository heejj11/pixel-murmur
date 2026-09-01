import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const sampleRate = 48_000;

const createRandom = (seed) => {
  let state = seed >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
};

const equalPowerPan = (pan) => {
  const position = ((pan + 1) * Math.PI) / 4;
  return [Math.cos(position), Math.sin(position)];
};

const makeTrack = ({ durationSeconds, seed, events }) => {
  const sampleCount = Math.round(durationSeconds * sampleRate);
  const left = new Float64Array(sampleCount);
  const right = new Float64Array(sampleCount);
  const random = createRandom(seed);

  const mix = (index, value, pan = 0) => {
    if (index < 0 || index >= sampleCount) {
      return;
    }

    const [leftGain, rightGain] = equalPowerPan(pan);
    left[index] += value * leftGain;
    right[index] += value * rightGain;
  };

  const addBlip = ({ at, frequency, pan = 0, amplitude = 0.12 }) => {
    const start = Math.round(at * sampleRate);
    const length = Math.round(0.18 * sampleRate);

    for (let i = 0; i < length; i += 1) {
      const t = i / sampleRate;
      const attack = Math.min(1, t / 0.008);
      const decay = Math.exp(-t * 20);
      const shimmer =
        Math.sin(2 * Math.PI * frequency * t) +
        0.28 * Math.sin(2 * Math.PI * frequency * 2.013 * t + 0.37);
      mix(start + i, shimmer * attack * decay * amplitude, pan);
    }
  };

  const addClick = ({ at, pan = 0, amplitude = 0.11 }) => {
    const start = Math.round(at * sampleRate);
    const length = Math.round(0.075 * sampleRate);
    let previousNoise = 0;

    for (let i = 0; i < length; i += 1) {
      const t = i / sampleRate;
      const noise = random() * 2 - 1;
      const highPassedNoise = noise - previousNoise * 0.92;
      previousNoise = noise;
      const snap = highPassedNoise * Math.exp(-t * 92);
      const body = Math.sin(2 * Math.PI * 78 * t) * Math.exp(-t * 38);
      mix(start + i, (snap * 0.72 + body * 0.48) * amplitude, pan);
    }
  };

  const addServo = ({ at, duration, from, to, pan = 0, amplitude = 0.065 }) => {
    const start = Math.round(at * sampleRate);
    const length = Math.round(duration * sampleRate);
    let phase = 0;

    for (let i = 0; i < length; i += 1) {
      const progress = i / Math.max(1, length - 1);
      const frequency = from + (to - from) * progress;
      phase += (2 * Math.PI * frequency) / sampleRate;
      const envelope = Math.sin(Math.PI * progress) ** 1.6;
      const value =
        (Math.sin(phase) + 0.22 * Math.sin(phase * 2.03 + 0.6)) *
        envelope *
        amplitude;
      mix(start + i, value, pan);
    }
  };

  // A quiet, non-melodic electrical bed. Frequencies are intentionally not a
  // conventional chord or scale; every other audible event is synthesized below.
  for (let i = 0; i < sampleCount; i += 1) {
    const t = i / sampleRate;
    const fadeIn = Math.min(1, t / 0.12);
    const fadeOut = Math.min(1, (durationSeconds - t) / 0.16);
    const envelope = Math.max(0, Math.min(fadeIn, fadeOut));
    const lfo = 0.76 + 0.24 * Math.sin(2 * Math.PI * 0.19 * t + 0.4);
    const leftBed =
      Math.sin(2 * Math.PI * 73.4 * t) +
      0.33 * Math.sin(2 * Math.PI * 146.1 * t + 0.31);
    const rightBed =
      Math.sin(2 * Math.PI * 73.4 * t + 0.025) +
      0.33 * Math.sin(2 * Math.PI * 146.1 * t + 0.36);
    left[i] += leftBed * 0.034 * lfo * envelope;
    right[i] += rightBed * 0.034 * lfo * envelope;
  }

  for (const event of events) {
    if (event.type === "blip") addBlip(event);
    if (event.type === "click") addClick(event);
    if (event.type === "servo") addServo(event);
  }

  let rawPeak = 0;
  for (let i = 0; i < sampleCount; i += 1) {
    rawPeak = Math.max(rawPeak, Math.abs(left[i]), Math.abs(right[i]));
  }

  const targetPeak = 0.7;
  const gain = rawPeak === 0 ? 1 : targetPeak / rawPeak;
  const pcm = Buffer.alloc(sampleCount * 4);
  let sumOfSquares = 0;

  for (let i = 0; i < sampleCount; i += 1) {
    const leftSample = Math.max(-1, Math.min(1, left[i] * gain));
    const rightSample = Math.max(-1, Math.min(1, right[i] * gain));
    sumOfSquares += leftSample ** 2 + rightSample ** 2;
    pcm.writeInt16LE(Math.round(leftSample * 32_767), i * 4);
    pcm.writeInt16LE(Math.round(rightSample * 32_767), i * 4 + 2);
  }

  const rms = Math.sqrt(sumOfSquares / (sampleCount * 2));
  return {
    pcm,
    peakDbfs: 20 * Math.log10(targetPeak),
    rmsDbfs: 20 * Math.log10(rms),
  };
};

const writeWave = ({ outputPath, durationSeconds, seed, events }) => {
  const { pcm, peakDbfs, rmsDbfs } = makeTrack({
    durationSeconds,
    seed,
    events,
  });
  const header = Buffer.alloc(44);
  const bytesPerSecond = sampleRate * 2 * 2;

  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(2, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(bytesPerSecond, 28);
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
    sampleRate,
    channels: 2,
    peakDbfs: Number(peakDbfs.toFixed(2)),
    rmsDbfs: Number(rmsDbfs.toFixed(2)),
    bytes: wave.length,
    sha256: createHash("sha256").update(wave).digest("hex"),
  };
};

const reelEvents = [
  { type: "blip", at: 0.12, frequency: 436, pan: -0.22, amplitude: 0.13 },
  { type: "click", at: 1.22, pan: 0.14, amplitude: 0.13 },
  { type: "blip", at: 1.34, frequency: 521, pan: 0.2, amplitude: 0.1 },
  { type: "servo", at: 3.48, duration: 0.66, from: 174, to: 317, pan: -0.18 },
  { type: "click", at: 4.16, pan: -0.08, amplitude: 0.12 },
  { type: "blip", at: 5.46, frequency: 389, pan: 0.24, amplitude: 0.09 },
  { type: "click", at: 6.48, pan: -0.2, amplitude: 0.11 },
  { type: "blip", at: 6.62, frequency: 617, pan: 0.18, amplitude: 0.1 },
  { type: "blip", at: 8.18, frequency: 472, pan: -0.16, amplitude: 0.085 },
  { type: "click", at: 9.02, pan: 0.2, amplitude: 0.105 },
  { type: "servo", at: 9.18, duration: 0.48, from: 286, to: 143, pan: 0.12, amplitude: 0.05 },
  { type: "blip", at: 10.52, frequency: 347, pan: 0, amplitude: 0.075 },
];

const loopEvents = [
  { type: "click", at: 0.16, pan: -0.14, amplitude: 0.11 },
  { type: "blip", at: 0.3, frequency: 436, pan: 0.18, amplitude: 0.09 },
  { type: "servo", at: 2.02, duration: 0.72, from: 171, to: 309, pan: -0.18 },
  { type: "click", at: 2.78, pan: -0.05, amplitude: 0.12 },
  { type: "blip", at: 3.18, frequency: 521, pan: 0.2, amplitude: 0.09 },
  { type: "servo", at: 4.04, duration: 0.66, from: 301, to: 162, pan: 0.16 },
  { type: "click", at: 4.74, pan: 0.12, amplitude: 0.115 },
  { type: "blip", at: 5.18, frequency: 389, pan: -0.16, amplitude: 0.07 },
];

const outputs = [
  writeWave({
    outputPath: "public/pm001/audio/pm001-original-bed-12s.wav",
    durationSeconds: 12,
    seed: 10_010_012,
    events: reelEvents,
  }),
  writeWave({
    outputPath: "public/pm001/audio/pm001-original-loop-6s.wav",
    durationSeconds: 6,
    seed: 10_010_006,
    events: loopEvents,
  }),
];

console.log(JSON.stringify(outputs, null, 2));
