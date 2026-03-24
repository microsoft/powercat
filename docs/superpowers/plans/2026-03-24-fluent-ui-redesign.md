# Fluent UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Webflow CSS/jQuery in the Power CAT landing page with Fluent UI Web Components v3 via CDN, preserving all content and meta tags.

**Architecture:** `index.html` is fully rewritten using Fluent custom elements (`<fluent-button>`, `<fluent-anchor-button>`, `<fluent-text>`) and native HTML heading elements for semantic structure. A new `assets/css/fluent-layout.css` uses Fluent CSS custom property tokens for all structural layout, card surfaces, and responsive breakpoints. No build step.

**Tech Stack:** Fluent UI Web Components v3 (CDN), plain HTML5, CSS custom properties (Fluent design tokens), no JavaScript framework.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `assets/css/fluent-layout.css` | Create | All layout, card surfaces, responsive rules, using Fluent tokens |
| `index.html` | Full rewrite | Page structure, Fluent components, preserved meta/favicon tags |
| `assets/css/powercat-landing-page.css` | Delete | Replaced by fluent-layout.css |
| `assets/css/components.css` | Delete | Replaced by fluent-layout.css |
| `assets/css/normalize.css` | Delete | Fluent handles resets |
| `assets/js/powercat-landing-page.js` | Delete | No longer needed |
| `assets/js/jquery.min.js` | Delete | No longer needed |

---

## Task 1: Create fluent-layout.css

**Files:**
- Create: `assets/css/fluent-layout.css`

- [ ] **Step 1: Create the file with complete layout rules**

```css
/* fluent-layout.css
   Uses Fluent UI Web Components v3 CSS custom property tokens.
   Tokens are injected into :root by the Fluent CDN script at runtime.
   Fallback values provided for any pre-render flash. */

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background-color: var(--colorNeutralBackground1, #ffffff);
  color: var(--colorNeutralForeground1, #242424);
}

/* ------------------------------------------------------------------ */
/* Navigation                                                           */
/* ------------------------------------------------------------------ */

header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--colorNeutralBackground1, #ffffff);
  border-bottom: 1px solid var(--colorNeutralStroke2, #e0e0e0);
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacingHorizontalXXL, 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
}

.nav-logo {
  font-size: var(--fontSizeBase400, 16px);
  font-weight: 600;
  color: var(--colorNeutralForeground1, #242424);
  text-decoration: none;
  line-height: 1.3;
}

.nav-links {
  display: flex;
  gap: var(--spacingHorizontalS, 8px);
  align-items: center;
}

.nav-toggle {
  display: none;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--spacingVerticalM, 12px) var(--spacingHorizontalXXL, 40px);
    border-top: 1px solid var(--colorNeutralStroke2, #e0e0e0);
    background-color: var(--colorNeutralBackground1, #ffffff);
  }

  header.nav-open .nav-links {
    display: flex;
  }

  .nav-toggle {
    display: block;
  }

  .nav-inner {
    flex-wrap: wrap;
    height: auto;
    padding-top: var(--spacingVerticalS, 6px);
    padding-bottom: var(--spacingVerticalS, 6px);
  }
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

#home {
  background-color: var(--colorNeutralBackground2, #f5f5f5);
  padding: var(--spacingVerticalXXL, 40px) var(--spacingHorizontalXXL, 40px);
}

.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacingHorizontalXXL, 40px);
  align-items: center;
}

.hero-text h1 {
  margin: 0 0 var(--spacingVerticalL, 20px);
}

.hero-text p {
  margin: 0 0 var(--spacingVerticalM, 12px);
}

.hero-text p:last-child {
  margin-bottom: 0;
}

@media (max-width: 991px) {
  #headerimg {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }
}

/* ------------------------------------------------------------------ */
/* Content sections                                                     */
/* ------------------------------------------------------------------ */

.section-wrapper {
  padding: var(--spacingVerticalXXL, 40px) var(--spacingHorizontalXXL, 40px);
  background-color: var(--colorNeutralBackground1, #ffffff);
}

.section-wrapper.grey {
  background-color: var(--colorNeutralBackground2, #f5f5f5);
}

.section-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--spacingHorizontalXXL, 40px);
  align-items: start;
}

.section-label h2 {
  margin: 0 0 var(--spacingVerticalM, 12px);
}

.section-label p {
  margin: 0;
  color: var(--colorNeutralForeground2, #616161);
}

/* ------------------------------------------------------------------ */
/* Card grid                                                            */
/* ------------------------------------------------------------------ */

.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacingHorizontalL, 16px);
}

.card {
  background-color: var(--colorNeutralBackground1, #ffffff);
  border-radius: var(--borderRadiusMedium, 4px);
  box-shadow: var(--shadow4, 0 2px 4px rgba(0,0,0,0.14));
  padding: var(--spacingVerticalL, 20px) var(--spacingHorizontalL, 16px);
  display: flex;
  flex-direction: column;
}

.card img {
  width: 80px;
  height: auto;
  margin-bottom: var(--spacingVerticalM, 12px);
}

.card h3 {
  margin: 0 0 var(--spacingVerticalS, 6px);
}

.card p {
  margin: 0 0 var(--spacingVerticalL, 20px);
  flex: 1;
  color: var(--colorNeutralForeground2, #616161);
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */

footer {
  padding: var(--spacingVerticalXXL, 40px) var(--spacingHorizontalXXL, 40px);
  text-align: center;
  background-color: var(--colorNeutralBackground1, #ffffff);
}

footer img {
  width: 30%;
  max-width: 300px;
}

/* ------------------------------------------------------------------ */
/* Responsive: single column below 768px                               */
/* ------------------------------------------------------------------ */

@media (max-width: 768px) {
  .section-inner {
    grid-template-columns: 1fr;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }

  #home,
  .section-wrapper,
  footer {
    padding-left: var(--spacingHorizontalL, 16px);
    padding-right: var(--spacingHorizontalL, 16px);
  }

  .nav-inner {
    padding-left: var(--spacingHorizontalL, 16px);
    padding-right: var(--spacingHorizontalL, 16px);
  }
}
```

