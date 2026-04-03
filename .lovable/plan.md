
Goal: restore the old header behavior only, without touching the site’s existing light/dark mode system.

What’s broken now
- `src/components/Header.tsx` was simplified into a permanently solid `sticky` header.
- That removed the previous “overlay at top / solid on scroll” behavior and keeps the red logo details visible all the time.

Plan

1. Restore the old two-state header in `src/components/Header.tsx`
- Reintroduce a lightweight `scrolled` boolean based on scroll position.
- Switch the header back to a persistent `fixed top-0 inset-x-0 z-50` overlay instead of the current in-flow `sticky` bar.
- Use a small threshold so the state flips only when crossing top/not-top, not on every tiny scroll change.

2. Bring back the original visual behavior
- At the top: translucent header, no red logo/underline details, hero-safe text/icon colors.
- After scrolling: solid header background, border/shadow visible, normal foreground colors, red accents return.
- Same transition in reverse when scrolling back up.
- Keep no backdrop blur, since that conflicts with the project’s Brave/performance rule.

3. Make it match page context
- Restore the translucent-at-top version on hero-image pages (`/` and `/om`) where the header should sit over the image.
- Keep service/content pages (`/ydelser`, `/murerarbejde`, `/flisearbejde`) solid from the start for readability.
- Reuse existing theme tokens (`--hero-*`, `--card`, `--foreground`, `--red-accent`) so light/dark modes continue to work correctly.

4. Preserve mobile behavior
- Keep the current mobile drawer and overlay logic.
- When the mobile menu is open, force the header into the solid state so the controls stay readable.
- Limit transitions to background, border, shadow, and text color only.

Files to touch
- Main file: `src/components/Header.tsx`
- Only touch `src/index.css` if a tiny header helper class is needed; otherwise no global CSS/theme changes.

Checks
- Home: transparent at top over the hero, solid with red details after scroll.
- `/om`: same restored behavior.
- Service pages: solid immediately.
- Verify both light and dark mode variants and mobile menu open/close states.
