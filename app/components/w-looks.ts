import type { AsciiWLook } from "./ascii-w";

// Named W configurations from the tuner. "current" ones are used on the site;
// the v1 entries keep the earlier looks so we can switch back in one line.

type WConfig = {
  width: number;
  height: number;
  fontSize: number;
  speed?: number;
  look?: AsciiWLook;
};

export const heroW: Record<"current" | "v1", WConfig> = {
  // Chosen 2026-11-27 in the tuner.
  current: {
    width: 700,
    height: 460,
    fontSize: 7,
    speed: 1,
    look: {
      fill: 1.1,
      thickness: 0.11,
      depth: 0.18,
      tilt: -0.24,
      camera: 9.4,
      light: [-0.4, 0.55, -0.2],
      brightness: 0.1,
    },
  },
  // The first approved version (design canvas).
  v1: { width: 560, height: 440, fontSize: 10, speed: 1 },
};

export const footerW: Record<"current" | "v1" | "bold", WConfig> = {
  // Chosen 2026-11-27 in the tuner: smaller box, default look.
  current: { width: 80, height: 60, fontSize: 4, speed: 1 },
  // The first approved version (design canvas).
  v1: { width: 150, height: 110, fontSize: 6, speed: 0.6 },
  // Larger, bolder variant tried for legibility.
  bold: { width: 150, height: 110, fontSize: 6, speed: 0.6, look: { fill: 1.6, thickness: 0.16, tilt: 0.3, weight: 700 } },
};
