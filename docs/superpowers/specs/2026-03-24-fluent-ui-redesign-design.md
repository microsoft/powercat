# Fluent UI Redesign - Design Spec

**Date:** 2026-03-24
**Project:** Microsoft Power CAT landing page
**Goal:** Replace the existing Webflow-based static HTML site with a modern redesign using Fluent UI Web Components via CDN.

---

## Overview

The Power CAT landing page (`index.html`) is a single-page static HTML site hosted on GitHub Pages. It currently uses Webflow-generated CSS classes, jQuery, and custom CSS for layout and components. This redesign replaces those with Fluent UI Web Components v3 loaded from CDN, preserving all existing content, meta tags, and page structure.

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
- The existing inline `<style>` block. It contains two rules: a dead `iframe { border-radius }` rule, and an `#headerimg` hide rule that is live. The `#headerimg` rule must be migrated to `fluent-layout.css` (see Hero Section).
- The Webflow touch-detection inline `<script>` (the minified IIFE on lines 16-17 that adds `w-mod-js` / `w-mod-touch` classes to `<html>`). This is Webflow-specific and no longer needed once all Webflow CSS is removed.

**Add:**

- `@fluentui/web-components` v3 loaded as an ES module, pinned to the current stable minor:

  ```html
  <script type="module" src="https://cdn.jsdelivr.net/npm/@fluentui/web-components@3/dist/web-components.min.js"></script>
  ```

  Pin to `@3` (major version) to track v3 patch/minor updates while avoiding breaking changes from a v4 bump.

- `assets/css/fluent-layout.css` - a new stylesheet using Fluent CSS custom property tokens for all layout, spacing, color, and typography not handled by Fluent components directly.

**Preserve unchanged:**

- All `<meta>` tags (charset, description, og:description, og:title, og:image, viewport)
- Favicon and apple-touch-icon links
- All image files, fonts, and other static assets

### Fluent Components Used

| Component | Usage |
|---|---|
| `<fluent-button>` | Mobile nav toggle |
| `<fluent-anchor-button appearance="subtle">` | Desktop nav links |
| `<fluent-anchor-button appearance="primary">` | Card CTAs |
| `<fluent-text>` | Inline text styling (size, weight) |

**Note on `<fluent-card>`:** This component does not exist in Fluent UI Web Components v3. Card surfaces are implemented as plain `<div class="card">` elements styled in `fluent-layout.css` using Fluent design tokens (`--colorNeutralBackground1`, `--shadow4`, `--borderRadiusMedium`).

**Note on `<fluent-text>` and semantic headings:** The `<fluent-text>` component does not support an `as` attribute and always renders as a `<span>`. For correct heading hierarchy and accessibility, wrap `<fluent-text>` inside native heading elements:

```html
<h1><fluent-text size="800" weight="semibold">...</fluent-text></h1>
<h2><fluent-text size="700" weight="semibold">...</fluent-text></h2>
<h3><fluent-text size="500" weight="semibold">...</fluent-text></h3>
<p><fluent-text size="400">...</fluent-text></p>
```

### Fluent Design Tokens Used (CSS custom properties)

- `--colorNeutralBackground1` - primary page background and card surface
- `--colorNeutralBackground2` - alternate section backgrounds (Programs, Resources) and hero
- `--colorNeutralForeground1` - primary text
- `--colorNeutralStroke2` - nav bottom border
- `--fontSizeBase300` through `--fontSizeHero700` - typography scale (used in `fluent-layout.css` for non-fluent-text elements)
- `--spacingVerticalXXL`, `--spacingHorizontalXXL` - section padding
- `--shadow4` - card elevation
- `--borderRadiusMedium` - card border radius

---

## Navigation

**Structure:** Single `<header>` element replaces the current dual desktop/mobile nav. The current nav HTML in `index.html` has structural bugs (unclosed `<nav>` and `<div>` tags) that must not be carried forward.

**Desktop layout:** Logo/title text on the left, nav links on the right as `<fluent-anchor-button appearance="subtle">` elements linking to page anchors (Tools, Programs, Guidance, Stories, Resources).

**Mobile layout (below 768px):** Nav links hidden, replaced by a hamburger `<fluent-button>` that toggles a `nav-open` CSS class on the header, revealing links stacked vertically. No jQuery. A small `<script>` tag inline at the bottom of `<body>` handles the toggle -- no new JS file is created:

```js
document.getElementById('nav-toggle').addEventListener('click', function() {
  document.querySelector('header').classList.toggle('nav-open');
});
```

**Sticky behavior:** `position: sticky; top: 0` with `--colorNeutralBackground1` background and a bottom border using `--colorNeutralStroke2`.

---

## Hero Section

**Container:** Full-width section with `--colorNeutralBackground2` background, CSS grid two-column layout (text left, image right).

**Text block:**

```html
<h1><fluent-text size="800" weight="semibold">Microsoft Power Customer Advisory Team</fluent-text></h1>
<p><fluent-text size="400">We are the Power Customer Advisory Team...</fluent-text></p>
```

**Image:** Existing `images/header.png`, hidden below 991px via media query (same as today). The `#headerimg` hide rule from the current inline style must be carried forward into `fluent-layout.css`:

```css
@media screen and (max-width: 991px) {
  #headerimg { display: none; }
}
```

**Responsive:** Single column stacked on mobile.

---

## Content Sections (Tools, Programs, Guidance, Stories, Resources)

All five sections follow the same pattern:

**Section layout:** Full-width wrapper, CSS grid with a narrow label column on the left and a card grid on the right (matching today's `product5-grid` layout). On mobile, single column.

**Section label:**

```html
<h2><fluent-text size="700" weight="semibold">Tools</fluent-text></h2>
<p><fluent-text size="400">Section description...</fluent-text></p>
```

**Card grid:** CSS grid, 2 columns on desktop, 1 column on mobile, with `--spacingHorizontalL` gap.

**Each card (`<div class="card">`):**
- Product image at top (existing `images/*.png` files, kept as-is)
- `<h3><fluent-text size="500" weight="semibold">` for card title
- `<p><fluent-text size="300">` for card description
- `<fluent-anchor-button appearance="primary" href="..." target="_blank">` for "Learn More" CTA

**Card styling:** White background (`--colorNeutralBackground1`), `--shadow4` elevation, `--borderRadiusMedium` border radius, applied via `fluent-layout.css`. The current dark-colored card backgrounds are removed.

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
| `index.html` | Full rewrite using Fluent components; meta/favicon tags preserved |
| `assets/css/fluent-layout.css` | New file - layout, card surfaces, and token overrides |
| `assets/css/powercat-landing-page.css` | Delete |
| `assets/css/components.css` | Delete |
| `assets/css/normalize.css` | Delete (Fluent handles resets) |
| `assets/js/powercat-landing-page.js` | Delete |
| `assets/js/jquery.min.js` | Delete |

All images, fonts, and other assets are unchanged.

---

## Out of Scope

- Content changes (all text and links stay exactly as they are today; missing standard OG tags such as `og:type` are not added)
- Adding new sections or removing existing ones
- Dark mode toggle (Fluent supports it, but not adding it now)
- Converting to a framework (React, Vue, etc.)
- Build pipeline changes
