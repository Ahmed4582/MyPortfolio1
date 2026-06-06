# Implementation Plan: Frontend Developer Portfolio

**Branch**: `001-portfolio-frontend` | **Date**: 2026-06-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/001-portfolio-frontend/spec.md`

---

## Summary

Refactor an existing React 18 + Vite + Tailwind portfolio (v5) to eliminate Supabase and use static JSON data files, remove the WelcomeScreen, add a Skills section, convert the Certificates grid to a Framer Motion drag carousel, add a project detail modal with prev/next navigation, replace the contact form backend with EmailJS, and bring the site to WCAG 2.1 AA accessibility compliance.

---

## Technical Context

**Language/Version**: JavaScript (ES2022), React 18.3  
**Primary Dependencies**: Vite 5, Tailwind CSS 3, Framer Motion 11, EmailJS (`@emailjs/browser`), Lucide React, MUI 6 (retained for existing Tabs/AppBar in Portfolio section)  
**Storage**: Static JSON files in `public/data/` — no database  
**Testing**: Manual browser testing (responsive, keyboard nav, form submission); no automated test suite required by spec  
**Target Platform**: Modern browsers (Chrome, Firefox, Safari latest 2 versions), mobile-first  
**Project Type**: Single-page web application (React SPA)  
**Performance Goals**: Full load + interactive < 3 seconds on standard connection (SC-002); skeleton loaders visible within 100ms of section mount (SC-005)  
**Constraints**: Framer Motion for new interactive components; AOS retained for existing scroll effects; no backend/server required  
**Scale/Scope**: Single developer portfolio; ~10–20 projects, ~15–30 certificates, ~13 skills

---

## Constitution Check

*No project constitution has been defined for this repository. All implementation gates default to spec requirements.*

| Gate | Status | Notes |
|------|--------|-------|
| FR-010: No artificial delays | MUST FIX | WelcomeScreen currently blocks all content |
| FR-007: Skeleton loaders on JSON sections | NEW | Not currently implemented |
| FR-011: WCAG 2.1 AA | NEW | No accessibility layer currently exists |
| Data layer: JSON only | MUST FIX | Supabase currently used |
| EmailJS contact | MUST FIX | Currently uses formsubmit.co |
| Certificates carousel | MUST FIX | Currently a static grid |
| Skills section | NEW | Does not exist |

---

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-frontend/
├── plan.md              ← this file
├── research.md          ← Phase 0 decisions
├── data-model.md        ← JSON schemas, state machines, entity map
├── quickstart.md        ← setup and run instructions
├── checklists/
│   └── requirements.md  ← spec quality checklist
└── tasks.md             ← Phase 2 output (/speckit.tasks command)
```

### Source Code

```text
public/
├── data/
│   ├── projects.json        ← migrated from Supabase / projects_rows.json
│   ├── certificates.json    ← migrated from Supabase / certificates_rows.json
│   └── skills.json          ← new
└── images/
    ├── projects/
    ├── certificates/
    └── placeholder.jpg

src/
├── hooks/
│   ├── useJsonData.js       ← new: replaces Supabase fetch pattern
│   └── useScrollSpy.js      ← new: active nav section tracking
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx       ← update: wire useScrollSpy
│   │   ├── Background.jsx   ← keep as-is
│   │   └── Footer.jsx       ← extract from App.jsx inline JSX
│   ├── portfolio/
│   │   ├── ProjectCard.jsx  ← keep CardProject.jsx, rename + minor update
│   │   ├── ProjectModal.jsx ← new: in-page modal with prev/next
│   │   ├── CertificatesCarousel.jsx ← new: FM drag carousel
│   │   ├── SkillsChart.jsx  ← new: tiered skill badges
│   │   └── TechStackIcon.jsx← keep as-is
│   ├── ui/
│   │   ├── Skeleton.jsx     ← new: shared pulse placeholder
│   │   └── Tooltip.jsx      ← new: accessible hover tooltip
│   └── social/
│       └── SocialLinks.jsx  ← keep as-is
├── Pages/
│   ├── Home.jsx             ← minor: keep typing effect; add FM entrance animations
│   ├── About.jsx            ← update: remove Supabase, derive stats from JSON arrays
│   ├── Portfolio.jsx        ← major refactor: JSON data, Skills, Carousel, ProjectModal
│   └── Contact.jsx          ← update: replace formsubmit/axios with EmailJS
├── App.jsx                  ← update: remove WelcomeScreen + state guard
└── supabase.js              ← DELETE
```

---

## Sprint Roadmap

### Sprint 1 — Foundation (Critical Path)

**Goal**: Site loads instantly without Supabase or WelcomeScreen; all data comes from JSON.

