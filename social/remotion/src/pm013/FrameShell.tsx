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
  english: React.ReactNode;
  note: string;
  noteEn: string;
  step: string;
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
  noteEn,
  step,
  imagePosition = "center",
  imageScaleFrom = 1.055,
  imageScaleTo = 1,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, height } = useVideoConfig();
  const square = height <= 1200;
  const side = square ? 68 : 80;
  const contentWidth = 1080 - side * 2;
  const stageTop = square ? 340 : 550;
  const stageHeight = square ? 540 : 900;

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
          top: square ? 42 : 72,
          left: side,
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: square ? 21 : 25,
          fontWeight: 700,
          letterSpacing: 2.2,
        }}
      >
        PIXELMURMUR · PM_013
      </Interactive.Div>

      <Interactive.Div
        name="Scene counter"
        style={{
          position: "absolute",
          top: square ? 44 : 74,
          right: side,
          color: "#6f675e",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: square ? 20 : 23,
          fontWeight: 600,
          letterSpacing: 1.6,
        }}
      >
        {step}
      </Interactive.Div>

      <Interactive.Div
        name="Concept disclosure"
        style={{
          position: "absolute",
          top: square ? 92 : 142,
          left: side,
          width: contentWidth,
          color: "#6f675e",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: square ? 16 : 20,
          fontWeight: 650,
          lineHeight: 1.25,
          letterSpacing: 0.2,
        }}
      >
        CONCEPT RENDER · 콘셉트 렌더 / NOT YET PRODUCED · 아직 제작되지 않음
      </Interactive.Div>

      <Interactive.Div
        name="Bilingual headline"
        style={{
          position: "absolute",
          top: square ? 138 : 208,
          left: side,
          width: contentWidth,
          opacity: interpolate(frame, [0, 7], [0.92, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [0, 9], ["0px 12px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div
          style={{
            fontSize: square ? 50 : 70,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: square ? -2 : -3.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: square ? 8 : 12,
            color: "#a83e24",
            fontFamily: "IBM Plex Mono, Menlo, monospace",
            fontSize: square ? 45 : 65,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: square ? -1.8 : -2.6,
          }}
        >
          {english}
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Product stage"
        style={{
          position: "absolute",
          top: stageTop,
          left: side,
          width: contentWidth,
          height: stageHeight,
          overflow: "hidden",
          border: "2px solid #d2c7ba",
          borderRadius: square ? 28 : 34,
          backgroundColor: "#e4d9cc",
        }}
      >
        <CanvasImage
          name={imageName}
          src={staticFile(`pm013/${image}`)}
          style={{
            width: contentWidth,
            height: stageHeight,
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
        name="Bilingual note"
        style={{
          position: "absolute",
          top: square ? 908 : 1500,
          left: side,
          width: contentWidth,
          fontSize: square ? 22 : 31,
          fontWeight: 650,
          lineHeight: 1.28,
          letterSpacing: -0.7,
          opacity: interpolate(frame, [5, 14], [0.82, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div>{note}</div>
        <div
          style={{
            marginTop: square ? 5 : 8,
            color: "#6f675e",
            fontFamily: "IBM Plex Mono, Menlo, monospace",
            fontSize: square ? 19 : 29,
            fontWeight: 650,
            letterSpacing: -0.5,
          }}
        >
          {noteEn}
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Motion disclosure"
        style={{
          position: "absolute",
          bottom: square ? 35 : 88,
          left: side,
          color: "#6f675e",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: square ? 16 : 21,
          fontWeight: 650,
          letterSpacing: 0.8,
        }}
      >
        MOTION VISUALIZATION · 동작 시각화
      </Interactive.Div>

      <Interactive.Div
        name="Project mark"
        style={{
          position: "absolute",
          bottom: square ? 35 : 88,
          right: side,
          color: "#6f675e",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: square ? 16 : 21,
          fontWeight: 650,
          letterSpacing: 0.8,
        }}
      >
        JUST A PIXEL
      </Interactive.Div>
    </AbsoluteFill>
  );
};
