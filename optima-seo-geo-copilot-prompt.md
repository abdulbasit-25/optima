# Copilot Prompt — OPTIMA SEO + GEO Implementation

> Paste this into Copilot along with `OPTIMA-SEO-Handoff.md` tagged as context.
> Copilot should treat the handoff doc as the source of truth for current state and P0/P1/P2 priorities, and use this prompt to execute the work in order, file by file.

---

## Role and objective

You are acting as a senior technical SEO + GEO (Generative Engine Optimization) engineer working inside the OPTIMA codebase (React + TanStack Start/Router + Vite + Tailwind + Recharts, deployed on Vercel at `https://optima-arch.vercel.app/`).

Your job is to implement the fixes described in `OPTIMA-SEO-Handoff.md`, and in parallel, make the site legible to AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Claude, Copilot itself) — not just classic search crawlers. Treat SEO and GEO as one workstream: almost every fix below should be written so a human searcher, a Googlebot crawler, and an LLM retrieving/citing the page all get the same clear, accurate answer.

Reference these files before editing anything:
- `src/routes/__root.tsx`
- `src/routes/index.tsx`
- `src/routes/scoring.tsx`
- `src/routeTree.gen.ts`
- `src/components/AppChrome.tsx`
- `src/lib/audit.ts`
- `src/lib/audit.functions.ts`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/site.webmanifest`
- `vercel.json`

Do not fabricate ratings, review counts, pricing, testimonials, or claims not visibly present on the page. Do not create thin/duplicate keyword pages. Every change must be verifiable by viewing rendered HTML source (TanStack Start generates head tags — confirm they land in the actual SSR/prerendered output, not only in React devtools).

---

## Phase 0 — Audit before touching code

1. Read `__root.tsx` and confirm exactly how head metadata is composed (root defaults vs per-route overrides). Identify why `/scoring` currently inherits root canonical and social metadata.
2. Fetch and paste the current rendered `<head>` for `/` and `/scoring` (View Source, not DOM inspector).
3. Confirm current contents of `public/robots.txt`, `public/sitemap.xml`, and confirm `/google1e316b15822e4918.html` is present and returns 200.
4. Summarize findings in 5 bullets before making changes.

---

## Phase 1 — P0 fixes (do these first, in this order)

### 1.1 Sitemap
- Add `https://optima-arch.vercel.app/scoring` to `public/sitemap.xml`.
- Include `<lastmod>` for both URLs.
- Sitemap must contain only canonical, indexable, 200-status URLs — no result/report URLs (those are client-state, not routable, and should stay that way for privacy).

### 1.2 Per-route canonical
- Refactor head config so each route defines its own canonical (`/` → `https://optima-arch.vercel.app/`, `/scoring` → `https://optima-arch.vercel.app/scoring`), with no fallback to a shared root canonical.
- Add a guard/check (comment or lightweight test) so a future new route can't silently inherit the homepage canonical.

### 1.3 Per-route social metadata
- Give `/scoring` its own Open Graph title, description, URL, image, alt text, and matching Twitter card fields — do not reuse the homepage's OG copy.
- Keep `og:type=website` unless `/scoring` is deliberately positioned as an editorial/article page (only change to `article` if you also add author/date metadata to match).
- Verify the OG image referenced returns HTTP 200 and has real dimensions.

### 1.4 Homepage metadata rewrite
- Title: target 50–60 characters, one clear phrase, no keyword stuffing. Use as a starting point and refine for actual pixel/character fit:
  `AI SEO Audit Tool for Technical & On-Page SEO | OPTIMA`
- Description: target 150–160 characters, preserve product promise + CTA:
  `Run a clear AI SEO audit for any website. Check on-page SEO, technical health, mobile performance, and the fixes that matter most.`
- H1: make the page's subject explicit while keeping the current voice — either update the H1 or add an immediately visible supporting sentence under it. Starting point:
  `Run an SEO audit. Know what to fix first.`

### 1.5 Scoring page metadata rewrite
- Title (~24 → expand toward a fuller, intent-matching title):
  `How OPTIMA Scores Your SEO Audit | Scoring Guide`
- Description (expand from ~106 chars toward 150–160):
  `Learn how OPTIMA scores on-page SEO, technical health, and mobile performance, from critical issues to a healthy 80-100 baseline.`

### 1.6 Post-deploy verification checklist
After deploying, fetch and confirm status 200 + correct content-type + correct body for:
- `https://optima-arch.vercel.app/robots.txt`
- `https://optima-arch.vercel.app/sitemap.xml`
- `https://optima-arch.vercel.app/google1e316b15822e4918.html`
- `https://optima-arch.vercel.app/og-image.jpg`

Report each as pass/fail with the actual response code.

---

## Phase 2 — P1: relevance, organic conversion, and GEO-legibility

### 2.1 Visible content block below the audit form (homepage)
Add a plainly-written section (not just metadata) answering, in this order, in prose an LLM could lift as a direct answer:
- What an SEO audit checks (list the actual checks OPTIMA runs — title/meta, H1/heading structure, alt text, word count, canonical, internal/external links, HTTPS, meta robots, robots.txt/sitemap.xml, mobile viewport, PageSpeed/LCP/INP/TBT/CLS).
- Who OPTIMA is for (small business owners, freelancers/agencies, marketing teams, developers pre-launch).
- What the 0–100 score means (passed/warning/critical, score bands).
- What the user receives after submitting a URL.
- Why the report is useful even if the user already has another SEO tool.

