"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { AsciiW } from "./ascii-w";
import { heroW } from "./w-looks";
import { whenIntroDone } from "./intro-state";

const name = "Wäinö Vänskä";
const location = "Helsinki, Finland";
const introduction = "I’m a computer science student at Aalto University with an interest in computer graphics and building user-friendly apps.";
const words = introduction.split(" ");
const scrambleGlyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const settings = {
  dotDuration: 300,
  locationStart: 220,
  locationStep: 38,
  locationSettle: 220,
  locationRefresh: 50,
  nameDuration: 1000,
  gap: 150,
  wordDuration: 110,
  refresh: 110,
};
// The name starts once the location has scrambled into place.
const nameStart = settings.locationStart + (location.length - 1) * settings.locationStep + settings.locationSettle + 80;

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
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLSpanElement>(null);
  const [showW, setShowW] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const heading = nameRef.current;
    const intro = introRef.current;
    const place = locationRef.current;
    if (!root || !heading || !intro || !place) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nameCells = Array.from(heading.querySelectorAll<HTMLElement>(".decode-cell"));
    const sentenceWords = Array.from(intro.querySelectorAll<HTMLElement>(".decode-word"));
    const sentenceCells = sentenceWords.map(word => Array.from(word.querySelectorAll<HTMLElement>(".decode-cell")));
    const placeCells = Array.from(place.querySelectorAll<HTMLElement>(".scramble-cell"));
    let frame = 0;
    let disposed = false;
    let wShown = false;

    function revealW() {
      if (wShown) return;
      wShown = true;
      setShowW(true);
    }

    function finish() {
      cancelAnimationFrame(frame);
      placeCells.forEach(cell => { cell.textContent = cell.dataset.final ?? ""; });
      root!.classList.remove("hero-awaiting", "hero-animating");
      heading!.classList.remove("is-decoding", "decode-awaiting");
      intro!.classList.remove("is-decoding", "decode-awaiting");
      revealW();
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
      const sentenceStart = nameStart + settings.nameDuration + settings.gap;
      const total = sentenceStart + (sentenceWords.length - 1) * settings.wordDuration + 240;
      let lastTick = -1;
      let lastScramble = -1;

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

        // 1. Green dot fades in.
        root!.style.setProperty("--dot-reveal", String(ease(elapsed / settings.dotDuration)));

        // 2. The location scrambles into place, left to right.
        const scrambleTick = Math.floor(elapsed / settings.locationRefresh);
        if (scrambleTick !== lastScramble) {
          placeCells.forEach((cell, index) => {
            const final = cell.dataset.final ?? "";
            const enter = settings.locationStart + index * settings.locationStep;
            if (final === " " || elapsed >= enter + settings.locationSettle) cell.textContent = final;
            else if (elapsed < enter) cell.textContent = " ";
            else cell.textContent = scrambleGlyphs[(scrambleTick * 7 + index * 13) % scrambleGlyphs.length];
          });
          lastScramble = scrambleTick;
        }

        // 3. The name, then 4. the introduction and the rest.
        const tick = Math.floor(elapsed / settings.refresh);
        nameCells.forEach((cell, index) => {
          const enter = nameStart + index / Math.max(1, nameCells.length - 1) * (settings.nameDuration - 300);
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
        root!.style.setProperty("--rest-reveal", String(ease((elapsed - sentenceStart) / 500)));
        lastTick = tick;

        // The W assembles in once the name has resolved.
        if (elapsed >= nameStart + settings.nameDuration) revealW();

        if (elapsed < total + 500) frame = requestAnimationFrame(draw);
        else finish();
      }
      // Set every cell to its first state before exposing the hero copy.
      // The server-rendered awaiting state prevents a flash before hydration.
      root!.classList.add("hero-animating");
      draw(startTime);
      root!.classList.remove("hero-awaiting");
      heading!.classList.remove("decode-awaiting");
      intro!.classList.remove("decode-awaiting");
    }

    function onMotionChange() {
      if (motion.matches) finish();
    }

    let stopWaiting = () => {};
    // Wait for font metrics so late font loading cannot shift the reveal,
    // and for the intro overlay so the reveal is actually seen.
    void document.fonts.ready.then(() => {
      if (!disposed) stopWaiting = whenIntroDone(start);
    });
    motion.addEventListener("change", onMotionChange);
    return () => {
      disposed = true;
      stopWaiting();
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div className="hero-layout hero-awaiting" ref={rootRef}>
      <noscript>
        <style>{`.decode-awaiting > [aria-hidden="true"], .hero-awaiting .eyebrow, .hero-awaiting .hero-actions { visibility: visible; }`}</style>
      </noscript>
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="live-dot" aria-hidden="true" />
          <span className="decode-accessible">{location}</span>
          <span ref={locationRef} aria-hidden="true">
            {Array.from(location).map((letter, index) => (
              <span className="scramble-cell" key={index} data-final={letter}>{letter}</span>
            ))}
          </span>
        </p>
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
        <div className="hero-actions" aria-label="Primary actions">
          <a className="button button-primary" href="#projects">
            View projects <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <div className="hero-w">
        <AsciiW
          {...heroW.current}
          assemble
          start={showW}
          label="A rotating letter W drawn live in green ASCII characters"
        />
      </div>
    </div>
  );
}
