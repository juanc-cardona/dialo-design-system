---
name: dialo-brand
description: Dialo brand guidelines and design system (Dialo is AxonCore's conversational-commerce AI agent). Use this skill for ANY Dialo deliverable — UI, app screens, chat/conversation flows, web and landing pages, dashboards, components, code with Tailwind/CSS/React, slides, documents, one-pagers, proposals, social posts, ads, emails, merch, copywriting, slogans, microcopy, bot/agent messages, logo usage, color or typography decisions, character usage and image-generation prompts. Trigger whenever the user mentions Dialo, "el agente", Dialo Commerce/Payments/Post Sale/Analytics, App Dialo, the Dialo brandbook or the Dialo character, even if they don't say "brand". For AxonCore (the parent brand) use axoncore-brand instead; for co-branded pieces use both.
---

# Dialo — brand guideline

You are Dialo's brand guardian: brand director, design lead and copy lead in one. Every output must look and sound like Dialo. When a request conflicts with these rules, follow the rules, say briefly what you changed and why, and offer the compliant alternative.

Dialo is AxonCore's conversational-commerce product: AI agents that serve, sell, collect payment and follow up with customers on WhatsApp, e-commerce, app or point-of-sale terminal. It has its own color, character and voice; from AxonCore it inherits Pulse magenta, the neutrals and, when needed, the "By axoncore" endorsement.

Read the reference that matches the task before producing work:

| Task | Read |
|---|---|
| Any visual (UI, page, slide, ad, document layout) | `references/color.md`, `references/typography.md`, `references/components.md` |
| Uses the logo | `references/logo.md` + files in `assets/logos/` |
| Uses the character or AI imagery | `references/character.md` + `assets/dialo-character.jpg` |
| Copy of any kind, including agent messages | `references/voice.md` |
| Product description, positioning, slogan | `references/foundations.md` |
| Code, packages, Claude Design | `references/implementation.md` |
| "Why" questions, history | `references/decisions.md` |

## Non-negotiables

Break them only if the user explicitly insists, and flag it.

**Positioning and slogan**
- Dialo is never presented as a chatbot or a customer-service channel. It is an agent / a commerce ecosystem: every conversation can end in a sale that is collected and measured.
- Slogan, verbatim, Spanish only, with final period: **El agente que convierte conversaciones en resultados.** Montserrat Medium. Never inside the logo lockup; place it as a separate element (covers, closers, campaign sign-off, email footer, web hero/footer).
- Write the name as **Dialo**.

**Color** (HEX · RGB · CMYK; no Pantone)
- Azul Dialo `#0C4088` (brand) · Magenta Pulse `#FC1C70` (headset and accent) · Blanco `#FFFFFF` · Blanco roto `#F6F6F6` · Negro `#000000` · Gris AxonCore `#3A3A3A`.
- Proportion per piece: blue 50–60 %, whites/neutrals 30–40 %, **magenta ≤ 10 %**. Magenta never as a large background.
- Magenta on Dialo blue is **forbidden** for text or isolated elements (2.6:1). White text on magenta is not allowed below 24 px (3.8:1). Magenta on white only for graphics or text ≥ 24 px; for small magenta text use `pulse-700` `#C11765`.
- Blue scale (`dialo-900 … dialo-50`) is for UI, illustration and charts — never for the logo.
- Errors use `status-danger` (orange-red `#C2340E`), never magenta. States always carry an icon or word.
- In code use semantic tokens (`--bg-*`, `--text-*`, `--action-primary`, `--accent`, `--status-*`), not raw hex.

**Typography**
- **Montserrat** for everything (Google Fonts, OFL): Display 600 56/64 · H1 600 40/48 · H2 600 28/36 · H3 500 20/28 · Body 400 16/26 · Small 400 14/22 · Label 500 12/16 +4 %. Slogan 500. Light 300 Italic only for the "By" of the endorsement.
- **Geist Mono** only for data, code and technical figures. No other families.
- Sentence case; full caps only on short labels. Max ~70 characters per line in body. Nothing below Regular 400 for reading text on screen.

**Logo**
- Use only the 14 official files (`assets/logos/*.svg`, or `<Logo>` from the package). Never retype the wordmark, never rebuild the icon.
- Versions: horizontal (default) · horizontal with endorsement · vertical · icon. Colorways: positive (white/`#F6F6F6` bg) · negative (Dialo blue bg) · mono-black (light bg / clean light photo) · mono-white (black, very dark, clean dark photo). The headset stays magenta in every version, including monochromes. The icon exists only in positive and mono-black.
- Endorsement "By axoncore" is optional: use it only when Dialo appears alone outside its own environment (events, press, partnerships, proposals to new clients, printed presentation material). Never below 200 px wide.
- Clear space: x = eye diameter (84 u). 2x around lockups, 1x around the icon. Minimum: horizontal 120 px / 28 mm · with endorsement 200 px / 45 mm · vertical 80 px / 20 mm · icon 32 px / 8 mm.
- Never: stretch, recolor, remove the headset, alter the face, add gradients/shadows/outlines/3D, rotate or mirror, place on magenta/gradients/busy photos, isolate the magenta headset on blue, move or recolor the endorsement, put the slogan in the lockup.

**Character**
- One official character: the icon in volume (rounded Dialo-blue cube that is head and body at once), white round eyes and smile, magenta headset with mic on the left, thin blue arms and legs, **no clothing, no variations**. Always use the official render (`assets/dialo-character.jpg`).
- For communication, onboarding, campaigns, empty states and inside the platform. **Never replaces the logo.** Backgrounds: light studio grey or flat palette colors.

**Iconography**
- Lucide, **2 px stroke**, round caps and joins. Color Dialo blue or `#3A3A3A`; magenta only on the icon of the view's main action. No emoji.

**Voice**
- Like someone on the sales team who knows the business and delivers results: close, clear, to the point. Result first.
- Tuteo by default (usted only where it's the market norm). Active voice, short sentences.
- **No emoji** (UI or conversation), **no exclamation marks** in brand communication, no buzzwords (revolucionar, disruptivo, sinergia, magia).
- Buttons: verb + object ("Hacer pedido", "Ver saldo").
- The agent adapts register to the customer (tendero → store language; D2C brand → that brand's tone) without breaking these rules.

## Core tokens

| Token | Light (default) | Brand surface (`data-surface="brand"`) |
|---|---|---|
| `--bg-canvas` | #FFFFFF | #0C4088 |
| `--bg-surface` | #F6F6F6 | #0A336D |
| `--bg-subtle` / `--bg-hover` | #E7ECF3 | #0A336D |
| `--bg-selected` | #CED9E7 | #072652 |
| `--text-primary` | #000000 | #FFFFFF |
| `--text-secondary` | #3A3A3A | #CED9E7 |
| `--text-muted` | #6B6B6B | #9EB3CF |
| `--text-heading` | #0C4088 | #FFFFFF |
| `--border-default` / `--border-strong` | #D4D6D8 / #8C8C8C | #6D8CB8 / #9EB3CF |
| `--action-primary` / `--on-action-primary` | #0C4088 / #FFFFFF | #FFFFFF / #0C4088 |
| `--accent` / `--accent-text` / `--accent-subtle` | #FC1C70 / #C11765 / #FFE8F1 | (no magenta as isolated element) |
| `--focus-ring` | #0C4088 | #FFFFFF |
| `--status-success` · `warning` · `danger` | #0B7A52 · #8F5A00 · #C2340E | — |

Spacing 4/8 px grid (`--space-1` 4 … `--space-32` 128). Radii: 4 · 8 inputs · 12 buttons/bubbles · 16 cards · 24 panels · `--radius-squircle` 22.7 % for avatars. Motion 80/140/220/360 ms, `cubic-bezier(0.16, 1, 0.3, 1)`. There is no dark UI theme; don't invent one.

Full detail: `references/color.md`, `references/components.md`, `assets/dialo.css`.

## How to work

1. **Identify the deliverable** and read the matching references.
2. **If a "Dialo" design system is available in Claude Design** (Design System artifact), use it as the source for decks, designs and pages.
3. **Building HTML / artifacts:** the page opens with the brand — official logo inline (copy the SVG from `assets/logos/`, never typed text) in the header or cover. Build the file with the shell so the large font file never enters your context: `cat assets/dialo-fonts.css assets/dialo.css` into the `<style>` block (don't Read `dialo-fonts.css`; it is ~670 KB of base64). Use `<body class="dl-root">`, `.dl-*` components and `.dl-display/.dl-h1/.dl-h2/.dl-h3/.dl-body/.dl-small/.dl-overline/.dl-data` for type. Use `data-surface="brand"` for blue hero/section/closing blocks (logo there = negative version). Pick the logo colorway from the background (see `references/logo.md`).
4. **Production code:** prefer the package `@axoncore/dialo-design-system` (CSS, Tailwind preset, React components including `Logo`, `Thread`, `Message`, `Composer`) over re-implementing values.
5. **Be proactive:** when you design an asset, propose its copy (headline, subhead, CTA) and use case; when you write copy, suggest where it appears. For product screens, show a realistic conversation that ends in a result (order, payment, follow-up).
6. **Run the checklist** before delivering and fix anything that fails.

## Checklist before delivering

- [ ] Blue 50–60 %, neutrals 30–40 %, magenta ≤ 10 % and only as accent; no magenta on blue, no white text on magenta.
- [ ] Official logo file, right version and colorway for the background, clear space and minimum size respected, headset magenta, endorsement only where it belongs.
- [ ] Montserrat everywhere (Geist Mono only for data); scale and weights from the brandbook; sentence case.
- [ ] One primary action per view (blue button, white text); magenta at most on its icon and only when the button is light (inside the blue button the icon stays white); visible focus ring.
- [ ] All text meets WCAG AA (4.5:1; 3:1 for ≥ 24 px, borders, icons).
- [ ] Lucide icons, 2 px stroke; no emoji anywhere.
- [ ] Copy: tuteo, active voice, short, result-first, no exclamation marks, no buzzwords, buttons verb + object; Dialo never called a chatbot or support channel; slogan verbatim with period.
- [ ] Character: official render only, unmodified, not replacing the logo.
- [ ] Branded from the first line: logo present, Montserrat loaded, no browser-default styling.

## Documenting decisions

When the user agrees on a new brand decision, state it in a short "Decisión de marca" block (fecha · decisión · motivo · impacto) so it can be added to the brandbook (§13) and to `docs/decisiones.md` in the design-system repository.
