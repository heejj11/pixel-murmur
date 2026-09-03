import { AbsoluteFill, CanvasImage, Interactive, staticFile } from "remotion";

export const PM019GridSafeCover: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#171512",
        color: "#fffdf9",
        fontFamily:
          "IBM Plex Sans, Apple SD Gothic Neo, Noto Sans KR, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <Interactive.Div
        name="Grid-safe content"
        style={{
          position: "absolute",
          top: 330,
          left: 120,
          width: 840,
          height: 1260,
        }}
      >
        <div
          style={{
            fontFamily: "IBM Plex Mono, Menlo, monospace",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          PIXELMURMUR · PM_019
        </div>
        <div
          style={{
            marginTop: 58,
            fontSize: 78,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: -4,
          }}
        >
          영사기인 줄 알았는데,
          <br />
          연필깎이입니다.
        </div>
        <div
          style={{
            marginTop: 24,
            color: "#e77b49",
            fontFamily: "IBM Plex Mono, Menlo, monospace",
            fontSize: 29,
            fontWeight: 700,
            lineHeight: 1.18,
          }}
        >
          IT LOOKS LIKE A PROJECTOR.
          <br />
          IT SHARPENS PENCILS.
        </div>
        <div
          style={{
            marginTop: 54,
            width: 840,
            height: 710,
            overflow: "hidden",
            border: "2px solid #4d4740",
            borderRadius: 34,
            backgroundColor: "#eee8df",
          }}
        >
          <CanvasImage
            name="Projector sharpener cover image"
            src={staticFile("pm019/01-hero.webp")}
            style={{ width: 840, height: 710, objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            marginTop: 31,
            color: "#cfc5b9",
            fontSize: 25,
            fontWeight: 650,
            lineHeight: 1.3,
          }}
        >
          콘셉트 렌더 · 아직 제작되지 않음
          <br />
          CONCEPT RENDER · NOT YET PRODUCED
        </div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
