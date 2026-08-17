from html.parser import HTMLParser
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
FLUENT_SCRIPT = (
    "https://unpkg.com/@fluentui/web-components@3.1.0/"
    "dist/web-components.min.js"
)


class IndexParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.anchors = []
        self.scripts = []
        self.unsupported_anchors = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "fluent-anchor-button":
            self.anchors.append(attributes)
        elif tag == "fluent-anchor":
            self.unsupported_anchors.append(attributes)
        elif tag == "script":
            self.scripts.append(attributes)


class IndexLinkTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.parser = IndexParser()
        cls.parser.feed((ROOT / "index.html").read_text(encoding="utf-8"))

    def test_uses_pinned_fluent_v3_bundle(self):
        module_sources = {
            script.get("src")
            for script in self.parser.scripts
            if script.get("type") == "module"
        }
        self.assertIn(FLUENT_SCRIPT, module_sources)

    def test_uses_supported_fluent_anchor_component(self):
        self.assertFalse(self.parser.unsupported_anchors)
        self.assertEqual(18, len(self.parser.anchors))
        self.assertTrue(all(anchor.get("href") for anchor in self.parser.anchors))
        self.assertEqual(
            {"primary", "subtle"},
            {anchor.get("appearance") for anchor in self.parser.anchors},
        )

    def test_external_fluent_anchors_open_safely(self):
        external = [
            anchor
            for anchor in self.parser.anchors
            if anchor["href"].startswith(("http://", "https://"))
        ]
        self.assertTrue(external)
        for anchor in external:
            self.assertEqual("_blank", anchor.get("target"))
            self.assertEqual({"noopener", "noreferrer"}, set(anchor.get("rel", "").split()))


if __name__ == "__main__":
    unittest.main()
