const skills = [
  { name: "Scala", icon: "/skills/scala.svg", label: "Scala 3" },
  { name: "C", icon: "/skills/c.svg", label: "C17" },
  { name: "Python", icon: "/skills/python.svg", label: "Python 3" },
  { name: "C++", icon: "/skills/cplusplus.svg", label: "C++17" },
  { name: "Figma", icon: "/skills/figma.svg", label: "Figma" },
  { name: "Unity", icon: "/skills/unity.svg", label: "Unity" },
  { name: "GLSL", wordmark: "GLSL", label: "GLSL 330" },
  {
    name: "OpenGL",
    icon: "/skills/opengl.svg",
    label: "OpenGL 3.3 Core",
    wide: true,
  },
];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.82a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5.2 7.6A2.1 2.1 0 1 0 5.2 3.4a2.1 2.1 0 0 0 0 4.2ZM3.4 20.6H7V9.2H3.4v11.4Zm5.7 0h3.6v-6.3c0-1.66.31-3.27 2.38-3.27 2.04 0 2.06 1.9 2.06 3.38v6.19h3.6v-6.98c0-3.43-.74-6.07-4.75-6.07-1.93 0-3.22 1.06-3.74 2.06h-.05V9.2H9.1v11.4Z"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="header-inner shell">
          <div className="header-left">
            <a className="brand" href="#top" aria-label="Wäinö Vänskä, back to top">
              WV
            </a>
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

          <nav className="site-nav" aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="live-dot" aria-hidden="true" />
              Aalto University · Helsinki
            </p>
            <h1>Hello, I’m Wäinö Vänskä.</h1>
            <p className="hero-intro">
              I’m a computer science student focused on real-time rendering,
              graphics programming, and the systems that turn data into images.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button button-primary" href="#projects">
                View projects <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <figure className="hero-portrait">
            <img src="/media/waino-vanska.jpg" alt="Portrait of Wäinö Vänskä" />
          </figure>
        </section>

        <section className="about shell section" id="about">
          <div className="section-label">
            <span>01</span> About
          </div>
          <div className="about-layout">
            <p>
              I’m studying Computer Science at Aalto University with a minor in
              Mathematics. Computer graphics is where the subjects I enjoy
              most—systems, visual problem-solving, and applied math—meet.
            </p>
            <div className="about-links">
              <a
                href="https://github.com/WainoVanska"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="projects shell section" id="projects">
          <div className="section-label">
            <span>02</span> Projects
          </div>

          <div className="project-grid">
            <a
              className="project-card"
              href="https://github.com/WainoVanska/graphics_learning_repository"
              target="_blank"
              rel="noreferrer"
              aria-labelledby="observatory-title"
              aria-describedby="observatory-description"
            >
              <img
                src="/media/observatory.png"
                alt="The Observatory Scene: a brick room opening into space with a planet, asteroid ring, lights, and imported models"
              />
              <div className="project-overlay">
                <div className="project-copy">
                  <p className="project-meta">Solo project · 2026</p>
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
          <div className="section-label">
            <span>03</span> Skills
          </div>

          <ul className="skills-grid" aria-label="Technical skills">
            {skills.map((skill) => (
              <li
                className="skill-item"
                key={skill.name}
                tabIndex={0}
                aria-label={`${skill.name}: ${skill.label}`}
              >
                {skill.icon ? (
                  <img
                    className={`skill-logo${skill.wide ? " skill-logo-wide" : ""}`}
                    src={skill.icon}
                    alt=""
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
