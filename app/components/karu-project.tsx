"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FocusEvent } from "react";

// Same card behaviour as The Observatory (see AGENTS.md interaction rules). The card links to the public guest
// demo (the repository is private).
export function KaruProject() {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startVideo = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    setIsPlaying(true);
    void video.play().catch(() => {
      setIsPlaying(false);
    });
  };

  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    setIsPlaying(false);
    video.pause();
    video.currentTime = 0;
  };

  const startPointerVideo = () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      startVideo();
    }
  };

  const stopPointerVideo = () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      stopVideo();
    }
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      stopVideo();
    }
  };

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;

    if (!card || !video || typeof IntersectionObserver === "undefined") {
      return;
    }

    const mobileQuery = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    );
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean };
      }
    ).connection;

    if (
      !mobileQuery.matches ||
      reducedMotionQuery.matches ||
      connection?.saveData
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          setIsPlaying(true);
          void video.play().catch(() => {
            setIsPlaying(false);
          });
          return;
        }

        setIsPlaying(false);
        video.pause();
      },
      { threshold: [0, 0.45] }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <article
      className="project-entry"
      onPointerEnter={startPointerVideo}
      onPointerLeave={stopPointerVideo}
      onFocus={startVideo}
      onBlur={handleBlur}
    >
      <a
        ref={cardRef}
        className="project-card"
        href="https://karu-demo.vercel.app"
        target="_blank"
        rel="noreferrer"
        aria-labelledby="karu-title"
        aria-describedby="karu-summary"
      >
        <div className="project-media" aria-hidden="true">
          {/* Laptop poster 16:10; up to 620px, where the card becomes 440px tall, the 4:5 phone poster. */}
          <picture>
            <source media="(max-width: 620px)" srcSet="/media/karu_poster_phone.jpg" />
            <Image
              className="project-poster karu-poster"
              src="/media/karu_poster.jpg"
              alt=""
              width={1280}
              height={800}
              unoptimized
            />
          </picture>
          <video
            ref={videoRef}
            className={`project-video${isPlaying ? " is-playing" : ""}`}
            src="/media/karu_showcase.mp4"
            poster="/media/karu_poster.jpg"
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>

        <div className="project-card-content">
          <div className="project-heading">
            <h2 id="karu-title">karu</h2>
            <p className="project-subtitle">Japanese Vocabulary App</p>
          </div>

          <div className="project-tools" aria-label="Demo">
            <span
              className="project-glsl-mark project-repo"
              role="img"
              aria-label="Try the demo"
              title="Try the demo"
            >
              Try the demo
              <span className="external-link-arrow" aria-hidden="true">↗</span>
            </span>
          </div>
        </div>
      </a>

      <section className="project-writeup" aria-labelledby="karu-writeup-title">
        <div className="project-writeup-inner">
          <h3 id="karu-writeup-title">Description</h3>

          <p id="karu-summary">
            karu is a Japanese vocabulary app for the web, a Chrome side panel
            and Android (in progress). You study one word at a time: guess it,
            show the answer and rate it Again or Good. An FSRS scheduler then
            decides when the word comes back.
          </p>

          <p>
            The words come from karu 5000, a deck I ranked by frequency in over
            175 million words of subtitles, novels, web pages and social posts,
            with meanings from JMdict and example sentences from Tatoeba. Its
            first 1,500 words beat a widely recommended beginner deck of the
            same size on every text I tested. A coverage view shows how much of
            a Japanese article or video you&apos;d already understand.
          </p>

          <p>
            I designed the product and its architecture, and built karu by
            directing AI coding tools: I wrote the specifications, the tools
            wrote the TypeScript, and I reviewed, debugged and tested what they
            produced.
          </p>

          <div className="project-information">
            <dl>
              <div>
                <dt>Duration</dt>
                <dd>July 2026 – present</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>Product design, architecture, review and testing</dd>
              </div>
              <div>
                <dt>Built with</dt>
                <dd>AI coding tools (Claude Code), directed and reviewed by me</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>React, TypeScript, Supabase, IndexedDB, FSRS</dd>
              </div>
              <div>
                <dt>Content</dt>
                <dd>karu 5000: 5,000 words ranked by frequency (JMdict, Tatoeba)</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>In development. Try it in the browser: no account, progress stays on your device.</dd>
              </div>
              <div>
                <dt>Team</dt>
                <dd>Solo project</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </article>
  );
}
