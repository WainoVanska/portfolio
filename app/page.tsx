const systems = [
  {
    index: "01",
    title: "Omnidirectional shadows",
    copy: "Point-light depth is captured into a six-face cubemap, then filtered with percentage-closer sampling for softer, more stable edges.",
    tags: ["Depth cubemap", "PCF", "Bias tuning"],
  },
  {
    index: "02",
    title: "Surface detail",
    copy: "Tangent-space normal mapping and parallax occlusion mapping add depth to the brick surfaces without changing their geometry.",
    tags: ["TBN", "Normal maps", "POM"],
  },
  {
    index: "03",
    title: "HDR & bloom",
    copy: "The scene renders into an HDR framebuffer, extracts bright fragments, applies a two-pass Gaussian blur, and composites the result before display.",
    tags: ["Multipass", "Ping-pong blur", "Tone mapping"],
  },
  {
    index: "04",
    title: "Instanced rendering",
    copy: "A large asteroid field reuses mesh data and supplies per-instance transforms, turning thousands of repeated objects into a practical stress test.",
    tags: ["Instancing", "Model matrices", "Performance"],
  },
];

const progress = [
  {
    weeks: "01—04",
    title: "First pixels",
    copy: "Triangle, indexed geometry, transforms, perspective projection, and a free-moving camera.",
  },
  {
    weeks: "05—08",
    title: "A lit scene",
    copy: "Textures, Blinn–Phong lighting, attenuation, model loading, a flashlight, and visual debug modes.",
  },
  {
    weeks: "09—12",
    title: "A rendering pipeline",
    copy: "Framebuffers, stencil outlines, transparency, MSAA, instancing, gamma correction, and shadow maps.",
  },
  {
    weeks: "13—16",
    title: "One cohesive build",
    copy: "Engine refactor, normal and parallax mapping, HDR bloom, cached shadows, and the observatory scene.",
  },
];

const pipeline = ["Geometry", "Shadow passes", "HDR scene", "Bright-pass + blur", "Composite"];

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
          <a href="#project">Project</a>
          <a href="#process">Process</a>
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
            <p className="hero-name">Wäinö Vänskä</p>
            <h1>Building a foundation in real-time graphics.</h1>
            <p className="hero-intro">
              I’m a computer science student learning how images reach the screen by building the rendering systems myself in C++ and OpenGL.
            </p>
            <div className="hero-actions" aria-label="Profile links">
              <a className="button button-primary" href="#project">Explore the project <span aria-hidden="true">↓</span></a>
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

        <section className="project shell section" id="project">
          <div className="section-label"><span>01</span> Featured project</div>

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

        <section className="systems shell section" aria-labelledby="systems-heading">
          <div className="section-label"><span>02</span> Selected systems</div>
          <div className="section-heading-row">
            <h2 id="systems-heading">What is running under the frame.</h2>
            <p>Each system was implemented as a learning exercise, then integrated into the same scene.</p>
          </div>

          <div className="systems-grid">
            {systems.map((system) => (
              <article className="system-card" key={system.index}>
                <span className="system-index">{system.index}</span>
                <h3>{system.title}</h3>
                <p>{system.copy}</p>
                <ul>
                  {system.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="pipeline shell section" aria-labelledby="pipeline-heading">
          <div className="section-label"><span>03</span> Frame path</div>
          <h2 id="pipeline-heading">From scene data to the final image.</h2>
          <ol className="pipeline-track">
            {pipeline.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="process shell section" id="process">
          <div className="section-label"><span>04</span> Engineering notes</div>
          <div className="process-layout">
            <div className="process-lead">
              <h2>The useful work happened where features collided.</h2>
              <p>
                Adding an effect in isolation was only the start. The harder part was keeping coordinate spaces, color spaces, depth passes, and materials consistent as the renderer grew.
              </p>
            </div>

            <div className="notes-list">
              <article>
                <span>COLOR PIPELINE</span>
                <h3>Fixing a washed-out gamma path</h3>
                <p>
                  Diffuse textures now enter as sRGB, lighting stays linear inside the HDR framebuffer, and tone mapping plus gamma encoding happen only in the final screen pass.
                </p>
              </article>
              <article>
                <span>SHADOW QUALITY</span>
                <h3>Separating shading normals from shadow geometry</h3>
                <p>
                  Normal maps influence lighting, while geometric normals guide shadow bias. This avoided treating surface detail as actual occluding geometry and reduced self-shadowing artifacts.
                </p>
              </article>
              <article>
                <span>CODEBASE GROWTH</span>
                <h3>Refactoring after the prototype outgrew one file</h3>
                <p>
                  The project was reorganized into app, engine, and scene layers, with shared uniform helpers and rendering loops replacing repeated setup code.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="progress shell section" aria-labelledby="progress-heading">
          <div className="section-label"><span>05</span> Progression</div>
          <div className="section-heading-row">
            <h2 id="progress-heading">Sixteen weeks, kept visible.</h2>
            <p>The repository preserves early experiments and weekly notes alongside the current scene.</p>
          </div>
          <ol className="progress-list">
            {progress.map((item) => (
              <li key={item.weeks}>
                <span>{item.weeks}</span>
                <div><h3>{item.title}</h3><p>{item.copy}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about shell section" id="about">
          <div className="section-label"><span>06</span> About</div>
          <div className="about-layout">
            <h2>Computer science, mathematics, and the machinery behind an image.</h2>
            <div>
              <p>
                I’m studying Computer Science at Aalto University with a minor in Mathematics. Computer graphics is where the subjects I enjoy most—systems, visual problem-solving, and applied math—meet.
              </p>
              <p>
                This project is deliberately a learning record: working results, imperfect experiments, debugging notes, and the reasoning that connected them.
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
