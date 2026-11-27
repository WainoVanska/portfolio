// Shared by the head script, the intro overlay and the hero; no "use client" so the
// server layout receives the real script string.

/** The intro overlay is kept but switched off: visitors see the hero immediately. Set to true to bring it back. */
export const INTRO_ENABLED = false;

export const STORAGE_KEY = "wv-intro-seen";
export const SHOW_MS = 2600;
export const FADE_MS = 300;
export const DONE_EVENT = "wv:intro-done";

// Runs in <head> before first paint: decides whether the server-rendered
// overlay is shown, so the page never flashes before the intro appears.
export const introDecisionScript = `(function(){var d=document.documentElement,on=false;try{on=${INTRO_ENABLED}&&!matchMedia('(prefers-reduced-motion: reduce)').matches;try{if(sessionStorage.getItem('${STORAGE_KEY}'))on=false;}catch(e){}}catch(e){on=false}d.setAttribute('data-intro',on?'on':'off');})();`;

/** Calls back once the intro overlay is gone (immediately when it never showed). */
export function whenIntroDone(callback: () => void) {
  if (document.documentElement.getAttribute("data-intro") !== "on") {
    callback();
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener(DONE_EVENT, handler, { once: true });
  return () => window.removeEventListener(DONE_EVENT, handler);
}

