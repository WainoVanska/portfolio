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
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Competencies</a>
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
            <h1>Hello, I’m Wäinö Vänskä.</h1>
            <p className="hero-intro">
              I’m a <span className="text-accent">computer science student</span>{" "}
              focused on <span className="text-accent">real-time rendering</span>,{" "}
              <span className="text-accent">graphics programming</span>, and the
              systems that turn data into images.
            </p>
            <p className="eyebrow">
              <span className="live-dot" aria-hidden="true" />
              Aalto University · Helsinki
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
              width={600}
              height={600}
              priority
              unoptimized
            />
          </figure>
        </section>

        <section className="about shell section" id="about">
          <SectionLabel number="01" title="About" />
          <div className="about-layout">
            <p>
              I’m studying <span className="text-accent">Computer Science at Aalto University</span>{" "}
              with a <span className="text-accent">minor in Mathematics</span>.{" "}
              <span className="text-accent">Computer graphics</span> is where the
              subjects I enjoy most—systems, visual problem-solving, and applied
              math—meet.
            </p>
          </div>
        </section>

        <section className="projects shell section" id="projects">
          <SectionLabel number="02" title="Projects" />

          <div className="project-grid">
            <a
              className="project-card"
              href="https://github.com/WainoVanska/graphics_learning_repository"
              target="_blank"
              rel="noreferrer"
              aria-labelledby="observatory-title"
              aria-describedby="observatory-description"
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
                  <p className="project-description" id="observatory-description">
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
          </div>
        </section>

        <section className="skills shell section" id="skills">
          <SectionLabel number="03" title="Competencies" />

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
