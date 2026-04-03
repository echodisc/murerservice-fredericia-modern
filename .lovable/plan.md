

# Fix: Brave Night Mode, Color Shifts, and Scroll Stutter

## Findings from code audit

1. **OmMig.tsx hero**: Already uses an `<img>` tag — NOT a CSS background-image. No conversion needed. No pages use background-image for photos.
2. **`forced-color-adjust: none`**: Already applied to `header, footer, section.relative, .bg-card, .bg-background` in `index.css`. Needs to be extended to CTA buttons, divider lines, and card components specifically.
3. **Fonts**: Already self-hosted (`/fonts/InterVariable.woff2`). No Google Fonts CDN import.
4. **`scroll-behavior: smooth`**: Already removed. No `scroll-snap` anywhere.
5. **No IntersectionObserver animations**, no parallax, no `background-attachment: fixed`.
6. **Hero**: Already a static `<img>` with `object-fit: cover` in a fixed-height (`h-screen h-[100svh] overflow-hidden`) container. No scroll-linked transforms.

### JavaScript running during scroll (the real problem)

These three components have `window.addEventListener('scroll')` or equivalent listeners that fire on every scroll frame:

| Component | What it does on scroll | Impact |
|-----------|----------------------|--------|
| `Header.tsx` | Reads `window.scrollY`, sets React state (`scrolled`), toggles classes | **High** — React re-render on every scroll event |
| `FloatingScrollArrow.tsx` | Reads `window.scrollY`, sets React state (`visible`), toggles opacity | **High** — React re-render on every scroll event |
| `ServiceCarousel.tsx` | Embla's internal `on('scroll')` updates `scrollProgress` state + dot indicators | **Medium** — only fires during carousel swipe, not page scroll |

The Header and FloatingScrollArrow listeners are the primary cause of stutter. Each scroll event triggers a React state update → re-render → DOM diff → repaint, which Brave's shields compound.

### Other issues found

- Several `<img>` tags still missing `width`/`height` attributes (OmMig, Ydelser, ImageCarousel)
- Mobile review accordion uses `animate-in fade-in slide-in-from-top-2` (minor)
- Some cards use `transition-all` instead of targeted transitions
- `hover:scale-[1.02]` on Ydelser cards triggers layout recalculation

---

## Changes by file

### 1. `src/components/Header.tsx` — Remove scroll listener, use CSS sticky

Remove the entire `useEffect` scroll listener and the `scrolled` state variable. Replace with:

- Change from `fixed` to `sticky top-0`
- Always use solid `bg-card` background with `shadow-sm` and `border-b`
- Add `-webkit-transform: translateZ(0)` and `will-change: transform` via inline style for GPU compositing
- Remove the transparent-over-hero behavior entirely (it requires JS)
- Text colors: always use `text-foreground` (works in both light/dark via CSS variables)
- This eliminates the biggest source of scroll-triggered JS

### 2. `src/components/FloatingScrollArrow.tsx` — Remove scroll listener

Remove the `useEffect` scroll listener and `visible` state. Instead:

- Always render the arrow (no conditional visibility based on scroll position)
- Use CSS `animation-delay` for a simple fade-in on page load
- Remove `animate-bounce` (constant repaints)
- Add `pointer-events-auto` always since it's always visible
- This eliminates the second scroll listener

### 3. `src/index.css` — Extend forced-color-adjust

Add more targeted selectors:

```css
header, footer,
section.relative,
.bg-card, .bg-background,
a[href^="tel:"],
button,
[class*="rounded-lg"][class*="border"],
[class*="bg-accent"],
[class*="bg-[hsl(var(--red-accent"])],
span[class*="h-1"][class*="rounded-full"] {
  forced-color-adjust: none;
}
```

This covers: navbar, hero sections, CTA buttons, divider lines, card components, and the footer — without being truly global.

### 4. `src/pages/Index.tsx` — Add width/height to about image

The hero img already has `width={1920} height={1080}`. Add dimensions to the about section image (line ~99).

### 5. `src/pages/OmMig.tsx` — Add width/height to all images

Add explicit `width` and `height` to every `<img>` tag that's missing them.

### 6. `src/pages/Ydelser.tsx` — Image dimensions + transition fix

- Add `width` and `height` to all card images
- Change `transition-all` to `transition-[box-shadow]` on desktop cards
- Remove `hover:scale-[1.02]` (causes layout recalculation during nearby scroll)

### 7. `src/components/ImageCarousel.tsx` — Add image dimensions

Add `width={800} height={600}` to carousel images.

### 8. `src/components/ContactForm.tsx` — Transition fix

Change any remaining `transition-all` to `transition-colors`.

### 9. `src/pages/Index.tsx` — Review accordion

The mobile "Se kundeanmeldelser" toggle uses conditional rendering. Change to always-rendered with `max-height` + `overflow-hidden` transition instead of mount/unmount with `animate-in`.

---

## Summary of what gets eliminated

- 2 scroll event listeners removed (Header + FloatingScrollArrow)
- 0 JavaScript executes during page scroll
- All images have reserved dimensions
- `forced-color-adjust: none` on all themed components
- No `transition-all`, no `hover:scale` on cards
- Accordion uses fixed `max-height` transition

## Files to edit

1. `src/components/Header.tsx`
2. `src/components/FloatingScrollArrow.tsx`
3. `src/index.css`
4. `src/pages/Index.tsx`
5. `src/pages/OmMig.tsx`
6. `src/pages/Ydelser.tsx`
7. `src/components/ImageCarousel.tsx`
8. `src/components/ContactForm.tsx`

