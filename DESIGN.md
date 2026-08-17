# Design System — Microsoft Power CAT

## Product Context

- **What this is:** The public home for Microsoft Power Customer Advisory Team tools, guidance, resources, and customer stories. It helps people find practical, field-tested ways to succeed with Power Platform.
- **Who it is for:** Enterprise Power Platform customers, architects, makers, adoption leaders, and implementation teams.
- **Space:** Enterprise technology guidance and developer resources.
- **Project type:** Marketing and editorial resource site.
- **Memorable idea:** This is Microsoft's trusted, practical source for succeeding with Power Platform.

## Aesthetic Direction

- **Direction:** Practical Editorial.
- **Decoration level:** Intentional and restrained.
- **Mood:** Authoritative without distance. The site should feel edited by practitioners who have done the work, not assembled from a catalog of links.
- **Visual language:** Warm paper, deep ink, Microsoft blue, editorial type, clear section labels, hairline rules, and structured resource rows.
- **Reference sites:**
  - https://learn.microsoft.com/power-platform/
  - https://learn.microsoft.com/azure/architecture/
  - https://www.microsoft.com/power-platform
- **Deliberate difference:** Power CAT should be more curated than Microsoft Learn and less sales-oriented than the Power Platform marketing site.

### Trust Signals

Use concise evidence labels where they are accurate:

- Microsoft-authored
- Field-tested with customers
- Updated with a specific month and year

Do not use unsupported superlatives, decorative statistics, or vague claims.

## Typography

- **Display and hero:** Newsreader, weight 600. Use only for major editorial statements.
- **Body and UI:** Source Sans 3, weights 400, 600, and 700.
- **Labels and metadata:** Cascadia Mono, weight 500 or 600.
- **Compatibility fallback:** Segoe UI, followed by an appropriate generic family.
- **Code:** Cascadia Mono.
- **Loading:** Prefer self-hosted WOFF2 files for production. Google Fonts may be used for prototypes only.

### Type Scale

| Role | Desktop | Mobile | Weight | Line height |
|---|---:|---:|---:|---:|
| Display | 88px | 48px | 600 | 0.96 |
| H1 | 64px | 44px | 600 | 1.00 |
| H2 | 44px | 36px | 600 | 1.05 |
| H3 | 22px | 20px | 700 | 1.25 |
| Lead | 22px | 19px | 400 | 1.45 |
| Body | 17px | 16px | 400 | 1.55 |
| Small | 14px | 14px | 400 | 1.45 |
| Label | 12px | 12px | 600 | 1.30 |

- Use sentence case except for short monospaced labels.
- Keep body text between 45 and 75 characters per line.
- Use `text-wrap: balance` for display headings, not paragraphs.

## Color

- **Approach:** Restrained. Blue communicates action; neutrals carry the composition.

```css
:root {
  --color-field-paper: #f7f5f0;
  --color-surface: #ffffff;
  --color-deep-ink: #10243e;
  --color-body: #27384d;
  --color-muted-ink: #52606d;
  --color-rule: #d2cec4;
  --color-microsoft-blue: #0067b8;
  --color-link-blue: #0078d4;
  --color-success: #107c10;
  --color-warning: #986f0b;
  --color-error: #c42b1c;
  --color-info: #0067b8;
}
```

### Usage

- **Field Paper:** Default page background.
- **White:** Interactive resource rows and elevated surfaces.
- **Deep Ink:** Display headings and high-emphasis text.
- **Body:** Standard reading text.
- **Muted Ink:** Supporting copy and metadata.
- **Microsoft Blue:** Primary actions and active navigation.
- **Link Blue:** Inline links and directional CTAs.
- **Rule Gray:** Dividers, boundaries, and inactive controls.

Do not use gradients, decorative color washes, or blue for non-interactive emphasis.

### Dark Mode

Dark mode is optional, not automatic. If implemented, redesign surfaces rather than inverting colors:

```css
[data-theme="dark"] {
  --color-field-paper: #101820;
  --color-surface: #182635;
  --color-deep-ink: #f4f7fb;
  --color-body: #d6e0ea;
  --color-muted-ink: #aab8c6;
  --color-rule: #384b5e;
  --color-microsoft-blue: #4f9fe5;
  --color-link-blue: #62abeb;
}
```

Verify every foreground/background pair against WCAG 2.2 AA.

## Spacing

- **Base unit:** 8px.
- **Density:** Comfortable.

| Token | Value |
|---|---:|
| 2xs | 4px |
| xs | 8px |
| sm | 12px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |
| 4xl | 96px |
| 5xl | 128px |