- [ ] **Step 2: Verify the file exists**

```bash
ls -la assets/css/fluent-layout.css
```

Expected: file listed with non-zero size.

- [ ] **Step 3: Commit**

```bash
git add assets/css/fluent-layout.css
git commit -m "feat: add Fluent UI layout CSS with design tokens"
```

---

## Task 2: Rewrite index.html

**Files:**
- Modify: `index.html`

This task rewrites the file in a single step. The complete replacement HTML is provided below. Read through it carefully before writing -- all original content (text, links, image paths, alt text) is preserved exactly. The only changes are structure and components.

- [ ] **Step 1: Verify the current file before overwriting (read it)**

```bash
wc -l index.html
```

Expected: around 461 lines. If the line count is drastically different, stop and investigate before proceeding.

- [ ] **Step 2: Write the new index.html**

Replace the entire contents of `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Microsoft Power Customer Advisory Team</title>
  <meta name="description"
    content="Power CAT is dedicated to empowering organizations to achieve digital transformation at scale with Microsoft Power Platform."
    property="og:description">
  <meta content="Microsoft Power CAT" property="og:title">
  <meta name="image" property="og:image" content="https://microsoft.github.io/powercat/images/og-image.png">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <link href="assets/css/fluent-layout.css" rel="stylesheet" type="text/css">
  <script type="module" src="https://cdn.jsdelivr.net/npm/@fluentui/web-components@3/dist/web-components.min.js"></script>
  <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon">
  <link href="images/webclip.png" rel="apple-touch-icon">
</head>

<body>

  <!-- BEGIN: Navigation -->
  <header>
    <div class="nav-inner">
      <a href="#home" class="nav-logo">Microsoft<br>Power Customer Advisory Team</a>
      <nav class="nav-links" role="navigation" aria-label="Main navigation">
        <fluent-anchor-button appearance="subtle" href="#tools">TOOLS</fluent-anchor-button>
        <fluent-anchor-button appearance="subtle" href="#programs">PROGRAMS</fluent-anchor-button>
        <fluent-anchor-button appearance="subtle" href="#guidance">GUIDANCE</fluent-anchor-button>
        <fluent-anchor-button appearance="subtle" href="#stories">STORIES</fluent-anchor-button>
        <fluent-anchor-button appearance="subtle" href="#resources">RESOURCES</fluent-anchor-button>
      </nav>
      <fluent-button id="nav-toggle" appearance="subtle" class="nav-toggle" aria-label="Toggle navigation">&#9776;</fluent-button>
    </div>
  </header>
  <!-- END: Navigation -->

  <!-- BEGIN: Home -->
  <section id="home">
    <div class="hero-inner">
      <div class="hero-text">
        <h1><fluent-text size="800" weight="semibold">Microsoft Power Customer Advisory Team</fluent-text></h1>
        <p><fluent-text size="400">We are the Power Customer Advisory Team (Power CAT), part of the Power Platform engineering team at Microsoft.</fluent-text></p>
        <p><fluent-text size="400">Power CAT is dedicated to empowering organizations to achieve digital transformation at scale with Microsoft Power Platform.</fluent-text></p>
      </div>
      <div>
        <img id="headerimg" src="images/header.png" width="520"
          sizes="(max-width: 479px) 92vw, (max-width: 767px) 83vw, (max-width: 991px) 575px, 42vw"
          alt="Power CAT" />
      </div>
    </div>
  </section>
  <!-- END: Home -->

  <!-- BEGIN: Tools -->
  <div id="tools" class="section-wrapper">
    <div class="section-inner">
      <div class="section-label">
        <h2><fluent-text size="700" weight="semibold">Tools</fluent-text></h2>
        <p><fluent-text size="400">Accelerate and enable successful adoption with tools developed by Power CAT, based on real-world customer experience.</fluent-text></p>
      </div>
      <div class="card-grid">

        <div class="card">
          <img src="images/powercattools.png" alt="Power CAT Tools">
          <h3><fluent-text size="500" weight="semibold">Power CAT Tools</fluent-text></h3>
          <p><fluent-text size="300">Enhance your development experience within Power Platform. Perform code reviews, use AI to document your solutions, evaluate risks in your solutions, and more.</fluent-text></p>
          <fluent-anchor-button appearance="primary" href="https://aka.ms/PowerCATTools" target="_blank">Learn More</fluent-anchor-button>
        </div>

        <div class="card">
          <img src="images/creator.png" alt="Creator Kit">
          <h3><fluent-text size="500" weight="semibold">Creator Kit</fluent-text></h3>
          <p><fluent-text size="300">Create consistent, beautiful, and effective user experiences for custom business applications with a collection of 24+ Fluent UI controls and templates for Power Apps.</fluent-text></p>
          <fluent-anchor-button appearance="primary" href="https://aka.ms/creatorkit" target="_blank">Learn More</fluent-anchor-button>
        </div>

        <div class="card">
          <img src="images/CoE.png" alt="CoE Starter Kit">
          <h3><fluent-text size="500" weight="semibold">CoE Starter Kit</fluent-text></h3>
          <p><fluent-text size="300">Leverage a set of templates to help you develop a strategy for adopting, maintaining, and supporting Power Platform.</fluent-text></p>
          <fluent-anchor-button appearance="primary" href="https://aka.ms/coestarterkit" target="_blank">Learn More</fluent-anchor-button>
        </div>

        <div class="card">
          <img src="images/automation.png" alt="Automation Kit">
          <h3><fluent-text size="500" weight="semibold">Automation Kit</fluent-text></h3>
          <p><fluent-text size="300">Manage, govern, and scale automation platform adoption with Power Automate, based on industry best practices.</fluent-text></p>
          <fluent-anchor-button appearance="primary" href="https://aka.ms/automationkit" target="_blank">Learn More</fluent-anchor-button>
        </div>

      </div>
    </div>
  </div>
  <!-- END: Tools -->

  <!-- BEGIN: Programs -->
  <div id="programs" class="section-wrapper grey">
    <div class="section-inner">
      <div class="section-label">
        <h2><fluent-text size="700" weight="semibold">Programs</fluent-text></h2>
        <p><fluent-text size="400">Gain skills and knowledge to help you successfully adopt and deploy impactful solutions using Power Platform with programs from Power CAT and our partner teams.</fluent-text></p>
      </div>
      <div class="card-grid">

        <div class="card">
          <img src="images/PowerUp.png" alt="Power Up">
          <h3><fluent-text size="500" weight="semibold">Power Up</fluent-text></h3>
          <p><fluent-text size="300">Training for individuals and enterprise organizations to develop talent in low-code and AI with a comprehensive curriculum.</fluent-text></p>
          <fluent-anchor-button appearance="primary" href="https://aka.ms/powerup" target="_blank">Learn More</fluent-anchor-button>
        </div>

      </div>
    </div>
  </div>
  <!-- END: Programs -->

  <!-- BEGIN: Guidance -->
  <div id="guidance" class="section-wrapper">
    <div class="section-inner">
      <div class="section-label">
        <h2><fluent-text size="700" weight="semibold">Guidance</fluent-text></h2>
        <p><fluent-text size="400">Ensure successful implementation of your Power Platform workloads with comprehensive guidance and best practices.</fluent-text></p>
      </div>
      <div class="card-grid">

        <div class="card">
          <img src="images/arch-center.png" alt="Architecture Center">
          <h3><fluent-text size="500" weight="semibold">Architecture Center</fluent-text></h3>
          <p><fluent-text size="300">Design solutions on Power Platform using established patterns and practices.</fluent-text></p>
          <fluent-anchor-button appearance="primary" href="https://aka.ms/powerarchitecture" target="_blank">Learn More</fluent-anchor-button>
        </div>

        <div class="card">
          <img src="images/powa.png" alt="Power Well-Architected">
          <h3><fluent-text size="500" weight="semibold">Power Well-Architected</fluent-text></h3>
          <p><fluent-text size="300">Make informed decisions about the design, planning, and implementation of modern application workloads.</fluent-text></p>
          <fluent-anchor-button appearance="primary" href="https://aka.ms/powa" target="_blank">Learn More</fluent-anchor-button>
        </div>

        <div class="card">
          <img src="images/PowerPlatform.png" alt="Power Platform Guidance">
          <h3><fluent-text size="500" weight="semibold">Power Platform Guidance</fluent-text></h3>
          <p><fluent-text size="300">Create and implement the business and technology strategies necessary for successful adoption of Power Platform.</fluent-text></p>
          <fluent-anchor-button appearance="primary" href="https://aka.ms/powerplatformguidance" target="_blank">Learn More</fluent-anchor-button>
        </div>

      </div>
    </div>
  </div>
  <!-- END: Guidance -->

  <!-- BEGIN: Stories -->
  <div id="stories" class="section-wrapper">
    <div class="section-inner">
      <div class="section-label">
        <h2><fluent-text size="700" weight="semibold">Customer Stories</fluent-text></h2>
        <p><fluent-text size="400">Hear compelling customer stories that highlight the diverse and creative ways in which Power Platform is used in the real world.</fluent-text></p>
      </div>
      <div class="card-grid">

        <div class="card">
          <img src="images/stories.png" alt="Power Platform Stories">
          <h3><fluent-text size="500" weight="semibold">Power Platform Stories</fluent-text></h3>
          <p><fluent-text size="300">Customer stories that showcase the ingenuity of individuals and organizations that have adopted Power Platform.</fluent-text></p>
          <fluent-anchor-button appearance="primary" href="https://aka.ms/PowerPlatformStories" target="_blank">Learn More</fluent-anchor-button>
        </div>

        <div class="card">
          <img src="images/stories-youtube.png" alt="Customer Story Videos">
          <h3><fluent-text size="500" weight="semibold">Customer Story Videos</fluent-text></h3>
          <p><fluent-text size="300">Customer story videos that showcase how Power Platform is being used to transform businesses, careers and lives.</fluent-text></p>
          <fluent-anchor-button appearance="primary" href="https://aka.ms/PowerPlatformVideos" target="_blank">Learn More</fluent-anchor-button>
        </div>

        <div class="card">
          <img src="images/story-nominate.png" alt="Share Your Story">
          <h3><fluent-text size="500" weight="semibold">Share Your Story</fluent-text></h3>
          <p><fluent-text size="300">Share your story to showcase within Microsoft, among our customers, and across the broader community.</fluent-text></p>
          <fluent-anchor-button appearance="primary" href="https://aka.ms/CXGStoryNomination" target="_blank">Learn More</fluent-anchor-button>
        </div>

      </div>
    </div>
  </div>
  <!-- END: Stories -->

  <!-- BEGIN: Resources -->
  <div id="resources" class="section-wrapper grey">
    <div class="section-inner">
      <div class="section-label">
        <h2><fluent-text size="700" weight="semibold">Resources</fluent-text></h2>
        <p><fluent-text size="400">These resources support you wherever you are in your Power Platform journey, whether you're getting started or driving successful implementations.</fluent-text></p>
      </div>
      <div class="card-grid">

        <div class="card">
          <img src="images/PowerPlatform.png" alt="Power Platform Resources">
          <h3><fluent-text size="500" weight="semibold">Power Platform Resources</fluent-text></h3>
          <p><fluent-text size="300">Resources to help you on your Power Platform journey, curated by Power CAT and updated regularly.</fluent-text></p>
          <fluent-anchor-button appearance="primary" href="https://aka.ms/PowerPlatform/Resources" target="_blank">Learn More</fluent-anchor-button>
        </div>

        <div class="card">
          <img src="images/stories-youtube.png" alt="Power CAT Live videos">
          <h3><fluent-text size="500" weight="semibold">Power CAT Live</fluent-text></h3>
          <p><fluent-text size="300">This video series showcases the solutions Power CAT is working on and discusses features of Power Platform.</fluent-text></p>
          <fluent-anchor-button appearance="primary" href="https://aka.ms/powercatlive" target="_blank">Learn More</fluent-anchor-button>
        </div>

      </div>
    </div>
  </div>
  <!-- END: Resources -->

  <!-- BEGIN: Footer -->
  <footer>
    <img src="images/footer2.png" alt="Power CAT">
  </footer>
  <!-- END: Footer -->

  <script>
    document.getElementById('nav-toggle').addEventListener('click', function () {
      document.querySelector('header').classList.toggle('nav-open');
    });
  </script>

</body>

</html>
```

