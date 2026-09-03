import { FrameShell } from "./FrameShell";

export const SceneMechanism: React.FC = () => {
  return (
    <FrameShell
      sceneName="03 Gear mechanism"
      imageName="Gear and cutter cutaway"
      image="05-gear-cutaway.webp"
      title={
        <>
          기어가 나선형 커터를
          <br />
          움직입니다.
        </>
      }
      english="THE FOCUS WHEEL DRIVES THE CUTTER."
      note="기어·커터·안전 격자를 보여주는 구조 시각화입니다."
      step="03 / 05"
      titleSize={76}
      imageScaleFrom={1.03}
      imageScaleTo={1.09}
    />
  );
};
