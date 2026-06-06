# Data Model: Frontend Developer Portfolio

**Phase**: 1 — Design & Contracts  
**Branch**: `001-portfolio-frontend`  
**Date**: 2026-06-05

---

## JSON Data Files

All files live in `public/data/` and are served as static assets via `fetch('/data/<file>.json')`.

---

### `public/data/projects.json`

Source: `projects_rows.json` (provided). Field names must match exactly.

```json
[
  {
    "id": 1,
    "title": "Project Name",
    "description": "One or two sentence summary shown on the card.",
    "image": "/images/projects/project-name.jpg",
    "live_url": "https://live-demo-url.com",
    "github_url": "https://github.com/Ahmed4582/project-name",
    "technologies": ["React", "Tailwind CSS", "Vite"],
    "case_study": "Extended markdown-compatible text describing approach, challenges, and outcomes."
  }
]
```

**Field rules**:
- `id` — unique integer, used for URL routing (`/project/:id`) and modal index tracking
- `live_url` — may be `null`; when null, Live Demo button is hidden (FR-003, Edge Case)
- `github_url` — may be `null`; when null, GitHub button is hidden
- `image` — relative path from `public/`; fallback to `/images/placeholder.jpg` on error
- `technologies` — string array; rendered as badge chips in card and modal
- `case_study` — may be empty string; when empty, case study section is hidden in modal

**Sort order**: Descending by `id` (newest first), matching the existing Supabase `.order('id', { ascending: false })`.

---

### `public/data/certificates.json`

Source: `certificates_rows.json` (provided). Field names must match exactly.

```json
[
  {
    "id": 1,
    "title": "Certificate Title",
    "issuer": "Issuer Organization",
    "year": 2024,
    "image": "/images/certificates/cert-name.jpg"
  }
]
```

**Field rules**:
- `id` — unique integer
- `issuer` + `year` — displayed together in the hover tooltip on each carousel card
- `image` — relative path from `public/`; fallback to `/images/placeholder-cert.jpg`

**Sort order**: Ascending by `id` (oldest first), matching existing Supabase order.

---

### `public/data/skills.json`

New file. Created as part of this plan.

```json
[
  { "name": "React",          "tier": "Expert",     "tooltip": "3+ years — hooks, context, performance" },
  { "name": "JavaScript",     "tier": "Expert",     "tooltip": "ES2022+, async/await, closures" },
  { "name": "HTML & CSS",     "tier": "Expert",     "tooltip": "Semantic, accessible markup" },
  { "name": "Tailwind CSS",   "tier": "Expert",     "tooltip": "Utility-first, custom design systems" },
  { "name": "TypeScript",     "tier": "Proficient", "tooltip": "Generics, strict mode, utility types" },
  { "name": "Next.js",        "tier": "Proficient", "tooltip": "App router, SSR, ISR" },
  { "name": "Framer Motion",  "tier": "Proficient", "tooltip": "Variants, gestures, layout animations" },
  { "name": "Redux",          "tier": "Proficient", "tooltip": "Redux Toolkit, async thunks" },
  { "name": "Vite",           "tier": "Proficient", "tooltip": "Build tooling, plugins, HMR" },
  { "name": "Firebase",       "tier": "Familiar",   "tooltip": "Auth, Firestore, hosting" },
  { "name": "Supabase",       "tier": "Familiar",   "tooltip": "Postgres, RLS, storage" },
  { "name": "Node.js",        "tier": "Familiar",   "tooltip": "Express, REST APIs" },
  { "name": "GraphQL",        "tier": "Familiar",   "tooltip": "Queries, mutations, Apollo" }
]
```

**Field rules**:
- `tier` — exactly one of `"Expert"`, `"Proficient"`, `"Familiar"` (enforced by component grouping logic)
- `tooltip` — short string (< 60 chars) shown on hover; describes depth/context
- Order within each tier is display order (front-end skills first)

---

## Component ↔ Data Mapping

| Component | Data Source | Key Fields Consumed |
|-----------|-------------|---------------------|
| `ProjectCard` | `projects.json` | `id`, `title`, `description`, `image`, `live_url`, `technologies` |
| `ProjectModal` | `projects.json` (same array) | All fields including `case_study`, `github_url` |
| `CertificatesCarousel` | `certificates.json` | `id`, `title`, `issuer`, `year`, `image` |
| `SkillsChart` | `skills.json` | `name`, `tier`, `tooltip` |
| `About` stats | Derived from loaded arrays | `projects.length`, `certificates.length` |

---

## Custom Hook: `useJsonData`

```
File: src/hooks/useJsonData.js

Signature:  useJsonData(path: string) → { data: T[] | null, loading: boolean, error: string | null }

Behavior:
  - On mount: sets loading=true, calls fetch(path)
  - On success: sets data=parsed JSON, loading=false
  - On failure: sets error=message, loading=false, data=[]
  - No caching (data is small; re-fetches on remount)

Usage:
  const { data: projects, loading, error } = useJsonData('/data/projects.json');
```

---

## State Transitions

### ProjectModal

```
Closed → Open:   triggered by clicking a ProjectCard; sets modalIndex = card index
Open → Next:     modalIndex = (modalIndex + 1) % projects.length
Open → Prev:     modalIndex = (modalIndex - 1 + projects.length) % projects.length
Open → Closed:   triggered by Escape key, backdrop click, or close button; focus returns to triggering card
```

### CertificatesCarousel

```
Idle → Dragging:   Framer Motion drag gesture begins
Dragging → Snap:   onDragEnd; if offset > threshold, advance/retreat activeIndex
Idle → Arrow nav:  ChevronLeft/ChevronRight button click; updates activeIndex
```

### Contact Form

```
Idle → Submitting:   submit event; sets isSubmitting=true; disables all inputs + button
Submitting → Success: emailjs.send resolves; shows success message; resets form; sets isSubmitting=false
Submitting → Error:  emailjs.send rejects; shows error message; keeps form values; sets isSubmitting=false
```

---

## Entity Relationship (Logical)

```
Portfolio
├── Bio (static / bio.json optional)
├── Projects [1..*]
│   └── Project
│       ├── id (PK)
│       ├── title
│       ├── description
│       ├── image
│       ├── live_url (nullable)
│       ├── github_url (nullable)
│       ├── technologies []
│       └── case_study (nullable)
├── Certificates [1..*]
│   └── Certificate
│       ├── id (PK)
│       ├── title
│       ├── issuer
│       ├── year
│       └── image
└── Skills [1..*]
    └── Skill
        ├── name
        ├── tier (Expert | Proficient | Familiar)
        └── tooltip
```
