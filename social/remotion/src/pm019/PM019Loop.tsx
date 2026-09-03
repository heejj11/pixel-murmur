import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { staticFile } from "remotion";
import { SceneAction } from "./SceneAction";
import { SceneHook } from "./SceneHook";

export const PM019Loop: React.FC = () => {
  return (
    <>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={66} name="Projector">
          <SceneHook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 6 })}
        />
        <TransitionSeries.Sequence durationInFrames={72} name="Sharpener action">
          <SceneAction />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 6 })}
        />
        <TransitionSeries.Sequence durationInFrames={54} name="Return">
          <SceneHook />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Audio
        src={staticFile("pm019/audio/pm019-original-music-loop-6s.wav")}
        volume={0.88}
      />
    </>
  );
};
