# Copilot instructions

## Repository architecture

- This is a dependency-free static website published with GitHub Pages from the repository root. There is no compilation or generated output.
- `index.html` is the primary Power CAT landing page. Its presentation is in `assets/css/fluent-layout.css`; the only page script is the inline mobile-navigation toggle.
- The landing page uses native HTML elements and self-hosted Newsreader, Source Sans 3, and Cascadia Mono fonts. Its editorial visual system and tokens are defined in `DESIGN.md`.
- `resources.html` is a separate, older resource catalog using `assets/css/subpage.css` and its own inline behavior. Do not assume it shares the landing-page component structure.
- Most pages under `programs/`, `agent-platform-advisor/`, `agent-platform-comic/`, and `sparktank/` are compatibility redirects to the newer `microsoft.github.io/cat` site or an `aka.ms` destination, not local application pages.
- Images and downloadable documents are committed directly under `images/`, `assets/`, and `resources/`. Keep URLs relative so pages work both locally and under the `/powercat/` GitHub Pages path.

## Commands

Run commands from the repository root.

```bash
# Preview the site; open http://localhost:8000/
python3 -m http.server 8000

# Run the full test suite
python3 -m unittest discover -s tests -v

# Run one test module
python3 -m unittest tests.test_index_links -v

# Run one test
python3 -m unittest tests.test_index_links.HomepageDesignTests.test_resource_rows_are_complete_safe_links -v
```

There is no dependency installation, build command, or configured lint command.

## Repository-specific conventions

- Read `DESIGN.md` before any visual or UI change. Its typography, colors, spacing, layout, motion, responsive, accessibility, and content rules are authoritative; `CLAUDE.md` reinforces this requirement.
- Keep section IDs, navigation fragment links, and visible section labels synchronized in `index.html`.
- Landing-page navigation uses native links and a native mobile menu button with synchronized `aria-expanded` state. Do not introduce a CDN dependency for basic navigation.
- Landing-page resources are entire-link `<a class="resource-row">` elements. External rows must use HTTPS plus `target="_blank"` and `rel="noopener noreferrer"`.
- `tests/test_index_links.py` enforces the editorial section structure, native elements, safe links, self-hosted fonts, and accessibility contracts. Update expectations when intentionally changing those structures.
- Preserve redirect pages as minimal compatibility stubs: immediate meta refresh, a canonical link when redirecting to a stable page, and a visible fallback anchor to the same destination.
- This repository has no templating layer. Make shared visual changes in the relevant CSS file, and keep page-specific JavaScript small and inline unless a real shared behavior is introduced.
- Contributions are subject to the Microsoft CLA bot and the Microsoft Open Source Code of Conduct described in `README.md`.
