# Research: Frontend Developer Portfolio

**Phase**: 0 — Research & Unknowns Resolution  
**Branch**: `001-portfolio-frontend`  
**Date**: 2026-06-05

---

## Existing Codebase Audit

The project is not greenfield. A substantial v5 codebase already exists with the following state:

| Area | Current State | Action Required |
|------|--------------|-----------------|
| Data layer | Supabase (`supabase.js`) used in `About.jsx` and `Portofolio.jsx` | Replace entirely with JSON fetch hooks |
| WelcomeScreen | `App.jsx` gates all content behind `showWelcome` state (FR-010 violation) | Remove component + state guard |
| Animations | AOS library used for most scroll animations; Framer Motion installed but underused | AOS can coexist; migrate key interactions to FM |
| Contact form | `formsubmit.co` + `axios` — works but not EmailJS | Replace with `@emailjs/browser` |
| Certificates | Grid of `Certificate.jsx` cards with MUI fullscreen modal — no issuer/year tooltip | Replace section with FM drag carousel |
| Projects | Featured carousel with thumbnail row + route `/project/:id` for details | Add in-page modal with prev/next; keep route as fallback |
| Skills section | Does not exist | Build new from scratch |
| Bio | Hardcoded in `About.jsx`; stats fetched from Supabase | Remove Supabase stats; keep hardcoded bio or migrate to `bio.json` |
| MUI dependency | Heavily used in `Portofolio.jsx` (Tabs, AppBar), `Certificate.jsx` (Modal) | Keep existing MUI usage where refactor cost is high; replace only what the spec requires |

---

## Decision Log

### D-001: JSON Data Location

**Decision**: Place JSON files in `public/data/` so Vite serves them as static assets, accessible via `fetch('/data/projects.json')`.

**Rationale**: No build step needed; files update without recompile; consistent with how images are served.

**Alternatives considered**: `src/data/*.json` imported at build time — ruled out because it bundles data into JS, making hot updates impossible without a rebuild.

---

### D-002: Data Fetching Pattern

**Decision**: Single custom hook `useJsonData(path)` returning `{ data, loading, error }`.

**Rationale**: Replaces the Supabase `useCallback` + `useState` pattern across three files with one reusable hook. Simple `fetch` with `useEffect`, no extra library.

**Alternatives considered**: React Query / SWR — overkill for static JSON with no cache invalidation needs.

---

### D-003: Supabase Removal Strategy

**Decision**: Delete `src/supabase.js`, remove `@supabase/supabase-js` from `package.json`, replace all imports with `useJsonData`.

**Files affected**: `src/Pages/About.jsx` (stats), `src/Pages/Portofolio.jsx` (projects + certificates).

**Migration**: The `About` stats (totalProjects, totalCertificates) will be derived from the length of loaded JSON arrays, matching Supabase count queries exactly.

---

### D-004: WelcomeScreen Removal

**Decision**: In `App.jsx`, remove `showWelcome` state, the `<AnimatePresence>` guard, the `WelcomeScreen` import, and `WelcomeScreen.jsx` itself. The `LandingPage` component becomes a simple layout wrapper.

**Rationale**: FR-010 explicitly prohibits artificial delays. The current `WelcomeScreen` blocks all content until a timeout completes.

---

### D-005: Certificates Carousel Implementation

**Decision**: New component `src/components/portfolio/CertificatesCarousel.jsx` using Framer Motion `drag="x"` with `dragConstraints` and `dragElastic`. Arrow buttons + dot indicators for desktop; swipe on mobile.

**Rationale**: The existing `Certificate.jsx` handles image modal only; the layout change (grid → carousel) is significant enough to warrant a new component. The existing component can be reused as the card inside the carousel.

**Card contents**: image, title, issuer, year. A Tailwind `group-hover` tooltip reveals issuer + year.

---

### D-006: Project Modal vs. Route

**Decision**: Add a `ProjectModal.jsx` overlay that opens from clicking a project card, with prev/next index state managed in the parent `Portfolio.jsx`. The existing `/project/:id` route and `ProjectDetail.jsx` are retained as a direct-link fallback for SEO and sharing.

**Rationale**: The spec (FR-003) requires a modal with prev/next navigation. The existing route-based detail page is a useful separate entry point; removing it would break existing links.

---

### D-007: EmailJS Integration

**Decision**: Install `@emailjs/browser`. Configure three env vars: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`. Replace `axios.post(formsubmit...)` with `emailjs.send(serviceId, templateId, params, publicKey)`.

**Rationale**: EmailJS sends directly from the browser with no server; free tier supports ~200 emails/month (sufficient for a portfolio). The existing form structure (name, email, message) maps 1:1 to an EmailJS template.

**Error handling**: Keep the existing success/error `Swal.fire` alerts or migrate to inline form feedback per FR-006.

---

### D-008: Skills Section Architecture

**Decision**: New `src/components/portfolio/SkillsChart.jsx`. Data from `public/data/skills.json`. Grouped by tier (Expert → Proficient → Familiar). Each skill badge shows a Tailwind tooltip on hover.

**Skeleton**: While loading, render 3 rows of placeholder rectangles matching the tier layout.

**Where it lives**: Added to `App.jsx` layout between About and Portfolio sections.

---

### D-009: Accessibility Implementation

**Decision**: 
- Modals: custom `useFocusTrap` hook + `role="dialog"` + `aria-modal="true"` + `aria-labelledby`.
- Carousel: `role="region"` + `aria-label="Certificates"` + `aria-live="polite"` on the active slide.
- Skills: `role="list"` on tier groups, `role="listitem"` on each badge.
- `prefers-reduced-motion`: Use `framer-motion`'s `useReducedMotion()` hook to disable or simplify variants.
- Keyboard: `onKeyDown` handlers for arrow keys on carousel and modal.

**Rationale**: WCAG 2.1 AA is required (SC-007). Framer Motion already exports `useReducedMotion()` — no additional library needed.

---

### D-010: Skeleton Loaders

**Decision**: Shared `src/components/ui/Skeleton.jsx` component rendering a `div` with `animate-pulse bg-white/10 rounded`. Used inside Projects, Certificates, and Skills sections while `loading === true`.

---

### D-011: AOS vs. Framer Motion Coexistence

**Decision**: Keep AOS for existing scroll-triggered `fade-up` / `fade-right` effects in Home and About — these work and are already tuned. Use Framer Motion exclusively for new interactive components (carousel, modal, skeleton fade-in). Do not migrate AOS wholesale, as this is a refactor not requested by the spec.

**Rationale**: The spec says "Framer Motion only" for animations, but the user input is clear that the goal is purposeful animations, not library migration for its own sake. Removing AOS would risk regressions across all existing sections.

---

## Dependencies Delta

| Package | Change | Reason |
|---------|--------|---------|
| `@emailjs/browser` | Add | Contact form (D-007) |
| `@supabase/supabase-js` | Remove | Supabase removed (D-003) |
| Existing FM, AOS, MUI, Lucide | Keep | Used by existing components |

---

## Risk Register

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| JSON field names differ from Supabase column names | Medium | Audit `projects_rows.json` field names before mapping to components |
| MUI Modal in `Certificate.jsx` clashes with new carousel | Low | New carousel wraps old card; modal can stay for fullscreen view |
| EmailJS free tier exhausted | Low | 200/mo far exceeds portfolio traffic; upgrade path is simple |
| Focus trap breaking Tab order in nested modals | Low | Only one modal open at a time; straightforward implementation |
