

## Problem

The header is `fixed` and overlays the hero section. The hero uses `justify-center` to vertically center its content, but doesn't account for the header's height (~64px mobile, ~80px desktop). On the published site, the centered content sits too high because the available visual space is actually `hero height - header height`, not the full hero height.

In the Lovable preview iframe, this may render slightly differently due to the iframe's own chrome/offset.

## Solution

Add top padding to the hero section to offset the fixed header, so the content centers within the visible area below the header.

### Changes (1 file)

**`src/pages/Index.tsx`** — Add `pt-16 md:pt-20` to the hero `<section>` element (matching the header's `h-16 lg:h-20`). This shifts the centering context downward so content appears centered in the visible area below the header, on both mobile and desktop.

```
h-[85vh] md:h-[70vh] min-h-[400px] pt-16 md:pt-20
```

This is a single-line class addition. No other files or logic changes needed.

