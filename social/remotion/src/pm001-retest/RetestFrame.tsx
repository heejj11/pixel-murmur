import {
  AbsoluteFill,
  CanvasImage,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  title: React.ReactNode;
  english: string;
  image: string;
  imageName: string;
  cover?: boolean;
};

export const RetestFrame: React.FC<Props> = ({
  title,
  english,
  image,
  imageName,
  cover = false,
}) => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#faf1e6",
        color: "#362314",
        fontFamily: "Apple SD Gothic Neo, Noto Sans KR, Arial, sans-serif",
      }}
    >
      <Interactive.Div
        name="Consistent campaign artboard"
        style={{
          position: "absolute",
          width: 1080,
          height: 1350,
          top: (height - 1350) / 2,
          left: 0,
          scale: cover ? 0.78 : 1,
          transformOrigin: "center center",
        }}
      >
        <Interactive.Div
          name="Brand and object"
          style={{
            position: "absolute",
            top: 54,
            left: 90,
            right: 90,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 27,
            fontWeight: 700,
            letterSpacing: 0.6,
          }}
        >
          <span>pixelmurmur.</span>
          <span style={{ color: "#805f40" }}>PM–001</span>
        </Interactive.Div>
        <Interactive.Div
          name="Korean hook"
          style={{
            position: "absolute",
            top: 112,
            left: 86,
            right: 86,
            fontSize: 90,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: -4.5,
          }}
        >
          {title}
        </Interactive.Div>
        <Interactive.Div
          name="English hook"
          style={{
            position: "absolute",
            top: 321,
            left: 90,
            right: 90,
            fontSize: 44,
            fontWeight: 500,
            lineHeight: 1.12,
            letterSpacing: -1.1,
            color: "#795030",
          }}
        >
          {english}
        </Interactive.Div>
        <Interactive.Div
          name="Large product image"
          style={{
            position: "absolute",
            top: 396,
            left: 86,
            width: 908,
            height: 818,
            overflow: "hidden",
            borderRadius: 18,
          }}
        >
          <CanvasImage
            name={imageName}
            src={staticFile(image)}
            style={{
              position: "absolute",
              top: -45,
              width: 908,
              height: 908,
              objectFit: "contain",
              scale: cover
                ? 1
                : interpolate(frame, [0, 90], [1, 1.025], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
            }}
          />
        </Interactive.Div>
        <Interactive.Div
          name="Concept disclosure"
          style={{
            position: "absolute",
            top: 1245,
            left: 90,
            right: 90,
            color: "#6d5038",
            fontSize: 28,
            fontWeight: 500,
            lineHeight: 1.32,
          }}
        >
          콘셉트 렌더 · 아직 제작되지 않음
          <br />
          CONCEPT RENDER · NOT YET PRODUCED
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
