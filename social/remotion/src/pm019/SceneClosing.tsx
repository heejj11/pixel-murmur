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
      name="03 Color vote"
      style={{
        backgroundColor: "#171512",
        color: "#fffdf9",
        fontFamily:
          "IBM Plex Sans, Apple SD Gothic Neo, Noto Sans KR, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <Interactive.Div
        name="Brand"
        style={{
          position: "absolute",
          top: 72,
          left: 80,
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 25,
          fontWeight: 700,
          letterSpacing: 2.2,
        }}
      >
        PIXELMURMUR · PM_019
      </Interactive.Div>

      <Interactive.Div
        name="Scene counter"
        style={{
          position: "absolute",
          top: 74,
          right: 80,
          color: "#a49a8f",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 23,
          fontWeight: 600,
          letterSpacing: 1.6,
        }}
      >
        03 / 03
      </Interactive.Div>

      <Interactive.Div
        name="Concept disclosure"
        style={{
          position: "absolute",
          top: 142,
          left: 80,
          width: 920,
          color: "#a49a8f",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 20,
          fontWeight: 650,
          lineHeight: 1.25,
          letterSpacing: 0.2,
        }}
      >
        CONCEPT RENDER · 콘셉트 렌더 / NOT YET PRODUCED · 아직 제작되지 않음
      </Interactive.Div>

      <Interactive.Div
        name="Bilingual question"
        style={{
          position: "absolute",
          top: 232,
          left: 80,
          width: 920,
          opacity: interpolate(frame, [0, 9], [0.9, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [0, 11], ["0px 16px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: -2.8,
          }}
        >
          어떤 색을 만들까요?
        </div>
        <div
          style={{
            marginTop: 14,
            color: "#e77b49",
            fontFamily: "IBM Plex Mono, Menlo, monospace",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: -2.4,
          }}
        >
          WHICH COLOR SHOULD WE MAKE?
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Color lineup"
        style={{
          position: "absolute",
          top: 500,
          left: 80,
          width: 920,
          height: 900,
          overflow: "hidden",
          border: "2px solid #4d4740",
          borderRadius: 34,
          backgroundColor: "#eee8df",
          scale: interpolate(frame, [0, 36], [0.985, 1], {
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
          style={{ width: 920, height: 900, objectFit: "contain" }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Bilingual color labels"
        style={{
          position: "absolute",
          top: 1450,
          left: 80,
          width: 920,
          color: "#cfc5b9",
          fontSize: 30,
          fontWeight: 650,
          lineHeight: 1.35,
          letterSpacing: -0.4,
        }}
      >
        <div>아이보리 · 올리브 · 뮤트 오렌지 · 차콜</div>
        <div
          style={{
            marginTop: 8,
            fontFamily: "IBM Plex Mono, Menlo, monospace",
            fontSize: 30,
            fontWeight: 650,
          }}
        >
          IVORY · OLIVE · MUTED ORANGE · CHARCOAL
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Bilingual call to action"
        style={{
          position: "absolute",
          top: 1570,
          left: 80,
          width: 920,
          color: "#fffdf9",
          fontSize: 34,
          fontWeight: 750,
          lineHeight: 1.28,
        }}
      >
        <div>댓글로 하나를 골라주세요.</div>
        <div
          style={{
            marginTop: 6,
            fontFamily: "IBM Plex Mono, Menlo, monospace",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          PICK ONE IN THE COMMENTS.
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Project mark"
        style={{
          position: "absolute",
          bottom: 88,
          left: 80,
          color: "#a49a8f",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 21,
          fontWeight: 650,
          letterSpacing: 0.8,
        }}
      >
        JUST A PIXEL · 아직은 픽셀입니다
      </Interactive.Div>
    </AbsoluteFill>
  );
};
