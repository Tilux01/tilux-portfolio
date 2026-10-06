# Build Plan - Tilux Portfolio v5

## Phase 1 - Recon
1. Read the supplied blueprint and map every token to a CSS custom property.
2. Locate the live project, confirm the serving process and the git remote.
3. Inspect the existing nav and hero markup and the reveal, spy and form logic.

## Phase 2 - Asset review
4. Measure every asset. Portrait is 768x626, work covers are 1600 ratio except Isafast at 0.49.
5. Confirm the portrait is greyscale under the treatment used by the hero frame.

## Phase 3 - Tokens
6. Rewrite the token block to v5 values, including the new radii, shadows and surfaces.
7. Rebuild the type scale to 80/36/24/16/14/12/10.
8. Re-point the container to 1280px and the gutter to clamp(16px, 4vw, 64px).
9. Re-map chips, tags, captions and labels onto the new caption and pill specs.

## Phase 4 - Navigation header
10. Replace the floating nav pill with a bare 1200px, 72px header, no border and no shadow.
11. Badge only as the brand mark, 40px black pill, 32px gap to a four link row.
12. Retain a mobile toggle plus card panel below 768px.

## Phase 5 - Hero
13. Hero becomes a contained 1200px card: 32px radius, 1px #EAEAEA, shadow 0 20px 40px rgba(0,0,0,0.03),
    min-height calc(100vh - 100px), padding 32px 48px.
14. Twelve column grid with spans 5 / 6 / 1 at 1024px and up, single column below.
15. Left column: dot plus eyebrow, display title, divided meta block, mouse scroll cue.
16. Centre column: 420x480 frame, grayscale image, two glass callouts carrying the float animation.
17. Right column: numbered pagination with five dot buttons.

## Phase 6 - Behaviour
18. Wire the pagination as a real five slide showreel covering the eyebrow, meta and both callouts.
19. Add arrow key, Home and End support plus aria-current and an aria-live meta region.
20. Hide the pagination when JavaScript is unavailable so no dead control ships.
21. Retire the old sticky nav scroll state and the old fixed side pager.

## Phase 7 - Verification
22. Assert every computed style against the brief at 1920, 1440, 1366, 1024, 900, 768 and 390.
23. Run a contrast audit over every live text node.
24. Regression test the accordion, filters, scroll spy, anchor scrolling and form validation.
25. Capture screenshots and pixel probe the canvas, card border, corner radius and frame greyscale.