- Interactive modules use 16–24px internal padding.
- Major sections use 64–96px vertical spacing.
- Use proximity before borders or background changes to communicate grouping.

## Layout

- **Approach:** Hybrid editorial.
- **Maximum canvas:** 1200px.
- **Reading measure:** 720px.
- **Desktop grid:** 12 columns with 24px gutters.
- **Tablet grid:** 8 columns with 20px gutters.
- **Mobile grid:** 4 columns with 16px gutters.
- **Breakpoints:** 540px, 768px, 991px, and 1200px.

### Composition

- The first viewport is an asymmetrical editorial composition, not a centered hero.
- Pair the primary statement with a task-oriented "Start here" index.
- Organize the page into clearly labeled sections: Tools, Guidance, Resources, and Customer Stories.
- Use structured resource rows by default. Use cards only when containment communicates a meaningful standalone object.
- Resource priority must be explicit. Do not hide editorial decisions behind equal-sized tiles.

### Shape and Elevation

- **Small radius:** 3px for buttons and compact controls.
- **Medium radius:** 4px for panels and resource surfaces.
- **Full radius:** Reserved for status indicators only.
- Prefer hairline rules and surface contrast over shadows.
- Shadows are allowed only when elevation communicates sticky or floating behavior.

## Components

### Primary Action

- Solid Microsoft Blue background with white text.
- Minimum height: 44px.
- Use one primary action per composition.

### Text Link and CTA

- Link Blue with an underline for inline links.
- Directional CTAs may use a right arrow.
- The label must describe the destination or outcome.

### Resource Row

- Entire row is clickable.
- Contains a compact mark, title, one-sentence description, and directional affordance.
- Title uses Deep Ink and weight 700.
- CTA or arrow uses Link Blue.
- Hover and focus may shift the arrow by no more than 4px.

### Section Label

- Cascadia Mono, 12px, weight 600.
- Use the concise category name, such as `Guidance`.
- Color: Microsoft Blue.

### Evidence Strip

- Short factual trust markers separated by rules.
- No icons unless the icon adds information.
- Must stack cleanly on narrow screens.

## Motion

- **Approach:** Minimal-functional.
- **Micro duration:** 100ms.
- **Short duration:** 150–200ms.
- **Medium duration:** 250–300ms.
- **Enter easing:** `ease-out`.
- **Exit easing:** `ease-in`.
- **Movement easing:** `ease-in-out`.

Use motion only to communicate hover, focus, expansion, navigation, or state change. Never animate for ambient decoration. Honor `prefers-reduced-motion`.

## Responsive Behavior

- Mobile is a prioritized composition, not a collapsed desktop layout.
- Hide secondary navigation behind a clearly labeled menu at 768px and below.
- Stack the hero before the "Start here" index.
- Keep section labels visible so users retain orientation.
- Resource rows may remove decorative marks before removing titles, descriptions, or CTAs.
- Touch targets must be at least 44 by 44px.
- Never rely on hover to reveal that an element is interactive.

## Accessibility

- Target WCAG 2.2 AA.
- Provide visible 3px focus indicators with at least 3:1 contrast.
- Maintain semantic heading order and landmark regions.
- Entire clickable rows must have one clear accessible name and no nested interactive elements.
- Decorative images use empty alt text; meaningful images describe their purpose.
- New-tab behavior must be used consistently and communicated when it could surprise users.
- Do not communicate meaning through color alone.

## Content Principles

- Lead with the user's task or outcome, not the internal program name.
- Prefer practical verbs: build, govern, choose, adopt, learn, and share.
- One sentence per resource description.
- Make curation visible through order, section structure, and concise context.
- Remove content that does not help a user choose or act.

## Anti-Patterns

- Generic walls of equal cards.
- Centered hero copy with decorative illustration.
- Purple or multicolor gradients.
- Floating decorative blobs or glass effects.
- Excessive rounded corners.
- Stock photography that does not provide evidence.
- Multiple competing primary actions.
- Vague CTA labels such as "Learn more."
- Motion without informational purpose.

## Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-08-17 | Adopt a practical editorial direction | Makes Power CAT feel curated, trusted, and practitioner-led rather than like another broad Microsoft catalog. |
| 2026-08-17 | Use Newsreader, Source Sans 3, and Cascadia Mono | Separates editorial judgment, readable guidance, and technical metadata while retaining Microsoft compatibility. |
| 2026-08-17 | Replace card-first layouts with clear sections and resource rows | Forces useful prioritization and improves scanning without losing clear click targets. |
| 2026-08-17 | Use warm paper neutrals with Microsoft Blue | Adds a human field-guide tone while preserving brand trust and action clarity. |
