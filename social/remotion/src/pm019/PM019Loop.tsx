import { Audio } from "@remotion/media";
import { Series, staticFile } from "remotion";
import { SceneAction } from "./SceneAction";
import { SceneClosing } from "./SceneClosing";
import { SceneMechanism } from "./SceneMechanism";

export const PM019Loop: React.FC = () => {
  return (
    <>
      <Series>
        <Series.Sequence durationInFrames={72} name="01 Action hook">
          <SceneAction />
        </Series.Sequence>
        <Series.Sequence durationInFrames={48} name="02 Mechanism">
          <SceneMechanism />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60} name="03 Color vote">
          <SceneClosing />
        </Series.Sequence>
      </Series>
      <Audio
        src={staticFile("pm019/audio/pm019-original-music-loop-6s-v02.wav")}
        volume={0.88}
      />
    </>
  );
};
