
Goal
- Keep the site light by default.
- Serve dark mode only when `prefers-color-scheme: dark` is true.
- Stop Brave from force-dark mangling.
- Fix the mobile USP/arrow overlap in Safari without changing the desktop hero.
- Reduce Brave scroll choppiness and make the header feel truly persistent.

What I found
1. `index.html` currently uses `<meta name="color-scheme" content="light">`, which tells the browser only light UI is supported. That works against the “native dark mode” setup you want and can encourage Brave to do its own dark rewrite.
2. `src/index.css` currently has two dark systems at once: an unused `.dark` block and a `@media (prefers-color-scheme: dark)` block. That makes the theme logic harder to reason about.
3. Several main components still hardcode black/white/dark surfaces instead of using theme variables: hero overlays, header, footer, OmMig CTA, modal/menu overlays, accent bars, etc. So even when dark mode is requested, parts of the UI are not truly theme-aware.
4. On the homepage hero, the USP row is still absolutely positioned while the arrow is fixed to the viewport. Safari’s dynamic toolbar/safe-area behavior changes the effective bottom spacing more than Brave, so they collide.
5. The fixed header and floating arrow still use `backdrop-blur`, which is a likely cause of Brave’s choppy scrolling and may also contribute to the “header disappears until I scroll up” behavior.

Plan
1. Rebuild theme handling as true native auto mode
- In `index.html`, change the meta tag to `content="light dark"`.
- In `src/index.css`, keep only one theme system:
  - light tokens in `:root`
  - dark tokens only inside `@media (prefers-color-scheme: dark) { :root { ... } }`
- Remove the unused `.dark` block and the `:root:not(.light)` escape hatch since this project is now “auto only”.
- Keep light as the default token set; dark only applies when the browser explicitly asks for it.

2. Add missing semantic color tokens
- Expand the token set so components stop relying on raw `white/black` and inline dark colors.
- Add variables for things like:
  - inverse sections
  - hero overlays
  - menu/modal overlays
  - image brightness in dark mode
- Slightly reduce accent intensity in dark mode so buttons feel calmer against dark backgrounds.

3. Convert the visible pages/components to theme-aware styling
- `src/pages/Index.tsx`: hero overlay, hero text treatment, CTA borders, USP colors.
- `src/components/Header.tsx`: top-state colors, mobile menu overlay/panel, logo/link contrast.
- `src/components/Footer.tsx`: replace hardcoded always-dark styling with proper inverse-section tokens.
- `src/pages/OmMig.tsx`: hero overlay, accent bars, anecdote cards, CTA section.
- `src/pages/Ydelser.tsx` and `src/components/ContactForm.tsx`: modal overlay, cards, accent details.
- Clean up repeated inline `hsl(0 65% 48%)` usages to use `--red-accent`.

4. Fix the USP overlap on mobile only
- Leave the desktop hero untouched.
- On mobile, stop relying on “absolute USP + fixed arrow” spacing.
- Rework the mobile hero so it reserves explicit bottom space for:
  - the USP row
  - the floating arrow
  - Safari safe-area/browser chrome
- Best fix: make the mobile USP sit in normal flow near the bottom of the hero (`mt-auto`) instead of pinning it absolutely.
- Move the arrow up slightly on mobile and make its offset safe-area aware.

5. Reduce the Brave scroll/rendering issues
- Remove `backdrop-blur` from the fixed header and floating arrow first.
- Replace it with solid/semi-opaque backgrounds plus subtle text shadow/drop shadow where needed.
- Replace `transition-all` on the header with narrower transitions for color/shadow/border only.
- Keep blur only on non-scrolling overlays if needed, and revisit those only if Brave still feels heavy.

6. Verify the intended behavior
- Browser preference = light → full light theme.
- Browser preference = dark → native dark theme, not a forced/inverted one.
- Mobile Safari → USP and arrow no longer overlap.
- Mobile Brave → header stays visible and scrolling feels smoother.

Files to update
- `index.html`
- `src/index.css`
- `src/pages/Index.tsx`
- `src/components/Header.tsx`
- `src/components/FloatingScrollArrow.tsx`
- `src/components/Footer.tsx`
- `src/pages/OmMig.tsx`
- `src/pages/Ydelser.tsx`
- `src/components/ContactForm.tsx`
- `src/components/ServiceCarousel.tsx`
- `src/components/ReviewCarousel.tsx`
- `src/components/ImageCarousel.tsx`

Important note
- With “Auto only”, the site should still appear dark in any browser/device that is actively reporting `prefers-color-scheme: dark`. That is expected. The goal here is to make that dark version intentional and clean, while keeping light as the true default whenever the browser is not explicitly requesting dark.
