import os
import re
import numpy as np
from PIL import Image, ImageOps, ImageFilter
import fitz # PyMuPDF

raw_dir = "public/references/raw"
out_dir = "public/references"
os.makedirs(out_dir, exist_ok=True)

def trim_and_pad(img, padding=12, max_w=400, max_h=160):
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    w, h = img.size
    # Scale down if too huge
    scale = min(max_w / max(w, 1), max_h / max(h, 1), 1.0)
    if scale < 1.0:
        new_w = max(int(w * scale), 1)
        new_h = max(int(h * scale), 1)
        img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Add padding
    w, h = img.size
    canvas = Image.new("RGBA", (w + padding * 2, h + padding * 2), (0, 0, 0, 0))
    canvas.paste(img, (padding, padding), img)
    return canvas

def make_solid_color_with_alpha(alpha_channel, rgb=(255, 255, 255)):
    w, h = alpha_channel.size
    base = Image.new("RGBA", (w, h), (*rgb, 0))
    base.putalpha(alpha_channel)
    return base

# 1. OZGUR LEBLEBI
print("Processing ozgurleblebi...")
img_ozgur = Image.open(os.path.join(raw_dir, "ozgurleblebi.png")).convert("RGBA")
# It has transparent background, let's trim and save
out_ozgur = trim_and_pad(img_ozgur)
out_ozgur.save(os.path.join(out_dir, "ozgurleblebi.webp"), "WEBP", quality=95)

# 2. ROKO DONDURMA KAHVE
print("Processing roko...")
img_roko = Image.open(os.path.join(raw_dir, "roko_alt.png")).convert("RGBA")
out_roko = trim_and_pad(img_roko)
out_roko.save(os.path.join(out_dir, "roko.webp"), "WEBP", quality=95)

# 3. ANAKAMP KUCUK KASIFLER
print("Processing anakamp...")
doc = fitz.open(os.path.join(raw_dir, "anakamp.svg"))
pix = doc[0].get_pixmap(alpha=True, dpi=300)
img_anakamp = Image.frombytes("RGBA", [pix.width, pix.height], pix.samples)
out_anakamp = trim_and_pad(img_anakamp, max_w=480, max_h=140)
out_anakamp.save(os.path.join(out_dir, "anakamp.webp"), "WEBP", quality=95)

# 4. TODO CROISSANT & COFFEE
print("Processing todocroissant...")
im_tc = Image.open(os.path.join(raw_dir, "todocroissant.jpg")).convert("RGB")
# Resize for smooth anti-aliasing
im_tc_large = im_tc.resize((im_tc.width * 3, im_tc.height * 3), Image.Resampling.LANCZOS)
arr_tc = np.array(im_tc_large, dtype=np.float32)
lum_tc = 0.299 * arr_tc[:, :, 0] + 0.587 * arr_tc[:, :, 1] + 0.114 * arr_tc[:, :, 2]
alpha_tc = np.clip((248 - lum_tc) / 75 * 255, 0, 255).astype(np.uint8)
img_tc = Image.fromarray(alpha_tc, "L")
img_tc = make_solid_color_with_alpha(img_tc)
out_tc = trim_and_pad(img_tc)
out_tc.save(os.path.join(out_dir, "todocroissant.webp"), "WEBP", quality=95)

# 5. TODO CREATIVE
print("Processing todocreative...")
im_tcr = Image.open(os.path.join(raw_dir, "todocreative.jpg")).convert("RGB")
im_tcr_large = im_tcr.resize((im_tcr.width * 3, im_tcr.height * 3), Image.Resampling.LANCZOS)
arr_tcr = np.array(im_tcr_large, dtype=np.float32)
lum_tcr = 0.299 * arr_tcr[:, :, 0] + 0.587 * arr_tcr[:, :, 1] + 0.114 * arr_tcr[:, :, 2]
alpha_tcr = np.clip((250 - lum_tcr) / 140 * 255, 0, 255).astype(np.uint8)
img_tcr = Image.fromarray(alpha_tcr, "L")
img_tcr = make_solid_color_with_alpha(img_tcr)
out_tcr = trim_and_pad(img_tcr)
out_tcr.save(os.path.join(out_dir, "todocreative.webp"), "WEBP", quality=95)

