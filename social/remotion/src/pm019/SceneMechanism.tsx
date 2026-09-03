import { FrameShell } from "./FrameShell";

export const SceneMechanism: React.FC = () => {
  return (
    <FrameShell
      sceneName="03 Gear mechanism"
      imageName="Gear and cutter cutaway"
      image="05-gear-cutaway.webp"
      title={
        <>
          안쪽 커터가
          <br />
          함께 돌아갑니다.
        </>
      }
      english={
        <>
          THE CUTTER
          <br />
          TURNS INSIDE.
        </>
      }
      note="기어가 휠의 회전을 나선형 커터로 전달합니다."
      noteEn="THE GEARS TRANSFER THE CRANK TO THE CUTTER."
      step="02 / 03"
      imageScaleFrom={1.025}
      imageScaleTo={1.075}
    />
  );
};
