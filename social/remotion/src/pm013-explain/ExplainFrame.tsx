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
  english: React.ReactNode;
  image: string;
  imageName: string;
  step: string;
  cover?: boolean;
};

// Fixed geometry across scenes. No simulated moving mechanism or performance claim.
export const ExplainFrame: React.FC<Props> = ({
  title,
  english,
  image,
  imageName,
  step,
  cover = false,
}) => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  const card = height === 1350;
  const top = card ? 180 : cover ? 430 : 310;
  const artTop = card ? 515 : cover ? 740 : 660;
  const artHeight = card ? 600 : cover ? 670 : 780;
  const scale =
    cover || card
      ? 1
      : interpolate(frame, [0, 89], [1, 1.018], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      name={`PM013 design note ${step}`}
      style={{
        backgroundColor: "#f1e9df",
        color: "#27271e",
        fontFamily: "Apple SD Gothic Neo, Noto Sans KR, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <Interactive.Div
        name="Brand and object ID"
        style={{
          position: "absolute",
          left: 88,
          right: 112,
          top: card ? 96 : cover ? 356 : 178,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 29,
          fontWeight: 600,
          letterSpacing: 0.3,
        }}
      >
        <span>pixelmurmur.</span>
        <span>PM—013</span>
      </Interactive.Div>
      <Interactive.Div
        name="Korean headline"
        style={{
          position: "absolute",
          top,
          left: 88,
          width: 880,
          fontSize: card ? 78 : 82,
          lineHeight: 1.12,
          letterSpacing: -2.8,
          fontWeight: 800,
          wordBreak: "keep-all",
        }}
      >
        {title}
      </Interactive.Div>
      <Interactive.Div
        name="English headline"
        style={{
          position: "absolute",
          top: top + (card ? 193 : 202),
          left: 88,
          width: 880,
          color: "#855439",
          fontSize: card ? 39 : 43,
          lineHeight: 1.18,
          fontWeight: 500,
          letterSpacing: -0.6,
        }}
      >
        {english}
      </Interactive.Div>
      <Interactive.Div
        name={imageName}
        style={{
          position: "absolute",
          top: artTop,
          left: 72,
          width: 912,
          height: artHeight,
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        <CanvasImage
          src={staticFile(image)}
          style={{ width: "100%", height: "100%", objectFit: "contain", scale }}
        />
      </Interactive.Div>
      {!cover && !card ? (
        <Interactive.Div
          name="Design intention label"
          style={{
            position: "absolute",
            top: 1486,
            left: 88,
            width: 880,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          <span>형태에 이유를 더하다 · Design note</span>
          <span>{step} / 03</span>
        </Interactive.Div>
      ) : null}
      <Interactive.Div
        name="Concept and production disclosure"
        style={{
          position: "absolute",
          top: card ? 1168 : cover ? 1428 : 1552,
          left: 88,
          width: 880,
          fontSize: cover ? 25 : 28,
          lineHeight: 1.36,
          color: "#645a4f",
        }}
      >
        <div>AI 콘셉트 렌더 · 아직 제작되지 않음</div>
        <div>CONCEPT RENDER · NOT YET PRODUCED</div>
        {!cover && !card ? (
          <div style={{ marginTop: 13, fontSize: 24 }}>
            정지 이미지 편집 · Edited still renders
          </div>
        ) : null}
      </Interactive.Div>
    </AbsoluteFill>
  );
};
