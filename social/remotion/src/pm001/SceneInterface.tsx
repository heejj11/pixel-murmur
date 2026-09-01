import { FrameShell } from "./FrameShell";

export const SceneInterface: React.FC = () => {
  return (
    <FrameShell
      sceneName="05 Interface"
      imageName="Pixel LCD states"
      image="06-lcd-ui-states.webp"
      title={
        <>
          충전 상태에
          <br />
          작은 표정까지.
        </>
      }
      english="A SMALL SCREEN WITH A SMALL MOOD."
      note="대기, 충전, 완충, 저전력 상태를 픽셀 화면으로 구분합니다."
      step="05 / 07"
    />
  );
};
