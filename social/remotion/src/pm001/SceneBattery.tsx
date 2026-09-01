import { FrameShell } from "./FrameShell";

export const SceneBattery: React.FC = () => {
  return (
    <FrameShell
      sceneName="04 Battery detail"
      imageName="Toast battery hardware"
      image="03-toast-battery.webp"
      title={
        <>
          작은 토스트에
          <br />
          포트와 표시등.
        </>
      }
      english="USB-C, INDICATORS, CONTACTS."
      note="아직은 설계 시각화이며 용량과 발열은 시제품 검증이 필요합니다."
      step="04 / 07"
    />
  );
};
