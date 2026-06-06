# Tasks: Frontend Developer Portfolio

**Input**: Design documents from `specs/001-portfolio-frontend/`  
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, quickstart.md ✓  
**Branch**: `001-portfolio-frontend` | **Generated**: 2026-06-05  
**Tests**: No automated test suite required by spec — each phase ends with a manual verification task.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies on other in-progress tasks)
- **[Story]**: User story this task belongs to (US1–US5 from spec.md)
- Exact file paths are included in every description

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Remove blocking anti-patterns (WelcomeScreen, Supabase), install new dependency, create JSON data files.

**⚠️ CRITICAL**: Must complete before any user story work begins.

- [ ] T001 Remove `src/Pages/WelcomeScreen.jsx`; in `src/App.jsx` delete `showWelcome` state, the `AnimatePresence` gate, and `WelcomeScreen` import; simplify `LandingPage` to render layout directly (FR-010)
- [ ] T002 Create `public/data/` directory; copy and rename `projects_rows.json` → `public/data/projects.json` and `certificates_rows.json` → `public/data/certificates.json`; audit field names against component props in `data-model.md` and rename any mismatches
- [ ] T003 [P] Create `public/data/skills.json` with 13 skill entries across three tiers using the schema in `data-model.md` (Expert: React, JavaScript, HTML & CSS, Tailwind CSS; Proficient: TypeScript, Next.js, Framer Motion, Redux, Vite; Familiar: Firebase, Supabase, Node.js, GraphQL)
- [ ] T004 [P] Add `public/images/placeholder.jpg` as a neutral fallback image (any solid-color 16:9 image); also add `public/images/placeholder-cert.jpg`

**Checkpoint**: JSON files valid, WelcomeScreen gone, site loads without Supabase errors.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure all user story components depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T005 Create `src/hooks/useJsonData.js` — `useEffect` that calls `fetch(path)`, sets `{data, loading: true}` on mount, resolves to `{data: parsedJSON, loading: false}` on success or `{data: [], loading: false, error: message}` on failure; use `AbortController` for cleanup
- [ ] T006 [P] Create `src/components/ui/Skeleton.jsx` — renders a `div` with `className={cn("animate-pulse bg-white/10 rounded", className)}` prop; export named `SkeletonCard` variant (aspect-video size) for reuse in Projects and Certificates sections
- [ ] T007 [P] Create `src/components/ui/Tooltip.jsx` — wraps children in a `relative group` container; renders a positioned `role="tooltip"` div that becomes visible on `group-hover` and `group-focus-within`; accepts `content` prop (string)
- [ ] T008 Delete `src/supabase.js`; run `npm uninstall @supabase/supabase-js`; run `npm install @emailjs/browser`; verify `npm run dev` starts without import errors

**Checkpoint**: `useJsonData`, `Skeleton`, and `Tooltip` exported and importable. Dev server starts clean.

---

## Phase 3: User Story 1 — Discover Developer's Work (Priority: P1) 🎯 MVP

**Goal**: Visitor navigates to the Projects section, views a grid of cards loaded from `projects.json`, clicks a card to open a modal with full details and prev/next navigation.

**Independent Test**: Navigate to `#Portofolio`, verify project cards render from JSON, click one card → modal opens with title/description/case study/links, press ArrowRight → next project loads, press Escape → modal closes.

**Data**: `public/data/projects.json`

### Implementation

