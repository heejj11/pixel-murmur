import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { staticFile } from "remotion";
import { SceneAction } from "./SceneAction";
import { SceneClosing } from "./SceneClosing";
import { SceneMechanism } from "./SceneMechanism";

export const PM019Loop: React.FC = () => {
  return (
    <>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={78} name="01 Action hook">
          <SceneAction />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 6 })}
        />
        <TransitionSeries.Sequence durationInFrames={54} name="02 Mechanism">
          <SceneMechanism />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 6 })}
        />
        <TransitionSeries.Sequence durationInFrames={60} name="03 Color vote">
          <SceneClosing />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Audio
        src={staticFile("pm019/audio/pm019-original-music-loop-6s-v02.wav")}
        volume={0.88}
      />
    </>
  );
};
