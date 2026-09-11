import { CanvasImage, Interactive, staticFile } from "remotion";
import { RevealFrame } from "./RevealFrame";

export const SceneWish: React.FC = () => (
  <RevealFrame>
    <Interactive.Div
      name="Closing thought"
      style={{
        position: "absolute",
        left: 88,
        top: 385,
        width: 880,
        fontSize: 91,
        fontWeight: 800,
        lineHeight: 1.12,
        letterSpacing: -2.8,
      }}
    >
      이런 전화기,
      <br />
      있으면 좋겠다.
    </Interactive.Div>
    <Interactive.Div
      name="Closing English"
      style={{
        position: "absolute",
        left: 92,
        top: 623,
        fontSize: 44,
        color: "#825239",
      }}
    >
      Wish this phone existed.
    </Interactive.Div>
    <CanvasImage
      name="Full concept at ending"
      src={staticFile("pm013/01-hero-three-quarter.webp")}
      style={{
        position: "absolute",
        left: 78,
        top: 713,
        width: 910,
        height: 700,
        objectFit: "contain",
      }}
    />
  </RevealFrame>
);
