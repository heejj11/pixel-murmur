import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { staticFile } from "remotion";
import { SceneAction } from "./SceneAction";
import { SceneClosing } from "./SceneClosing";
import { SceneDrawer } from "./SceneDrawer";
import { SceneHook } from "./SceneHook";
import { SceneMechanism } from "./SceneMechanism";

export const PM019Reel: React.FC = () => {
  return (
    <>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={54} name="01 Hook">
          <SceneHook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 6 })}
        />
        <TransitionSeries.Sequence durationInFrames={84} name="02 Crank action">
          <SceneAction />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 6 })}
        />
        <TransitionSeries.Sequence durationInFrames={78} name="03 Gear mechanism">
          <SceneMechanism />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 6 })}
        />
        <TransitionSeries.Sequence durationInFrames={66} name="04 Shavings drawer">
          <SceneDrawer />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 6 })}
        />
        <TransitionSeries.Sequence durationInFrames={102} name="05 Color question">
          <SceneClosing />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Audio
        src={staticFile("pm019/audio/pm019-original-music-12s.wav")}
        volume={0.88}
      />
    </>
  );
};
