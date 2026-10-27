# AGENTS.md

## Purpose

This repository contains Wäinö Vänskä's personal graphics-programming portfolio. The site presents his work clearly and credibly to recruiters, professors, collaborators, and other graphics programmers.

The portfolio is intentionally focused. Preserve its restrained technical character and make additions only when they strengthen the presentation of real work.

## Required reading

Before changing UI, layout, copy, media, responsive behavior, or interaction:

1. Read this file.
2. Read [STYLE_GUIDE.md](STYLE_GUIDE.md).
3. Inspect the current implementation in the files affected by the request.
4. Treat the current working site and the style guide together as the source of truth.

If the implementation and guide disagree, do not silently choose one. Determine whether the code reflects a newer deliberate decision, preserve current working behavior, and update the guide when the user approves a changed rule.

## Stack and structure

- Next.js App Router
- React and TypeScript
- Tailwind CSS imported globally, with the established interface primarily implemented in `app/globals.css`
- Static export
- npm and `package-lock.json`

Important files:

- `app/page.tsx`: page structure and portfolio copy
- `app/globals.css`: design tokens, layout, responsive rules, and interaction styling
- `app/components/observatory-project.tsx`: Observatory project card, video behavior, description, and project details
- `app/components/section-label.tsx`: numbered section labels
- `app/components/icons.tsx`: shared social icons
- `app/data/skills.ts`: competency groups and assets
- `public/media/`: portfolio images and video
- `public/skills/`: competency and technology marks

## Product rules

- Preserve the section order: `01 Projects`, `02 Competencies`, `03 About`.
- Preserve the current single-page structure unless the user explicitly requests a structural change.
- Preserve the dark grey-green visual system and technical editorial tone.
- Extend existing patterns before inventing new ones.
- Do not redesign established sections, replace the palette, or introduce a new component language without an explicit request.
- Do not add generic portfolio filler, decorative sections, speculative skills, progress bars, or unsupported claims.
- Keep graphics projects as the strongest visual and narrative focus.
- Keep external project links accurate. The Observatory repository is `https://github.com/WainoVanska/The_Observatory`.
- Do not change content or interactions outside the requested scope merely to make the code look cleaner.

## Interaction rules

The current project interaction is deliberate:

- The project title, subtitle, C++ mark, GLSL mark, GitHub icon, and external-link arrow remain visible without hover.
- Desktop hover or keyboard focus reveals the project description and starts the project video.
- Moving the pointer from the card into its description must keep the video playing.
- Leaving the complete project entry pauses the video and resets it to the start.
- Do not dim or scale the project image on hover.
- On mobile, a short introduction stays visible and native “Project details” expands the longer description and metadata. The muted inline video plays on touch-first devices when roughly 45% of the card is visible, then pauses offscreen.
- Respect `prefers-reduced-motion` and data-saving mode.
- New project cards should follow the same behavior unless their media or content requires an explicitly approved variation.

## Copy rules

- Write in clear, direct English and use first person where appropriate.
- Prefer concrete facts over promotional language.
- Explain what was built, what a visitor can do, the important techniques involved, and what was learned.
- Keep headings compact and descriptive.
- Avoid inflated claims such as "cutting-edge", "revolutionary", or "expert" unless independently justified.
- Preserve the user's personal voice: curious, technically serious, and honest about learning.
- Do not rewrite user-authored copy unless the request includes copy editing.
- Use the exact spelling `Wäinö Vänskä`, `Computer Science`, `Aalto University`, and `The Observatory`.

## Implementation discipline

- Make the smallest coherent change that fully satisfies the request.
- Reuse current CSS variables, typography roles, spacing patterns, and breakpoints.
- Prefer semantic HTML and accessible names.
- Keep keyboard and touch behavior equivalent to pointer behavior where applicable.
- Preserve responsive behavior at the established `820px`, `620px`, and `520px` breakpoints unless a new requirement genuinely needs another breakpoint.
- Preserve user changes and unrelated work. Never discard or overwrite them.
- Avoid broad refactors during visual or copy tasks.
- Do not add dependencies when the current stack can implement the request.
- Keep `package-lock.json` aligned with `package.json` if dependencies are intentionally changed.

## Verification

For code changes, run the checks relevant to the change:

```bash
npm run lint
npm run build
```

Also verify, as applicable:

- No TypeScript, lint, or build errors.
- No unintended horizontal scrolling.
- Desktop and mobile layouts remain readable.
- Focus indicators and keyboard navigation still work.
- Project hover, focus, mobile autoplay, reduced-motion, and data-saving behavior remain intact.
- External links use `target="_blank"` with an appropriate `rel` value.
- Static assets resolve correctly in the exported site.

Do not claim that a check passed unless it was actually run.

## Git workflow

- The working branch is `main`.
- For analysis, review, or advice-only requests, do not commit or push.
- Commit and push only when the user's request explicitly asks to apply or push the change.
- Before pushing, incorporate the latest `origin/main` without discarding local or user-authored work.
- Use focused, descriptive commit messages.
- Never force-push unless the user explicitly requests it and the exact consequences are understood.
- If a conflict could overwrite user work, stop and ask rather than guessing.

