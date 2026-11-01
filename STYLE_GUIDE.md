# Portfolio Style Guide

## 1. Design direction

The portfolio should feel like a focused graphics programmer's workspace: dark, precise, technical, and personal without resembling a generic developer template.

The visual thesis is **technical editorial minimalism**:

- near-black surfaces;
- restrained grey-green contrast;
- one clear green accent;
- condensed display typography supported by monospace interface text;
- strong project media;
- thin borders and dividers;
- sparse, functional motion;
- generous spacing without oversized decorative sections.

The current design is the baseline. Preserve and extend it. New work may introduce a needed pattern, but it should look native to the existing site and must not quietly redesign established sections.

## 2. Design tokens

The canonical tokens live in `app/globals.css`.

| Token | Current value | Use |
| --- | --- | --- |
| `--bg` | `#090b0a` | Page background |
| `--panel` | `#101310` | Cards and contained dark surfaces |
| `--line` | `#2a302a` | Visible borders |
| `--line-soft` | `#1c211d` | Quiet dividers |
| `--text` | `#f1f4ef` | Primary text |
| `--muted` | `#9da69d` | Body copy and secondary text |
| `--quiet` | `#6f786f` | Tertiary labels |
| `--accent` | `#72d572` | Links, numbering, focus, active emphasis |
| `--accent-strong` | `#72d572` | Strong accent state |
| `--shell` | `min(1180px, calc(100vw - 48px))` | Desktop content width |

Use the accent sparingly. Green communicates emphasis, interaction, numbering, and status; it is not a general background color.

Do not introduce additional bright accent colors without a clear project-specific reason and explicit approval. Project imagery may contain its natural colors.

## 3. Typography

### Roles

- `--display-tech`: primary headings, project copy, project details, About copy, and other prominent editorial text.
- `--font-mono`: navigation, labels, numbering, compact technology marks, and technical metadata.
- `--font-sans`: document fallback and general UI text where neither specialized role applies.

### Current families

- Display: Bahnschrift, DIN Alternate, Arial Narrow, sans-serif
- Monospace: system monospace, Cascadia Code, SFMono-Regular, Consolas
- Sans: IBM Plex Sans, Inter, Aptos, Segoe UI, sans-serif

### Hierarchy

- Hero name: condensed, light-weight, large, and tightly tracked.
- Project title: condensed display type with a strong image-readable shadow.
- Project subtitle: smaller display type, always visible.
- Section labels: small uppercase monospace with green numbering and a quiet horizontal rule.
- Project description: `1.02rem`, muted display type, `1.6` line-height.
- Project detail labels and values: the same `1.02rem` size as the description so the information does not visually shrink below the narrative.
- About copy: `1.12rem` display type.
- Small interface labels may be below body size, but meaningful body content should stay at or above `1rem`.

Do not add multiple new typefaces or use heavy bold text as the main source of hierarchy. Hierarchy should come from scale, spacing, contrast, and the established display/mono roles.

## 4. Layout and spacing

- Use the shared `.shell` container.
- Desktop content uses a maximum width of 1180px with 24px minimum side gutters.
- At `820px` and below, side gutters become 16px and content is capped at 680px.
- Major sections use generous fluid top spacing through `clamp()`.
- Keep the single-page order:
  1. Projects
  2. Competencies
  3. About
- Retain the numbered section-label pattern and its trailing rule.
- Align content deliberately; do not center every section by default.
- Use thin rules to separate information when a new heading would create unnecessary hierarchy.

Spacing should feel calm and deliberate. Avoid both cramped clusters and large empty areas that do not help the reading flow.

## 5. Header and navigation

- The header remains sticky with a translucent near-black surface, subtle bottom border, and backdrop blur.
- Keep the compact `WV` brand mark in green.
- On desktop, primary navigation remains centered between the brand and social links.
- At `820px` and below, keep the compact 64px header with WV, social links and a 44px dropdown menu button. Close the dropdown on selection, Escape, an outside press or focus leaving the header.
- Navigation labels stay short: Projects, Competencies, About.
- Social links use recognizable icons with accessible names.
- Hover and focus may shift color to green and move by at most a few pixels.
- The mobile dropdown opens and closes with a restrained 180ms height transition, short fade and 4px movement. The menu button has subtle press feedback. Keep closed links inert and respect reduced motion.
- Preserve the skip link and visible focus treatment.

## 6. Hero

- The hero introduces Wäinö directly; it is not a marketing splash screen.
- Keep the name, concise role statement, Helsinki location, single primary action, and portrait.
- In the introduction, highlight only “computer graphics” and “building user-friendly apps” in green; keep the education phrase muted.
- The location indicator may use its subtle animated green signal.
- The portrait stays compact and secondary to the introduction.
- On entry, the name types in over 1000ms. After 150ms, the introduction types in word by word at 110ms per word, with letters appearing left to right within each word. Each letter fades in briefly (120ms in the name, 100ms in the introduction); upcoming characters stay fully invisible. A thin green typing cursor follows the newest letter and disappears when typing ends. Word reveals overlap slightly so the entrance stays continuous. Play once per page load, keep the portrait static, and show the finished copy immediately for reduced motion. Keep the text cells in place when finished so there is no final layout snap.
- On smaller screens, the portrait moves above the copy and remains intentionally small.
- Keep the name and introduction visually hidden before the number reveal starts, with their space reserved. Initialize the digit state before showing them; never flash the finished text before hydration. Reduced-motion and JavaScript-disabled visitors see the finished copy directly.
- Avoid adding extra CTAs, statistics, badges, slogans, or decorative background graphics without a clear request.

