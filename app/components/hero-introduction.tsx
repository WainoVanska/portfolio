"use client";

import { Fragment, useEffect, useRef } from "react";

const name = "Wäinö Vänskä";
const introduction = "I’m a computer science student at Aalto University with an interest in computer graphics and building user-friendly apps.";
const words = introduction.split(" ");
const settings = {
  nameDuration: 1000,
  gap: 150,
  wordDuration: 110,
};

// Keep the same text cells before, during and after the reveal: replacing them
// with a plain text node at the end changes font shaping and causes a snap.
function TextWord({ text, accent = false }: { text: string; accent?: boolean }) {
  return (
    <span className="decode-word">
      {Array.from(text).map((letter, index) => (
        <span
          className={`decode-cell${accent && letter !== "." ? " text-accent" : ""}`}
          key={index}
        >
          <span className="decode-letter">{letter}</span>
        </span>
      ))}
    </span>
  );
}

export function HeroIntroduction() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const heading = nameRef.current;
    const intro = introRef.current;
    if (!heading || !intro) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nameCells = Array.from(heading.querySelectorAll<HTMLElement>(".decode-cell"));
    const sentenceWords = Array.from(intro.querySelectorAll<HTMLElement>(".decode-word"));
    const sentenceCells = sentenceWords.map(word => Array.from(word.querySelectorAll<HTMLElement>(".decode-cell")));
    let frame = 0;
    let disposed = false;
    let cursor: HTMLElement | null = null;

    // A green typing cursor sits after the newest letter, or before the first one.
    function setCursor(cell: HTMLElement | null, position?: "before" | "after") {
      if (cursor && cursor !== cell) cursor.removeAttribute("data-cursor");
      cursor = cell;
      if (cell && position) cell.dataset.cursor = position;
    }

    function finish() {
      cancelAnimationFrame(frame);
      setCursor(null);
      heading!.classList.remove("is-decoding", "decode-awaiting");
      intro!.classList.remove("is-decoding", "decode-awaiting");
    }

    function start() {
      if (disposed) return;
      if (motion.matches) {
        finish();
        return;
      }
      heading!.classList.add("is-decoding");
      intro!.classList.add("is-decoding");
      const startTime = performance.now();
      const sentenceStart = settings.nameDuration + settings.gap;
      const total = sentenceStart + (sentenceWords.length - 1) * settings.wordDuration + 240;

      // Same schedule as before: each letter starts appearing at its own time
      // and fades in over a short crossfade.
      const nameTiming = nameCells.map((cell, index) => ({
        cell,
        start: index / Math.max(1, nameCells.length - 1) * (settings.nameDuration - 300) + 180,
        fade: 120,
      }));
      const sentenceTiming = sentenceCells.flatMap((cells, index) =>
        cells.map((cell, letter) => ({
          cell,
          start: sentenceStart + index * settings.wordDuration + letter / Math.max(1, cells.length - 1) * 40 + 100,
          fade: 100,
        }))
      );

      function ease(value: number) {
        const t = Math.max(0, Math.min(1, value));
        return t * t * (3 - 2 * t);
      }

      function type(timing: typeof nameTiming, elapsed: number) {
        let typed = 0;
        timing.forEach(({ cell, start, fade }) => {
          cell.style.setProperty("--decode-reveal", String(ease((elapsed - start) / fade)));
          if (elapsed >= start) typed++;
        });
        return typed;
      }

      function draw(now: number) {
        if (disposed) return;
        const elapsed = now - startTime;
        const nameTyped = type(nameTiming, elapsed);
        const sentenceTyped = type(sentenceTiming, elapsed);

        if (elapsed < settings.nameDuration) {
          setCursor(nameCells[Math.max(0, nameTyped - 1)], nameTyped ? "after" : "before");
        } else if (elapsed >= sentenceStart) {
          setCursor(sentenceTiming[Math.max(0, sentenceTyped - 1)].cell, sentenceTyped ? "after" : "before");
        } else {
          setCursor(null);
        }

        if (elapsed < total) frame = requestAnimationFrame(draw);
        else finish();
      }
      // Hide every letter before exposing either text block.
      // The server-rendered awaiting state prevents a flash before hydration.
      draw(startTime);
      heading!.classList.remove("decode-awaiting");
      intro!.classList.remove("decode-awaiting");
    }

    function onMotionChange() {
      if (motion.matches) finish();
    }
    // Wait for font metrics so late font loading cannot shift the reveal.
    void document.fonts.ready.then(start);
    motion.addEventListener("change", onMotionChange);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <>
      <noscript>
        <style>{`.decode-awaiting > [aria-hidden="true"] { visibility: visible; }`}</style>
      </noscript>
      <h1 className="decode-awaiting" ref={nameRef} aria-label={name}>
        <span aria-hidden="true">
          {name.split(" ").map((word, index) => (
            <Fragment key={index}>{index > 0 ? " " : null}<TextWord text={word} /></Fragment>
          ))}
        </span>
      </h1>
      <p className="hero-intro decode-awaiting" ref={introRef}>
        <span className="decode-accessible">{introduction}</span>
        <span aria-hidden="true">
          {words.map((word, index) => (
            <Fragment key={index}>
              {index > 0 ? " " : null}
              <TextWord text={word} accent={index === 12 || index === 13 || index >= 15} />
            </Fragment>
          ))}
        </span>
      </p>
    </>
  );
}
