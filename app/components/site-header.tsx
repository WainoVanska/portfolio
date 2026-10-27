"use client";

import { useEffect, useRef, useState } from "react";
import { GitHubIcon, LinkedInIcon } from "./icons";

const sections = [
  ["#projects", "Projects"],
  ["#skills", "Competencies"],
  ["#about", "About"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const handlePointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handlePointer);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handlePointer);
    };
  }, [open]);

  return (
    <header className="site-header" ref={headerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}>
      <div className="header-inner shell">
        <a className="brand" href="#top" aria-label="Wäinö Vänskä, back to top" onClick={() => setOpen(false)}>WV</a>
        <nav className="site-nav" aria-label="Primary navigation">
          {sections.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <nav className="social-nav" aria-label="Social links">
          <a href="https://github.com/WainoVanska" target="_blank" rel="noreferrer" aria-label="GitHub profile"><GitHubIcon /></a>
          <a href="https://www.linkedin.com/in/waino-vanska/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><LinkedInIcon /></a>
        </nav>
        <button ref={toggleRef} className="mobile-menu-toggle" type="button"
          aria-expanded={open} aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </div>
      <nav className="mobile-navigation shell" id="mobile-navigation" aria-label="Mobile navigation" hidden={!open}>
        {sections.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>
          </a>
        ))}
      </nav>
    </header>
  );
}
