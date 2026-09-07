import { FrameShell } from "./FrameShell";

export const SceneCut: React.FC = () => {
  return (
    <FrameShell
      sceneName="02 Hang up to cut"
      imageName="Guarded cutter detail"
      image="05-cutter-detail.webp"
      title={<>다시 내려놓으면,<br />잘립니다.</>}
      english={<>HANG UP.<br />IT CUTS.</>}
      note="후크 버튼이 보호 구조 안쪽의 칼날을 작동시킵니다."
      noteEn="THE HOOK SWITCH DRIVES THE GUARDED CUTTER."
      step="02 / 03"
      imageScaleFrom={1.02}
      imageScaleTo={1.085}
      imagePosition="center 44%"
    />
  );
};
