import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SceneBattery } from "./SceneBattery";
import { SceneClosing } from "./SceneClosing";
import { SceneDetach } from "./SceneDetach";
import { SceneDocked } from "./SceneDocked";
import { SceneHook } from "./SceneHook";
import { SceneInterface } from "./SceneInterface";
import { SceneUsage } from "./SceneUsage";

export const PM001Reel: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={42} name="01 Hook">
        <SceneHook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 6 })}
      />
      <TransitionSeries.Sequence durationInFrames={66} name="02 Docked">
        <SceneDocked />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 6 })}
      />
      <TransitionSeries.Sequence durationInFrames={66} name="03 Detachable">
        <SceneDetach />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 6 })}
      />
      <TransitionSeries.Sequence durationInFrames={48} name="04 Battery detail">
        <SceneBattery />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 6 })}
      />
      <TransitionSeries.Sequence durationInFrames={48} name="05 Interface">
        <SceneInterface />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 6 })}
      />
      <TransitionSeries.Sequence durationInFrames={48} name="06 Portable use">
        <SceneUsage />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 6 })}
      />
      <TransitionSeries.Sequence durationInFrames={78} name="07 Closing">
        <SceneClosing />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
