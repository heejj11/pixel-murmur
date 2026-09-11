import {
  CanvasImage,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { RevealFrame } from "./RevealFrame";

export const SceneRing: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <RevealFrame>
      <Interactive.Div
        name="Opening question"
        style={{
          position: "absolute",
          left: 88,
          top: 422,
          width: 860,
          fontSize: 108,
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: -3,
        }}
      >
        전화 왔나?
      </Interactive.Div>
      <Interactive.Div
        name="Opening English"
        style={{
          position: "absolute",
          zIndex: 2,
          left: 92,
          top: 558,
          fontSize: 48,
          color: "#825239",
        }}
      >
        A call?
      </Interactive.Div>
      <CanvasImage
        name="Ringing phone concept"
        src={staticFile("pm013/01-hero-three-quarter.webp")}
        style={{
          position: "absolute",
          width: 1060,
          height: 925,
          left: -10,
          top: 570,
          objectFit: "contain",
          rotate: interpolate(
            frame,
            [0, 3, 6, 9, 12, 15, 18, 22, 27, 32, 36, 41],
            [
              "0deg",
              "-1deg",
              "1deg",
              "-1deg",
              "1deg",
              "-0.8deg",
              "0.8deg",
              "0deg",
              "-0.7deg",
              "0.7deg",
              "0deg",
              "0deg",
            ],
            { extrapolateRight: "clamp" },
          ),
        }}
      />
      <Interactive.Div
        name="Ringing cue"
        style={{
          position: "absolute",
          left: 120,
          top: 710,
          backgroundColor: "#e6bf77",
          color: "#332c20",
          padding: "13px 22px",
          borderRadius: 6,
          fontSize: 32,
          fontWeight: 750,
          rotate: "-7deg",
          opacity: interpolate(
            frame,
            [0, 5, 9, 14, 18, 24, 30, 41],
            [1, 1, 0.4, 1, 1, 0.5, 1, 1],
          ),
        }}
      >
        따르릉 · RING
      </Interactive.Div>
    </RevealFrame>
  );
};
