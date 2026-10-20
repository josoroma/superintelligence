"""Check every exported asset, manifest mapping, and consistent viewBox."""
import json
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
manifest = json.loads((ROOT / "manifest.json").read_text())
concept_count = manifest["count"]
assert concept_count == len(manifest["icons"]) > 0
assert len({icon["id"] for icon in manifest["icons"]}) == concept_count
assert set(manifest["styles"]) == {"stroke", "two-tone", "duotone", "fill", "color"}
assert len(manifest["styles"]) == 5
for collection, collection_count in manifest["collections"].items():
    assert sum(icon["collection"] == collection for icon in manifest["icons"]) == collection_count
assert sum(manifest["collections"].values()) == concept_count
expected_assets = concept_count * len(manifest["styles"])
namespace = "{http://www.w3.org/2000/svg}"
allowed = {"svg", "path", "circle"}
count = 0
for icon in manifest["icons"]:
    if icon["collection"] == "brands":
        assert all(icon["brand"].get(key) for key in ["organization", "productType", "website", "reference", "artwork", "assetSource", "assetLicense"])
        assert icon["brand"]["website"].startswith("https://")
        assert icon["brand"]["reference"].startswith("https://")
        assert icon["brand"]["assetSource"].startswith("https://")
        assert icon["tags"], icon["id"]
    for style in manifest["styles"]:
        asset = ROOT / icon["files"][style]
        source = asset.read_text()
        tree = ET.fromstring(source)
        assert tree.tag == namespace + "svg", asset
        assert tree.attrib["viewBox"] == "0 0 128 128", asset
        assert tree.attrib["width"] == tree.attrib["height"] == "128", asset
        assert tree.attrib["stroke-linecap"] == tree.attrib["stroke-linejoin"] == "round"
        assert tree.attrib["aria-label"] == icon["name"]
        assert len(tree) >= 5, asset
        assert not any(t in source for t in ["NaN", "Infinity", "url(", "<image", "<script", "gradient", "filter="]), asset
        for element in tree.iter():
            assert element.tag.removeprefix(namespace) in allowed, (asset, element.tag)
            for key, value in element.attrib.items():
                assert not key.startswith("on"), asset
                if key in ("fill", "stroke"):
                    assert value == "none" or (value.startswith("#") and len(value) == 7), (asset, value)
        count += 1
assert count == expected_assets
assert len(list((ROOT / "icons").glob("*/*.svg"))) == expected_assets
print(f"PASS: {count} SVGs; valid XML; {concept_count} unique concepts; consistent dimensions, rounded strokes, explicit colors, accessible names; no raster, external references, scripts, filters, or gradients.")
