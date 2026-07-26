import { Composition } from "remotion";
import { GamblingAwareness, TOTAL_DURATION } from "./GamblingAwareness";
import { FPS, HEIGHT, WIDTH } from "./theme";

export const MyComposition = () => {
  return (
    <Composition
      id="YouthGambling"
      component={GamblingAwareness}
      durationInFrames={TOTAL_DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
