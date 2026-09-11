# SEO Auditor

Paste a URL, get back a plain-English SEO health report — on-page tags, Core Web Vitals, and technical setup, scored and broken down by category.

**Live demo:** _add your deployed URL here_

![OPTIMA screenshot](../../public/image.png)

## Features

- **Instant audits** — paste any URL and get a full report in seconds, no signup required
- **Three-category scoring** — On-Page SEO, Performance, and Technical, each scored 0–100 and visualized on a radar chart
- **Issue-level detail** — every check (title tag length, meta description, H1 structure, alt text, canonical tag, robots.txt, sitemap, HTTPS, mobile viewport, and more) is listed individually with a severity tag and a plain-English explanation
- **Severity breakdown** — a donut chart shows the split of Critical / Warning / Passed checks at a glance
- **PDF export** — download a shareable, branded PDF version of any report
- **Diagnostic report design** — a deliberate visual identity (monospace scores, hairline dividers, flat surfaces) rather than a generic SaaS-template look

## Tech stack

- **Frontend:** React + TanStack Router
- **Styling:** Tailwind CSS, custom design tokens (see `Design system` below)
- **Charts:** Recharts (radar chart for category scores, donut chart for issue severity)
- **PDF generation:** `@react-pdf/renderer`
- **Performance/Core Web Vitals data:** Google PageSpeed Insights API
- **On-page scraping:** HTML fetch + parse (via CORS proxy where needed) for title tags, meta description, headings, alt text, links, and canonical tags
- **Built By:** [ARCHER](https://abdulbasit-archer.vercel.app/)

## How an audit works

1. User submits a URL from the input screen
2. Three checks run:
   - **Performance** — Google PageSpeed Insights API returns the performance score, Core Web Vitals (LCP, CLS, INP), and mobile-friendliness signals
   - **On-page** — the target page's HTML is fetched and parsed for title tag, meta description, heading structure, image alt coverage, word count, canonical tag, and internal/external link counts
   - **Technical** — HTTPS check, `robots.txt` and `sitemap.xml` presence, and a `noindex` check
3. Each category is scored 0–100 based on how many checks pass; the overall score is the average of the three
4. Results render as a report: overall score, radar chart, category breakdown, and a full issues list grouped by severity

If a check can't complete (e.g. the target site blocks automated requests, or the PageSpeed API rate-limits), that category is shown as unavailable rather than failing the whole report.

## Design system

The visual direction is a "diagnostic report" aesthetic — closer to a lab report or terminal readout than a marketing page.

| Token      | Value     | Use                                     |
| ---------- | --------- | --------------------------------------- |
| `--ink`    | `#0B1220` | Primary text, dark surfaces (footer)    |
| `--paper`  | `#F6F4EF` | Page background                         |
| `--signal` | `#2F6FED` | Primary accent — score ring, links, CTA |
| `--mint`   | `#2FAE79` | Passed / healthy state                  |
| `--amber`  | `#D98A2B` | Warning state                           |
| `--coral`  | `#E0524A` | Critical state                          |
| `--line`   | `#DEDAD0` | Hairline dividers                       |

- **Type:** a grotesk sans for headlines/body, a monospace face for all scores, percentages, and severity tags
- **Motion:** one coordinated entrance animation when results load (score counts up, radar/donut charts draw in); no per-element hover animation clutter. Respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` (or the port shown in your terminal).

### Environment variables

```bash
# .env
VITE_PAGESPEED_API_KEY=your_google_pagespeed_api_key   # optional at low volume, recommended for production
```

## Project structure

```
src/
├── routes/
│   └── audit route — input screen + results screen
├── components/
│   ├── ScoreGauge/       # numeral + progress ring, count-up animation
│   ├── CategoryRadar/    # radar chart of the three category scores
│   ├── SeverityDonut/    # donut chart of issue severity breakdown
│   ├── IssueList/        # expandable severity-coded issue rows
│   ├── PdfReport/        # @react-pdf/renderer document definition
│   └── Footer/           # site footer incl. ARCHER credit badge
└── lib/
    └── audit/            # scraping, PageSpeed calls, scoring logic
```

## Known limitations

- Some sites block server-side/proxy scraping, which will cause the on-page check to fail gracefully while other categories still return results
- The public CORS proxy used for on-page scraping is fine for personal/demo use but not rate-limit-safe for production traffic — see `lib/audit` for where to swap in a dedicated backend fetch if needed
- PageSpeed Insights API has generous but finite free-tier quota; add an API key (see above) to raise the limit

## Credits

Built by [Abdul Basit](https://abdulbasit-archer.vercel.app/) under **ARCHER**, his web development and AI brand.

## License

_Add a license here (MIT, etc.) if you intend to open-source this._
