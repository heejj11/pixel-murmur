import {
  AbsoluteFill,
  CanvasImage,
  Folder,
  Interactive,
  Still,
  staticFile,
} from "remotion";

const Frame: React.FC<{
  page: string;
  source: string;
  headline: React.ReactNode;
  english: string;
}> = ({ page, source, headline, english }) => (
  <AbsoluteFill
    name={`PM015 planner ${page}`}
    style={{
      backgroundColor: "#f1e9df",
      color: "#292820",
      fontFamily: "Apple SD Gothic Neo, Noto Sans KR, Arial, sans-serif",
    }}
  >
    <Interactive.Div
      name="Brand"
      style={{
        position: "absolute",
        left: 80,
        top: 72,
        fontSize: 30,
        fontWeight: 700,
      }}
    >
      pixelmurmur.
    </Interactive.Div>
    <Interactive.Div
      name="Object and page"
      style={{
        position: "absolute",
        right: 80,
        top: 76,
        fontSize: 24,
        color: "#756755",
      }}
    >
      PM—015 · {page}/03
    </Interactive.Div>
    <Interactive.Div
      name="Korean headline"
      style={{
        position: "absolute",
        left: 80,
        top: 156,
        width: 920,
        fontSize: 84,
        fontWeight: 800,
        lineHeight: 1.12,
        letterSpacing: -3.4,
      }}
    >
      {headline}
    </Interactive.Div>
    <Interactive.Div
      name="English subtitle"
      style={{
        position: "absolute",
        left: 84,
        top: 369,
        fontSize: 44,
        color: "#805238",
      }}
    >
      {english}
    </Interactive.Div>
    <CanvasImage
      name="Unaltered concept render"
      src={staticFile(`pm015/${source}`)}
      style={{
        position: "absolute",
        left: 185,
        top: 430,
        width: 710,
        height: 710,
        objectFit: "contain",
      }}
    />
    <Interactive.Div
      name="AI and unproduced disclosure"
      style={{
        position: "absolute",
        left: 80,
        top: 1152,
        fontSize: 26,
        lineHeight: 1.3,
        color: "#665c50",
      }}
    >
      <div>AI 콘셉트 렌더 · 아직 제작되지 않음</div>
      <div style={{ fontSize: 22 }}>CONCEPT RENDER · NOT YET PRODUCED</div>
    </Interactive.Div>
  </AbsoluteFill>
);

export const PM015Hook: React.FC = () => (
  <Frame
    page="01"
    source="01-hero.webp"
    headline={
      <>
        사진은 못 찍고,
        <br />
        날짜만 찍는 카메라.
      </>
    }
    english="No photos. Just dates."
  />
);

export const PM015Journal: React.FC = () => (
  <Frame
    page="02"
    source="02-press-to-stamp.webp"
    headline={
      <>
        다이어리 첫 줄을
        <br />
        셔터로 남긴다면.
      </>
    }
    english="A shutter for your journal."
  />
);

export const PM015Ink: React.FC = () => (
  <Frame
    page="03"
    source="07-ink-colors.webp"
    headline={
      <>
        오늘의 기록은
        <br />
        무슨 색으로?
      </>
    }
    english="Which ink feels like today?"
  />
);

export const PM015CarouselRoot: React.FC = () => (
  <Folder name="PM015-Planner-v01">
    <Still
      id="PM015-Planner-01"
      component={PM015Hook}
      width={1080}
      height={1350}
    />
    <Still
      id="PM015-Planner-02"
      component={PM015Journal}
      width={1080}
      height={1350}
    />
    <Still
      id="PM015-Planner-03"
      component={PM015Ink}
      width={1080}
      height={1350}
    />
  </Folder>
);
