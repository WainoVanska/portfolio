import Image from "next/image";
import { GitHubIcon, LinkedInIcon } from "./components/icons";
import { SectionLabel } from "./components/section-label";
import { skillGroups } from "./data/skills";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="header-inner shell">
          <a className="brand" href="#top" aria-label="Wäinö Vänskä, back to top">
            WV
          </a>

          <nav className="site-nav" aria-label="Primary navigation">
            <a href="#projects">Projects</a>
            <a href="#skills">Competencies</a>
            <a href="#about">About</a>
          </nav>

          <nav className="social-nav" aria-label="Social links">
            <a
              href="https://github.com/WainoVanska"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/waino-vanska/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <h1>Wäinö Vänskä</h1>
            <p className="hero-intro">
              I’m a <span className="text-accent">computer science student at Aalto University</span>{" "}
              with a curiosity in <span className="text-accent">computer graphics</span> and{" "}
              <span className="text-accent">low-level programming</span>.
            </p>
            <p className="eyebrow">
              <span className="live-dot" aria-hidden="true" />
              Helsinki, Finland
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button button-primary" href="#projects">
                View projects <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <figure className="hero-portrait">
            <Image
              src="/media/waino-vanska.jpg"
              alt="Portrait of Wäinö Vänskä"
              fill
              sizes="(max-width: 820px) 160px, 280px"
              priority
              unoptimized
            />
          </figure>
        </section>

        <section className="projects shell section" id="projects">
          <SectionLabel number="01" title="Projects" />

          <div className="project-grid">
            <article className="project-entry">
              <a
                className="project-card"
                href="https://github.com/WainoVanska/graphics_learning_repository"
                target="_blank"
                rel="noreferrer"
                aria-labelledby="observatory-title"
                aria-describedby="observatory-summary"
              >
                <Image
                  src="/media/observatory.png"
                  alt="The Observatory Scene: a brick room opening into space with a planet, asteroid ring, lights, and imported models"
                  width={796}
                  height={632}
                  unoptimized
                />
                <div className="project-overlay">
                  <div className="project-copy">
                    <p className="project-meta">2026</p>
                    <h2 id="observatory-title">Observatory Scene</h2>
                    <p className="project-description" id="observatory-summary">
                      A 16-week C++ and OpenGL renderer combining lighting, shadow
                      maps, surface detail, HDR bloom, model loading, and instanced
                      rendering in one interactive scene.
                    </p>
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
                  <p>
                    Observatory Scene is a real-time OpenGL renderer I built over 16
                    weeks to turn graphics exercises from the
                    <a className="project-link" href="https://learnopengl.com/" target="_blank" rel="noopener noreferrer"> LearnOpenGL </a> 
                    tutorials into one interactive scene. The project brings
                    together model loading, multiple light types, directional and
                    point shadows, normal and parallax mapping, transparency,
                    instancing, HDR, bloom, and post-processing. 
                  </p>

                  <p>
                    This project gave me a practical understanding of the complete rendering pipeline:
                    how data moves from application code to shaders, how framebuffer
                    passes create an image and how graphics rendering works in real-time. 
                    The repository contains <a className="project-link" href="https://github.com/WainoVanska/graphics_learning_repository/tree/master/learning_log" 
                    target="_blank" rel="noopener noreferrer"> weekly learning logs</a> where I documented 
                    my learning progress, the struggles I faced and my thoughts on the project development.
                  </p>
                  
                </div>
              </section>
            </article>
          </div>
        </section>

        <section className="skills shell section" id="skills">
          <SectionLabel number="02" title="Competencies" />

          <div className="skill-groups">
            {skillGroups.map((group) => (
              <section
                className="skill-group"
                key={group.id}
                aria-labelledby={`skill-group-${group.id}`}
              >
                <h3 id={`skill-group-${group.id}`}>{group.name}</h3>
                <ul className="skills-grid">
                  {group.skills.map((skill) => (
                    <li
                      className="skill-item"
                      key={skill.name}
                      tabIndex={0}
                      aria-label={`${skill.name}: ${skill.label}`}
                    >
                      {skill.icon ? (
                        <Image
                          className={`skill-logo${skill.wide ? " skill-logo-wide" : ""}`}
                          src={skill.icon}
                          alt=""
                          width={skill.wide ? 108 : 62}
                          height={62}
                          unoptimized
                          aria-hidden="true"
                        />
                      ) : (
                        <span className="skill-wordmark" aria-hidden="true">
                          {skill.wordmark}
                        </span>
                      )}
                      <span className="skill-tooltip" aria-hidden="true">
                        {skill.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section className="about shell section" id="about">
          <SectionLabel number="03" title="About" />
          <div className="about-layout">
            <p>
              I’m studying <span className="text-accent">Computer Science at Aalto University</span>{" "}
              with a <span className="text-accent">minor in Mathematics</span>.
              I began my studies in Information Technology 
              before transferring to Computer Science after my first year, due 
              to my growing interest in creating real-time rendered realistic virtual scenes.
            </p>

            <p>
              Outside of my studies, I enjoy bouldering, going to the gym, and learning Japanese.
            </p>
            {/*
              <p>
                Before moving into technology, I spent the years from 13 to 23
                making music and acting, producing
                my own songs in FL Studio, but
                eventually wanted to apply that passion of creation and learning to something
                more technical. I’ve always wanted to create things and understand
                how the technology behind everything works, so I figured the next step was
                learning programming. 
              </p>
            */}

          </div>
        </section>
      </main>

      <footer className="site-footer shell">
        <span>Wäinö Vänskä · 2026</span>
        <a href="#top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </>
  );
}
