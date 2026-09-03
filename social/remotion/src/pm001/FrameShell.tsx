import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type FrameShellProps = {
  sceneName: string;
  imageName: string;
  image: string;
  title: React.ReactNode;
  english: string;
  note: string;
  step: string;
  imageFit?: "contain" | "cover";
  imagePosition?: string;
};

export const FrameShell: React.FC<FrameShellProps> = ({
  sceneName,
  imageName,
  image,
  title,
  english,
  note,
  step,
  imageFit = "contain",
  imagePosition = "center",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      name={sceneName}
      style={{
        backgroundColor: "#f3eee7",
        color: "#171512",
        fontFamily:
          "IBM Plex Sans, Apple SD Gothic Neo, Noto Sans KR, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <Interactive.Div
        name="PixelMurmur brand"
        style={{
          position: "absolute",
          top: 82,
          left: 80,
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 2.4,
        }}
      >
        <span
          style={{
            display: "inline-grid",
            gridTemplateColumns: "repeat(3, 12px)",
            gap: 6,
          }}
        >
          <span style={{ width: 12, height: 12, backgroundColor: "#171512" }} />
          <span style={{ width: 12, height: 12, backgroundColor: "#bd7432" }} />
          <span
            style={{
              width: 12,
              height: 12,
              border: "2px solid #171512",
            }}
          />
        </span>
        PIXELMURMUR
      </Interactive.Div>

      <Interactive.Div
        name="Scene counter"
        style={{
          position: "absolute",
          top: 86,
          right: 80,
          color: "#736b62",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 2,
        }}
      >
        {step}
      </Interactive.Div>

      <Interactive.Div
        name="Concept disclosure"
        style={{
          position: "absolute",
          top: 226,
          left: 80,
          width: 548,
          padding: "11px 16px 10px",
          border: "2px solid #171512",
          backgroundColor: "#f3eee7",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 21,
          fontWeight: 700,
          lineHeight: 1.22,
          letterSpacing: 1,
          opacity: interpolate(frame, [0, 8], [0, 1], {
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
            fontSize: 19,
            letterSpacing: -0.4,
          }}
        >
          콘셉트 렌더 · 아직 제작되지 않음
        </span>
      </Interactive.Div>

      <Interactive.Div
        name="Motion disclosure"
        style={{
          position: "absolute",
          top: 226,
          right: 80,
          width: 338,
          padding: "11px 14px 10px",
          backgroundColor: "#171512",
          color: "#fffdf9",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 19,
          fontWeight: 700,
          lineHeight: 1.25,
          letterSpacing: 0.7,
          opacity: interpolate(frame, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        MOTION VISUALIZATION
        <br />
        <span
          style={{
            fontFamily:
              "IBM Plex Sans, Apple SD Gothic Neo, Noto Sans KR, Arial, sans-serif",
            fontSize: 19,
            letterSpacing: -0.4,
          }}
        >
          동작 시각화
        </span>
      </Interactive.Div>

      <Interactive.Div
        name="Korean headline"
        style={{
          position: "absolute",
          top: 326,
          left: 80,
          width: 920,
          fontSize: 86,
          fontWeight: 800,
          lineHeight: 1.02,
          letterSpacing: -4.4,
          opacity: interpolate(frame, [2, 12, durationInFrames - 7, durationInFrames], [0, 1, 1, 0.85], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.linear,
              Easing.bezier(0.7, 0, 0.84, 0),
            ],
          }),
          translate: interpolate(frame, [2, 14], ["0px 26px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {title}
      </Interactive.Div>

      <Interactive.Div
        name="English supporting line"
        style={{
          position: "absolute",
          top: 500,
          left: 82,
          width: 916,
          color: "#9a541d",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 38,
          fontWeight: 700,
          lineHeight: 1.12,
          letterSpacing: 0.8,
          opacity: interpolate(frame, [7, 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {english}
      </Interactive.Div>

      <Interactive.Div
        name="Product stage"
        style={{
          position: "absolute",
          top: 584,
          left: 80,
          width: 920,
          height: 920,
          overflow: "hidden",
          border: "2px solid #d8cfc4",
          borderRadius: 34,
          backgroundColor: "#eee6dc",
          opacity: interpolate(frame, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <CanvasImage
          name={imageName}
          src={staticFile(`pm001/${image}`)}
          style={{
            width: 920,
            height: 920,
            objectFit: imageFit,
            objectPosition: imagePosition,
            scale: interpolate(frame, [0, durationInFrames], [1.035, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            }),
          }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Scene note"
        style={{
          position: "absolute",
          top: 1562,
          left: 80,
          width: 820,
          color: "#171512",
          fontSize: 32,
          fontWeight: 650,
          lineHeight: 1.32,
          letterSpacing: -0.8,
          opacity: interpolate(frame, [10, 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {note}
      </Interactive.Div>

      <Interactive.Div
        name="Object id"
        style={{
          position: "absolute",
          bottom: 88,
          left: 80,
          color: "#736b62",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 1.5,
        }}
      >
        PM_001 · TOAST CHARGING STATION
      </Interactive.Div>

      <Interactive.Div
        name="Project mark"
        style={{
          position: "absolute",
          bottom: 88,
          right: 80,
          color: "#736b62",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 1.5,
        }}
      >
        JUST A PIXEL
      </Interactive.Div>
    </AbsoluteFill>
  );
};
