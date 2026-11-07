"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { GitHubIcon } from "./icons";

export function ObservatoryProject() {
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
        href="https://github.com/WainoVanska/The_Observatory"
        target="_blank"
        rel="noreferrer"
        aria-labelledby="observatory-title"
        aria-describedby="observatory-summary"
      >
        <div className="project-media" aria-hidden="true">
          <Image
            className="project-poster"
            src="/media/observatory.png"
            alt=""
            width={796}
            height={632}
            unoptimized
          />
          <video
            ref={videoRef}
            className={`project-video${isPlaying ? " is-playing" : ""}`}
            src="/media/observatory_showcase.mp4"
            poster="/media/observatory.png"
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>

        <div className="project-card-content">
          <div className="project-heading">
            <h2 id="observatory-title">The Observatory</h2>
            <p className="project-subtitle">Real-Time OpenGL Renderer</p>
          </div>

          <div className="project-tools" aria-label="Technologies and repository">
            <span
              className="project-tech-icon"
              role="img"
              aria-label="C++"
              title="C++"
            >
              <Image
                className="project-tech-logo"
                src="/skills/cplusplus.svg"
                alt=""
                width={36}
                height={36}
                unoptimized
              />
            </span>
            <span
              className="project-glsl-mark"
              role="img"
              aria-label="GLSL"
              title="GLSL"
            >
              GLSL
            </span>
            <span
              className="project-repo"
              role="img"
              aria-label="Open GitHub repository"
              title="Open GitHub repository"
            >
              <GitHubIcon />
              <span className="external-link-arrow" aria-hidden="true">↗</span>
            </span>
          </div>
        </div>
      </a>

      <section className="project-writeup" aria-labelledby="observatory-writeup-title">
        <div className="project-writeup-inner">
          <h3 id="observatory-writeup-title">Description</h3>


          <p id="observatory-summary">
            The Observatory is a real-time OpenGL renderer I built from the{" "}
            <a
              className="project-link"
              href="https://learnopengl.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LearnOpenGL
            </a>{" "}
            tutorials into one interactive space. Users can freely explore 
            the scene in first person and play around with the lighting, 
            post-processing, material and debugging features in a sandbox style 
            setting. The scene includes model loading, multiple light types, 
            directional and point shadows, normal and parallax mapping, 
            transparency, instancing, HDR, bloom, and post-processing.
          </p>

          <p>
            The repository contains{" "}
            <a
              className="project-link"
              href="https://github.com/WainoVanska/The_Observatory/tree/master/docs/learning-log"
              target="_blank"
              rel="noopener noreferrer"
            >
              weekly learning logs
            </a>{" "}
            where I&apos;ve documented my learning progress, the struggles I faced and my
            thoughts on the project development.
          </p>

          <div className="project-information">
            <dl>
              <div>
                <dt>Duration</dt>
                <dd>16 weeks during March–August 2026</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>Graphics programmer</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>C++, GLSL</dd>
              </div>
              <div>
                <dt>Technologies</dt>
                <dd>OpenGL 3.3 Core, GLFW, GLAD, GLM, Assimp</dd>
              </div>
              <div>
                <dt>Tools</dt>
                <dd>Visual Studio, GitHub, vcpkg</dd>
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
