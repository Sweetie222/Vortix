# -*- coding: utf-8 -*-
"""Rebuild data/productos.json: corrected names, slugs, numeric prices,
colour variants, fitment. Source of truth = the original catalogue."""
import json, re, unicodedata, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC  = json.loads((ROOT / "data" / "productos.legacy.json").read_text(encoding="utf-8"))

# --- Name corrections. Each one is a real typo or a Venezuelan-search-term fix. ---
NAME_FIX = {
    32: "Casco para Moto Negro",                                   # "Carco" -> "Casco" (verified: photo is an EDGE full-face)
    24: "Anti Espiche para caucho de moto",                        # "Spiche" -> "Espiche" (VE term for puncture)
    10: "Llave con dado saca bujía para moto 19mm",                # accent
    11: "Saca bujía dos dados para moto 16mm y 21mm",              # accent + "and" -> "y"
    14: "Deditos fluorescentes tapa bujías",                       # accent + casing
    31: "Bujía NGK punta de diamante",                             # accent
     7: "Defensas laterales mataperro para moto",                  # "mataperro" = the VE search term
    35: "Filtro cónico universal polvo de cobre",                  # "Filttro" -> "Filtro" + accent
    16: "Faro explorador rectangular LED 18W (luz blanca o amarilla)",
    17: "Bombillo LED extra plano con función intermitente",
    13: "Sliders para eje delantero de moto",                      # drop trailing period + the colour, it's a variant
    19: "Tornillos con arandelas decorativas tipo tuning",         # drop the colour, it's a variant
    26: "Balaclava para cabello largo (mujer)",
    30: "Botas para lluvia",
    41: "Malla para asiento de moto",
    42: "Pechera protectora para moto",
    43: "Porta placa con gomas para moto",
    44: "Protector de tanque para moto",
    38: "Guantes para moto",
    40: "Luz muelitas para moto",
    39: "Kit de rodaje 37t / 15t",
    36: "Goma para pedal de freno",
    37: "Gomas para pedal de cambio",
    27: "Bombillo de un contacto strober",
    28: "Bombillo doble contacto fijo y flash",
    29: "Bombillo lupa doble contacto blanco/amarillo",
    25: "Asistente de acelerador",
    33: "Casco para moto fosforescente",
    15: "Candado tranca de disco antirrobo para moto y bicicleta",
}

# --- Colour variants: image basename -> (label, hex). Only where colours are real. ---
SWATCH = {
    "azul": ("Azul", "#1E4FB5"), "rojo": ("Rojo", "#C62828"), "rojo2": ("Rojo", "#C62828"),
    "negro": ("Negro", "#1A1A1A"), "negra": ("Negro", "#1A1A1A"),
    "verde": ("Verde", "#3E8E4F"), "morado": ("Morado", "#7C3AED"),
    "plateado": ("Plateado", "#BFC4C9"), "dorado": ("Dorado", "#C9A227"),
    "blanco": ("Blanco", "#EFEFEF"), "blanca": ("Blanco", "#EFEFEF"),
    "amarilla": ("Amarillo", "#EFB008"),
}
# product id -> list of (image filename, colour key)
COLORS = {
    2:  [("Baseantirresbalanteazul.png","azul"),("Baseantirresbalanterojo.png","rojo"),("Baseantirresbalantenegra.png","negra")],
    3:  [("Guardabarroazulfox.png","azul"),("Guardabarrofoxblanco.png","blanco"),("Guardabarrofoxverde.png","verde")],
    7:  [("Defensaslateralesazul.png","azul"),("Defensaslateralesrojo.png","rojo"),("Defensaslateralesnegro.png","negro")],
    8:  [("Portamaletaazul.png","azul"),("Portamaletarojo.png","rojo"),("Portamaletanegro.png","negro")],
    13: [("Slidersazul.png","azul"),("Slidersrojo.png","rojo")],
    15: [("TrancaDiscoAnti-robonegro.png","negro"),("TrancaDiscoAntiroboDorado.jpg","dorado"),
         ("TrancaDiscoAntiroboplateado.png","plateado"),("TrancaDiscoAntiroborojo.png","rojo")],
    17: [("BombilloledExtraPlanoFunciónintermitenteblanca.png","blanca"),
         ("BombilloledExtraPlanoFunciónintermitenteamarilla.png","amarilla"),
         ("BombilloledExtraPlanoFunciónintermitenteazul.png","azul"),
         ("BombilloledExtraPlanoFunciónintermitenterojo.png","rojo")],
    19: [("Tornillostunningazul.png","azul"),("Tornillostunningrojo.png","rojo"),("Tornillostunningnegro.png","negro"),
         ("Tornillostunningverde.png","verde"),("Tornillostunningmorado.png","morado"),("Tornillostunningplateado.png","plateado")],
    43: [("PortaPlacayGomasAzul.jpg","azul"),("PortaPlacayGomasNegro.jpg","negro"),("PortaPlacayGomasRojo.jpg","rojo")],
}

# --- Fitment. Most of the catalogue is universal; three products are brand-specific. ---
FITMENT = {3: ["Fox"], 4: ["Empire"], 5: ["Bera"]}

CATEGORY_SLUG = {
    "Seguridad y Protección": "seguridad-y-proteccion",
    "Luces y Eléctricos": "luces-y-electricos",
    "Mecánica y Mantenimiento": "mecanica-y-mantenimiento",
    "Accesorios y Personalización": "accesorios-y-personalizacion",
    "Complementos / Otros": "complementos-y-otros",
}

def slugify(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return re.sub(r"-{2,}", "-", s)

def parse_price(raw: str):
    if not raw: return None
    m = re.search(r"([\d.]+)", raw.replace(",", "."))
    if not m: return None
    v = float(m.group(1))
    return v if v > 0 else None      # "$0" is not a price

out = []
for p in SRC:
    pid  = p["ID"]
    name = NAME_FIX.get(pid, p["name"]).strip()
    item = {
        "id": pid,
        "slug": slugify(name),
        "name": name,
        "priceUsd": parse_price(p.get("price", "")),
        "category": CATEGORY_SLUG[p["category"]],
        "images": p["images"],
        "fitment": FITMENT.get(pid, ["Universal"]),
    }
    if pid in COLORS:
        item["colors"] = [
            {"name": SWATCH[k][0], "hex": SWATCH[k][1], "image": f"Accesorios/{fn}"}
            for fn, k in COLORS[pid]
        ]
    out.append(item)

# Sort by aspiration, not by ID: expensive/desirable first sets the perceived tier.
out.sort(key=lambda x: (-(x["priceUsd"] or 0), x["name"]))
(ROOT / "data" / "productos.json").write_text(
    json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

print(f"{len(out)} products")
print(f"  no price : {[p['slug'] for p in out if p['priceUsd'] is None]}")
print(f"  colours  : {sum(1 for p in out if 'colors' in p)} products")
print(f"  dup slugs: {len(out) - len({p['slug'] for p in out})}")
