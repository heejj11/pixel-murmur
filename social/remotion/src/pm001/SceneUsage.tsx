import { FrameShell } from "./FrameShell";

export const SceneUsage: React.FC = () => {
  return (
    <FrameShell
      sceneName="06 Portable use"
      imageName="Portable use scene"
      image="07-desk-usage.webp"
      title={
        <>
          토스트를 챙기고,
          <br />
          어디서든 충전.
        </>
      }
      english="POWER, TO GO."
      note="휴대폰을 충전하는 모습도 아직은 콘셉트 동작 시각화입니다."
      step="06 / 07"
    />
  );
};
