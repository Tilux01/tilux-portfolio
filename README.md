# Tilux - Portfolio

Personal portfolio for Tilux, a designer and developer based in Lagos. Editorial minimalist
layout, dual light and dark theme, built by hand with no framework and no build step.

## Stack
- Semantic HTML5
- Modern CSS with custom properties (design tokens)
- Vanilla JavaScript, no dependencies
- Plus Jakarta Sans via Google Fonts

## Structure
- `index.html` - single page, seven sections: navbar, hero, selected work, services, experience, CTA, footer
- `styles.css` - token driven stylesheet, light and dark themes, responsive from 390px up
- `script.js` - theme toggle, scroll reveal, accordion, work filter, active nav tracking, live clock
- `assets/` - project covers and portrait
- `.Tilux/` - design system documentation used to build the site

## Features
- Light and dark theme, respects system preference, persists to localStorage
- Sticky blurred navbar with scroll state and active section tracking
- Scroll reveal animations with reduced motion support
- Filterable project grid
- Accessible accordion for services, one panel open at a time
- Keyboard friendly, visible focus rings, skip link, WCAG AA contrast throughout

## Run locally
```
python3 -m http.server 8082
```
Then open http://127.0.0.1:8082

## Design system
See `.Tilux/design.md` for the full colour tokens, type scale, spacing scale and component matrix.

---

Built by Tilux.
