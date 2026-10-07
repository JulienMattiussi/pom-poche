"""Cut out the pouch mockups of pouches/src/ into transparent WebP in public/pouches/.

Every mockup shares one 671x1024 template: the pouch body sits at fixed
coordinates, so its outline is a drawn shape; the cap is keyed on its
saturated green, which nothing in the background matches.
"""

import math
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SOURCES = ROOT / 'pouches' / 'src'
OUTPUT = ROOT / 'public' / 'pouches'

SUPERSAMPLE = 4
CORNER_RADIUS = 30
CAP_BOTTOM = 190


def arc(cx, cy, r, start, end, steps=12):
    return [
        (
            cx + r * math.cos(math.radians(start + (end - start) * i / steps)),
            cy + r * math.sin(math.radians(start + (end - start) * i / steps)),
        )
        for i in range(steps + 1)
    ]


def body_outline():
    r = CORNER_RADIUS
    return [
        *arc(17 + r, 175 + r, r, 180, 270),
        *arc(637 - r, 183 + r, r, 270, 360),
        (626, 1003), (600, 1005), (560, 1007), (117, 1007), (100, 995), (8, 990),
    ]


def body_mask(size):
    width, height = size
    k = SUPERSAMPLE
    big = Image.new('L', (width * k, height * k), 0)
    ImageDraw.Draw(big).polygon([(x * k, y * k) for x, y in body_outline()], fill=255)
    return big.resize(size, Image.LANCZOS)


def cap_mask(img):
    mask = Image.new('L', img.size, 0)
    src, dst = img.load(), mask.load()
    for y in range(CAP_BOTTOM):
        for x in range(img.width):
            r, g, b = src[x, y]
            if g > 110 and g - r > 55 and g - b > 45:
                dst[x, y] = 255
    mask = mask.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
    holes = ImageChops.invert(mask)
    ImageDraw.floodfill(holes, (0, 0), 0)
    return ImageChops.lighter(mask, holes).filter(ImageFilter.GaussianBlur(0.7))


def cut(path):
    img = Image.open(path).convert('RGB')
    mask = ImageChops.lighter(body_mask(img.size), cap_mask(img))
    img.putalpha(mask)
    return img.crop(mask.getbbox())


def main(names):
    sources = [SOURCES / f'{name}.jpg' for name in names] or sorted(SOURCES.glob('*.jpg'))
    for source in sources:
        target = OUTPUT / f'{source.stem}.webp'
        with tempfile.NamedTemporaryFile(suffix='.png') as tmp:
            cut(source).save(tmp.name)
            subprocess.run(
                ['magick', tmp.name, '-quality', '88', '-define', 'webp:alpha-quality=95', str(target)],
                check=True,
            )
        print(f'{source.name} -> public/pouches/{target.name}')


if __name__ == '__main__':
    main(sys.argv[1:])
