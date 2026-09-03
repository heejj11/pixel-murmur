import { FrameShell } from "./FrameShell";

export const PM001GridSafeCover: React.FC = () => {
  return (
    <FrameShell
      sceneName="Instagram grid-safe cover"
      imageName="Portable toast battery"
      image="03-toast-battery.webp"
      title={
        <>
          토스트가
          <br />
          보조배터리라면?
        </>
      }
      english="WHAT IF TOAST WERE A BATTERY?"
      note="분리해서 들고 다니는 작은 토스트 배터리."
      step="01 / 07"
      gridSafeCover
    />
  );
};