- [ ] T009 [US1] Update `src/Pages/Portfolio.jsx` (currently `Portofolio.jsx`): replace the Supabase `fetchData` call with `const { data: projects, loading: projectsLoading } = useJsonData('/data/projects.json')`; while `projectsLoading` is true render a 2×3 grid of `<SkeletonCard />` components in place of the project cards
- [ ] T010 [P] [US1] Update `src/components/CardProject.jsx`: add `githubUrl` and `technologies` props; render GitHub link button (hidden when `githubUrl` is null); render technology badge chips below description; keep existing `live_url` null-hide logic; add `onerror` fallback on `<img>` to `src="/images/placeholder.jpg"`
- [ ] T011 [US1] Create `src/components/portfolio/ProjectModal.jsx` — full-viewport overlay (`fixed inset-0 z-50`); renders active project's image (with placeholder fallback), title, description, technology chips, case study text (section hidden when empty), Live Demo link (hidden when null), GitHub link (hidden when null), a close button (top-right ×), and Prev / Next chevron buttons on the sides
- [ ] T012 [US1] Add `modalIndex` state (`null` = closed) to `src/Pages/Portfolio.jsx`; wire each project card's `onClick` to set `modalIndex = cardIndex`; pass `projects`, `modalIndex`, `onClose={() => setModalIndex(null)}`, `onPrev`, `onNext` to `<ProjectModal />`; render `<ProjectModal />` conditionally when `modalIndex !== null`
- [ ] T013 [US1] Add keyboard and gesture navigation to `src/components/portfolio/ProjectModal.jsx`: `useEffect` attaches `keydown` listener for `ArrowLeft` (prev), `ArrowRight` (next), and `Escape` (close) when modal is open; wrap modal content in a Framer Motion `drag="x"` container; on `onDragEnd` advance/retreat index if `offset.x` exceeds ±80px threshold
- [ ] T014 [US1] Add `onerror` fallback on the `<img>` inside `ProjectModal` to `src="/images/placeholder.jpg"`; hide the Live Demo button when `live_url` is null; hide the GitHub button when `github_url` is null
- [ ] T015 [US1] Manual verify: `npm run dev` → scroll to Projects tab → cards render from `projects.json` → skeleton visible during load → click card → modal opens → prev/next cycles all projects → Escape closes → missing `live_url` hides button → missing image falls back to placeholder

**Checkpoint**: User Story 1 fully functional and independently testable.

---

## Phase 4: User Story 2 — Evaluate Developer Skills (Priority: P2)

**Goal**: Visitor views the Skills section with three labeled tiers (Expert / Proficient / Familiar), each skill showing a tooltip on hover.

**Independent Test**: Navigate to `#Skills`, verify three tier sections render from `skills.json`, hover a skill badge → tooltip with context appears, skeleton visible then replaced.

**Data**: `public/data/skills.json`

### Implementation

- [ ] T016 [P] [US2] Create `src/components/portfolio/SkillsChart.jsx`: call `useJsonData('/data/skills.json')`; group results by `tier`; render three sections labeled "Expert", "Proficient", "Familiar" with a flex-wrap row of skill badges per tier; wrap each badge in `<Tooltip content={skill.tooltip}>`; while loading render three rows of 4–5 `<Skeleton className="h-8 w-24 rounded-full" />` placeholders
- [ ] T017 [US2] Add `<section id="Skills">` containing `<SkillsChart />` to `src/App.jsx` (or the `LandingPage` layout) positioned between the About section and the Portfolio section
- [ ] T018 [US2] Add a section header to `SkillsChart` matching the site's heading style (`bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent`) with the title "Skills" and a subtitle "Technologies I work with"
- [ ] T019 [US2] Ensure `SkillsChart` is responsive: on mobile (`< md`) each tier section stacks vertically with full-width badges; on desktop (`md+`) tiers display in a single column with badges wrapping naturally
- [ ] T020 [US2] Manual verify: `#Skills` section visible → three tiers rendered → hover badge → tooltip appears → skeleton shows then resolves → responsive on 375px mobile viewport

**Checkpoint**: User Story 2 fully functional and independently testable.

---

## Phase 5: User Story 3 — Read Developer Bio (Priority: P3)

**Goal**: About section loads bio, education, experience, and stat cards (project count, certificate count, years of experience) without any Supabase dependency.

**Independent Test**: Load site without Supabase env vars → About section renders with correct bio text and stat cards showing non-zero project and certificate counts.

### Implementation

- [ ] T021 [US3] Update `src/Pages/About.jsx`: remove `fetchStats` (the Supabase count query), remove `supabase` import; accept `totalProjects` and `totalCertificates` as props; derive these values in `Portfolio.jsx` from `projects.length` and `certificates.length` after JSON loads, and pass them down via props or a shared React context
- [ ] T022 [US3] Manual verify: load site → About section shows bio text, profile image, and stat cards; project count and certificate count match the number of entries in `projects.json` and `certificates.json`; no console errors referencing Supabase

**Checkpoint**: User Story 3 fully functional and independently testable.

