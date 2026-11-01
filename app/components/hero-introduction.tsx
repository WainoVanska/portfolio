"use client";

import { Fragment, useEffect, useRef } from "react";

const name = "Wäinö Vänskä";
const introduction = "I’m a computer science student at Aalto University with an interest in computer graphics and building user-friendly apps.";
const words = introduction.split(" ");
const settings = {
  nameDuration: 1000,
  gap: 150,
  wordDuration: 110,
  refresh: 110,
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
          data-digit="0"
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

    function finish() {
      cancelAnimationFrame(frame);
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
      let lastTick = -1;

      function ease(value: number) {
        const t = Math.max(0, Math.min(1, value));
        return t * t * (3 - 2 * t);
      }

      function reveal(cell: HTMLElement, age: number, settle: number, fade: number) {
        cell.style.setProperty("--decode-presence", String(ease(age / 100)));
        cell.style.setProperty("--decode-reveal", String(ease((age - settle) / fade)));
      }

      function draw(now: number) {
        if (disposed) return;
        const elapsed = now - startTime;
        const tick = Math.floor(elapsed / settings.refresh);
        nameCells.forEach((cell, index) => {
          const enter = index / Math.max(1, nameCells.length - 1) * (settings.nameDuration - 300);
          reveal(cell, elapsed - enter, 180, 120);
          if (tick !== lastTick) cell.dataset.digit = String((tick * 7 + index * 3 + Math.floor(tick / 3)) % 10);
        });
        sentenceWords.forEach((_, index) => {
          const wordStart = sentenceStart + index * settings.wordDuration;
          sentenceCells[index].forEach((cell, letter) => {
            const enter = wordStart + letter / Math.max(1, sentenceCells[index].length - 1) * 40;
            reveal(cell, elapsed - enter, 100, 100);
            if (tick !== lastTick) cell.dataset.digit = String((tick * 3 + index * 7 + letter * 9 + Math.floor(tick / 2)) % 10);
          });
        });
        lastTick = tick;
        if (elapsed < total) frame = requestAnimationFrame(draw);
        else finish();
      }
      // Set every cell to its first digit before exposing either text block.
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
