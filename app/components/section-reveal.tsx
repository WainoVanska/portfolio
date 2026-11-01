"use client";

import { useEffect } from "react";

// A section starts its scroll fade once its top passes this share of the viewport.
const revealLine = 0.9;
// A section found above this share of the viewport appeared too fast to fade.
const instantLine = 0.5;

// Fades later sections in once as they enter the viewport, without ever
// making a visitor wait: link targets and fast-scrolled sections appear at once.
export function SectionReveal() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const later = Array.from(
      document.querySelectorAll<HTMLElement>("main > section:not(.hero), .site-footer")
    );
    const hidden = new Set<HTMLElement>();
    const fading = new Set<HTMLElement>();

    function withoutTransition(el: HTMLElement, change: () => void) {
      el.style.transition = "none";
      change();
      el.getBoundingClientRect();
      el.style.transition = "";
    }

    function showNow(el: HTMLElement) {
      hidden.delete(el);
      fading.delete(el);
      withoutTransition(el, () => el.classList.remove("is-reveal-hidden"));
    }

    function checkReveals() {
      const height = window.innerHeight;

      // Fast scrolling overtakes a running fade; finish it.
      for (const el of Array.from(fading)) {
        if (el.getBoundingClientRect().top < height * instantLine) {
          fading.delete(el);
          withoutTransition(el, () => {});
        }
      }

      for (const el of Array.from(hidden)) {
        const { top, bottom } = el.getBoundingClientRect();
        // Short elements at the page end may never pass the line, so full visibility also counts.
        if (top >= height * revealLine && bottom > height + 1) continue;

        if (top < height * instantLine) {
          showNow(el);
        } else {
          hidden.delete(el);
          fading.add(el);
          el.classList.remove("is-reveal-hidden");
        }
      }
    }

    const onScroll = () => {
      if (hidden.size > 0 || fading.size > 0) checkReveals();
    };

    // In-page links always land on visible content.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
      const target = link && document.getElementById(link.getAttribute("href")!.slice(1));
      if (!target) return;
      later.forEach((el) => {
        if (el.contains(target)) showNow(el);
      });
    };

    const onFocus = (event: FocusEvent) => {
      later.forEach((el) => {
        if (el.contains(event.target as Node)) showNow(el);
      });
    };

    const onMotionChange = () => {
      if (motion.matches) Array.from(hidden).forEach(showNow);
    };

    // Only sections fully below the first screen are hidden, so nothing visible disappears.
    later.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      hidden.add(el);
      withoutTransition(el, () => el.classList.add("reveal-target", "is-reveal-hidden"));
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocus);
    motion.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocus);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return null;
}
