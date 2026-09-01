import { FrameShell } from "./FrameShell";

export const SceneDetach: React.FC = () => {
  return (
    <FrameShell
      sceneName="03 Detachable"
      imageName="Detachable toast battery"
      image="02-detachable-structure.webp"
      title={
        <>
          위의 토스트만
          <br />
          빼서 휴대합니다.
        </>
      }
      english="LIFT IT OUT. TAKE THE POWER."
      note="돌아오면 다시 꽂아 충전하는 도크 + 미니 배터리 구조."
      step="03 / 07"
    />
  );
};
