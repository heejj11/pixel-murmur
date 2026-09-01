import "./index.css";
import { Composition, Folder } from "remotion";
import { PM001Loop } from "./pm001/PM001Loop";
import { PM001Reel } from "./pm001/PM001Reel";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="PixelMurmur-PM-001">
      <Composition
        id="PM001-Reel"
        component={PM001Reel}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PM001-Loop"
        component={PM001Loop}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
      />
    </Folder>
  );
};