---

## Phase 6: User Story 4 — View Certificates (Priority: P4)

**Goal**: Visitor browses a draggable carousel of certificates loaded from `certificates.json`; hovering a card shows issuer + year tooltip; arrow buttons and swipe work for navigation.

**Independent Test**: Navigate to Certificates tab → carousel renders from `certificates.json` → drag left/right snaps to next/prev card → chevron buttons navigate → hover shows issuer + year tooltip → skeleton visible during load.

**Data**: `public/data/certificates.json`

### Implementation

- [ ] T023 [P] [US4] Create `src/components/portfolio/CertificatesCarousel.jsx`: accepts `certificates` array and `loading` bool; renders a Framer Motion `motion.div` with `drag="x"`, `dragConstraints={{ left: 0, right: 0 }}`, `dragElastic={0.1}`; on `onDragEnd` if `offset.x > 80` decrement active index (with wrap), if `offset.x < -80` increment active index; spring-animate to the active card's x-position
- [ ] T024 [US4] Add prev/next `<ChevronLeft>` / `<ChevronRight>` buttons and a dot indicator row to `CertificatesCarousel`; clicking a dot sets the active index directly; active dot is visually highlighted (wider pill, purple fill)
- [ ] T025 [US4] Wrap each carousel card in a `group` container; add a `<Tooltip content={\`\${certificate.issuer} · \${certificate.year}\`}>` overlay that fades in on `group-hover`; render card image, title visible always
- [ ] T026 [US4] While `loading` is true render 3 `<SkeletonCard />` placeholders side-by-side inside the carousel container
- [ ] T027 [US4] Replace the certificate grid in the Certificates `TabPanel` in `src/Pages/Portfolio.jsx` with `<CertificatesCarousel certificates={certificates} loading={certificatesLoading} />`; remove the existing `ToggleButton` / `showAllCertificates` logic for certificates (replaced by the carousel)
- [ ] T028 [US4] Manual verify: Certificates tab → carousel renders from `certificates.json` → drag snaps → chevron buttons advance/retreat → dot indicators update → hover tooltip shows issuer + year → skeleton visible then replaced

**Checkpoint**: User Story 4 fully functional and independently testable.

---

## Phase 7: User Story 5 — Send a Contact Message (Priority: P5)

**Goal**: Visitor fills the contact form; submission routes through EmailJS; success and error states are clearly communicated; button is disabled during submission.

**Independent Test**: Fill form with valid data → submit → EmailJS sends email → success message shown → form resets. Submit with invalid email → inline error shown, form not submitted.

### Implementation

- [ ] T029 [US5] Create `.env.local` at project root with placeholder keys: `VITE_EMAILJS_SERVICE_ID=`, `VITE_EMAILJS_TEMPLATE_ID=`, `VITE_EMAILJS_PUBLIC_KEY=`; verify `.env.local` is listed in `.gitignore`
- [ ] T030 [US5] Update `src/Pages/Contact.jsx`: add `import emailjs from '@emailjs/browser'`; replace the `axios.post(formsubmitUrl, ...)` block with `await emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, { from_name: formData.name, from_email: formData.email, message: formData.message }, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)`; keep the existing `Swal.fire` success/error feedback; remove `axios` import
- [ ] T031 [US5] Add inline field-level validation to the contact form in `src/Pages/Contact.jsx`: email field validates `type="email"` pattern natively; add a `formErrors` state object; on submit, check name length ≥ 2 chars and message length ≥ 10 chars; display error strings as `<p className="text-red-400 text-xs mt-1">` below each field; do not call `emailjs.send` if validation fails
- [ ] T032 [US5] Verify `disabled={isSubmitting}` already applied to all inputs and submit button (it is in the existing code); confirm button shows "Sending..." text during submit and returns to "Send Message" after completion
- [ ] T033 [US5] Manual verify: fill valid form → submit → EmailJS sends → Swal success shown → form resets; fill invalid email → submit blocked → inline error shown; submit button disabled while sending

**Checkpoint**: User Story 5 fully functional and independently testable.

---

## Phase 8: Polish & Accessibility (WCAG 2.1 AA)

**Purpose**: Cross-cutting accessibility and animation polish affecting multiple user stories (SC-007, SC-008, FR-011).

