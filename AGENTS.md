# eagle-view-bassets-site — technical reference

Technical detail for this repository. Read this before you change the site.

The `README.md` is a short overview for visitors. Keep it short. Luke writes it.

This file holds material that was in `README.md` until 2026-10-13.

## What this is

A static marketing site for Eagle View Bassets, a basset hound breeder in
Columbia, Missouri. Five pages: home, dogs, puppies, contact, and a 404.

Luke Rawlings builds and maintains it. Dave Recker owns the business.

## Rules to keep

These are deliberate. Do not undo them without asking.

- **No JavaScript.** The built pages contain zero `<script>` tags. The nav
  toggle, the contact form, and everything else work without script.
- **No CSS preprocessor and no CSS build step.** One hand-written stylesheet.
- **No image-processing plugin.** Assets are copied as-is.
- **No RSS feed, no sitemap plugin, no framework.** A handful of static pages.
- **No dead CSS.** If you delete the last user of a rule, delete the rule.
- **Stay mainstream.** Luke asked for no off-the-beaten-path tooling.

## Stack and commands

- Eleventy 3 (11ty), one config file, no plugins. Nunjucks templates plus
  Markdown pages with Nunjucks enabled.
- Netlify Forms for the contact form, with a honeypot field.
- Netlify hosting. It detects Eleventy. Build `eleventy`, publish `_site`.

```sh
npm install
npm run start      # dev server at http://localhost:8080
npm run build      # writes the site to _site/
npm run audit:prod # npm audit --omit=dev, the tree that ships
```

Netlify Forms do not work under `eleventy --serve`. Test the form on a real
deploy.

## Repository layout

```
eleventy.config.js     # input src/, output _site/, passthrough copies
netlify.toml           # build command and publish directory
src/
  _data/site.json      # name, url, email, phone, phoneHref, address, location
  _data/dogs.json      # one entry per dog, feeds the dog cards
  _includes/base.njk   # page shell: header, nav, footer
  _includes/contact-form.njk
  _includes/dog-card.njk
  css/style.css        # the whole stylesheet
  assets/logo.svg      # eagle mark in the header
  assets/favicon.svg   # "EV" monogram
  assets/akc-seal-black.png
  assets/dogs/         # dog photos
  index.md  dogs.md  puppies.md  contact.md  404.md
```

## Where the rest of the project lives

This repository holds the site only. The wider project is in the parent
directory, `/home/luke/workshop/eagle-view-bassets/`:

- `2026-notes/` — dated notes for every session. The history of this project.
  Read the notes before you change something that looks odd.
- `logo/` — logo sources. `logo/bald-eagle-2/` holds the eagle.
- `logo/akc-seal/README.md` — AKC seal provenance and the permission problem.
- `assets/dogs/` — the phone originals of the dog photos.
- `email-account/` — mail hosting research and decisions.
- `work-time-log.csv` — Luke's billing log. Do not edit it.
- `readme.md` — project overview.

## Content editing

- **Site-wide values:** `src/_data/site.json`. `phone` is display text and
  `phoneHref` is the `tel:` target. Both appear in the footer and on the contact
  page.
- **Dogs:** `src/_data/dogs.json`. Put a photo in `src/assets/dogs/` and set
  `image` to `/assets/dogs/<filename>`. Make the photo square. See below.
- **Pages:** the Markdown files in `src/`.
- **Logo:** `src/assets/logo.svg`, drawn at 46px tall in the header.

## Home page sections

The home page is a hero, three value cards, then three full-width sections:
`Responsible` (Tail Cream panel), `Pure Bred` (no colour, sits on the page
background), and `Looking for a puppy?` (Sun Gold panel). SVG waves separate
them.

Each wave sits at the bottom of the section above it and is filled with the next
section's colour. The two then meet on a curve with no seam.

**Trap:** a wave must stay flush with its section's bottom edge. Put the space
above a wave on `.panel-inner`, never on `.panel` padding. Padding on the
section leaves a strip of the old colour under the wave.

The last wave is Deep Pine, the footer colour. `body.home` drops the footer's
top margin so the two join.

**Trap:** the gold panel's buttons use explicit variants (`.btn-dark`,
`.btn-outline-dark`). Do not style them with a panel descendant override. A
descendant override out-specifies the variant and turns the outline button
solid.

## Contact page

`.contact-layout` is a grid. The form comes first in the DOM, so narrow screens
show the form and then the details. From 62rem up, the details card moves to the
left column and sticks below the header while the form scrolls.

The `name` field carries `autofocus`, so the form is ready to type in on load.

## Navigation

`base.njk` holds one `<nav>` with the links.

Below 48rem the nav collapses behind a hamburger. A hidden
`<input type="checkbox">` plus a `<label>` drive it. The selector
`:checked ~ .site-nav` shows the menu. This keeps the site free of JavaScript.

- The input is visually hidden but stays focusable. Tab reaches it and Space
  toggles it.
- The focus ring is drawn on the label, because the input is invisible.
- Above 48rem the input and label are `display: none`, and the nav is always
  visible. The toggle then stays out of the tab order.

Adding or removing a nav link is a one-place edit.

## Dog photos

The dogs page uses **square 720x720 JPEGs** in `src/assets/dogs/`. The cards are
square (`.dog-photo { aspect-ratio: 1 / 1 }`).

A portrait photo dropped in as-is gets a centred crop, which usually cuts the
top of the dog's head. Crop it on purpose first.

