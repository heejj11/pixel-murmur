import { RetestFrame } from "./RetestFrame";

export const SceneReturn: React.FC = () => (
  <RetestFrame
    title={
      <>
        돌아오면
        <br />
        다시 꽂아 충전.
      </>
    }
    english="Back home? Dock to recharge."
    image="pm001/01-hero-inserted.webp"
    imageName="Toast battery resting in its charging dock"
  />
);
