

# Combined Fix: Brave Colors, Scroll Jump, Contact Bounce, Header Blocking, Safari USP

## Summary

Six issues consolidated into one pass across six files.

## Changes by file

### 1. `src/index.css` — Hero tokens + remove smooth scroll

Add to `:root` and duplicate in the dark media query (same values — hero is always over a dark overlay):

```css
--hero-text: 0 0% 100%;
--hero-text-muted: 0 0% 100% / 0.8;
--hero-text-subtle: 0 0% 100% / 0.5;
--hero-border: 0 0% 100%;
```

Remove `scroll-behavior: smooth` from `html` (keep `scroll-padding-top: 5rem`). JS `scrollTo({ behavior: 'smooth' })` still works independently.

### 2. `src/pages/Index.tsx` — Token swap, `svh`, USP spacing

- **Hero height**: `min-h-screen min-h-[100dvh]` → `min-h-screen min-h-[100svh]`
- **Hardcoded whites → tokens**:
  - `text-white` → `text-[hsl(var(--hero-text))]`
  - `text-white/80` → `text-[hsl(var(--hero-text-muted))]`
  - `text-white/90` → `text-[hsl(var(--hero-text)/0.9)]`
  - `text-white/50` → `text-[hsl(var(--hero-text-subtle))]`
  - `border-white/60` → `border-[hsl(var(--hero-border)/0.6)]`
  - `hover:bg-white/10` → `hover:bg-[hsl(var(--hero-border)/0.1)]`
- **USP bottom**: `bottom-[70px]` → `bottom-[100px]` (mobile only, `md:bottom-20` unchanged)

### 3. `src/pages/OmMig.tsx` — Hero `text-white` → token

Line 49: `text-white` → `text-[hsl(var(--hero-text))]`

### 4. `src/components/Header.tsx` — Transparent-state tokens + solid scrolled bg

Unscrolled state only:
- `text-white/90` → `text-[hsl(var(--hero-text)/0.9)]`
- `text-white` → `text-[hsl(var(--hero-text))]`
- `after:bg-white` → `after:bg-[hsl(var(--hero-text))]`
- Logo + hamburger `text-white` → `text-[hsl(var(--hero-text))]`

Scrolled state: `bg-card/98` → `bg-card` (fully opaque, blocks content in dark mode).

### 5. `src/components/ContactForm.tsx` — Submit button

`text-white` → `text-[hsl(var(--inverse-fg))]` (on red background, not a hero context).

### 6. `src/components/FloatingScrollArrow.tsx` — Performance

- Remove `animate-bounce` from the button.
- Replace conditional `return null` with always-rendered element using `opacity-0/opacity-100` + `transition-opacity` + `pointer-events-none` when hidden.

## Technical rationale

- **Brave inversion**: Brave's forced dark mode inverts literal Tailwind color classes (`text-white` → dark). CSS `hsl(var(...))` values are left alone, so using custom properties for hero/header text makes them Brave-proof.
- **`svh` vs `dvh`**: `dvh` recalculates when mobile browser chrome hides/shows, causing the hero to resize mid-scroll. `svh` is the smallest viewport (URL bar visible) and never changes.
- **`scroll-behavior: smooth` removal**: The CSS property fights with JS-driven smooth scrolls, causing the "bounce back" near the contact section.
- **Arrow layout shift**: Mounting/unmounting the arrow DOM node causes reflows; opacity transition keeps it in the DOM.