# 6. LOFTEN BILISIM (Render high-end vector SVG)
print("Processing loften...")
loften_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 160" width="600" height="160">
  <g fill="#ffffff">
    <!-- Modern Tech Geometric Symbol -->
    <path d="M 60 30 L 105 55 L 105 105 L 60 130 L 15 105 L 15 55 Z" fill="none" stroke="#ffffff" stroke-width="6"/>
    <path d="M 60 30 L 60 80 L 105 105" fill="none" stroke="#ffffff" stroke-width="6"/>
    <path d="M 60 80 L 15 105" fill="none" stroke="#ffffff" stroke-width="6"/>
    <circle cx="60" cy="80" r="8" fill="#ffffff"/>
    <circle cx="60" cy="30" r="5" fill="#ffffff"/>
    <circle cx="105" cy="55" r="5" fill="#ffffff"/>
    <circle cx="105" cy="105" r="5" fill="#ffffff"/>
    <circle cx="60" cy="130" r="5" fill="#ffffff"/>
    <circle cx="15" cy="105" r="5" fill="#ffffff"/>
    <circle cx="15" cy="55" r="5" fill="#ffffff"/>

    <!-- Typographic Brand Name -->
    <text x="135" y="88" font-family="Montserrat, system-ui, sans-serif" font-size="54" font-weight="900" letter-spacing="4" fill="#ffffff">LOFTEN</text>
    <text x="138" y="118" font-family="Montserrat, system-ui, sans-serif" font-size="16" font-weight="600" letter-spacing="8" fill="#ffffff" opacity="0.9">BİLİŞİM TEKNOLOJİLERİ</text>
  </g>