| Task | File(s) | Details |
|------|---------|---------|
| S1-01 | `App.jsx` | Remove `showWelcome` state, `WelcomeScreen` import, and `AnimatePresence` gate. Delete `WelcomeScreen.jsx`. |
| S1-02 | `src/hooks/useJsonData.js` | Create hook: `fetch(path)` → `{data, loading, error}`. AbortController for cleanup. |
| S1-03 | `public/data/` | Copy and validate `projects.json`, `certificates.json`. Verify field names match component props. |
| S1-04 | `public/data/skills.json` | Create skills JSON with Expert / Proficient / Familiar tiers (13 entries from data-model.md). |
| S1-05 | `src/components/ui/Skeleton.jsx` | Pulse placeholder component; accepts `className` for sizing. |
| S1-06 | `src/Pages/Portfolio.jsx` | Replace Supabase `fetchData` with `useJsonData('/data/projects.json')` and `useJsonData('/data/certificates.json')`. Show Skeleton while loading. |
| S1-07 | `src/Pages/About.jsx` | Remove Supabase `fetchStats`. Derive `totalProjects` / `totalCertificates` from props or a shared context fed by Portfolio's loaded arrays. |
| S1-08 | `src/supabase.js` | Delete file. Remove from package.json. `npm uninstall @supabase/supabase-js`. |
| S1-09 | `src/components/portfolio/SkillsChart.jsx` | New component: `useJsonData('/data/skills.json')` → group by tier → render badge rows with Tooltip. Show Skeleton while loading. |
| S1-10 | `App.jsx` | Add `<SkillsChart />` section between About and Portfolio in the layout. Assign `id="Skills"`. |

**Sprint 1 output**: Site loads without Supabase, WelcomeScreen, or broken imports. Skills section visible. All JSON-driven sections show skeleton loaders.

---

### Sprint 2 — Component Migrations (High Priority)

**Goal**: Certificates carousel, project modal, and EmailJS contact all functional.

| Task | File(s) | Details |
|------|---------|---------|
| S2-01 | `src/components/ui/Tooltip.jsx` | Accessible tooltip: wraps children; shows `title` prop in a positioned `role="tooltip"` div on hover/focus. |
| S2-02 | `src/components/portfolio/CertificatesCarousel.jsx` | FM drag carousel: `drag="x"`, `dragConstraints`, `dragElastic={0.1}`. `onDragEnd` advances index if offset > 80px. Prev/next chevron buttons. Dot indicators. Each slide: image + title; `group-hover` shows issuer + year tooltip. ARIA: `role="region"`, `aria-label="Certificates"`, `aria-live="polite"`. |
| S2-03 | `src/Pages/Portfolio.jsx` | Replace certificate grid section with `<CertificatesCarousel certificates={certificates} />`. |
| S2-04 | `src/components/portfolio/ProjectModal.jsx` | Modal overlay: `role="dialog"`, `aria-modal`, `aria-labelledby`. Prev/Next buttons + keyboard arrow key handler. Displays: image, title, description, technologies, case_study, live_url, github_url. Focus trap on open; focus returns to triggering card on close. |
| S2-05 | `src/Pages/Portfolio.jsx` | Add `modalIndex` state. Wire `ProjectCard` onClick to open modal. Pass `projects`, `modalIndex`, `onClose`, `onPrev`, `onNext` to `ProjectModal`. |
| S2-06 | `src/Pages/Contact.jsx` | Install `@emailjs/browser`. Replace `axios.post(formsubmit...)` with `emailjs.send(serviceId, templateId, { from_name, from_email, message }, publicKey)`. Read keys from `import.meta.env.VITE_EMAILJS_*`. Keep existing Swal success/error feedback. |

**Sprint 2 output**: Certificates scroll as a draggable carousel. Clicking a project opens a modal with full details and prev/next navigation. Contact form sends via EmailJS.

---

### Sprint 3 — Accessibility & Animation Polish (Medium Priority)

**Goal**: WCAG 2.1 AA compliance; Framer Motion entrance animations; prefers-reduced-motion.

