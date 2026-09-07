import { RetestFrame } from "./RetestFrame";

export const SceneCharge: React.FC<{ cover?: boolean }> = ({
  cover = false,
}) => (
  <RetestFrame
    title={
      <>
        빵 한 장,
        <br />
        충전 준비 끝.
      </>
    }
    english="One slice. Ready to recharge."
    image="pm001-retest/phone-charging-v04.png"
    imageName="Toast battery visibly connected to phone"
    cover={cover}
  />
);
