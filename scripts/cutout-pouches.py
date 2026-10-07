"""Cut out the pouch mockups in pouches/src/ into transparent WebP in public/pouches/.

The mockups share one template (671x1024): the body outline is a fixed shape,
the cap is keyed on its saturated green.
"""
import math
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter


def cut(src):
  img = Image.open(src).convert('RGB')
  W, H = img.size
  K = 4

  def corner(cx, cy, r, a0, a1, steps=12):
      return [(cx + r * math.cos(math.radians(a0 + (a1 - a0) * i / steps)),
               cy + r * math.sin(math.radians(a0 + (a1 - a0) * i / steps))) for i in range(steps + 1)]

  R = 30
  body = []
  body += corner(17 + R, 175 + R, R, 180, 270)
  body += corner(637 - R, 183 + R, R, 270, 360)
  body += [(626, 1003), (600, 1005), (560, 1007), (117, 1007), (100, 995), (8, 990)]

  big = Image.new('L', (W * K, H * K), 0)
  ImageDraw.Draw(big).polygon([(x * K, y * K) for x, y in body], fill=255)
  body_mask = big.resize((W, H), Image.LANCZOS)

  cap_mask = Image.new('L', (W, H), 0)
  px = img.load()
  cm = cap_mask.load()
  for y in range(0, 190):
      for x in range(W):
          r, g, b = px[x, y]
          if g > 110 and g - r > 55 and g - b > 45:
              cm[x, y] = 255
  cap_mask = cap_mask.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
  holes = ImageChops.invert(cap_mask)
  ImageDraw.floodfill(holes, (0, 0), 0)
  cap_mask = ImageChops.lighter(cap_mask, holes).filter(ImageFilter.GaussianBlur(0.7))

  mask = ImageChops.lighter(body_mask, cap_mask)
  rgba = img.copy()
  rgba.putalpha(mask)
  rgba = rgba.crop(mask.getbbox())
  return rgba


root = Path(__file__).resolve().parent.parent
sources = sorted((root / 'pouches' / 'src').glob('*.jpg'))
if len(sys.argv) > 1:
  sources = [root / 'pouches' / 'src' / f'{name}.jpg' for name in sys.argv[1:]]
for src in sources:
  out = root / 'public' / 'pouches' / f'{src.stem}.webp'
  with tempfile.NamedTemporaryFile(suffix='.png') as tmp:
    cut(src).save(tmp.name)
    subprocess.run(['magick', tmp.name, '-quality', '88', '-define', 'webp:alpha-quality=95', str(out)], check=True)
  print(f'{src.name} -> public/pouches/{out.name}')