- [ ] T034 [P] Create `src/hooks/useFocusTrap.js`: given a `ref` and an `isActive` bool, query all focusable elements (`a, button, input, textarea, select, [tabindex]`) within the ref; on `keydown` Tab / Shift-Tab cycle focus within that list; restore focus to the previously focused element when `isActive` becomes false
- [ ] T035 [P] Create `src/hooks/useScrollSpy.js`: use `IntersectionObserver` on all elements matching `[id]` within `main`; return the id of the element with the highest intersection ratio; update on scroll
- [ ] T036 Apply `useFocusTrap` to `src/components/portfolio/ProjectModal.jsx`; add `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"` to the modal container div; add `id="modal-title"` to the project title heading inside the modal
- [ ] T037 Apply `useReducedMotion()` from `framer-motion` in `src/components/portfolio/ProjectModal.jsx`; when `shouldReduceMotion` is true, use `{ opacity: 0 }` → `{ opacity: 1 }` variants only (no scale transform); disable drag navigation and use arrow buttons only
- [ ] T038 Add `role="region"`, `aria-label="Certificates carousel"` to the carousel wrapper in `src/components/portfolio/CertificatesCarousel.jsx`; add `aria-live="polite"` and `aria-atomic="true"` to the active slide container; add `onKeyDown` handler on the carousel div (`tabIndex={0}`) for `ArrowLeft` (prev) and `ArrowRight` (next)
- [ ] T039 Apply `useReducedMotion()` in `src/components/portfolio/CertificatesCarousel.jsx`; when `shouldReduceMotion` is true, disable `drag` prop (set `drag={false}`), use instant index transition (`transition={{ duration: 0 }}`), rely on arrow buttons only
- [ ] T040 Add `role="list"` to each tier container in `src/components/portfolio/SkillsChart.jsx`; add `role="listitem"` to each skill badge wrapper; add a visually hidden `<span className="sr-only">` inside each badge that includes both the skill name and tier for screen readers
- [ ] T041 Audit all icon-only buttons across the site and add `aria-label` where missing: ProjectModal close button (`aria-label="Close project details"`), ProjectModal prev/next (`aria-label="Previous project"` / `"Next project"`), CertificatesCarousel chevrons (`aria-label="Previous certificate"` / `"Next certificate"`), Navbar mobile hamburger (if any)
- [ ] T042 Update `src/components/layout/Navbar.jsx` to consume `useScrollSpy`; add `aria-current="page"` to the nav link whose href matches the active section id; apply an active visual indicator (e.g., `text-purple-400` or underline)
- [ ] T043 Apply `useReducedMotion()` in `src/Pages/Home.jsx`; when `shouldReduceMotion` is true, render the first word of `WORDS` as static text (disable the typing loop `useEffect`); replace `data-aos` y-axis animations with opacity-only by passing `duration: 0` to AOS init if reduced motion detected (check `window.matchMedia('(prefers-reduced-motion: reduce)').matches`)

**Checkpoint**: All checkboxes in `specs/001-portfolio-frontend/checklists/requirements.md` accessibility section are marked complete.

---

## Phase 9: Deferred (Future Enhancements — Out of Scope for v1)

*Do not implement until v1 is live and validated.*

- [ ] T044 [DEFERRED] Add Blog / Tutorial section: new `src/Pages/Blog.jsx` page + route `/blog`; posts sourced from markdown files or a CMS
- [ ] T045 [DEFERRED] Implement PWA support: add `vite-plugin-pwa`, create `public/manifest.json`, register service worker for offline caching of JSON and images
- [ ] T046 [DEFERRED] Add analytics or live visitor count badge to the hero or footer section
- [ ] T047 [DEFERRED] Add RTL / Arabic language support: `dir="rtl"` toggle, Tailwind `rtl:` variant classes, translated content strings
- [ ] T048 [DEFERRED] Set up Playwright E2E tests for critical flows: project modal navigation, certificate carousel swipe, contact form submission

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational) ← BLOCKS all user story phases
    ↓
