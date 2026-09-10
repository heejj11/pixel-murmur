import { ExplainFrame } from "./ExplainFrame";

export const SceneIdea: React.FC = () => (
  <ExplainFrame
    title={
      <>
        수화기를 놓으면
        <br />
        테이프가 잘린다면?
      </>
    }
    english={
      <>
        What if hanging up
        <br />
        could cut the tape?
      </>
    }
    image="pm013/05-cutter-detail.webp"
    imageName="Unverified concept illustration of handset cutter linkage"
    step="02"
  />
);
