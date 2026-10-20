"""Create the distributable without temporary browser captures or QA artifacts."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent.parent
paths = ["brand", "icons", "src", "vendor", "scripts", "skills", "previews", "examples", "manifest.json", "index.html", "README.md", "README-stroke.md", "README-two-tone.md", "README-duotone.md", "README-fill.md", "BRAND-REFERENCES.md", "LICENSE", "motion.css", "package.json"]
target = root / "superintelligence-icons.zip"
with ZipFile(target, "w", ZIP_DEFLATED) as archive:
    for name in paths:
        path = root / name
        files = sorted(path.rglob("*")) if path.is_dir() else [path]
        for file in files:
            if file.is_file() and "__pycache__" not in str(file):
                archive.write(file, Path("superintelligence-icons") / file.relative_to(root))
print(f"Packaged {target.name} ({target.stat().st_size:,} bytes)")
