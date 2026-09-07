import { FrameShell } from "./FrameShell";

export const ScenePull: React.FC = () => {
  return (
    <FrameShell
      sceneName="01 Lift and pull"
      imageName="Hand pulling masking tape"
      image="04-manual-pull.webp"
      title={<>수화기를 들고,<br />테이프를 당기세요.</>}
      english={<>LIFT.<br />THEN PULL.</>}
      note="수화기를 들면 테이프가 손으로 부드럽게 풀립니다."
      noteEn="LIFT THE HANDSET TO FREE THE TAPE."
      step="01 / 03"
      imageScaleFrom={1.08}
      imageScaleTo={1.015}
      imagePosition="center 52%"
    />
  );
};
