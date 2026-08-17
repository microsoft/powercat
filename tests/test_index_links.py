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
        self.cards = []
        self.scripts = []
        self.unsupported_anchors = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "fluent-anchor-button":
            self.anchors.append(attributes)
        elif tag == "a" and "card" in attributes.get("class", "").split():
            self.cards.append(attributes)
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
        self.assertEqual(4, len(self.parser.anchors))
        self.assertTrue(all(anchor.get("href") for anchor in self.parser.anchors))
        self.assertEqual({"subtle"}, {anchor.get("appearance") for anchor in self.parser.anchors})

    def test_cards_are_complete_safe_links(self):
        self.assertEqual(11, len(self.parser.cards))
        for card in self.parser.cards:
            self.assertTrue(card.get("href", "").startswith("https://"))
            self.assertEqual("_blank", card.get("target"))
            self.assertEqual({"noopener", "noreferrer"}, set(card.get("rel", "").split()))


if __name__ == "__main__":
    unittest.main()
