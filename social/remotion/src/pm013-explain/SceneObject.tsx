import { ExplainFrame } from "./ExplainFrame";

export const SceneObject: React.FC<{ cover?: boolean }> = ({
  cover = false,
}) => (
  <ExplainFrame
    title={
      <>
        전화기 모양의
        <br />
        테이프 커터.
      </>
    }
    english={
      <>
        A rotary phone.
        <br />
        Reimagined as a tape cutter.
      </>
    }
    image="pm013/01-hero-three-quarter.webp"
    imageName="Complete rotary phone tape cutter concept"
    step="01"
    cover={cover}
  />
);
