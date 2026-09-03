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
  motionCue?: boolean;
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
  imageScaleFrom = 1.045,
  imageScaleTo = 1,
  motionCue = false,
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
          color: "#6f675e",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 23,
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
          top: 142,
          left: 80,
          width: 920,
          color: "#6f675e",
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
        name="Bilingual headline"
        style={{
          position: "absolute",
          top: 216,
          left: 80,
          width: 920,
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
            fontSize: 62,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: -2.8,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 12,
            color: "#b24825",
            fontFamily: "IBM Plex Mono, Menlo, monospace",
            fontSize: 62,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: -2.4,
          }}
        >
          {english}
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Product stage"
        style={{
          position: "absolute",
          top: 566,
          left: 80,
          width: 920,
          height: 900,
          overflow: "hidden",
          border: "2px solid #d2c7ba",
          borderRadius: 34,
          backgroundColor: "#e4d9cc",
        }}
      >
        <CanvasImage
          name={imageName}
          src={staticFile(`pm019/${image}`)}
          style={{
            width: 920,
            height: 900,
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

        {motionCue ? (
          <>
            <Interactive.Div
              name="Crank rotation cue"
              style={{
                position: "absolute",
                top: 304,
                left: 708,
                width: 138,
                height: 138,
                border: "8px solid rgba(214, 95, 47, 0.18)",
                borderTopColor: "#d65f2f",
                borderRightColor: "#d65f2f",
                borderRadius: "50%",
                rotate: interpolate(
                  frame,
                  [0, durationInFrames],
                  ["0deg", "560deg"],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.linear,
                  },
                ),
              }}
            />
            <Interactive.Div
              name="Motion cue label"
              style={{
                position: "absolute",
                top: 454,
                right: 54,
                padding: "9px 13px",
                borderRadius: 999,
                backgroundColor: "#171512",
                color: "#fffdf9",
                fontFamily: "IBM Plex Mono, Menlo, monospace",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 0.4,
              }}
            >
              돌리기 · TURN
            </Interactive.Div>
          </>
        ) : null}
      </Interactive.Div>

      <Interactive.Div
        name="Bilingual note"
        style={{
          position: "absolute",
          top: 1516,
          left: 80,
          width: 920,
          fontSize: 31,
          fontWeight: 650,
          lineHeight: 1.3,
          letterSpacing: -0.8,
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
            marginTop: 8,
            color: "#6f675e",
            fontFamily: "IBM Plex Mono, Menlo, monospace",
            fontSize: 31,
            fontWeight: 650,
            letterSpacing: -0.6,
          }}
        >
          {noteEn}
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Motion disclosure"
        style={{
          position: "absolute",
          bottom: 88,
          left: 80,
          color: "#6f675e",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 21,
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
          bottom: 88,
          right: 80,
          color: "#6f675e",
          fontFamily: "IBM Plex Mono, Menlo, monospace",
          fontSize: 21,
          fontWeight: 650,
          letterSpacing: 0.8,
        }}
      >
        JUST A PIXEL
      </Interactive.Div>
    </AbsoluteFill>
  );
};
