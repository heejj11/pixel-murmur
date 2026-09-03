import { FrameShell } from "./FrameShell";

export const SceneHook: React.FC = () => {
  return (
    <FrameShell
      sceneName="01 Hook"
      imageName="Projector sharpener hero"
      image="01-hero.webp"
      title={
        <>
          영사기인 줄 알았는데,
          <br />
          연필깎이입니다.
        </>
      }
      english={
        <>
          A PROJECTOR?
          <br />
          IT SHARPENS PENCILS.
        </>
      }
      note="렌즈와 초점 휠을 연필깎이의 투입구와 손잡이로 바꿨습니다."
      noteEn="THE LENS AND FOCUS WHEEL BECOME A SHARPENER."
      step="01 / 03"
      imageScaleFrom={1.02}
      imageScaleTo={1.07}
    />
  );
};