Write this section in short, declarative sentences. This is the copy most likely to be extracted verbatim (in meaning, not exact wording constraints — just write it cleanly) by an AI answer engine summarizing "what does OPTIMA do."

### 2.2 Visible FAQ (only if every answer is truly on-page)
Add near the bottom of the homepage or scoring page:
- What is an SEO audit?
- What does OPTIMA check?
- Does OPTIMA check mobile performance?
- Is an audit result saved?
- Does OPTIMA replace an SEO specialist?

Each answer: 1–3 sentences, self-contained, no pronoun ambiguity (don't say "it checks this" — say "OPTIMA checks..."). This phrasing style directly benefits GEO: AI engines preferentially quote self-contained Q&A pairs.

### 2.3 New supporting pages (only where content is genuinely original)
Build only when each page has real, distinct copy and a clear CTA back into the audit tool:
- `/seo-audit` — what a website SEO audit includes.
- `/technical-seo-checker` — crawlability, HTTPS, robots.txt, sitemap, canonical checks.
- `/core-web-vitals-checker` — performance and mobile experience.
- `/meta-tag-checker` — title, description, headings, alt text, canonical checks.

For each: unique title/description/canonical/OG, one H1, a definition-style opening paragraph (state plainly what the term/page is about in the first 2 sentences — this is the paragraph GEO engines tend to extract), and an internal link into `/`.

Do not build any of these until you've confirmed real search demand and can write genuinely differentiated content — flag to me if you're about to duplicate copy across them instead of generating them.

### 2.4 Internal linking
Add descriptive-anchor internal links between `/`, `/scoring`, and any new pages — e.g. `run a website SEO audit`, `learn how SEO scoring works`, `check Core Web Vitals`. No bare "click here" or "learn more" anchors.

### 2.5 Example/guide content
If adding example report walkthroughs, use only real, representative recommendations — never fabricated rankings, scores, or promises.

---

## Phase 3 — Structured data (JSON-LD)

Add only for content that is visibly true on the page.

**Homepage:**
- `WebSite` (production URL + product name).
- `SoftwareApplication` (only if the page clearly frames OPTIMA as a web app — include `applicationCategory`, no fake `aggregateRating`).
- `Organization` only once business name/logo/contact identity actually exist on the site.

**Scoring page:**
- `WebPage`.
- `BreadcrumbList` only if visible breadcrumbs are added.
- `FAQPage` only if a real, visible FAQ exists on that page and matches Google's current FAQ rich-result eligibility.

Validate all JSON-LD (no false/unverifiable claims) before shipping.

---

## Phase 4 — GEO-specific additions (beyond classic SEO)

These go beyond the handoff doc's scope but directly support how AI answer engines find, parse, and cite OPTIMA. Implement conservatively — clarity over cleverness:

1. **`llms.txt`** — add a plain-text `/llms.txt` at the site root summarizing: what OPTIMA is, what it checks, primary URL, links to `/`, `/scoring`, and any new supporting pages, in short markdown. This is the emerging convention several AI crawlers/agents check first.
2. **Answer-first paragraph structure** — on every page, make sure the first 1–2 sentences after each H1/H2 stand alone as a complete answer to "what is this section about," since GEO extraction tends to grab the opening sentences of a section rather than the whole block.
3. **Consistent entity naming** — always refer to the product as "OPTIMA" (not "the tool," "our platform," etc.) in visible copy near key facts, so AI systems can confidently attribute facts to the right entity.
4. **Avoid JS-only critical content** — confirm the answer-bearing copy (FAQ, "what OPTIMA checks," scoring explanation) is present in the initial server-rendered HTML, not injected client-side only, since many AI crawlers don't execute JS.
5. **Machine-checkable freshness signals** — add visible "last updated" dates to `/scoring` and any guide content, and keep them accurate; several AI systems weight recency when choosing what to cite.
6. Do not attempt to game AI citation through hidden text, keyword stuffing, or invisible content — treat GEO as "write it clearly for humans and structure it cleanly," not as a separate manipulation target.

---

## Phase 5 — Verification and reporting

For every change, report back in this format:
```
File: <path>
Change: <what changed>
Before: <old value/snippet>
After: <new value/snippet>
Verified via: <rendered HTML check / status code / validator>
```

At the end, produce a checklist against the handoff doc's "Definition of done" (section 10) and mark each item pass/fail:
- Unique title/description/canonical/OG/Twitter metadata for `/` and `/scoring`.
- Sitemap includes both routes.
- robots.txt reachable and points to sitemap.
- Verification file reachable.
- No unintended noindex/redirect/wrong canonical.
- One clear H1 + logical H2/H3 per page.
- Structured data validates, no false claims.
- Every new page has original copy, purpose, internal links, and a conversion path.

---

## Constraints (do not violate)

- Do not imply OPTIMA replaces a full SEO campaign, backlink analysis, keyword research platform, or human review.
- Do not create pages with near-identical copy to game search volume.
- Do not send submitted target URLs or report contents to analytics unless privacy policy/data handling explicitly support it.
- Do not add fake ratings, pricing, or unverifiable claims to structured data or visible copy.
- Keep the Google Search Console ownership file in `public/` permanently — never remove it during refactors.
