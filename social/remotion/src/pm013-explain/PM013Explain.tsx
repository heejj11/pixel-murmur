import { Audio } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import { staticFile } from "remotion";
import { SceneObject } from "./SceneObject";
import { SceneIdea } from "./SceneIdea";
import { ScenePurpose } from "./ScenePurpose";

export const PM013ExplainReel: React.FC = () => (
  <>
    <TransitionSeries>
      <TransitionSeries.Sequence
        durationInFrames={90}
        name="01 Object and function"
      >
        <SceneObject />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        durationInFrames={90}
        name="02 Design intention"
      >
        <SceneIdea />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        durationInFrames={90}
        name="03 Familiar gesture, new purpose"
      >
        <ScenePurpose />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <Audio
      src={staticFile("pm013/audio/pm013-original-mechanical-9s.wav")}
      volume={0.9}
    />
  </>
);

export const PM013ExplainCover: React.FC = () => <SceneObject cover />;
export const PM013ExplainCard: React.FC = () => <SceneObject />;