| Task | File(s) | Details |
|------|---------|---------|
| S3-01 | `src/hooks/useFocusTrap.js` | Custom hook: queries all focusable elements within a ref; traps Tab/Shift-Tab; restores focus on unmount. |
| S3-02 | `src/components/portfolio/ProjectModal.jsx` | Apply `useFocusTrap`. Add `Escape` key close handler. Verify Tab cycle: close button → prev → next → links → back to close. |
| S3-03 | `src/components/portfolio/CertificatesCarousel.jsx` | Add `onKeyDown` for ArrowLeft / ArrowRight on the carousel container (`tabIndex={0}`). |
| S3-04 | All interactive components | Audit: every button/link has descriptive `aria-label` where text alone is insufficient (icon-only buttons). |
| S3-05 | `src/Pages/Home.jsx` | Wrap FM entrance animations with `useReducedMotion()`: if true, use `opacity` only, skip `y` transforms and typing effect speed-up. |
| S3-06 | `src/components/portfolio/CertificatesCarousel.jsx` | Apply `useReducedMotion()`: if true, disable drag and use instant index change instead of FM spring transition. |
| S3-07 | `src/components/portfolio/ProjectModal.jsx` | Apply `useReducedMotion()`: if true, modal appears with opacity fade only (no scale). |
| S3-08 | Global | Verify color contrast of all text on `#030014` meets AA ratio (4.5:1 for body text, 3:1 for large text). Fix any failing pairs. |
| S3-09 | `src/hooks/useScrollSpy.js` | Hook that returns the active section id based on IntersectionObserver. |
| S3-10 | `src/components/layout/Navbar.jsx` | Wire `useScrollSpy` to highlight the active nav link. Add `aria-current="page"` to active item. |

**Sprint 3 output**: Full keyboard navigation, focus traps in modals, ARIA labels, reduced-motion support. Navbar highlights active section.

---

### Sprint 4 — Deferred (Optional / Future)

These items are explicitly out of scope for v1 per the spec Assumptions section.

| Item | Description |
|------|-------------|
| Blog / SEO | Tutorial/blog section for thought leadership and search visibility |
| PWA | Service worker, `manifest.json`, offline capability, "Add to Home Screen" |
| Analytics | Visitor count badge, Google Analytics, or Plausible integration |
| RTL / i18n | Arabic language support; `dir="rtl"` layout switching |
| E2E Tests | Playwright or Cypress tests for modal navigation, form submission, carousel |

---

## Animation Specification

| Element | Animation | FM Variant | Reduced-Motion Fallback |
|---------|-----------|-----------|------------------------|
| Section entrance | Fade up on scroll | `{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }` | `{ hidden: { opacity: 0 }, visible: { opacity: 1 } }` |
| Project card hover | Scale + shadow | CSS `hover:scale-105 hover:shadow-purple-500/20` | CSS only (no FM needed) |
| Modal open/close | Opacity + scale | `{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }` | Opacity only |
| Carousel drag | FM drag gesture | `drag="x"`, spring transition | Disabled; arrow-only nav |
| Skeleton loader | Pulse | Tailwind `animate-pulse` | Same (no motion) |
| Hero typewriter | Character append | Custom `setTimeout` loop (existing) | Static role text, no cycling |
| Skill badge hover | Tooltip fade | CSS opacity transition | Same |

---

## JSON Field → Prop Mapping

### Projects

| JSON Field | Component Prop | Used In |
|-----------|---------------|---------|
| `id` | `id` | Modal index, route `/project/:id` |
| `title` | `Title` | Card, Modal header |
| `description` | `Description` | Card body, Modal |
| `image` | `Img` | Card image, Modal image |
| `live_url` | `Link` | Card "Live Demo" link (hidden if null) |
| `github_url` | `GithubLink` | Modal "GitHub" button (hidden if null) |
| `technologies` | `technologies` | Card badges, Modal tech list |
| `case_study` | `caseStudy` | Modal case study section (hidden if empty) |

### Certificates

| JSON Field | Component Prop | Used In |
|-----------|---------------|---------|
| `id` | `id` | Carousel key |
| `title` | `title` | Carousel card title |
| `issuer` | `issuer` | Tooltip text |
| `year` | `year` | Tooltip text |
| `image` | `image` | Carousel card image |

---

## Accessibility Checklist (Sprint 3 gate)

- [ ] Project modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title
- [ ] Project modal: focus trapped while open; Escape closes; focus returns to card
- [ ] Carousel: `role="region"`, `aria-label="Certificates carousel"`, `aria-live="polite"` on active slide
- [ ] Carousel: keyboard ArrowLeft / ArrowRight navigation
- [ ] Skill tiers: `role="list"` + `role="listitem"` on badges
- [ ] All icon-only buttons: `aria-label` describing action
- [ ] Navbar: `aria-current="page"` on active link
- [ ] `prefers-reduced-motion`: all FM animations degraded to opacity
- [ ] Color contrast: all body text ≥ 4.5:1 on `#030014`
- [ ] Tab order: logical top-to-bottom, left-to-right

---

## Artifacts Generated

| File | Status |
|------|--------|
| `specs/001-portfolio-frontend/plan.md` | ✓ This file |
| `specs/001-portfolio-frontend/research.md` | ✓ Complete |
| `specs/001-portfolio-frontend/data-model.md` | ✓ Complete |
| `specs/001-portfolio-frontend/quickstart.md` | ✓ Complete |
| `specs/001-portfolio-frontend/tasks.md` | Pending `/speckit-tasks` |
