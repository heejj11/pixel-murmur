import { ExplainFrame } from "./ExplainFrame";

export const ScenePurpose: React.FC = () => (
  <ExplainFrame
    title={
      <>
        익숙한 동작,
        <br />
        새로운 쓰임.
      </>
    }
    english={
      <>
        A familiar gesture.
        <br />A new purpose.
      </>
    }
    image="pm013/04-manual-pull.webp"
    imageName="Tape pulling concept render, not a prototype demonstration"
    step="03"
  />
);
