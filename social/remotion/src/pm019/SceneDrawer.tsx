import { FrameShell } from "./FrameShell";

export const SceneDrawer: React.FC = () => {
  return (
    <FrameShell
      sceneName="04 Shavings drawer"
      imageName="Slide magazine shavings drawer"
      image="03-shavings-drawer.webp"
      title={
        <>
          깎임 가루는 뒤쪽
          <br />
          슬라이드 서랍으로.
        </>
      }
      english="SHAVINGS OUT. SLIDE DRAWER IN."
      note="슬라이드 매거진처럼 당겨 비우는 반투명 가루 서랍입니다."
      step="04 / 05"
      titleSize={77}
      imageScaleFrom={1.08}
      imageScaleTo={1.02}
    />
  );
};
