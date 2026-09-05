export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Wäinö Vänskä, back to top">
          WV<span>/</span>CG
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
            <p className="eyebrow"><span className="live-dot" aria-hidden="true" />Aalto University · Helsinki</p>
            <h1>Hello, I’m Wäinö Vänskä.</h1>
            <p className="hero-intro">
              I’m a computer science student focused on real-time rendering, graphics programming, and the systems that turn data into images.
            </p>
            <div className="hero-actions" aria-label="Profile links">
              <a className="button button-primary" href="#projects">View projects <span aria-hidden="true">↓</span></a>
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

          <dl className="hero-meta">
            <div><dt>Current role</dt><dd>BSc student</dd></div>
            <div><dt>Focus</dt><dd>Real-time rendering</dd></div>
            <div><dt>Core tools</dt><dd>C++ · GLSL · OpenGL</dd></div>
          </dl>

          <figure className="render-window">
            <div className="render-bar">
              <span>OBSERVATORY_SCENE / REALTIME</span>
              <span>OPENGL 3.3</span>
            </div>
            <div className="render-image">
              <img
                src="/media/observatory.png"
                alt="The Observatory Scene: a brick room opening into space with a planet, asteroid ring, lights, and imported models"
              />
              <div className="corner corner-tl" aria-hidden="true" />
              <div className="corner corner-tr" aria-hidden="true" />
              <div className="corner corner-bl" aria-hidden="true" />
              <div className="corner corner-br" aria-hidden="true" />
            </div>
            <figcaption>
              <span>Latest scene build</span>
              <span>Personal project · 2026</span>
            </figcaption>
          </figure>
        </section>

        <section className="project shell section" id="projects">
          <div className="section-label"><span>01</span> Projects</div>

          <div className="project-intro">
            <div>
              <p className="project-type">REAL-TIME RENDERING STUDY</p>
              <h2>Observatory Scene</h2>
            </div>
            <div className="project-summary">
              <p>
                A solo, 16-week C++ and OpenGL learning project. I combined each new technique into one interactive scene so that every feature had to work alongside the systems that came before it.
              </p>
              <ul className="inline-facts" aria-label="Project facts">
                <li>Solo project</li>
                <li>OpenGL 3.3 Core</li>
                <li>Visual Studio / Windows</li>
              </ul>
            </div>
          </div>

          <div className="gallery-grid">
            <figure className="gallery-card gallery-main">
              <div className="media-crop">
                <img src="/media/surface-depth.png" alt="A normal-mapped brick wall reacting to a nearby point light" />
              </div>
              <figcaption><span>Surface detail</span><span>Tangent-space normal mapping</span></figcaption>
            </figure>

            <figure className="gallery-card">
              <div className="media-crop">
                <img src="/media/shadows.png" alt="Normal-mapped brick room receiving shadows from scene objects" />
              </div>
              <figcaption><span>Shadow integration</span><span>Lighting + depth</span></figcaption>
            </figure>

            <figure className="gallery-card">
              <div className="media-crop">
                <img src="/media/lamp.png" alt="Imported industrial wall lamp with textured metal and translucent glass" />
              </div>
              <figcaption><span>Imported materials</span><span>Metal + transparent glass</span></figcaption>
            </figure>
          </div>
        </section>

        <section className="about shell section" id="about">
          <div className="section-label"><span>02</span> About</div>
          <div className="about-layout">
            <div>
              <p>
                I’m studying Computer Science at Aalto University with a minor in Mathematics. Computer graphics is where the subjects I enjoy most—systems, visual problem-solving, and applied math—meet.
              </p>
              <p>
                This portfolio will grow as I add more graphics projects and deeper technical work.
              </p>
              <div className="about-links">
                <a href="https://github.com/WainoVanska" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
                <a href="https://www.linkedin.com/in/waino-vanska/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer shell">
        <span>Wäinö Vänskä · 2026</span>
        <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
      </footer>
    </>
  );
}
