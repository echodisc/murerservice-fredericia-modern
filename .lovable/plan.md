

# Layout Changes: Services, Ydelser, and Contact Confirmation

## 1. Front page ServiceCarousel — Remove Specialarbejde, side-by-side on desktop

**Current**: 3 slides (Murerarbejde, Flisearbejde, Specialarbejde) in an Embla carousel on all screen sizes.

**New behavior**:
- Remove the Specialarbejde slide entirely (delete from `serviceSlides` array, remove the `murer2` import)
- **Desktop (md+)**: Show both cards side-by-side in a simple 2-column grid. No carousel, no arrows, no dots, no fade edges.
- **Mobile**: Keep Embla carousel with 2 slides, arrows/dots for swiping between them.

**File**: `src/components/ServiceCarousel.tsx`

## 2. Ydelser page — Rename h1, remove Specialarbejde section, add "special" card to each carousel

**File**: `src/pages/Ydelser.tsx`

- Change h1 from "Vores ydelser" to "Murer- og fliseydelser"
- Delete the entire `specialServices` array and its `<ServiceBlock>` rendering
- Remove `Nybyggeri & tilbygninger` from `murerServices` (first item)
- Add a new last item to `murerServices`: a "Specialarbejde" card with text like "Har du en anden muropgave i tankerne? Vi tager gerne specialopgaver — kontakt os med din idé." (reuse an existing image like `murer3`)
- Add a new last item to `fliseServices` (it already has "Specialopgaver" as the last item — update its title to "Specialarbejde" for consistency and tweak the text to match the same "request anything" tone)

## 3. Contact form confirmation — Warmer thank-you message

**File**: `src/components/ContactForm.tsx`

The submitted state (lines 18-29) already shows a confirmation. Enhance it:
- Larger checkmark icon
- Title: "Tak for din henvendelse!"
- Body: "Vi sætter stor pris på din tillid. Du hører fra os hurtigst muligt — typisk inden for samme dag."
- Add a subtle fade-in animation via Tailwind `animate-in fade-in`

## Files to edit

1. `src/components/ServiceCarousel.tsx` — remove Specialarbejde, desktop grid + mobile carousel
2. `src/pages/Ydelser.tsx` — rename h1, remove specialServices block, remove Nybyg, add Specialarbejde cards
3. `src/components/ContactForm.tsx` — warmer confirmation message

