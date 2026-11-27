"use client";

import { useEffect, useRef, useState } from "react";
import { AsciiW } from "./ascii-w";
import { DONE_EVENT, FADE_MS, SHOW_MS, STORAGE_KEY } from "./intro-state";

export function IntroOverlay() {
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-intro") !== "on") return;
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* storage unavailable */ }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the overlay only exists client-side once the head script chose to show it
    setActive(true);

    let hideTimer: number | undefined;
    let fadeTimer: number | undefined;
    let done = false;

    function finish() {
      if (done) return;
      done = true;
      window.clearTimeout(hideTimer);
      setLeaving(true);
      fadeTimer = window.setTimeout(() => {
        root.setAttribute("data-intro", "off");
        window.dispatchEvent(new Event(DONE_EVENT));
      }, FADE_MS);
    }
    skipRef.current = finish;
    hideTimer = window.setTimeout(finish, SHOW_MS);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(fadeTimer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="intro-overlay" data-leaving={leaving}>
      <AsciiW width={600} height={400} fontSize={10} assemble interactive={false} start={active} />
      <div className="intro-status">
        <span className="intro-initialising">
          INITIALISING <span className="intro-caret" aria-hidden="true">▌</span>
        </span>
        <button type="button" className="intro-skip" onClick={() => skipRef.current()}>
          SKIP <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
