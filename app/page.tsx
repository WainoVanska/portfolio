import Image from "next/image";
import { SiteHeader } from "./components/site-header";
import { ObservatoryProject } from "./components/observatory-project";
import { SectionLabel } from "./components/section-label";
import { skillGroups } from "./data/skills";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main-content">
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <h1>Wäinö Vänskä</h1>
            <p className="hero-intro">
              I’m a computer science student at Aalto University{" "}
              with an interest in <span className="text-accent">computer graphics</span> and{" "}
              <span className="text-accent">building user-friendly apps</span>.
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
              sizes="(max-width: 350px) 54px, (max-width: 820px) 64px, 280px"
              priority
              unoptimized
            />
          </figure>
        </section>

        <section className="projects shell section" id="projects">
          <SectionLabel number="01" title="Projects" />

          <div className="project-grid">
            <ObservatoryProject />
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
                      <span className="skill-mobile-label" aria-hidden="true">{skill.name}</span>
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

