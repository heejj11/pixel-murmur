import { FrameShell } from "./FrameShell";

export const SceneAction: React.FC = () => {
  return (
    <FrameShell
      sceneName="02 Crank action"
      imageName="Pencil sharpening action"
      image="02-sharpening-action.webp"
      title={
        <>
          초점을 돌리면,
          <br />
          연필이 깎입니다.
        </>
      }
      english={
        <>
          TURN THE FOCUS.
          <br />
          SHARPEN THE POINT.
        </>
      }
      note="렌즈에 연필을 넣고 휠을 돌리는 수동 연필깎이."
      noteEn="INSERT THE PENCIL. TURN THE FOCUS WHEEL."
      step="01 / 03"
      imageScaleFrom={1.08}
      imageScaleTo={1.025}
      imagePosition="center 48%"
    />
  );
};
