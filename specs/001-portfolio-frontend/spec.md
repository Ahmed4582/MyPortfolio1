# Feature Specification: Frontend Developer Portfolio

**Feature Branch**: `001-portfolio-frontend`  
**Created**: 2026-06-05  
**Status**: Draft  
**Input**: Personal portfolio for a frontend developer showcasing React, Tailwind, animations, and interactive components with JSON-based data.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover Developer's Work (Priority: P1)

A recruiter or potential client lands on the portfolio and quickly navigates to the Projects section to evaluate the developer's work quality and breadth.

**Why this priority**: Projects are the primary hiring signal — if a visitor cannot easily find and explore projects, the portfolio fails its core purpose.

**Independent Test**: Navigate to the site, scroll to or click the Projects section, view the project grid loaded from JSON, open a modal for case study details, and follow the Live/GitHub links.

**Acceptance Scenarios**:

1. **Given** the visitor is on the home page, **When** they click the "Projects" CTA button, **Then** they are scrolled/navigated to the Projects section showing a grid of cards populated from JSON data.
2. **Given** the Projects grid is visible, **When** a visitor clicks a project card, **Then** a modal opens with the full title, description, case study content, technologies used, and Live + GitHub links.
3. **Given** a project card is loading, **When** the JSON data has not yet resolved, **Then** skeleton loader placeholders appear in place of the cards.

---

### User Story 2 - Evaluate Developer Skills (Priority: P2)

A technical interviewer views the Skills section to assess expertise tiers before scheduling a technical interview.

**Why this priority**: The tiered skill chart directly communicates seniority and technology breadth, reducing recruiter guesswork.

**Independent Test**: Navigate to the Skills section, verify three tiers (Expert / Proficient / Familiar) are displayed with skill items and tooltips on hover.

**Acceptance Scenarios**:

1. **Given** the visitor is in the Skills section, **When** the section loads, **Then** skills are grouped into three distinct tiers: Expert, Proficient, and Familiar.
2. **Given** a skill badge is visible, **When** the visitor hovers over it, **Then** a tooltip with additional context appears.

---

### User Story 3 - Read Developer Bio and Background (Priority: P3)

A hiring manager reads the About section to understand the developer's background, education, and current focus.

**Why this priority**: The bio gives context beyond code — it humanizes the developer and signals what opportunities they are open to.

**Independent Test**: Navigate to the About section and confirm bio paragraph, education, experience, and "currently building / open to" statement are all present and readable.

**Acceptance Scenarios**:

1. **Given** the visitor scrolls to the About section, **When** the section is in view, **Then** a short bio paragraph, education history, experience summary, and current work/open-to statement are all visible.

---

### User Story 4 - View Certificates (Priority: P4)

A visitor browses the Certificates section to verify credentials and completed courses.

**Why this priority**: Certificates add credibility and are quick to scan; a polished display builds trust.

**Independent Test**: Navigate to the Certificates section, verify cards/carousel populated from JSON, hover for issuer + year tooltip.

**Acceptance Scenarios**:

1. **Given** the visitor is on the Certificates section, **When** JSON is loaded, **Then** each certificate is shown with its image, title, issuer, and year.
2. **Given** a certificate card is visible, **When** the visitor hovers over it, **Then** a tooltip with issuer name and year appears.

---

### User Story 5 - Send a Contact Message (Priority: P5)

A recruiter or collaborator fills out the Contact form to get in touch with the developer.

**Why this priority**: Contact is the conversion endpoint of the portfolio — it must be simple, validated, and provide clear feedback.

**Independent Test**: Fill in name, email, and message fields; submit; verify success or error feedback is shown without page reload.

**Acceptance Scenarios**:

1. **Given** the contact form is visible, **When** the visitor submits with valid name, email, and message, **Then** a success message is displayed and the form resets.
2. **Given** the visitor submits with an invalid or empty email, **When** the form is submitted, **Then** inline validation errors are displayed next to the relevant fields without page reload.
3. **Given** the form is being submitted, **When** the request is in-flight, **Then** the submit button is disabled to prevent double-submission.

---

### Edge Cases

