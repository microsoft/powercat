# Fluent UI Redesign - Design Spec

**Date:** 2026-03-24
**Project:** Microsoft Power CAT landing page
**Goal:** Replace the existing Webflow-based static HTML site with a modern redesign using Fluent UI Web Components via CDN.

---

## Overview

The Power CAT landing page (`index.html`) is a single-page static HTML site hosted on GitHub Pages. It currently uses Webflow-generated CSS classes, jQuery, and custom CSS for layout and components. This redesign replaces those with Fluent UI Web Components loaded from CDN, preserving all existing content and page structure.

---

## Architecture

### Dependencies

**Remove:**
- `assets/css/normalize.css`
- `assets/css/components.css`
- `assets/css/powercat-landing-page.css`
- `assets/js/jquery.min.js`
- `assets/js/powercat-landing-page.js`
- All Webflow class attributes (`w-nav`, `w-layout-grid`, `w-nav-menu`, `w-nav-brand`, `w-nav-button`, `w-icon-nav-menu`, `w-clearfix`, `w-button`, `w-inline-block`, `w-hidden-main`, `data-collapse`, `data-animation`, `data-duration`, `data-doc-height`, `data-ix`, `data-wf-page`, `data-wf-site`)

**Add:**
- `@fluentui/web-components` loaded as an ES module from CDN (jsDelivr). This auto-registers all Fluent custom elements.
- `assets/css/fluent-layout.css` - a new stylesheet using Fluent CSS custom property tokens for all layout, spacing, color, and typography that is not handled by Fluent components directly.

### Fluent Components Used

| Component | Usage |
|---|---|
| `<fluent-button>` | Mobile nav toggle |
| `<fluent-anchor-button>` | Nav links, card CTAs |
| `<fluent-card>` | Tool, program, guidance, story, and resource cards |
| `<fluent-text>` | All headings and body text |

### Fluent Design Tokens Used (CSS custom properties)

- `--colorNeutralBackground1` - primary page background
- `--colorNeutralBackground2` - alternate section backgrounds (Programs, Resources)
- `--colorBrandBackground` - hero section background accent
- `--colorNeutralForeground1` - primary text
- `--fontSizeBase300` through `--fontSizeHero700` - typography scale
- `--spacingVerticalXXL`, `--spacingHorizontalXXL` - section padding
- `--shadow4`, `--shadow8` - card elevation

---

## Navigation

**Structure:** Single `<header>` element replaces the current dual desktop/mobile nav.

**Desktop layout:** Logo/title text on the left, nav links on the right as `<fluent-anchor-button appearance="subtle">` elements linking to page anchors (Tools, Programs, Guidance, Stories, Resources).

**Mobile layout (below 768px):** Nav links hidden, replaced by a hamburger `<fluent-button>` that toggles a `nav-open` CSS class on the header, revealing links stacked vertically. No jQuery -- pure CSS and a small inline script.

**Sticky behavior:** `position: sticky; top: 0` with `--colorNeutralBackground1` background and a bottom border using `--colorNeutralStroke2`.

---

## Hero Section

**Container:** Full-width section with `--colorNeutralBackground2` background, CSS grid two-column layout (text left, image right).

**Text block:**
- `<fluent-text as="h1" size="800" weight="semibold">` for "Microsoft Power Customer Advisory Team"
- `<fluent-text as="p" size="400">` for the two body paragraphs

**Image:** Existing `images/header.png`, hidden below 991px via media query (same as today).

**Responsive:** Single column stacked on mobile.

---

## Content Sections (Tools, Programs, Guidance, Stories, Resources)

All five sections follow the same pattern:

**Section layout:** Full-width wrapper, CSS grid with a narrow label column on the left and a card grid on the right (matching today's `product5-grid` layout). On mobile, single column.

**Section label:**
- `<fluent-text as="h2" size="700" weight="semibold">` for section title
- `<fluent-text as="p" size="400">` for section description

**Card grid:** CSS grid, 2 columns on desktop, 1 column on mobile, with `--spacingHorizontalL` gap.

**Each card (`<fluent-card>`):**
- Product image at top (existing `images/*.png` files, kept as-is)
- `<fluent-text as="h3" size="500" weight="semibold">` for card title
- `<fluent-text as="p" size="300">` for card description
- `<fluent-anchor-button appearance="primary" href="..." target="_blank">` for "Learn More" CTA

**Card styling:** White background with Fluent `--shadow4` elevation. The current dark-colored card backgrounds are removed in favor of Fluent's default card surface.

**Alternating section backgrounds:**
- White (`--colorNeutralBackground1`): Tools, Guidance, Stories
- Light grey (`--colorNeutralBackground2`): Programs, Resources

---

## Footer

Simple centered `<footer>` containing the existing `images/footer2.png` image with `--spacingVerticalXXL` padding top and bottom.

---

## Files Changed

| File | Action |
|---|---|
| `index.html` | Full rewrite using Fluent components |
| `assets/css/fluent-layout.css` | New file - layout and token overrides |
| `assets/css/powercat-landing-page.css` | Delete |
| `assets/css/components.css` | Delete |
| `assets/css/normalize.css` | Delete (Fluent handles resets) |
| `assets/js/powercat-landing-page.js` | Delete |
| `assets/js/jquery.min.js` | Delete |

All images, fonts, and other assets are unchanged.

---

## Out of Scope

- Content changes (all text and links stay exactly as they are today)
- Adding new sections or removing existing ones
- Dark mode toggle (Fluent supports it, but not adding it now)
- Converting to a framework (React, Vue, etc.)
- Build pipeline changes
