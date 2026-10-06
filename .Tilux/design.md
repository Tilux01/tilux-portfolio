# Design Specification - Tilux Portfolio v5
Editorial Minimalist: Dark Mode Editorial / Cinematic Portfolio Hero

Source of truth. Every value in styles.css traces back to a line below.

## 1. Philosophy and Aesthetic
- Mood: editorial minimalist, cinematic portfolio, dramatic contrast between pure white surfaces and deep blacks.
- Whitespace: highly spacious. Generous margins, asymmetric balance, sparse typography.
- Elevation: flat white canvas plus absolute-positioned glassmorphic callout cards over a monochrome portrait.
- Theme: light studio only. No dark theme defined in this brief.

## 2. Color Tokens
| Token | Value | Usage |
|---|---|---|
| --color-primary | #0A0A0A | Brand badge, titles, active dot, focus ring |
| --color-primary-hover | #171717 | Badge hover |
| --color-primary-active | #000000 | Badge active |
| --color-primary-subdued | #737373 | Reserved |
| --color-accent | #0A0A0A | Accent text |
| --color-success | #10B981 | Valid field border |
| --color-warning | #F59E0B | Reserved |
| --color-danger | #EF4444 | Error field border |
| --color-bg-app | #F8F9FA | Page canvas |
| --color-surface-1 | #FFFFFF | Hero card, nav badge, cards |
| --color-surface-2 | #FFFFFF | Floating pills |
| --color-surface-3 | #F1F5F9 | Hero image area (frame gradient base) |
| --color-surface-glass | rgba(255,255,255,0.9) | Callout glass |
| --color-border-base | #E2E8F0 | Default borders, pill borders |
| --color-border-muted | #F1F5F9 | Hero meta divider |
| --color-border-hero | #EAEAEA | Hero card border (exact) |
| --color-border-hover | #94A3B8 | Input hover |
| --color-border-active | #0A0A0A | Focus borders |
| --color-dot | #0F172A | Status dots (glyph safety mapping) |
| --backdrop-blur | blur(12px) | Callout glass |
| --color-text-primary | #0A0A0A | Body and headings |
| --color-text-muted | #64748B | Secondary text |
| --color-text-muted-on-app | #5D6879 | Derived: muted on the #F8F9FA canvas (5.33:1) |
| --color-text-disabled | #CBD5E1 | Inactive dots, mouse outline |
| --color-text-inverse | #FFFFFF | Text on dark |
| --color-text-badge | #1E293B | Callout label text |
| --shadow-glow | 0 0 20px rgba(0,0,0,0.05) | Glow |
| --shadow-card | 0 10px 30px rgba(0,0,0,0.04) | Card hover, contact card |
| --shadow-hero | 0 20px 40px rgba(0,0,0,0.03) | Hero card |
| --shadow-callout | 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1) | Callout (Tailwind shadow-lg) |
| --shadow-inset | inset 0 2px 4px 0 rgba(0,0,0,0.05) | Hero frame (Tailwind shadow-inner) |

## 3. Radii
| Token | Value | Usage |
|---|---|---|
| --radius-pill | 9999px | Badge, chips, tags, dots |
| --radius-hero | 32px | Hero card |
| --radius-card | 24px | Cards |
| --radius-frame | 16px | Hero portrait frame |
| --radius-callout | 12px | Floating callout cards |
| --radius-input | 12px | Text inputs |

## 4. Typography
Plus Jakarta Sans, ital wght 0,300..800 + 1,300..800. Mono: Courier New.

| Level | Size | Weight | Line height | Tracking | Transform |
|---|---|---|---|---|---|
| Display 1 | 80px (clamp 48-80) | 800 | 1.05 | -0.03em | none |
| Heading 1 | 36px | 700 | 1.2 | -0.02em | none |
| Heading 2 | 24px | 600 | 1.3 | -0.01em | none |
| Heading 3 | 16px | 600 | 1.4 | 0 | none |
| Body Large | 14px | 400 | 1.5 | 0 | none |
| Body Regular | 12px | 400 | 1.5 | 0 | none |
| Caption | 10px | 600 | 1.4 | 0.08em | uppercase |
| Hero eyebrow | 10px | 600 | 1.4 | 0.10em | uppercase |
| Hero meta label | 12px | 600 | 1.4 | 0.05em | uppercase |

Display uses clamp(3rem,12vw,5rem) so it resolves to exactly 80px at every desktop width and 48px on phones.

## 5. Spatial Scale
space-1 4, space-2 8, space-3 12, space-4 16, space-6 24, space-8 32, space-12 48, space-16 64.

## 6. Layout
- Container: 1200px for nav and hero. 1280px for content sections.
- Page gutter: clamp(16px, 4vw, 64px).
- Sequence: Navigation Header -> Hero Split View (branding and typography left, portrait centre, pagination and indicators right).