- What happens when a project's `image` field is missing or the URL is broken? → A fallback placeholder image is shown.
- What happens when the JSON data files fail to load? → Skeleton loaders persist and a non-blocking error state is shown with a retry option.
- What happens when `live_url` or `github_url` is null for a project? → The corresponding link button is hidden rather than showing a broken link.
- How does the skills chart render when the device is very small (< 375px)? → Tiers stack vertically with full-width skill badges.
- What happens when the contact form submission fails (network error)? → An error feedback message is shown beneath the form; inputs retain their values.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The portfolio MUST display a hero section on first load with developer name, role, tagline, and two CTA buttons (Projects, Contact).
- **FR-002**: The Projects section MUST render cards dynamically from a local JSON data source, each showing image, title, short description, and technology tags.
- **FR-003**: Users MUST be able to open a modal from any project card that shows the full project details including case study content and Live + GitHub links. The modal MUST support previous/next project navigation via on-screen buttons, keyboard arrow keys, and swipe gestures on mobile without closing and reopening.
- **FR-004**: The Skills section MUST display skills in three labeled tiers: Expert, Proficient, and Familiar, each with hover tooltips.
- **FR-005**: The Certificates section MUST render certificate items from a local JSON data source with image, title, issuer, and year; items are displayed in a horizontally draggable carousel with snap-to-item behavior (Framer Motion), arrow and dot navigation on desktop, and swipe gestures on mobile; hovering reveals a tooltip with issuer + year.
- **FR-006**: The Contact section MUST include a form with name, email, and message fields, client-side validation, and success/error feedback on submission.
- **FR-007**: All JSON-driven sections (Projects, Certificates, Skills) MUST display skeleton loaders while data is being fetched; skills data is sourced from a local `skills.json` file following the same fetch pattern as projects and certificates.
- **FR-008**: The portfolio MUST be fully responsive from 320px mobile width upward, adapting layout at standard breakpoints.
- **FR-009**: All animations MUST be smooth and purposeful; no animation should block content access. Animations MUST respect the `prefers-reduced-motion` media query — when enabled, motion is reduced to simple opacity transitions or eliminated entirely.
- **FR-011**: The portfolio MUST meet WCAG 2.1 AA accessibility essentials: all interactive elements are keyboard-navigable, modals trap focus while open and return focus on close, carousel and skill tiers include appropriate ARIA roles and labels, and color contrast ratios meet AA thresholds.
- **FR-010**: The site MUST NOT use artificial loading delays (e.g., splash/welcome screens).

### Key Entities

- **Project**: `id`, `title`, `description`, `image`, `live_url`, `github_url`, `technologies[]`, `case_study`
- **Certificate**: `id`, `title`, `issuer`, `year`, `image`
- **Skill**: `name`, `tier` (Expert | Proficient | Familiar), `tooltip` — sourced from `skills.json`
- **Bio**: `name`, `role`, `tagline`, `bio_paragraph`, `education[]`, `experience[]`, `current_work`, `open_to`

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can locate and view all project details within 60 seconds of landing.
- **SC-002**: The portfolio fully loads and is interactive on a standard connection in under 3 seconds.
- **SC-003**: All sections are usable and readable on any device from 320px to 2560px width without horizontal scroll.
- **SC-004**: A visitor can complete and submit the contact form in under 2 minutes.
- **SC-005**: JSON-driven sections show skeleton loaders within 100ms and replace them as soon as data resolves.
- **SC-006**: Zero broken links or missing images appear when all JSON fields are populated.
- **SC-007**: All interactive elements (cards, modal nav, carousel, form inputs) are reachable and operable by keyboard alone.
- **SC-008**: Animations are absent or reduced to opacity-only transitions when the visitor has `prefers-reduced-motion` enabled.

---

## Clarifications

### Session 2026-06-05

- Q: Should certificates display as a carousel or static grid? → A: Carousel with drag + snap (Framer Motion), horizontal swipe on mobile, arrow/dot navigation on desktop.
- Q: Should skills data come from a JSON file or be hardcoded in the component? → A: JSON file (`skills.json`), same pattern as projects and certificates.
- Q: Which service should handle contact form submissions? → A: EmailJS — client-side SDK, sends directly from the browser, no server required.
- Q: Should the project modal support previous/next project navigation while open? → A: Yes — previous/next buttons, keyboard arrow key support, and swipe on mobile.
- Q: What accessibility baseline should the portfolio meet? → A: WCAG 2.1 AA essentials — keyboard navigation, ARIA roles, focus trap in modals, `prefers-reduced-motion` support.

---

## Assumptions

- All portfolio data (projects, certificates, skills, bio) is maintained in static local JSON files; no backend or CMS is required.
- The contact form uses EmailJS (client-side SDK) to send messages directly from the browser; no custom server is required. EmailJS service ID, template ID, and public key must be configured via environment variables before the contact feature is testable end-to-end.
- Arabic / RTL language support is out of scope for v1.
- Blog/PWA/analytics features are deferred to future iterations.
- Framer Motion is the sole animation library; no other animation libraries will be introduced.
- The developer supplies their own photos, project images, and certificate images.
- Performance targets assume a modern browser (Chrome/Firefox/Safari latest two versions).
