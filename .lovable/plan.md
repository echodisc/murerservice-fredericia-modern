

# Fix: Brave Night Mode, Scroll Jitter, Hero Scaling

## Category 1 — Brave Night Mode

**Current state**: All images already use `<img>` tags (no CSS background-images). However, `src/index.css` line 155-157 applies a global `img { filter: brightness(var(--img-brightness, 1)); }` which in dark mode becomes `0.8`. Brave night mode stacks its own dimming on top, making images invisible.

**Fix**:
- **`src/index.css`**: Remove the global `img { filter: brightness() }` rule and the `--img-brightness` variable from both light and dark blocks.
- **`src/index.css`**: Add `forced-color-adjust: none` to targeted selectors only — hero sections, cards, navbar, footer — not globally. This tells Brave we handle our own theming for those elements.

```css
/* Add after the body rule */
header, footer,
[class*="hero"], section.relative,
.bg-card, .bg-background {
  forced-color-adjust: none;
}
```

## Category 2 — Scroll Jitter (Brave Shields)

### 2a. Missing width/height on images

Several `<img>` tags lack explicit `width` and `height` attributes, causing layout shift if loading is delayed:

| File | Issue |
|------|-------|
| `src/pages/OmMig.tsx` line 41 | Hero img — no width/height |
| `src/pages/Ydelser.tsx` line 96 | Mobile carousel imgs — no width/height |
| `src/pages/Ydelser.tsx` line 130 | Desktop grid imgs — no width/height |
| `src/pages/Index.tsx` line 37 | Hero img — no width/height |
| `src/components/ImageCarousel.tsx` line 21 | Carousel imgs — no width/height |

**Fix**: Add `width={800} height={600}` (or appropriate aspect) to every `<img>` missing them. All already have CSS `object-cover` with fixed heights so this is purely for layout reservation.

### 2b. Self-host Google Fonts

`src/index.css` line 1 loads Inter from Google Fonts CDN. Brave Shields blocks this, causing a font-swap layout shift.

**Fix**:
- Download Inter font files (wght 400, 500, 600, 700) and place in `public/fonts/`.
- Replace the `@import url(...)` with local `@font-face` declarations.

### 2c. transition-all causing jitter

`src/pages/Ydelser.tsx` line 127: Desktop cards use `transition-all` which transitions every CSS property during scroll-triggered repaints. The `hover:scale-[1.02]` also causes layout recalculation.

**Fix**:
- Change `transition-all` to `transition-[shadow,transform]` on Ydelser desktop cards.
- Change `transition-all` to `transition-colors` on ContactForm submit button (line 72).

## Category 3 — Hero Scaling on Scroll

**Current state**: `src/pages/Index.tsx` line 36 uses `min-h-screen min-h-[100svh]`. The `min-h` prefix allows the section to grow taller than the viewport if content pushes it, and the hero image with `absolute inset-0` stretches to fill the container — any size change causes the image to visually rescale.

**Fix**:
- Change hero from `min-h-screen min-h-[100svh]` to `h-screen h-[100svh] overflow-hidden`.
- This locks the hero to exactly one viewport height. `overflow-hidden` prevents any content from expanding it.

## Files to edit

1. **`src/index.css`** — Remove `img { filter }` rule + `--img-brightness` vars, add `forced-color-adjust: none` on key selectors, replace Google Fonts `@import` with local `@font-face`
2. **`src/pages/Index.tsx`** — Hero `h-screen h-[100svh] overflow-hidden`, add width/height to hero img
3. **`src/pages/OmMig.tsx`** — Add width/height to hero img
4. **`src/pages/Ydelser.tsx`** — Add width/height to all card imgs, `transition-all` → `transition-[shadow,transform]`
5. **`src/components/ImageCarousel.tsx`** — Add width/height to imgs
6. **`src/components/ContactForm.tsx`** — `transition-all` → `transition-colors`
7. **`public/fonts/`** — Add Inter font files (400, 500, 600, 700)

