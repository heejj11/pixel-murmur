import { Audio } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import { staticFile } from "remotion";
import { SceneCharge } from "./SceneCharge";
import { SceneTake } from "./SceneTake";
import { SceneReturn } from "./SceneReturn";

// Cuts keep both the product and the typography visible from frame zero.
// These are animated still renders, not a demonstration of a working prototype.
export const PM001RetestReel: React.FC = () => (
  <>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90} name="01 Phone charging">
        <SceneCharge />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        durationInFrames={60}
        name="02 Take the battery"
      >
        <SceneTake />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        durationInFrames={90}
        name="03 Return to the dock"
      >
        <SceneReturn />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <Audio
      src={staticFile("pm001/audio/pm001-original-music-12s-v02.wav")}
      volume={0.8}
    />
  </>
);

export const PM001RetestX: React.FC = () => (
  <>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={60} name="01 Phone charging">
        <SceneCharge />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        durationInFrames={60}
        name="02 Take the battery"
      >
        <SceneTake />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        durationInFrames={60}
        name="03 Return to the dock"
      >
        <SceneReturn />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <Audio
      src={staticFile("pm001/audio/pm001-original-music-loop-6s-v02.wav")}
      volume={0.8}
    />
  </>
);

export const PM001RetestCover: React.FC = () => <SceneCharge cover />;