## 7. Project presentation

Projects are the visual focus of the portfolio.

### Card structure

- Desktop cards use a `16 / 10` aspect ratio.
- Cards use a thin border, approximately 10px radius, and the panel background.
- Project imagery or video fills the card with `object-fit: cover`.
- The title and descriptive subtitle remain centered and visible before interaction.
- Technology marks and the repository indicator remain visible near the bottom.
- Technology marks should be recognizable and visually balanced, not presented as a row of heavy boxed badges.
- The GitHub mark includes the small green external-link arrow to communicate that the card opens another site.

### Hover and focus

- Hovering or focusing anywhere within the complete project entry starts the project video and reveals the description.
- Moving from the media card into the description keeps playback active.
- Leaving the entry pauses playback and resets it.
- The poster-to-video change is a short opacity transition.
- Do not darken, dim, blur, or scale the project media on hover.
- Do not hide the title, subtitle, technologies, or GitHub indicator until hover.

### Mobile

- At `820px` and below, the project grid becomes one column.
- At `620px` and below, the project card uses a 440px minimum height instead of a fixed aspect ratio.
- On touch-first devices, project descriptions are visible without hover.
- Muted inline video begins when approximately 45% of the card is visible and pauses when it leaves that state.
- Disable automatic playback for reduced-motion users and users with data-saving enabled.

### Description and details

- The description heading uses the green `//` prefix.
- Body links are green, underlined, and become light on hover/focus.
- Use paragraph spacing rather than manual line breaks.
- Separate project details from the prose with one subtle full-width divider.
- Do not add a second decorative heading above the details unless multiple detail groups make it necessary.
- Detail labels and values use the same body size as the description.
- On narrow screens, reduce the label column width rather than shrinking the type.

New projects should reuse this structure unless the project's medium genuinely calls for another presentation.

## 8. Competencies

- Group skills by meaningful category rather than presenting one undifferentiated logo wall.
- Keep icons large enough to scan and use consistent visual weight.
- Labels appear through the existing compact tooltip treatment on hover and keyboard focus.
- Wordmarks are acceptable when a clean, legitimate icon is unavailable.
- Do not add a competency merely because it appears in a dependency; it should represent something Wäinö can discuss and use.
- Preserve keyboard access to each item.

## 9. About and writing voice

The About section should be concise, human, and relevant to the portfolio.

### Voice

- Direct and grounded
- Curious rather than self-congratulatory
- Technically specific where that helps
- Honest about learning and project scope
- Personal without becoming a full biography

### Content priorities

- Computer Science at Aalto University
- Mathematics minor
- Transition from Information Technology to Computer Science
- Interest in real-time graphics and low-level programming
- Relevant creative background when useful
- Brief interests outside study, such as bouldering, gym, and Japanese

Project copy should answer:

1. What is it?
2. What can a visitor or user do?
3. Which important techniques does it demonstrate?
4. What did Wäinö learn or own?

Avoid generic claims and long inventories with no explanation. Use standard technical capitalization: C++, GLSL, OpenGL, GitHub, LearnOpenGL, HDR, and Aalto University.

## 10. Motion

Motion should explain state or add a small amount of life.

Current timing language:

- Tooltips and small state changes: roughly 150–180ms
- Link/icon feedback: roughly 160ms
- Poster-to-video crossfade: roughly 220ms
- Project-description reveal: roughly 420ms with the established easing

### Scroll reveal

Later sections and the footer fade from transparent to opaque once, over 450ms, when their top passes 90% of the viewport height (`app/components/section-reveal.tsx`). Nothing slides or scales.

Visitors never wait for motion:

- An in-page link's target section appears without a fade.
- A section that is already on screen, or that has moved quickly past the halfway point of the viewport, appears without a fade.
- Under `prefers-reduced-motion`, nothing is hidden.

Keep transforms subtle: approximately 1–3px for hover feedback. Do not add continuous decorative animation beyond restrained status-like details.

Always preserve the `prefers-reduced-motion` fallback. Content must remain understandable and usable without animation.

## 11. Accessibility

- Maintain semantic landmarks, headings, lists, and description lists.
- Preserve the skip link.
- Every meaningful icon-only link needs an accessible name.
- Decorative imagery uses empty alt text; informative imagery uses concise meaningful alt text.
- Keyboard focus must reveal the same essential information as hover.
- Use the green 2px focus outline with sufficient offset.
- Do not rely on color alone to communicate an action.
- External links opened in a new tab use an appropriate `rel` value.
- Keep text readable at mobile widths and at enlarged browser text sizes.
- Never remove reduced-motion or data-saving safeguards from video behavior.

## 12. Extending the system

When adding a new section or component:

1. Confirm that it serves the portfolio's core purpose.
2. Reuse existing tokens and type roles.
3. Match the established border radius, divider, spacing, and motion language.
4. Design desktop, touch/mobile, keyboard, reduced-motion, and narrow-text behavior together.
5. Prefer adapting an existing component pattern over creating a competing one.
6. Update this guide when an approved decision becomes a reusable rule.

A redesign, new theme, new site architecture, or materially different interaction pattern requires explicit user direction. Ordinary additions should look as though they were always part of this portfolio.