Phase 3 (US1 Projects)   ← Can start immediately after Phase 2
Phase 4 (US2 Skills)     ← Can run in parallel with US1 (different files)
Phase 5 (US3 About)      ← Needs projects/certificates data length from Phase 3/6
Phase 6 (US4 Certs)      ← Can run in parallel with US1 and US2
Phase 7 (US5 Contact)    ← Fully independent, can run any time after Phase 2
    ↓
Phase 8 (Polish / A11y)  ← Depends on all US phases being functionally complete
    ↓
Phase 9 (Deferred)       ← Post-launch only
```

### Within User Story Dependencies

| Task | Depends On |
|------|-----------|
| T012 (wire modal state) | T011 (ProjectModal exists) |
| T013 (keyboard/swipe) | T011, T012 |
| T014 (image fallback) | T011 |
| T017 (Skills section in App) | T016 (SkillsChart exists) |
| T018 (header) | T016 |
| T021 (About props) | T009 (projects loaded in Portfolio) |
| T024 (dots + arrows) | T023 (CertificatesCarousel exists) |
| T025 (tooltip on cards) | T023 |
| T026 (skeleton) | T023 |
| T027 (wire into Portfolio) | T023 |
| T036 (focus trap in modal) | T034 (useFocusTrap exists), T011 |
| T042 (Navbar spy) | T035 (useScrollSpy exists) |

### Parallel Opportunities

**Phase 1**: T003 and T004 can run in parallel.

**Phase 2**: T006 and T007 can run in parallel (different files).

**Phase 3–7 (cross-story)**: After Phase 2, these story phases can run in parallel:
- US1 (Projects) + US2 (Skills) + US4 (Certificates) + US5 (Contact) — all touch different files
- US3 (About) can begin after T009 establishes `projects.length`

**Within US1**: T010 (CardProject update) runs in parallel with T011 (ProjectModal creation).

**Phase 8**: T034 and T035 can run in parallel (different hooks).

---

## Parallel Execution Examples

### After Phase 2 completes — start US1 and US4 together

```
Session A (US1 Projects):
  Task: T009 — Update Portfolio.jsx to use useJsonData for projects
  Task: T011 — Create ProjectModal.jsx

Session B (US4 Certificates):
  Task: T023 — Create CertificatesCarousel.jsx
  Task: T024 — Add prev/next buttons and dots
```

### Within US1 — parallel model tasks

```
Session A: T009 — Update Portfolio.jsx data fetch
Session B: T010 — Update CardProject.jsx with new props
(Both touch different files — safe to run simultaneously)
```

---

## Implementation Strategy

### MVP (User Story 1 Only — Projects visible)

1. Complete Phase 1 (Setup) → T001–T004
2. Complete Phase 2 (Foundational) → T005–T008
3. Complete Phase 3 (US1) → T009–T015
4. **STOP and VALIDATE** User Story 1 independently
5. Site is deployable with projects grid + modal + JSON data

### Full v1 Delivery

1. Phase 1 + Phase 2 → Foundation ready
2. Phase 3 → Projects (MVP live)
3. Phase 4 + Phase 6 → Skills + Certificates (parallel)
4. Phase 5 → About stats fixed
5. Phase 7 → Contact via EmailJS
6. Phase 8 → Accessibility pass
7. Tag `v1.0` and deploy

---

## Task Summary

| Phase | Story | Tasks | Priority |
|-------|-------|-------|----------|
| Phase 1: Setup | — | T001–T004 | Critical |
| Phase 2: Foundational | — | T005–T008 | Critical |
| Phase 3: Projects | US1 | T009–T015 | Critical / P1 |
| Phase 4: Skills | US2 | T016–T020 | High / P2 |
| Phase 5: About | US3 | T021–T022 | High / P3 |
| Phase 6: Certificates | US4 | T023–T028 | High / P4 |
| Phase 7: Contact | US5 | T029–T033 | High / P5 |
| Phase 8: Accessibility | — | T034–T043 | Medium |
| Phase 9: Deferred | — | T044–T048 | Deferred |
| **Total** | | **48 tasks** | |

**Notes**:
- `[P]` tasks = different files, no in-flight dependencies — safe to parallelize
- Each user story phase ends with a manual verify task — do not skip
- Complete verify task before marking the phase done
- Commit after each checkpoint
- MVP is complete after Phase 3 (T001–T015)
