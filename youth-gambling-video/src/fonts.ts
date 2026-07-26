import { continueRender, delayRender, staticFile } from "remotion";

export const FONT_FAMILY = "Noto Sans KR";

// Load bundled Noto Sans KR (Korean + Latin) from public/fonts so rendering
// needs no network access and no external font CDN. Rendering is blocked via
// delayRender() until every weight is ready.
const WEIGHTS = [400, 500, 700, 900] as const;
const SUBSETS = ["korean", "latin"] as const;

if (typeof document !== "undefined") {
  const handle = delayRender("Loading Noto Sans KR", {
    timeoutInMilliseconds: 120000,
    retries: 2,
  });

  const faces: FontFace[] = [];
  for (const weight of WEIGHTS) {
    for (const subset of SUBSETS) {
      const url = staticFile(`fonts/noto-sans-kr-${subset}-${weight}-normal.woff2`);
      const face = new FontFace(FONT_FAMILY, `url(${url}) format("woff2")`, {
        weight: String(weight),
        style: "normal",
        display: "swap",
      });
      faces.push(face);
      document.fonts.add(face);
    }
  }

  Promise.all(faces.map((f) => f.load()))
    .then(() => continueRender(handle))
    .catch((err) => {
      // Don't hang the render if a face fails; fall back to system fonts.
      console.error("Font load failed", err);
      continueRender(handle);
    });
}
