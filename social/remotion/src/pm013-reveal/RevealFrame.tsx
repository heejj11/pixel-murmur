import { AbsoluteFill, Interactive } from "remotion";

export const RevealFrame: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <AbsoluteFill
    name="PM013 reveal frame"
    style={{
      backgroundColor: "#f1e9df",
      color: "#28271f",
      fontFamily: "Apple SD Gothic Neo, Noto Sans KR, Arial, sans-serif",
      overflow: "hidden",
    }}
  >
    <Interactive.Div
      name="Brand"
      style={{
        position: "absolute",
        left: 88,
        top: 240,
        fontSize: 30,
        fontWeight: 700,
      }}
    >
      pixelmurmur.
    </Interactive.Div>
    <Interactive.Div
      name="Object number"
      style={{
        position: "absolute",
        right: 120,
        top: 240,
        fontSize: 30,
        fontWeight: 700,
      }}
    >
      PM—013
    </Interactive.Div>
    {children}
    <Interactive.Div
      name="AI and production disclosure"
      style={{
        position: "absolute",
        left: 88,
        top: 1450,
        width: 850,
        fontSize: 28,
        lineHeight: 1.35,
        color: "#665c50",
      }}
    >
      <div>AI 콘셉트 렌더 · 아직 제작되지 않음</div>
      <div>CONCEPT RENDER · NOT YET PRODUCED</div>
      <div style={{ marginTop: 12, fontSize: 25 }}>
        정지 렌더·그래픽 연출 / Edited stills & graphics
      </div>
    </Interactive.Div>
  </AbsoluteFill>
);
