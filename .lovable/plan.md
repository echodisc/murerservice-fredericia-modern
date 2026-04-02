

## Hero Section Plan

### What we're building
A full-viewport hero section for the ML Murerservice homepage — split layout on desktop (60/40), stacked on mobile.

### Structure

```text
┌─────────────────────────────────────────────────┐
│  HERO (min-h-screen, white bg)                  │
│  ┌──────────────────────┬──────────────────┐    │
│  │  60% TEXT SIDE        │  40% IMAGE SIDE  │    │
│  │                       │                  │    │
│  │  H1: Din murer i...   │  Placeholder     │    │
│  │  Sub: Murerarbejde... │  (#e8e8e8 bg)    │    │
│  │                       │  rounded-2xl     │    │
│  │  [Få et gratis tilbud]│                  │    │
│  │  [Ring 20 32 90 95]   │                  │    │
│  └──────────────────────┴──────────────────┘    │
│  Mobile: stacks vertically, text first          │
└─────────────────────────────────────────────────┘
```

### Files to change

**1. `src/pages/Index.tsx`** — Replace placeholder with the Hero section component.

- Full-height section with white background
- Flexbox row on `lg:` breakpoint, column on mobile
- Left column (60%): H1 with `clamp(2rem, 5vw, 3rem)` sizing, semi-bold Inter; subtitle at 18px in `#555`; two buttons side by side
- Right column (40%): rounded-2xl container with `#e8e8e8` background, min-height ~400px
- 80px vertical padding on desktop, ~40px on mobile
- Amber CTA: `#e8a838` bg, `#1a1a2e` text, bold, rounded-lg, `px-8 py-4`, hover darkens slightly
- Outlined CTA: transparent bg, `#1e5fa6` border and text, rounded-lg, same padding, hover fills with light blue

**2. `src/index.css`** — Add Inter font import via `@import url(...)` at top of file.

No other files changed. No new components — keeping it simple in Index.tsx for now.

