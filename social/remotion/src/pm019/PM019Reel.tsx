import { Audio } from "@remotion/media";
import { Series, staticFile } from "remotion";
import { SceneAction } from "./SceneAction";
import { SceneClosing } from "./SceneClosing";
import { SceneMechanism } from "./SceneMechanism";

export const PM019Reel: React.FC = () => {
  return (
    <>
      <Series>
        <Series.Sequence durationInFrames={96} name="01 Action hook">
          <SceneAction />
        </Series.Sequence>
        <Series.Sequence durationInFrames={78} name="02 Mechanism">
          <SceneMechanism />
        </Series.Sequence>
        <Series.Sequence durationInFrames={96} name="03 Color vote">
          <SceneClosing />
        </Series.Sequence>
      </Series>
      <Audio
        src={staticFile("pm019/audio/pm019-original-music-9s-v02.wav")}
        volume={0.88}
      />
    </>
  );
};
