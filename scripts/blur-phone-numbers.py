"""Blur regions containing visible phone numbers in win screenshots.

Boxes are in pixel coordinates and were chosen with generous padding around
the visible digits. Originals are backed up alongside the source file with a
.orig.jpg suffix so the operation can be reversed.
"""

from __future__ import annotations

import os
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

WINS_DIR = Path("public/wins")

# Telegram dark-theme chat bubble color — matches surrounding pixels so the
# fill reads as a redaction bar rather than an obvious artifact.
FILL_COLOR = (32, 36, 41)

# (filename, [(x0, y0, x1, y1, mode), ...]) where mode is "blur" or "fill".
TARGETS: list[tuple[str, list[tuple[int, int, int, int, str]]]] = [
    (
        "photo_542@25-03-2026_20-41-52.jpg",
        [(470, 995, 775, 1055, "fill")],
    ),
    (
        "photo_466@24-02-2026_19-47-21.jpg",
        [
            (235, 55, 620, 160, "fill"),
            (215, 555, 605, 660, "fill"),
        ],
    ),
    (
        "photo_324@04-01-2026_12-38-21.jpg",
        [
            (210, 285, 560, 365, "blur"),
            (190, 830, 510, 905, "blur"),
        ],
    ),
    (
        "photo_318@30-12-2025_06-59-00.jpg",
        [
            (210, 285, 560, 365, "blur"),
            (190, 830, 510, 905, "blur"),
        ],
    ),
]


def blur_region(img: Image.Image, box: tuple[int, int, int, int]) -> None:
    region = img.crop(box)
    w, h = region.size
    # Pixelate first so even residual structure dies, then heavy gaussian.
    pixelated = region.resize((max(1, w // 24), max(1, h // 24)), Image.BILINEAR)
    pixelated = pixelated.resize((w, h), Image.NEAREST)
    blurred = pixelated.filter(ImageFilter.GaussianBlur(radius=18))
    img.paste(blurred, box)


def fill_region(img: Image.Image, box: tuple[int, int, int, int]) -> None:
    ImageDraw.Draw(img).rectangle(box, fill=FILL_COLOR)


def main() -> None:
    for filename, boxes in TARGETS:
        src = WINS_DIR / filename
        if not src.exists():
            print(f"SKIP (missing): {src}")
            continue

        backup = src.with_suffix(src.suffix + ".orig")
        if backup.exists():
            # Always start from the pristine original so re-runs are idempotent.
            shutil.copy2(backup, src)
        else:
            shutil.copy2(src, backup)

        with Image.open(src) as im:
            im = im.convert("RGB")
            for x0, y0, x1, y1, mode in boxes:
                box = (x0, y0, x1, y1)
                if mode == "fill":
                    fill_region(im, box)
                else:
                    blur_region(im, box)
            im.save(src, quality=92, optimize=True)
        print(f"redacted {len(boxes)} region(s) in {filename}")


if __name__ == "__main__":
    main()
