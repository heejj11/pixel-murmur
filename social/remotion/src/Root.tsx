import "./index.css";
import { Composition, Folder } from "remotion";
import { PM001Loop } from "./pm001/PM001Loop";
import { PM001Reel } from "./pm001/PM001Reel";
import { PM001GridSafeCover } from "./pm001/PM001GridSafeCover";
import { PM019GridSafeCover } from "./pm019/PM019GridSafeCover";
import { PM019Loop } from "./pm019/PM019Loop";
import { PM019Reel } from "./pm019/PM019Reel";
import { PM013GridSafeCover } from "./pm013/PM013GridSafeCover";
import { PM013Reel } from "./pm013/PM013Reel";
import { PM013XLoop } from "./pm013/PM013XLoop";
import {
  PM001RetestCover,
  PM001RetestReel,
  PM001RetestX,
} from "./pm001-retest/PM001Retest";
import { SceneCharge } from "./pm001-retest/SceneCharge";
import { SceneTake } from "./pm001-retest/SceneTake";
import { SceneReturn } from "./pm001-retest/SceneReturn";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="PM001-Retest-v04">
        <Composition
          id="PM001-Retest-Reel"
          component={PM001RetestReel}
          durationInFrames={240}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="PM001-Retest-X"
          component={PM001RetestX}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1350}
        />
        <Composition
          id="PM001-Retest-Cover"
          component={PM001RetestCover}
          durationInFrames={1}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="PM001-Retest-Card-1"
          component={SceneCharge}
          durationInFrames={1}
          fps={30}
          width={1080}
          height={1350}
        />
        <Composition
          id="PM001-Retest-Card-2"
          component={SceneTake}
          durationInFrames={1}
          fps={30}
          width={1080}
          height={1350}
        />
        <Composition
          id="PM001-Retest-Card-3"
          component={SceneReturn}
          durationInFrames={1}
          fps={30}
          width={1080}
          height={1350}
        />
      </Folder>
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
          durationInFrames={270}
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
      <Folder name="PixelMurmur-PM-013">
        <Composition
          id="PM013-Reel"
          component={PM013Reel}
          durationInFrames={270}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="PM013-X-Loop"
          component={PM013XLoop}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1080}
        />
        <Composition
          id="PM013-Grid-Safe-Cover"
          component={PM013GridSafeCover}
          durationInFrames={60}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
