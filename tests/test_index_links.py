from html.parser import HTMLParser
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
FONT_FILES = {
    "newsreader-latin-600-normal.woff2",
    "source-sans-3-latin-400-normal.woff2",
    "source-sans-3-latin-600-normal.woff2",
    "source-sans-3-latin-700-normal.woff2",
    "cascadia-mono-latin-600-normal.woff2",
}


class IndexParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.custom_elements = []
        self.external_links = []
        self.ids = set()
        self.resource_rows = []
        self.scripts = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        element_id = attributes.get("id")
        if element_id:
            self.ids.add(element_id)
        if "-" in tag:
            self.custom_elements.append(tag)
        if tag == "a":
            href = attributes.get("href", "")
            if href.startswith(("http://", "https://")):
                self.external_links.append(attributes)
            if "resource-row" in attributes.get("class", "").split():
                self.resource_rows.append(attributes)
        elif tag == "script":
            self.scripts.append(attributes)


class HomepageDesignTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = (ROOT / "index.html").read_text(encoding="utf-8")
        cls.css = (ROOT / "assets/css/fluent-layout.css").read_text(encoding="utf-8")
        cls.parser = IndexParser()
        cls.parser.feed(cls.html)

    def test_uses_native_elements_without_external_scripts(self):
        self.assertFalse(self.parser.custom_elements)
        self.assertTrue(all(not script.get("src") for script in self.parser.scripts))

    def test_contains_complete_editorial_structure(self):
        self.assertTrue(
            {"home", "tools", "guidance", "resources", "stories"}.issubset(
                self.parser.ids
            )
        )
        self.assertIn("Microsoft Power Customer Advisory Team", self.html)
        self.assertIn("evidence-strip", self.html)
        self.assertEqual(4, self.html.count('class="section-kicker"'))

    def test_resource_rows_are_complete_safe_links(self):
        self.assertEqual(11, len(self.parser.resource_rows))
        for resource in self.parser.resource_rows:
            self.assertTrue(resource["href"].startswith("https://"))
            self.assertEqual("_blank", resource.get("target"))
            self.assertEqual(
                {"noopener", "noreferrer"},
                set(resource.get("rel", "").split()),
            )

    def test_all_external_links_open_safely(self):
        self.assertTrue(self.parser.external_links)
        for link in self.parser.external_links:
            self.assertEqual("_blank", link.get("target"))
            self.assertEqual(
                {"noopener", "noreferrer"},
                set(link.get("rel", "").split()),
            )

    def test_self_hosts_approved_fonts(self):
        font_directory = ROOT / "assets/fonts"
        self.assertEqual(
            FONT_FILES,
            {path.name for path in font_directory.glob("*.woff2")},
        )
        for font in FONT_FILES:
            self.assertIn(font, self.css)

    def test_includes_accessibility_and_responsive_contracts(self):
        self.assertIn('class="skip-link"', self.html)
        self.assertIn('aria-expanded="false"', self.html)
        self.assertIn("@media (prefers-reduced-motion: reduce)", self.css)
        self.assertIn("a:focus-visible", self.css)
        self.assertIn("@media (max-width: 540px)", self.css)


if __name__ == "__main__":
    unittest.main()
