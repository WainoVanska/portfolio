"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { GitHubIcon } from "./icons";

export function ObservatoryProject() {
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

  return (
    <article className="project-entry">
      <a
        className="project-card"
        href="https://github.com/WainoVanska/graphics_learning_repository"
        target="_blank"
        rel="noreferrer"
        aria-labelledby="observatory-title"
        aria-describedby="observatory-summary"
        onPointerEnter={startVideo}
        onPointerLeave={stopVideo}
        onFocus={startVideo}
        onBlur={stopVideo}
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
            src="/media/planet_and_asteroids.mp4"
            poster="/media/observatory.png"
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>

        <div className="project-card-content">
          <div className="project-heading">
            <h2 id="observatory-title">Observatory Scene</h2>
            <p className="project-subtitle">Real-Time OpenGL Renderer</p>
          </div>

          <div className="project-tools" aria-label="Technologies and repository">
            <span className="project-tool project-tool-primary">C++</span>
            <span className="project-tool">GLSL</span>
            <span className="project-tool project-repo">
              <GitHubIcon /> GitHub <span aria-hidden="true">↗</span>
            </span>
          </div>
        </div>
      </a>

      <section className="project-writeup" aria-labelledby="observatory-writeup-title">
        <div className="project-writeup-inner">
          <h3 id="observatory-writeup-title">Description</h3>
          <p id="observatory-summary">
            Observatory Scene is a real-time OpenGL renderer I built over 16 weeks
            to turn graphics exercises from the{" "}
            <a
              className="project-link"
              href="https://learnopengl.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LearnOpenGL
            </a>{" "}
            tutorials into one interactive scene. The project brings together model
            loading, multiple light types, directional and point shadows, normal and
            parallax mapping, transparency, instancing, HDR, bloom, and
            post-processing.
          </p>

          <p>
            This project gave me a practical understanding of the complete rendering
            pipeline: how data moves from application code to shaders, how
            framebuffer passes create an image and how graphics rendering works in
            real time. The repository contains{" "}
            <a
              className="project-link"
              href="https://github.com/WainoVanska/graphics_learning_repository/tree/master/learning_log"
              target="_blank"
              rel="noopener noreferrer"
            >
              weekly learning logs
            </a>{" "}
            where I documented my learning progress, the struggles I faced and my
            thoughts on the project development.
          </p>
        </div>
      </section>
    </article>
  );
}
