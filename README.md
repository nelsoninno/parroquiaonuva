# Parroquia Nuestra Señora de las Gracias (Onuva): website package

Last updated October 2026.

## What's here
This folder is the whole website. `index.html` is the Spanish home page and
`en/index.html` is the English one. `bodas.html` (Spanish) and `en/weddings.html`
(English) are the wedding requirements pages: they are not in the menu and are
hidden from Google on purpose, so the office can send the link by WhatsApp.
Photos and the logo live under `assets/images/`; colors and fonts live in one
file, `assets/css/tokens.css`.

## Replace or add photos
Drop originals into `_source/photos-original/` (any format, iPhone HEIC is fine).
Web versions go under `assets/images/`:

| Photo | Where it appears | Folder | Size |
|---|---|---|---|
| Main church facade | Top of the home page | `assets/images/hero/` | min 1800px wide |
| Main church inside | Spaces section, top of wedding page | `assets/images/hero/` | min 1800px wide |
| Chapel | Spaces section | `assets/images/gallery/` | min 1400px wide |
| Gardens, paths, office, parking | Photo grid | `assets/images/gallery/` | min 1400px wide |
| Logo | Header and footer | `assets/images/logos/` | vector (SVG/PDF) if possible |

## Change the colors
All colors and fonts are in `assets/css/tokens.css`. Editing that one file
re-skins the whole site.

## Request a change
Message Nelson on WhatsApp with what you would like changed (a time, a price, a photo).
Small changes are quick.
