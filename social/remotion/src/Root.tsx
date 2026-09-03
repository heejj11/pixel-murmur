import "./index.css";
import { Composition, Folder } from "remotion";
import { PM001Loop } from "./pm001/PM001Loop";
import { PM001Reel } from "./pm001/PM001Reel";
import { PM001GridSafeCover } from "./pm001/PM001GridSafeCover";
import { PM019GridSafeCover } from "./pm019/PM019GridSafeCover";
import { PM019Loop } from "./pm019/PM019Loop";
import { PM019Reel } from "./pm019/PM019Reel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
        <Composition
          id="PM001-GridSafe-Cover"
          component={PM001GridSafeCover}
          durationInFrames={60}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="PixelMurmur-PM-019">
        <Composition
          id="PM019-Reel"
          component={PM019Reel}
          durationInFrames={360}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="PM019-Loop"
          component={PM019Loop}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="PM019-GridSafe-Cover"
          component={PM019GridSafeCover}
          durationInFrames={60}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