</svg>"""

with open(os.path.join(raw_dir, "loften.svg"), "w", encoding="utf-8") as f:
    f.write(loften_svg)

doc_l = fitz.open(os.path.join(raw_dir, "loften.svg"))
pix_l = doc_l[0].get_pixmap(alpha=True, dpi=300)
img_loften = Image.frombytes("RGBA", [pix_l.width, pix_l.height], pix_l.samples)
out_loften = trim_and_pad(img_loften)
out_loften.save(os.path.join(out_dir, "loften.webp"), "WEBP", quality=95)

# 7. PINAR DEMIRBAS
print("Processing pinardemirbas...")
im_pd = Image.open(os.path.join(raw_dir, "pinardemirbas.jpg")).convert("RGB")
arr_pd = np.array(im_pd, dtype=np.float32)
# Background is dark teal: [2, 66, 68]
bg = np.array([2, 66, 68], dtype=np.float32)
dist = np.linalg.norm(arr_pd - bg, axis=2)
alpha_pd = np.clip((dist - 35) / 55 * 255, 0, 255).astype(np.uint8)
img_pd = Image.fromarray(alpha_pd, "L")
img_pd = make_solid_color_with_alpha(img_pd)
out_pd = trim_and_pad(img_pd)
out_pd.save(os.path.join(out_dir, "pinardemirbas.webp"), "WEBP", quality=95)

# 8. UNIVERSAL KAUCUK
print("Processing universalkaucuk...")
img_uk = Image.open(os.path.join(raw_dir, "universalkaucuk.png")).convert("RGBA")
out_uk = trim_and_pad(img_uk)
out_uk.save(os.path.join(out_dir, "universalkaucuk.webp"), "WEBP", quality=95)

# 9. UMG PARTS
print("Processing umgparts...")
img_umg = Image.open(os.path.join(raw_dir, "umgparts.png")).convert("RGBA")
out_umg = trim_and_pad(img_umg)
out_umg.save(os.path.join(out_dir, "umgparts.webp"), "WEBP", quality=95)

# 10. NANNEBEE
print("Processing nannebee...")
im_nb = Image.open(os.path.join(raw_dir, "nannebee.jpg")).convert("RGB")
im_nb_large = im_nb.resize((im_nb.width * 3, im_nb.height * 3), Image.Resampling.LANCZOS)
arr_nb = np.array(im_nb_large, dtype=np.float32)
lum_nb = 0.299 * arr_nb[:, :, 0] + 0.587 * arr_nb[:, :, 1] + 0.114 * arr_nb[:, :, 2]
alpha_nb = np.clip((244 - lum_nb) / 80 * 255, 0, 255).astype(np.uint8)
img_nb = Image.fromarray(alpha_nb, "L")
img_nb = make_solid_color_with_alpha(img_nb)
out_nb = trim_and_pad(img_nb)
out_nb.save(os.path.join(out_dir, "nannebee.webp"), "WEBP", quality=95)

# 11. BEBEK HOUSE
print("Processing bebekhouse...")
im_bh = Image.open(os.path.join(raw_dir, "bebekhouse.png")).convert("RGBA")
arr_bh = np.array(im_bh, dtype=np.float32)
lum_bh = 0.299 * arr_bh[:, :, 0] + 0.587 * arr_bh[:, :, 1] + 0.114 * arr_bh[:, :, 2]
alpha_bh = np.clip((250 - lum_bh) / 100 * 255, 0, 255).astype(np.uint8)
img_bh = Image.fromarray(alpha_bh, "L")
img_bh = make_solid_color_with_alpha(img_bh)
out_bh = trim_and_pad(img_bh)
out_bh.save(os.path.join(out_dir, "bebekhouse.webp"), "WEBP", quality=95)

# 12. MISILLA HOME
print("Processing misillahome...")
img_mh = Image.open(os.path.join(raw_dir, "misillahome.png")).convert("RGBA")
out_mh = trim_and_pad(img_mh)
out_mh.save(os.path.join(out_dir, "misillahome.webp"), "WEBP", quality=95)

# 13. NAM PROMOSYON
print("Processing nampromosyon...")
img_np = Image.open(os.path.join(raw_dir, "nampromosyon.png")).convert("RGBA")
out_np = trim_and_pad(img_np)
out_np.save(os.path.join(out_dir, "nampromosyon.webp"), "WEBP", quality=95)

# 14. YENI NESIL PROMOSYON
print("Processing yeninesil...")
img_yn = Image.open(os.path.join(raw_dir, "yeninesil.png")).convert("RGBA")
out_yn = trim_and_pad(img_yn)
out_yn.save(os.path.join(out_dir, "yeninesil.webp"), "WEBP", quality=95)

# 15. MELEK PROMOSYON
print("Processing melekpromosyon...")
img_mp = Image.open(os.path.join(raw_dir, "melekpromosyon.png")).convert("RGBA")
out_mp = trim_and_pad(img_mp)
out_mp.save(os.path.join(out_dir, "melekpromosyon.webp"), "WEBP", quality=95)

# 16. ACCOFIRE
print("Processing accofire...")
img_af = Image.open(os.path.join(raw_dir, "accofire.png")).convert("RGBA")
out_af = trim_and_pad(img_af)
out_af.save(os.path.join(out_dir, "accofire.webp"), "WEBP", quality=95)

# 17. METAFORM TASARIM
print("Processing metaform...")
img_mf = Image.open(os.path.join(raw_dir, "metaform.png")).convert("RGBA")
out_mf = trim_and_pad(img_mf)
out_mf.save(os.path.join(out_dir, "metaform.webp"), "WEBP", quality=95)

# 18. PROKON
print("Processing prokon...")
img_pk = Image.open(os.path.join(raw_dir, "prokon.png")).convert("RGBA")
out_pk = trim_and_pad(img_pk)
out_pk.save(os.path.join(out_dir, "prokon.webp"), "WEBP", quality=95)

# 19. EKONAS
print("Processing ekonas...")
img_ek = Image.open(os.path.join(raw_dir, "ekonas.png")).convert("RGBA")
out_ek = trim_and_pad(img_ek)
out_ek.save(os.path.join(out_dir, "ekonas.webp"), "WEBP", quality=95)

# 20. DENTIZMIT
print("Processing dentizmit...")
img_di = Image.open(os.path.join(raw_dir, "dentizmit.png")).convert("RGBA")
out_di = trim_and_pad(img_di)
out_di.save(os.path.join(out_dir, "dentizmit.webp"), "WEBP", quality=95)

print("\nALL 20 REFERENCE LOGOS SUCCESSFULLY GENERATED!")