- [ ] **Step 3: Verify key structural elements are present**

```bash
grep -c "fluent-anchor-button" index.html
```

Expected: 18 (5 nav links + 13 card CTAs: 4 tools + 1 program + 3 guidance + 3 stories + 2 resources).

```bash
grep -c 'class="card"' index.html
```

Expected: 13 (4 tools + 1 program + 3 guidance + 3 stories + 2 resources).

```bash
grep -c "og:description\|og:title\|og:image" index.html
```

Expected: 3 (all OG meta tags preserved).

- [ ] **Step 4: Serve locally and verify visually**

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080` in a browser. Verify:
- Nav is sticky at top with Fluent-styled links
- Hero renders with two columns (desktop) or single column (mobile)
- All five sections render with cards
- Cards have white backgrounds with subtle shadow
- Programs and Resources sections have light grey background
- Mobile: hamburger button appears below 768px, tapping it reveals nav links
- Header image hidden below 991px

Stop the server with Ctrl+C when done.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: rewrite index.html with Fluent UI Web Components v3"
```

---

## Task 3: Delete obsolete files

**Files:**
- Delete: `assets/css/powercat-landing-page.css`
- Delete: `assets/css/components.css`
- Delete: `assets/css/normalize.css`
- Delete: `assets/js/powercat-landing-page.js`
- Delete: `assets/js/jquery.min.js`