### Navigation Header
max-width 1200px, height 72px, padding 0 32px, margin 0 auto, border 0, box-shadow none, background transparent, position relative, z-index 30. Left group: 40px black pill badge with 32px gap to links. Links 14px/500 #64748B, current link 600 #0A0A0A. Mobile below 768px uses a toggle plus a white card panel.

### Hero Card
max-width 1200px, margin 0 auto, min-height calc(100vh - 100px) with calc(100svh - 100px) fallback, padding 32px 48px (32px 24px below 768px), border-radius 32px, background #FFFFFF, border 1px solid #EAEAEA, box-shadow 0 20px 40px rgba(0,0,0,0.03), overflow hidden, position relative, z-index 10.

Inner grid: 12 columns, gap 48px, align-items center, at 1024px and up. Below 1024px a single column with the same gap.

| Item | Span | Content |
|---|---|---|
| hero-copy | 5 | eyebrow row, display title, meta block, scroll cue |
| hero-visual | 6 | 420x480 portrait frame plus two callouts |
| hero-pager | 1 | current number, five dots, total number |

Note: spans are only declared inside the 1024px media query. Declaring them on a single-column grid creates implicit columns and 48px gaps that overflow the card.

## 7. Component Details
### Hero copy
- Eyebrow row: 6px dot plus 10px uppercase label, 8px gap, 16px bottom margin.
- Title: Display 1, 32px bottom margin.
- Meta block: 16px top padding, border-top 1px #F1F5F9, 16px gap, label 12px uppercase, paragraph 14px #64748B max-width 28rem.
- Scroll cue: 48px top margin, 16x28 mouse outline (2px #CBD5E1) with a 4x6 bouncing wheel, 12px/500 label.

### Hero frame
width 100%, max-width 420px, height 480px, border-radius 16px, background linear-gradient(180deg,#F1F5F9,#E2E8F0), box-shadow inset 0 2px 4px rgba(0,0,0,0.05), overflow hidden. Image object-fit cover, object-position center 20%, filter grayscale(1) contrast(1.06).

### Floating callout cards
- A: top 48px, right 32px. B: bottom 64px, left 16px, max-width 220px.
- Wrapper carries the float: floatBadge 4s ease-in-out infinite, 0 to -6px. B delayed 1.6s. Hover lift lives on the inner card so the two transforms do not fight.
- Card: padding 8px 16px (B: 10px), border-radius 12px, background rgba(255,255,255,0.9), backdrop-filter blur(12px), border 1px solid rgba(226,232,240,0.8), shadow-lg, 12px/600 #1E293B (B: 11px). Hover: translateY(-1px) plus shadow-card. Focus-visible: 2px ring.

### Pagination
- Current number 12px/700 #0A0A0A, total 12px/700 #64748B, 12px gaps, vertical at 1024px and up, horizontal below.
- Dot: 12x12 button, transparent 2px border, 4px inner dot #CBD5E1. Active gets a #0A0A0A 2px ring and a #0A0A0A inner dot. Hit area extended to 24px via a ::before with inset -6px.

## 8. Motion
- Reveal: opacity 0 to 1, translateY 20px to 0, 0.5s cubic-bezier(0.16,1,0.3,1), 120ms stagger via --d.
- floatBadge: 0 and 100 percent translateY(0), 50 percent translateY(-6px), 4s ease-in-out infinite.
- mouseBounce: 0 and 100 percent translateY(0), 50 percent translateY(8px), 1.6s.
- All animation and transition disabled under prefers-reduced-motion.

## 9. Accessibility
- Focus-visible: outline 2px solid #0A0A0A, offset 2px. Verified on nav links, pager dots, chips, buttons, inputs.
- Contrast: 111 live text nodes audited, 0 failures, minimum ratio 4.51:1.
- Pager dots are real buttons with aria-label and aria-current, arrow key, Home and End support, and an aria-live region on the meta block.
- The pager is hidden when JavaScript is unavailable so no dead controls are exposed.

### Deliberate deviations from the brief
| Brief | Built | Why |
|---|---|---|
| Hero eyebrow #94A3B8 | #64748B | #94A3B8 on white is 2.56:1, a hard WCAG AA fail |
| Scroll cue #94A3B8 | #64748B | Same reason |
| Total number #94A3B8 | #64748B | Same reason, and it is meaningful text |
| Muted #64748B on #F8F9FA claimed 5.1:1 | derived #5D6879 on canvas | Measures 4.33:1, added a canvas-safe variant |
| Hero vertical padding 64px (JSX py-16) | 32px | Section 6 box model says 32px 48px and is the authoritative spec |
| Meta label 16px Heading 3 | 12px | The JSX sets text-xs tracking-wider on this label |
| Dot gap 8px | 8px between 12px hit boxes | Keeps the 4px dot size exact while giving a usable target |
| Nav has no wordmark | Badge only | Matches the JSX and the "brand logo pill framing" trait |
