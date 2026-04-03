

# Plan: Fix Dark Mode, USP Overlap, and Sticky Header

## Problems identified

1. **Dark mode broken in Brave**: The `color-scheme: light dark` meta tag and CSS declaration *invite* browsers to apply dark mode. The `@media (prefers-color-scheme: dark)` block correctly overrides variables, but several components use hardcoded colors (`text-white`, `bg-black/50`, `hsl(0 65% 48%)` inline styles, `bg-[hsl(220_20%_8%)]` in Footer) that don't adapt. The OmMig CTA section uses `bg-foreground` which swaps to a light color in dark mode, breaking the contrast with its `text-white` children.

2. **USP overlapping scroll arrow on mobile**: The USP bar uses `absolute bottom-[env(safe-area-inset-bottom,0px)] mb-20` while the FloatingScrollArrow is `fixed bottom-10`. On Safari, `env(safe-area-inset-bottom)` can be large, pushing USP up into the arrow zone. The `mb-20` (80px) plus `env()` creates unpredictable stacking.

3. **Header disappearing on Brave mobile**: The header is `fixed top-0` which should always stay visible. Brave's "hide toolbar on scroll" feature can sometimes interfere when elements use `backdrop-blur`. No code issue — likely a browser rendering quirk with `backdrop-blur-md` on fixed elements.

4. **App.css leftover**: `#root { max-width: 1280px; padding: 2rem; }` exists but is not imported — safe to ignore, but cleaning it up is good hygiene.

---

## Changes

### 1. Fix theme system in `src/index.css`
- Change `:root` to `color-scheme: light` (default light)
- Keep the `@media (prefers-color-scheme: dark)` block with `color-scheme: dark` inside it
- Update `index.html` meta tag from `content="light dark"` to `content="light dark"` (keep as-is, it's correct for auto)

### 2. Fix OmMig.tsx CTA section
- Replace `bg-foreground` with a hardcoded dark background (`bg-[hsl(220_20%_10%)]`) so it stays dark regardless of theme — it's a design-dark section with white text.

### 3. Fix Footer.tsx
- The footer uses `bg-[hsl(220_20%_8%)]` with `text-white` — this is fine, it's an always-dark section. No change needed.

### 4. Fix USP/arrow overlap on mobile in `src/pages/Index.tsx`
- Remove `env(safe-area-inset-bottom)` from USP positioning — it's unreliable
- Use a simpler approach: `bottom-28 md:bottom-20` for USP bar on mobile
- Move FloatingScrollArrow from `bottom-10` to `bottom-4` so it sits clearly below USP

### 5. Fix header persistence on Brave in `src/components/Header.tsx`
- Add `-webkit-transform: translateZ(0)` to force GPU compositing, which prevents Brave from treating the header as part of the scrolling content
- Alternatively add `will-change: transform` to the header element

### 6. Clean up `src/App.css`
- Clear the file or remove unused Vite boilerplate styles

---

## Technical details

**Files to edit:**
- `index.html` — keep meta as `light dark`
- `src/index.css` — set `:root` `color-scheme: light`, add `color-scheme: dark` inside the media query
- `src/pages/OmMig.tsx` — line 163: change `bg-foreground` to explicit dark color
- `src/pages/Index.tsx` — line 78: simplify USP bottom positioning
- `src/components/FloatingScrollArrow.tsx` — line 46: change `bottom-10` to `bottom-4`
- `src/components/Header.tsx` — line 74: add `will-change-transform` class
- `src/App.css` — clear unused boilerplate

