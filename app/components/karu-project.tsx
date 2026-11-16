"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FocusEvent } from "react";

// Same card behaviour as The Observatory (see AGENTS.md interaction rules). The card is not a link yet:
// the repository is private and the public demo is not live, so it is focusable to reveal the description.
export function KaruProject() {
  const cardRef = useRef<HTMLDivElement>(null);
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
      <div
        ref={cardRef}
        className="project-card project-card-static project-card-corner"
        tabIndex={0}
        role="group"
        aria-labelledby="karu-title"
        aria-describedby="karu-summary"
      >
        <div className="project-media" aria-hidden="true">
          <Image
            className="project-poster"
            src="/media/karu.jpg"
            alt=""
            width={1280}
            height={800}
            unoptimized
          />
          <video
            ref={videoRef}
            className={`project-video${isPlaying ? " is-playing" : ""}`}
            src="/media/karu_showcase.mp4"
            poster="/media/karu.jpg"
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

          <div className="project-tools">
            <span className="project-glsl-mark project-status">Demo soon</span>
          </div>
        </div>
      </div>

      <section className="project-writeup" aria-labelledby="karu-writeup-title">
        <div className="project-writeup-inner">
          <h3 id="karu-writeup-title">Description</h3>

          <p id="karu-summary">
            karu is a Japanese vocabulary app that runs on the web and in a
            Chrome side panel, with an Android version in progress. You study
            one word at a time: guess, show the answer and rate it Again or
            Good. An FSRS scheduler then decides when you see the word again.
          </p>

          <p>
            I designed the product and its architecture. Progress is saved on
            the device first and synced to your account through Supabase, and
            the website, the extension and the app share one study screen. I
            didn&apos;t hand-write the TypeScript. I built karu by directing AI
            coding tools; my part was writing the specifications and reviewing,
            debugging and testing what they produced.
          </p>

          <div className="project-information">
            <dl>
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
                <dd>karu 5000 deck from JMdict and Tatoeba</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>In development, public demo coming soon</dd>
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
