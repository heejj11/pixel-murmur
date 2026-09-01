import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SceneDetach } from "./SceneDetach";
import { SceneDocked } from "./SceneDocked";

export const PM001Loop: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={63} name="Docked start">
        <SceneDocked />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 6 })}
      />
      <TransitionSeries.Sequence durationInFrames={72} name="Detach">
        <SceneDetach />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 6 })}
      />
      <TransitionSeries.Sequence durationInFrames={57} name="Docked end">
        <SceneDocked />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
