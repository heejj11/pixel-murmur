import { FrameShell } from "./FrameShell";

export const SceneReveal: React.FC = () => {
  return (
    <FrameShell
      sceneName="03 Product reveal"
      imageName="Rotary phone tape dispenser"
      image="01-hero-three-quarter.webp"
      title={<>전화기인 줄 알았는데,<br />테이프 디스펜서입니다.</>}
      english={<>A ROTARY PHONE?<br />IT CUTS TAPE.</>}
      note="PM-013 로터리폰 테이프 디스펜서"
      noteEn="ROTARY PHONE TAPE DISPENSER"
      step="03 / 03"
      imageScaleFrom={1.07}
      imageScaleTo={1.015}
      imagePosition="center 48%"
    />
  );
};
