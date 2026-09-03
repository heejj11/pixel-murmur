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
  titleSize?: number;
  imagePosition?: string;
  imageScaleFrom?: number;
  imageScaleTo?: number;
};

export const FrameShell: React.FC<FrameShellProps> = ({
  sceneName,
  imageName,
  image,
  title,
  english,
  note,
  step,
  titleSize = 82,
  imagePosition = "center",
  imageScaleFrom = 1.045,
  imageScaleTo = 1,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      name={sceneName}
      style={{
        backgroundColor: "#eee8df",
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
          top: 76,
          left: 80,
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 27,
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
          <span style={{ width: 12, height: 12, backgroundColor: "#d65f2f" }} />
          <span style={{ width: 12, height: 12, border: "2px solid #171512" }} />
        </span>
        PIXELMURMUR
      </Interactive.Div>

      <Interactive.Div
        name="Scene counter"
        style={{
          position: "absolute",
          top: 81,
          right: 80,
          color: "#6f675e",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 23,
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
          top: 166,
          left: 80,
          padding: "9px 13px 8px",
          border: "2px solid #171512",
          backgroundColor: "#eee8df",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 17,
          fontWeight: 700,
          lineHeight: 1.18,
          letterSpacing: 0.7,
          opacity: interpolate(frame, [0, 7], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        CONCEPT RENDER · NOT YET PRODUCED
        <br />
        <span style={{ fontFamily: "inherit", letterSpacing: -0.2 }}>
          콘셉트 렌더 · 아직 제작되지 않음
        </span>
      </Interactive.Div>

      <Interactive.Div
        name="Motion disclosure"
        style={{
          position: "absolute",
          top: 166,
          right: 80,
          padding: "10px 13px 9px",
          backgroundColor: "#171512",
          color: "#fffdf9",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 17,
          fontWeight: 700,
          lineHeight: 1.18,
          letterSpacing: 0.5,
          opacity: interpolate(frame, [0, 7], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        MOTION VISUALIZATION
        <br />
        동작 시각화
      </Interactive.Div>

      <Interactive.Div
        name="Korean headline"
        style={{
          position: "absolute",
          top: 286,
          left: 80,
          width: 920,
          fontSize: titleSize,
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: -4.1,
          opacity: interpolate(
            frame,
            [1, 10, durationInFrames - 7, durationInFrames],
            [0, 1, 1, 0.86],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.linear,
                Easing.bezier(0.7, 0, 0.84, 0),
              ],
            },
          ),
          translate: interpolate(frame, [1, 12], ["0px 24px", "0px 0px"], {
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
          top: 474,
          left: 82,
          width: 916,
          color: "#b24825",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 34,
          fontWeight: 700,
          lineHeight: 1.12,
          letterSpacing: 0.3,
          opacity: interpolate(frame, [6, 16], [0, 1], {
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
          top: 562,
          left: 80,
          width: 920,
          height: 1000,
          overflow: "hidden",
          border: "2px solid #d2c7ba",
          borderRadius: 34,
          backgroundColor: "#e4d9cc",
          opacity: interpolate(frame, [0, 9], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <CanvasImage
          name={imageName}
          src={staticFile(`pm019/${image}`)}
          style={{
            width: 920,
            height: 1000,
            objectFit: "cover",
            objectPosition: imagePosition,
            scale: interpolate(
              frame,
              [0, durationInFrames],
              [imageScaleFrom, imageScaleTo],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                output: "perceptual-scale",
              },
            ),
          }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Scene note"
        style={{
          position: "absolute",
          top: 1603,
          left: 80,
          width: 920,
          color: "#171512",
          fontSize: 31,
          fontWeight: 650,
          lineHeight: 1.32,
          letterSpacing: -0.8,
          opacity: interpolate(frame, [9, 20], [0, 1], {
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
          bottom: 82,
          left: 80,
          color: "#6f675e",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 23,
          fontWeight: 600,
          letterSpacing: 1.4,
        }}
      >
        PM_019 · SLIDE PROJECTOR SHARPENER
      </Interactive.Div>

      <Interactive.Div
        name="Project mark"
        style={{
          position: "absolute",
          bottom: 82,
          right: 80,
          color: "#6f675e",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 23,
          fontWeight: 600,
          letterSpacing: 1.4,
        }}
      >
        JUST A PIXEL
      </Interactive.Div>
    </AbsoluteFill>
  );
};
