import {
  CanvasImage,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { RevealFrame } from "./RevealFrame";

export const SceneTape: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <RevealFrame>
      <Interactive.Div
        name="Not the call"
        style={{
          position: "absolute",
          left: 88,
          top: 373,
          width: 880,
          fontSize: 85,
          fontWeight: 800,
          letterSpacing: -2.5,
        }}
      >
        끊고 싶은 건
      </Interactive.Div>
      <Interactive.Div
        name="The setup"
        style={{
          position: "absolute",
          left: 88,
          top: 470,
          fontSize: 102,
          fontWeight: 800,
          letterSpacing: -3,
        }}
      >
        통화 말고,
      </Interactive.Div>
      <Interactive.Div
        name="Tape punchline"
        style={{
          position: "absolute",
          left: 557,
          top: 470,
          fontSize: 102,
          fontWeight: 800,
          letterSpacing: -3,
          color: "#a1562f",
          opacity: interpolate(frame, [0, 14, 15, 101], [0, 0, 1, 1], {
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [14, 19, 25],
            ["0px 15px", "0px -3px", "0px 0px"],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      >
        테이프.
      </Interactive.Div>
      <Interactive.Div
        name="Punchline English"
        style={{
          position: "absolute",
          left: 92,
          top: 612,
          fontSize: 44,
          color: "#825239",
          opacity: interpolate(frame, [0, 14, 15], [0, 0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Not the call. The tape.
      </Interactive.Div>
      <CanvasImage
        name="Unexpected tape reveal"
        src={staticFile("pm013/04-manual-pull.webp")}
        style={{
          position: "absolute",
          left: 65,
          top: 713,
          width: 940,
          height: 698,
          objectFit: "contain",
          opacity: interpolate(frame, [0, 2], [0.3, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />
      <Interactive.Div
        name="Graphic reveal wipe"
        style={{
          position: "absolute",
          left: 64,
          top: 713,
          width: 942,
          height: 700,
          backgroundColor: "#ddb779",
          translate: interpolate(frame, [0, 8], ["0px 0px", "1050px 0px"], {
            extrapolateRight: "clamp",
          }),
        }}
      />
    </RevealFrame>
  );
};
