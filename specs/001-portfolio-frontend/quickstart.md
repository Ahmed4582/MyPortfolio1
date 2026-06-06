# Quickstart: Portfolio Implementation

**Branch**: `001-portfolio-frontend`  
**Date**: 2026-06-05

---

## Prerequisites

- Node.js 18+
- Git on branch `001-portfolio-frontend`
- An EmailJS account (free tier): https://www.emailjs.com

## Setup

```bash
# Install new dependency
npm install @emailjs/browser

# Remove Supabase (after migrating all consumers)
npm uninstall @supabase/supabase-js
```

## Environment Variables

Create `.env.local` (not committed):

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## JSON Data Files

Place your data files at:

```
public/
└── data/
    ├── projects.json       ← from projects_rows.json
    ├── certificates.json   ← from certificates_rows.json
    └── skills.json         ← create from data-model.md template
```

Image assets referenced in JSON should be placed in:

```
public/
└── images/
    ├── projects/
    ├── certificates/
    └── placeholder.jpg
```

## Dev Server

```bash
npm run dev
# → http://localhost:5173
```

## Implementation Order

Follow sprint order in `plan.md`:

1. **Sprint 1**: Remove WelcomeScreen → replace Supabase → add Skills section
2. **Sprint 2**: Certificates carousel → Project modal → EmailJS contact
3. **Sprint 3**: ARIA roles → keyboard nav → prefers-reduced-motion
4. **Sprint 4** (deferred): Blog, PWA, analytics

## Verifying EmailJS

After setup, submit the contact form locally. Check your EmailJS dashboard for a test send. The template should have variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`.

## Build & Deploy

```bash
npm run build
# Output in dist/ — deploy to Vercel, Netlify, or GitHub Pages
```
