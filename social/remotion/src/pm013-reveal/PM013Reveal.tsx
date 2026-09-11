import { Audio } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill, CanvasImage, Interactive, staticFile } from "remotion";
import { SceneRing } from "./SceneRing";
import { SceneTape } from "./SceneTape";
import { SceneWish } from "./SceneWish";

export const PM013RevealReel: React.FC = () => (
  <>
    <TransitionSeries>
      <TransitionSeries.Sequence
        durationInFrames={42}
        name="01 The phone rings"
      >
        <SceneRing />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        durationInFrames={102}
        name="02 Not the call, the tape"
      >
        <SceneTape />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        durationInFrames={66}
        name="03 Wish it existed"
      >
        <SceneWish />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <Audio
      src={staticFile("pm013/audio/pm013-original-reveal-7s.wav")}
      volume={1}
    />
  </>
);

export const PM013RevealCover: React.FC = () => (
  <AbsoluteFill
    name="PM013 reveal cover"
    style={{
      backgroundColor: "#f1e9df",
      color: "#28271f",
      fontFamily: "Apple SD Gothic Neo, Noto Sans KR, Arial, sans-serif",
    }}
  >
    <Interactive.Div
      name="Cover brand"
      style={{
        position: "absolute",
        left: 88,
        top: 345,
        fontSize: 30,
        fontWeight: 700,
      }}
    >
      pixelmurmur. · PM—013
    </Interactive.Div>
    <Interactive.Div
      name="Cover headline"
      style={{
        position: "absolute",
        left: 88,
        top: 438,
        fontSize: 99,
        fontWeight: 800,
        lineHeight: 1.08,
        letterSpacing: -3,
      }}
    >
      통화 말고,
      <br />
      테이프.
    </Interactive.Div>
    <Interactive.Div
      name="Cover English"
      style={{
        position: "absolute",
        left: 92,
        top: 671,
        fontSize: 44,
        color: "#825239",
      }}
    >
      Not the call. The tape.
    </Interactive.Div>
    <CanvasImage
      name="Cover object"
      src={staticFile("pm013/04-manual-pull.webp")}
      style={{
        position: "absolute",
        left: 88,
        top: 763,
        width: 874,
        height: 610,
        objectFit: "contain",
      }}
    />
    <Interactive.Div
      name="Cover disclosure"
      style={{
        position: "absolute",
        left: 88,
        top: 1421,
        fontSize: 26,
        lineHeight: 1.32,
        color: "#665c50",
      }}
    >
      <div>AI 콘셉트 렌더 · 아직 제작되지 않음</div>
      <div>CONCEPT RENDER · NOT YET PRODUCED</div>
    </Interactive.Div>
  </AbsoluteFill>
);
