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
      name="05 Closing"
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
          top: 88,
          left: 80,
          color: "#cfc5b9",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 23,
          fontWeight: 700,
          lineHeight: 1.25,
          letterSpacing: 1,
          opacity: interpolate(frame, [0, 9], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        CONCEPT RENDER · NOT YET PRODUCED
        <br />
        콘셉트 렌더 · 아직 제작되지 않음
      </Interactive.Div>

      <Interactive.Div
        name="Closing title"
        style={{
          position: "absolute",
          top: 240,
          left: 80,
          width: 920,
          fontSize: 94,
          fontWeight: 800,
          lineHeight: 1.03,
          letterSpacing: -4.8,
          opacity: interpolate(frame, [1, 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [1, 16], ["0px 30px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        어떤 색으로
        <br />
        만들어볼까요?
      </Interactive.Div>

      <Interactive.Div
        name="Closing question"
        style={{
          position: "absolute",
          top: 486,
          left: 82,
          width: 916,
          color: "#e77b49",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 34,
          fontWeight: 700,
          lineHeight: 1.18,
          letterSpacing: 0.2,
          opacity: interpolate(frame, [9, 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        WHICH COLOR SHOULD BECOME A PROTOTYPE?
      </Interactive.Div>

      <Interactive.Div
        name="Color lineup"
        style={{
          position: "absolute",
          top: 606,
          left: 80,
          width: 920,
          height: 920,
          overflow: "hidden",
          border: "2px solid #4d4740",
          borderRadius: 36,
          backgroundColor: "#eee8df",
          opacity: interpolate(frame, [13, 29], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [13, 42], [0.98, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        <CanvasImage
          name="Four color concepts"
          src={staticFile("pm019/08-color-lineup.webp")}
          style={{ width: 920, height: 920, objectFit: "cover" }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Color labels"
        style={{
          position: "absolute",
          top: 1575,
          left: 80,
          width: 920,
          color: "#cfc5b9",
          fontSize: 29,
          fontWeight: 650,
          lineHeight: 1.35,
          letterSpacing: -0.4,
          opacity: interpolate(frame, [21, 35], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        아이보리 · 올리브 · 뮤트 오렌지 · 차콜
        <br />
        IVORY · OLIVE · MUTED ORANGE · CHARCOAL
      </Interactive.Div>

      <Interactive.Div
        name="Closing brand"
        style={{
          position: "absolute",
          bottom: 82,
          left: 80,
          color: "#fffdf9",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 29,
          fontWeight: 700,
          letterSpacing: 2.3,
        }}
      >
        PIXELMURMUR · PM_019
      </Interactive.Div>
    </AbsoluteFill>
  );
};
