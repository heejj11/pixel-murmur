import { FrameShell } from "./FrameShell";

export const SceneDocked: React.FC = () => {
  return (
    <FrameShell
      sceneName="02 Docked"
      imageName="Docked charging station"
      image="01-hero-inserted.webp"
      title={
        <>
          도크에 꽂아
          <br />
          충전합니다.
        </>
      }
      english="DOCK IT. CHARGE IT."
      note="하단 본체는 책상 위에 머무는 충전 도크입니다."
      step="02 / 07"
    />
  );
};
