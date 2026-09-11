# PM-013 Instagram reveal v03 QA — 2026-09-11

## Editorial and visual

- Feed: unchanged 1080×1350 v02 card, original 4:5; full title, product and bilingual disclosure checked in published post. Bilingual caption, ALT and AI label confirmed.
- Reel: 1080×1920, 30 fps, 210 frames / exactly 7.000s. Ring (0–1.4s), tape reveal (1.4–4.8s), wish (4.8–7s).
- Still renders and graphic movement only; no claim of a fabricated working prototype or proven cutting mechanism. AI/unproduced disclosure remains visible; caption explicitly explains edited still renders.
- Inspected cover and frames 0, 70 and 145: no headline/product overlap or cutoff. Cover main headline, product and disclosure fit the center square; small top brand is outside the square, intentionally nonessential.
- Remotion Studio played through scene changes with sound enabled, visible playback progress and no error overlay. Visual inspection does not constitute subjective listening to the generated audio.
- Instagram preflight: 9:16, custom cover applied, full 0–7s range, sound switch 1, AI switch 1, bilingual caption 247/2200.

## Technical

- `npm run lint`: passed (twice, including after formatting).
- Full ffmpeg decode: 210 frames, exit 0; H.264 High, full-range 4:2:0 (`ffprobe`: yuvj420p), stereo AAC 48kHz, 676134 bytes, MP4 faststart.
- Final audio: integrated -15.22 LUFS, true peak -3.74 dBTP, loudness range 2.00 LU. No clipping detected by peak measurement.
- Adaptive silence check at -25.22dB, minimum 0.5s: no silence events. Black-frame check at minimum 0.1s: no events.
- Original synthesized tone bed, bell, peel-like noise and punctuation. No external recording, music or sample used. This provenance does not guarantee platform copyright classification.
- MP4 SHA256: `d5ec02e0793f2dbd05874ecc652b35c634aa2e25d9a6d187d848e3c9d96dfc26`.
- Cover SHA256: `912d43b3e6d48b73d9cc44cee123d1f3f1164bf6d40689866bb1ff6ff017ac9a`.
- Original WAV SHA256: `c77dc4595bc45580a89d588015c3c06a4b2dad18ed692905ffa14a8f8663a1ca`.

## Build notes

Initial sandboxed renderer and preview bind failed due local process restrictions. Authorized escalated render succeeded; preview served at localhost:3113. No dependency installation or account security changes.

Live publication QA is recorded in `launch-record.md` and `status.json`. The published profile grid was scrolled to show the entire first row: the new Reel cover and feed preserve their headlines, product and bilingual disclosure without cutoff. The previous v02 Reel remains alongside them.
