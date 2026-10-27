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

The home page is a hero, the featured dog, then three full-width sections:
`Responsible` (Tail Cream panel), `Pure Bred` (no colour, sits on the page
background), and `Looking for a puppy?` (Sun Gold panel). Curved waves separate
them.

The waves are **cut out of the sections themselves** with `mask-image` (reworked
2026-10-19). There is no `.curve` div anywhere: the section above used to carry a
strip of SVG at its foot, and now the section that owns the curve has it cut out
of its own edge, which is what lets a wave cross a photo in the next section. The
two shapes are the site's two wave paths as `--wave-cut-top` and
`--wave-cut-bottom` in `:root`, each sized by `--wave-h`. Three rules do the work,
in the "Wave edges" block of `style.css`:

- `.featured` and `.panel--gold` cut their **top** edge. The crescent the mask
  drops is where the section above shows through: the hero's green above the
  featured band, the page background above the gold panel.
- `.panel--cream` cuts its **bottom** edge, so the Pure Bred section's page
  background shows through below the curve.

A section that owns a wave also carries `position: relative` and a `z-index`, so
its wave paints over whatever the next section has under it.

The featured dog band stands where three value cards used to (Dave asked for the
swap on 2026-10-15). It reads as the page background, not as a card on it:

- The **band** is full-bleed at every width and its bottom edge meets the
  *Responsible* panel flush, with no gap. The **photo** inside it is not: it is
  capped at `--featured-maxw` (48rem) and centred, so a wide display gets two bars
  of the band's own background either side of the dog instead of a photo taller
  than the screen. Read left to right: bar, photo, bar.
- The wave is the hero's green showing through a **wave cut in the top of the
  band** (the shared one, above). It is cut on the band rather than on the photo
  so the wave stays full-bleed however narrow the photo gets: the green curve
  sweeps across both bars and the dog as one shape. The band is pulled up under
  the hero by
  `margin-top: calc(-1 * var(--wave-h))`, and `.hero` carries
  `padding-bottom: var(--wave-h)` in place of the wave it used to have, so its
  green reaches down behind the cut.
- Two crops of the same photo, swapped at 48rem by `<picture>`. Luke re-cropped
  both by hand on 2026-10-18 and both are now 1920x1637, so the swap changes
  nothing today and the cap is what keeps the band in check. A wide 2.6:1 banner
  crop is the open question; the earlier one is still in the tree as
  `dottie-banner-1.jpg` (1920x730), and at the 48rem cap it would make the band
  295px tall instead of 655px.
- The label is a cream pill inside the photo, near its bottom. It names the dog,
  so the breeding line reads as a fact about her rather than about the kennel.

**Trap:** `.featured-photo` needs `height: auto`. Without it the `height`
attribute on `<img>` (or on a `<source>`, which Chrome copies onto the img) wins
as a presentational hint, and a fixed height plus `object-fit: cover` silently
crops the sides off the crop.

**Trap:** the two `mask-image` layers must overlap by 2px. Sized to meet exactly,
sub-pixel rounding leaves a 1px line of the neighbouring colour across the band.

**Trap:** a section with a wave cut out of its own edge loses `--wave-h` of height
to the mask, and its copy has to get that height back. That is what
`.panel--cream .panel-inner` and `.panel--gold` are doing with their extra
`--wave-h`. Without it the curve comes up to meet the text.

