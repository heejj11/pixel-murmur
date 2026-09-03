import { FrameShell } from "./FrameShell";

export const SceneAction: React.FC = () => {
  return (
    <FrameShell
      sceneName="02 Crank action"
      imageName="Pencil sharpening action"
      image="02-sharpening-action.webp"
      title={
        <>
          렌즈에 넣고,
          <br />
          초점 휠을 돌립니다.
        </>
      }
      english="INSERT. TURN. SHARPEN."
      note="오른쪽 크랭크를 돌리면 안쪽 커터가 연필을 깎는 구조입니다."
      step="02 / 05"
      imageScaleFrom={1.08}
      imageScaleTo={1.015}
      imagePosition="center 48%"
    />
  );
};