- [ ] **Step 1: Verify none of the files are referenced in the new index.html**

```bash
grep -E "powercat-landing-page|components\.css|normalize\.css|jquery" index.html
```

Expected: no output (zero matches).

- [ ] **Step 2: Delete the files**

```bash
git rm assets/css/powercat-landing-page.css assets/css/components.css assets/css/normalize.css assets/js/powercat-landing-page.js assets/js/jquery.min.js
```

Expected: `rm 'assets/css/...'` lines for each file, no errors.

- [ ] **Step 3: Verify the page still loads after deletion**

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`. Verify no 404 errors in browser DevTools Network tab for CSS or JS files. Stop the server.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove Webflow CSS and jQuery files replaced by Fluent UI"
```

---

## Task 4: Final verification

- [ ] **Step 1: Verify only the expected files changed from the original**

```bash
git log --oneline -5
```

Expected: three commits from this plan visible in history.

- [ ] **Step 2: Check no Webflow class names leaked into the new HTML**

```bash
grep -E "w-nav|w-layout|w-nav-menu|w-button|w-inline-block|w-hidden|w-clearfix|w-nav-brand|w-mod" index.html
```

Expected: no output.

- [ ] **Step 3: Check no jQuery or old script references remain**

```bash
grep -E "jquery|webflow|w-mod-js|data-wf-" index.html
```

Expected: no output.

- [ ] **Step 4: Check heading hierarchy is correct**

```bash
grep -E "<h[1-6]" index.html
```

Expected output: exactly one `<h1>` (hero), five `<h2>` (section labels), and one `<h3>` per card (13 total).

- [ ] **Step 5: Final visual check across viewports**

```bash
python3 -m http.server 8080
```

Open DevTools and toggle responsive mode. Check at:
- 1280px: two-column layout in all sections, hero image visible, nav links in header
- 900px: hero image hidden (`#headerimg`), layout otherwise same
- 768px: single column, hamburger nav visible
- 375px: cards stacked, full-width padding reduced

Stop the server.
