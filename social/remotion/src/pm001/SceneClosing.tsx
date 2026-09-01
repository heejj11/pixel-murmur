import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const SceneClosing: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="07 Closing"
      style={{
        backgroundColor: "#171512",
        color: "#fffdf9",
        fontFamily:
          "IBM Plex Sans, Apple SD Gothic Neo, Noto Sans KR, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <Interactive.Div
        name="Concept disclosure"
        style={{
          position: "absolute",
          top: 92,
          left: 80,
          color: "#d8cfc4",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 1.4,
          opacity: interpolate(frame, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        CONCEPT RENDER · NOT YET PRODUCED
        <br />
        <span
          style={{
            fontFamily:
              "IBM Plex Sans, Apple SD Gothic Neo, Noto Sans KR, Arial, sans-serif",
            fontSize: 22,
            letterSpacing: -0.3,
          }}
        >
          콘셉트 렌더 · 아직 제작되지 않음
        </span>
      </Interactive.Div>

      <Interactive.Div
        name="Closing title"
        style={{
          position: "absolute",
          top: 252,
          left: 80,
          width: 920,
          fontSize: 108,
          fontWeight: 800,
          lineHeight: 1.02,
          letterSpacing: -5.5,
          opacity: interpolate(frame, [2, 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [2, 18], ["0px 34px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        지금은
        <br />
        픽셀입니다.
      </Interactive.Div>

      <Interactive.Div
        name="Closing question"
        style={{
          position: "absolute",
          top: 560,
          left: 80,
          width: 920,
          color: "#d9a15e",
          fontSize: 54,
          fontWeight: 700,
          lineHeight: 1.24,
          letterSpacing: -1.8,
          opacity: interpolate(frame, [12, 27], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        객체가 될 가치가 있을까요?
        <br />
        <span
          style={{
            color: "#b7afa5",
            fontFamily: "IBM Plex Mono, Menlo, monospace",
            fontSize: 38,
            letterSpacing: 0,
          }}
        >
          IS THIS PIXEL WORTH BECOMING AN OBJECT?
        </span>
      </Interactive.Div>

      <Interactive.Div
        name="Closing product card"
        style={{
          position: "absolute",
          top: 820,
          left: 80,
          width: 920,
          height: 720,
          overflow: "hidden",
          border: "2px solid #4c4741",
          borderRadius: 36,
          backgroundColor: "#eee6dc",
          opacity: interpolate(frame, [18, 34], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [18, 52], [0.98, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        <CanvasImage
          name="Closing product image"
          src={staticFile("pm001/01-hero-inserted.webp")}
          style={{ width: 920, height: 720, objectFit: "cover" }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Closing brand"
        style={{
          position: "absolute",
          bottom: 92,
          left: 80,
          color: "#fffdf9",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 2.5,
        }}
      >
        PIXELMURMUR · PM_001
      </Interactive.Div>
    </AbsoluteFill>
  );
};
