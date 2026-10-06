# Build Plan - Tilux Portfolio v3

## Phase 1 - Recon
1. Read the provided blueprint and map every token to a CSS custom property.
2. Locate the live project and confirm the serving process and git remote.
3. Extract and inspect existing assets; confirm image dimensions.

## Phase 2 - Asset preparation
4. Vision-analyse the source portrait against a #F4F4F4 canvas.
5. Test three monochrome treatments, have the image model score them, keep the winner.
6. Crop to remove the jacket detail and export assets/portrait-mono.jpg.

## Phase 3 - Foundation
7. Write the token block exactly as specified, including radius, shadow and spacing scales.
8. Write the type scale for 72/40/24/18/16/14/12.
9. Build the reset, container and focus-visible ring.

## Phase 4 - Hero
10. Fixed floating navigation pill with logo badge, links and mobile toggle.
11. Hero canvas card with the 12-column asymmetric grid.
12. Left column: eyebrow, display name, border-top metadata block.
13. Right column: portrait frame with two glass HUD cards on a staggered float loop.
14. Fixed vertical dot-pagination with scroll spy, tooltips and jump-to-section.

## Phase 5 - Sections
15. Selected work grid with filter chips, skeleton shimmer covers and hover lift.
16. Services with a sticky intro and a five-item accordion.
17. Experience timeline.
18. Contact card with the full input and button state matrix.
19. Footer with brand, three link columns and a live clock.

## Phase 6 - Behaviour
20. Reveal on scroll with IntersectionObserver and animation cleanup.
21. Scroll spy driving both the nav and the pager dots.
22. Accordion, filters, mobile menu, smooth scroll and form validation.

## Phase 7 - Verification
23. HTTP check on every asset.
24. Computed-style assertions for every token and type level.
25. Contrast audit across every live text node.
26. Overflow check at 1440, 768 and 390.
27. Interaction tests for accordion, filters, pager, form and the state matrix.
28. Fix everything the audit surfaces and re-run.

## Phase 8 - Ship
29. Stage, commit and push to the existing remote.
