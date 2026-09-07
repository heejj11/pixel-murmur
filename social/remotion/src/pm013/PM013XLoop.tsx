import { Audio } from "@remotion/media";
import { Series, staticFile } from "remotion";
import { SceneCut } from "./SceneCut";
import { ScenePull } from "./ScenePull";
import { SceneReveal } from "./SceneReveal";

export const PM013XLoop: React.FC = () => {
  return (
    <>
      <Series>
        <Series.Sequence durationInFrames={72} name="01 Lift and pull">
          <ScenePull />
        </Series.Sequence>
        <Series.Sequence durationInFrames={48} name="02 Hang up to cut">
          <SceneCut />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60} name="03 Product reveal">
          <SceneReveal />
        </Series.Sequence>
      </Series>
      <Audio src={staticFile("pm013/audio/pm013-original-mechanical-6s.wav")} volume={0.9} />
    </>
  );
};