`2026-notes/261013-dog-photos/make-dog-photos.codex.py` made every crop from the
phone originals in the workshop's `assets/dogs/`. It records the crop box and
the reason for each one. Re-run it to regenerate all the photos.

`dottie-pure-bred.jpg` (800x640, 5:4 landscape) is the odd one out. It goes in
the home page's *Pure Bred* section. It is wider than square on purpose, so it
does not set the height of that section.

The photos fade into the page background. `.panel-photo img` carries a
`mask-image` of two linear gradients with `mask-composite: intersect`. Read the comment in that
rule: the right-hand fade is short because Dottie's muzzle runs to the edge of
the crop, and a wide fade there washes her nose out.

The originals carry no EXIF and no GPS data. Neither do the crops. The photos
carry `loading="lazy"`. All five weigh about 670 KB, which makes them the
heaviest thing on the site.

## Logo and favicon

`src/assets/logo.svg` is the eagle mark in the top-left of every page. It comes
from `logo/bald-eagle-2/bald-eagle-gemini-nobg-square.codex.svg`.

The only change is the root `viewBox`. The source is a 1024x1024 canvas with
172px of empty space on each side. It is cropped to `170 10 683 962`, which is
the artwork bounds plus a 2px margin. The artwork is untouched.

To swap in a new logo, replace the file and update the `width` and `height`
attributes in `src/_includes/base.njk` to match its aspect ratio. The header
sizes the mark with `height: 46px`, which matches the wordmark beside it.

`src/assets/favicon.svg` is a simple "EV" monogram. It is not the eagle on
purpose. The eagle turns into an unreadable smudge at 16x16.

## Colors

The site uses **palette 2**, sampled from the bald-eagle logo photo. The demo
page with contrast ratios is
`2026-notes/260829-basset-hound-website-color-palette/eagle-view-bassets-palette-2.codex.html`.
Rebuild it with `build-palette-2.py`.

The values live as CSS custom properties at the top of `src/css/style.css`.

| Token | Hex | Role |
| --- | --- | --- |
| `--gold` | `#B57C2A` | Eagle Gold — buttons, badges, rules |
| `--charcoal` | `#2E2825` | Feather Charcoal — body text, headings |
| `--white` | `#F9F7F5` | Head White — page background, text on dark |
| `--green` | `#2F5B44` | Evergreen — hero, links, sections |
| `--gold-light` | `#D8A75A` | Sun Gold — hover, gold on dark |
| `--brown` | `#79614A` | Wing Brown — secondary text, input borders |
| `--cream` | `#EFDDBF` | Tail Cream — dividers, dark-section text |
| `--head-shadow` | `#ABA295` | Head Shadow — muted text on dark |
| `--green-dark` | `#22402F` | Deep Pine — footer, inner-page hero |

The page background is flat `--white`. Do not add a texture or pattern. An
earlier leaf texture read as wallpaper and came out.

**Gold is an accent, not a text colour.** Eagle Gold is 3.34:1 on the page
background and 4.07:1 under charcoal. That passes AA for large text only. Use it
for buttons, badges, rules, and large headings. Never for paragraphs. Body copy
uses `--charcoal`, secondary copy uses `--brown`, and links use `--green`
(7.28:1).

## AKC seal

The *Responsible* panel shows the AKC seal in black at 132px, linked to
https://www.akc.org/. The file is `src/assets/akc-seal-black.png`.

`2026-notes/261013-akc-seal/make-black-seal.codex.py` made it from the AKC's own
transparent PNG. The ink colour is the only change. The alpha channel is
byte-identical to the source.

The seal sits above the copy on narrow screens and to the left of it from 48rem
up (`.panel-inner--seal`, column to row).


## npm audit warnings

`npm install` prints a handful of advisories. They come from Eleventy's own
build-time tree, not from this project.

- `braces` (high) via `chokidar`, used by Eleventy and its dev server.
- `sprintf-js` (moderate) via `gray-matter` -> nested `js-yaml@3` -> `argparse`.

Two facts:

1. **Nobody can patch them today.** Both advisories (`GHSA-vfj7-8cjw-p6xm` for
   `braces`, `GHSA-hp3w-g68c-fv3c` for `sprintf-js`, both published September
   2026) list no patched version. The newest releases are in the affected range.
   **Do not run `npm audit fix --force`.** It "fixes" the warnings by
   downgrading Eleventy to `0.6.0`, a 2020 release that breaks the build.
2. **None of it ships.** These are devDependencies. The deployed site is HTML
   and CSS with no JavaScript. `npm run audit:prod` reports zero
   vulnerabilities.

Eleventy 4 (alpha) drops both packages. Expect a clean audit when it reaches
stable.

## Deploying

Push to GitHub, then create a Netlify site from the repo. Netlify detects
Eleventy and reads `netlify.toml`. After the first deploy, submit the contact
form once and check the submission under **Forms** in Netlify.

## How to verify a change

There is no test suite. Do this instead:

1. `npm run build`. It must write 5 pages with no errors.
2. Open the built pages in a headless browser. Check for console errors and
   broken images, and check the layout at 390px and 1280px.
3. Confirm the page still contains zero `<script>` tags.
4. Check for orphaned CSS classes when you delete markup.

Known-good state as of 2026-10-13: 5 pages, 0 scripts, 0 broken images, no
console errors, no unused CSS classes.
