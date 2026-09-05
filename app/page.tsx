export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Wäinö Vänskä, back to top">
          WV
        </a>

        <nav aria-label="Primary navigation">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
        </nav>

        <a
          className="header-link"
          href="https://github.com/WainoVanska"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
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
            <div className="hero-actions" aria-label="Profile links">
              <a className="button button-primary" href="#projects">
                View projects <span aria-hidden="true">↓</span>
              </a>
              <a
                className="button button-secondary"
                href="https://www.linkedin.com/in/waino-vanska/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="projects shell section" id="projects">
          <div className="section-label">
            <span>01</span> Projects
          </div>

          <div className="project-grid">
            <article
              className="project-card"
              tabIndex={0}
              aria-labelledby="observatory-title"
            >
              <img
                src="/media/observatory.png"
                alt="The Observatory Scene: a brick room opening into space with a planet, asteroid ring, lights, and imported models"
              />
              <div className="project-overlay">
                <p className="project-meta">Solo project · 2026</p>
                <h2 id="observatory-title">Observatory Scene</h2>
                <p className="project-description">
                  A 16-week C++ and OpenGL renderer combining lighting, shadow
                  maps, surface detail, HDR bloom, model loading, and instanced
                  rendering in one interactive scene.
                </p>
                <ul className="project-tags" aria-label="Technologies used">
                  <li>C++</li>
                  <li>GLSL</li>
                  <li>OpenGL 3.3</li>
                  <li>Assimp</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section className="about shell section" id="about">
          <div className="section-label">
            <span>02</span> About
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
              <a
                href="https://www.linkedin.com/in/waino-vanska/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
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