The *Pure Bred* section is a three-column grid at 62rem and up: Betsy's photo on
the left, the copy, Bonnie's photo on the right, vertically centred. Below 62rem
the same markup stacks, Betsy above the copy and Bonnie below, as wide short
bands. The photos come first and last in the markup, so the stacked order falls
out of the DOM. `<picture>` swaps the tall crop for the band at that same 62rem:
the side crops are 3:4 (540x720) and both bands are 1000px wide, but Bonnie's band
is the taller of the two (5:4, 1000x800 against Betsy's 5:3, 1000x600), because
the gold panel's wave crosses it. Each photo carries a matching `aspect-ratio` in
the CSS, so the box is the right shape before the photo loads.

The photos are **full-bleed sideways** and are part of the page, like the
featured band: no `.container`, no rounded corners. On a narrow screen each photo
is the whole width of the window, Betsy above the copy and Bonnie below it. On a
wide screen the two sit hard against the left and right edges of the window and
the copy holds the middle, and each photo is capped at 26rem so a large display
does not get two photos taller than the screen.

The waves cross them, and the two panels are the reason the section is
`.panel--purebred` with `padding-top: 0` and the reason both carry a `z-index`.
A wave crosses a photo because the photo is slid `--wave-h` under the panel that
owns the wave, which hides the photo's own straight edge behind the panel and
leaves the curve as the edge you see.

- Side by side (62rem and up) the two photos share one row and have to be level,
  so **both** are slid `--wave-h` up out of the row: the cream panel's wave
  crosses the top of both, and the gold panel's crosses the bottom of both.
  (2026-10-20. Bonnie used to be slid *down* instead, which left her `--wave-h`
  lower than Betsy.)
- Stacked (below 62rem) they are in different rows, so each takes the wave next to
  it: Betsy is slid up under the cream panel, and Bonnie's band sits on the bottom
  of the section, where the gold panel's wave crosses it.

**Trap:** every crop that a wave crosses has to leave room for it, and a wave
hides a fixed number of *source* pixels that does not depend on the crop: it takes
`(2 x --wave-h - the curve's own depth)` off the edge it crosses, times the source
pixels per rendered pixel. The narrower the window, the more of the dog that is.

- `betsie-left.jpg` was re-cut on 2026-10-19 with 13% of grass above Betsy's
  skull: the cream panel's curve eats up to 8% of the photo's height at the sizes
  it is shown at, and the earlier crop had the top of her head taken off.
- `bonnie-strip.jpg` was re-cut on 2026-10-23 from 5:3 to 5:4. Her head fills a
  5:3 band (skull y 120 to muzzle y 1168 of a 1152px window), so at 320px wide the
  gold panel's curve ran across her muzzle. The taller window from the top of the
  frame leaves her muzzle about 200px clear of the curve at every width.
- Betsy's band is safe for a different reason: the cream panel's curve is shallow
  where it crosses her, and her band has grass above her tail.

**Trap:** the crops, the `<source media>` in `index.md` and the `@media` in
`style.css` all name 62rem. Change one and the photos change shape at the wrong
width. `make-pure-bred-photos.codex.py` says so too.

The gold panel ends the run of waves: its bottom edge meets the Deep Pine footer
square. `body.home` drops the footer's top margin so the two join with no strip of
page background between them.

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

The Puppies link is commented out with `{#- ... #}` in `base.njk` (2026-10-15):
Dave has no puppy photos, so the page is hidden from the nav for now. The page
itself still builds at `/puppies/`, and the home page's *Looking for a puppy?*
panel still links to it. Delete the comment to restore the link.

## Dog photos

The dogs page uses **square 720x720 JPEGs** in `src/assets/dogs/`. The cards are
square (`.dog-photo { aspect-ratio: 1 / 1 }`).

A portrait photo dropped in as-is gets a centred crop, which usually cuts the
top of the dog's head. Crop it on purpose first.

`2026-notes/261013-dog-photos/make-dog-photos.codex.py` made every crop from the
phone originals in the workshop's `assets/dogs/`. It records the crop box and
the reason for each one. Re-run it to regenerate all the photos.

The two home-page sets are the odd ones out, and neither is square.
`dottie-banner.jpg` and `dottie-pure-bred.jpg` are the featured band's crops, both
1920x1637 at the moment (see above). `betsie-left.jpg` and `bonnie-right.jpg` (3:4,
540x720) are the *Pure Bred* section's side photos, and its stacked bands are
`betsie-strip.jpg` (5:3, 1000x600) and `bonnie-strip.jpg` (5:4, 1000x800). Those four come from
`betsy-1` and `bonnie-2`, cut by
`2026-notes/261019-pure-bred-photos/make-pure-bred-photos.codex.py`.

**Trap:** the `aspect-ratio` in the CSS and the crop box in the script must agree,
or a photo silently changes shape. Each script's comment names the CSS rule, and
the CSS comment names the script.

**Trap:** the *Pure Bred* crops have to leave room for the waves that cross them
(see above). `betsie-left.jpg` was re-cut on 2026-10-19 for that reason; the
window moved 50px up the original to leave 13% of grass above Betsy's skull.

The originals carry no EXIF and no GPS data. Neither do the crops. The dog
photos carry `loading="lazy"`. The featured band under the hero is the exception:
it sits near the top of the page, so it loads eagerly and carries no `loading`
attribute. The photos are the heaviest thing on the site: about 2.1 MB across the
ten crops the pages use, of which the featured band's two 457 KB copies of the
same picture are the largest. Two crops nothing uses, `dottie-banner-1.jpg` and
`dottie-pure-bred-1.jpg`, still sit in `src/assets/dogs/` and are still published;
they are candidates for deletion once the wide crop question is settled.

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

Known-good state as of 2026-10-23: 5 pages, 0 scripts, 0 broken images, no
console errors, no unused CSS classes. The home page was checked at 320px,
390px, 767px, 768px, 992px, 1024px, 1280px, 1440px, and 1920px, and again after
the evening's wave rework at 390px, 1280px and 1920px (full page at 1280px), and
again after the two Pure Bred photo fixes at all nine widths.
