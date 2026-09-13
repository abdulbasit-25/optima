# OPTIMA SEO Handoff

## 1. Project snapshot

- **Product:** OPTIMA, a browser-based SEO and website health auditor.
- **Production URL:** https://optima-arch.vercel.app/
- **Primary conversion:** A visitor submits a website URL and runs an audit.
- **Secondary conversion:** A visitor reads how scoring works and starts an audit.
- **Current public routes:**
  - `/` - audit tool and primary landing page.
  - `/scoring` - explanation of the scoring model.
- **Current stack:** React, TanStack Start/Router, Vite, Vercel, Tailwind CSS, Recharts, Google PageSpeed Insights.

## 2. Product positioning

### Recommended core positioning

OPTIMA is a lightweight SEO audit tool that explains what is wrong with a website and what to fix first. It checks on-page SEO, mobile performance, and technical crawlability in plain English.

### Primary audience

- Small business owners who need a quick SEO health check.
- Freelancers and agencies doing pre-audit or prospect research.
- Marketing teams that need a simple technical SEO baseline.
- Developers checking a launch or redesign before release.

### Search intent to target

- Informational: how to audit a website for SEO.
- Commercial investigation: best SEO audit tool, free SEO checker, technical SEO checker.
- Problem solving: why is my website not ranking, check meta tags, check Core Web Vitals.
- Product intent: AI SEO audit, website SEO health report, SEO audit report generator.

Do not imply that OPTIMA replaces a full SEO campaign, backlink analysis, keyword research platform, or human review. The current implementation audits one submitted page and its related technical files.

## 3. Current SEO inventory

### Crawlability and indexation

- `public/robots.txt` allows Googlebot, Bingbot, social crawlers, and all other user agents.
- `public/robots.txt` references `https://optima-arch.vercel.app/sitemap.xml`.
- Google Search Console ownership HTML file is present at `/google1e316b15822e4918.html` and must remain deployed.
- `public/sitemap.xml` is valid XML, but currently lists only `/`.
- `/scoring` is a public, linked route and should be included in the sitemap.
- No intentional `noindex` directive is present on the public pages.
- Search results are rendered as client state after a form submission, not as crawlable result URLs. This is appropriate for privacy and avoids indexing user-submitted URLs, but it means audit results do not create SEO landing pages.

### Existing metadata

#### Homepage `/`

- Title currently appears as `OPTIMA - AI-Powered SEO & Website Optimization` in source, with the project using a typographic dash in the rendered copy. Current length is approximately 46 characters.
- Meta description is approximately 186 characters, longer than the recommended working target of about 150-160 characters.
- Canonical URL is set to `https://optima-arch.vercel.app/`.
- Open Graph title, description, URL, image, dimensions, and alt text are present.
- Twitter card, title, description, image, and alt text are present.
- H1 is present: `Know what's holding your site back.`
- The H1 is persuasive, but does not contain a high-intent phrase such as `SEO audit` or `website SEO checker`.

#### Scoring page `/scoring`

- Title is `How OPTIMA Scoring Works` and is approximately 24 characters.
- Description is approximately 106 characters and could better target search intent.
- The page inherits root-level social metadata and the root canonical link. This risks presenting the homepage URL and homepage social copy for `/scoring`.
- The page has one H1, multiple descriptive H2 sections, and useful explanatory copy.
- The page links back to the audit tool and is linked from the global header and footer.

### Page content

The tool explains these checks in the product UI:

- Title tag and meta description.
- H1 count and heading structure.
- Image alt text.
- Approximate body word count.
- Canonical tag.
- Internal and external links.
- HTTPS and meta robots.
- `robots.txt` and `sitemap.xml`.
- Mobile viewport.
- Google PageSpeed performance, LCP, INP/TBT, and CLS.

The scoring page explains the 0-100 model, passed/warning/critical outcomes, and score bands. This is useful supporting content and should be expanded into a stronger SEO education page over time.

## 4. Priority actions

### P0: Fix before active SEO promotion

1. **Add `/scoring` to `public/sitemap.xml`.**
   - Include `https://optima-arch.vercel.app/scoring`.
   - Keep only canonical, indexable URLs in the sitemap.
   - Resubmit the sitemap in Google Search Console after deployment.

2. **Give `/scoring` its own canonical URL.**
   - The root route currently defines a homepage canonical in the shared root head.
   - Make route-level head configuration produce exactly one canonical for each page.
   - Confirm the rendered HTML source, not only the React source, contains the intended canonical.

3. **Give `/scoring` unique social metadata.**
   - Use a scoring-specific Open Graph title, description, and URL.
   - Add `og:type=article` only if the page is treated as editorial content; otherwise keep `website`.
   - Use a suitable image and verify it returns HTTP 200.

4. **Shorten and sharpen homepage metadata.**
   - Keep the title near 50-60 characters where possible.
   - Keep the description near 150-160 characters while preserving the product promise and call to action.
   - Avoid stuffing several versions of `SEO`, `website`, and `audit` into one title.

5. **Confirm the deployed files after every deployment.**
   - `https://optima-arch.vercel.app/robots.txt`
   - `https://optima-arch.vercel.app/sitemap.xml`
   - `https://optima-arch.vercel.app/google1e316b15822e4918.html`
   - Check status, content type, final URL, and response body.

### P1: Improve relevance and organic conversion

1. Add a visible content section below the audit form explaining:
   - What an SEO audit checks.
   - Who OPTIMA is for.
   - What the score means.
   - What the user receives after submitting a URL.
   - Why the report is useful even when a site already uses another SEO tool.

2. Add a small FAQ section only when the answers are visible on the page. Suggested questions:
   - What is an SEO audit?
   - What does OPTIMA check?
   - Does OPTIMA check mobile performance?
   - Is an audit result saved?
   - Does OPTIMA replace an SEO specialist?

3. Add supporting pages or sections based on real search demand:
   - `/seo-audit` - what a website SEO audit includes.
   - `/technical-seo-checker` - crawlability, HTTPS, robots.txt, sitemap, and canonical checks.
   - `/core-web-vitals-checker` - performance and mobile experience.
   - `/meta-tag-checker` - title, description, headings, image alt text, and canonical checks.

Only create these routes when each has original, useful content and a clear path into the audit tool. Do not create thin keyword pages with nearly identical copy.

4. Add internal links between related pages using descriptive anchors such as `run a website SEO audit`, `learn how SEO scoring works`, and `check Core Web Vitals`.

5. Publish examples or guides that demonstrate interpretation of a report. Examples should show real recommendations, not fabricated rankings or promises.

### P2: Build authority and trust

1. Add an About or Methodology page covering:
   - Who operates OPTIMA.
   - How checks are calculated.
   - What data is fetched and what is not stored.
   - How PageSpeed data is used.
   - Limitations of automated audits.

2. Add a clear privacy policy and terms page before collecting analytics, storing audit history, or targeting regulated customers.

3. Add author/reviewer information to editorial guides. Include dates and a visible update policy.

4. Earn links through useful free resources, technical SEO explainers, agency workflows, and shareable audit templates. Avoid paid or automated link schemes.

## 5. Recommended metadata drafts

These are starting points for testing, not final copy. Validate character length and search-result appearance before publishing.

### Homepage

**Title option:**

`AI SEO Audit Tool for Technical & On-Page SEO | OPTIMA`

**Description option:**

`Run a clear AI SEO audit for any website. Check on-page SEO, technical health, mobile performance, and the fixes that matter most.`

**H1 option:**

`Run an SEO audit. Know what to fix first.`

Keep the current conversational tone in supporting copy, but make the page's subject explicit in the H1 or an immediately visible supporting sentence.

### Scoring page

**Title option:**

`How OPTIMA Scores Your SEO Audit | Scoring Guide`

**Description option:**

`Learn how OPTIMA scores on-page SEO, technical health, and mobile performance, from critical issues to a healthy 80-100 baseline.`

**H1 option:**

`How OPTIMA scores an SEO audit`

## 6. Structured data recommendations

Add JSON-LD only for content that is actually visible and accurate on the page.

### Homepage

Consider:

- `WebSite` with the production URL and product name.
- `SoftwareApplication` if the page clearly describes OPTIMA as a web application.
- `Organization` only when the business name, logo, and contact identity are established on the site.

Do not add fake ratings, review counts, pricing, or claims that are not visible and verifiable.

### Scoring page

Consider:

- `WebPage`.
- `BreadcrumbList` if breadcrumbs are added visibly.
- `FAQPage` only if a visible FAQ is added and follows Google's current eligibility rules.

Structured data does not guarantee rich results. It should describe the page, not replace useful content.

## 7. Technical SEO checks for the SEO specialist

- Verify one canonical link per indexable URL.
- Verify the canonical uses HTTPS and the preferred hostname.
- Check that `/`, `/scoring`, `robots.txt`, `sitemap.xml`, favicon files, manifest icons, and social images return 200 responses.
- Check XML sitemap validity and that every listed URL is canonical, indexable, and status 200.
- Check rendered HTML using View Source or a crawler, because metadata is generated by TanStack Start.
- Check mobile rendering, keyboard access, focus states, and color contrast.
- Run PageSpeed Insights for mobile and desktop after production deployment.
- Monitor Core Web Vitals in Search Console when enough field data exists.
- Review JavaScript bundle size. The app includes charts and PDF generation; lazy-load nonessential report/PDF code if initial-load performance is weak.
- Review the Google Fonts import and confirm font loading does not delay the primary content.
- Confirm the Open Graph image exists at `/og-image.jpg`, has meaningful dimensions, and is accepted by Facebook Sharing Debugger and LinkedIn Post Inspector.
- Keep the Google ownership file in the public root permanently.

## 8. Analytics and Search Console

Set up or confirm:

- Google Search Console property for the preferred URL.
- HTML ownership verification using the existing verification file.
- Sitemap submission: `https://optima-arch.vercel.app/sitemap.xml`.
- URL Inspection for `/` and `/scoring` after deployment.
- Google Analytics 4 or another consent-appropriate analytics system.
- Events for audit submission, successful audit completion, failed audit, PDF download, scoring-page visit, and primary CTA click.
- Conversion definition: successful audit completion, with PDF download as a secondary conversion.

Do not send submitted target URLs or report contents to analytics unless the privacy policy and data handling support it.

## 9. Suggested SEO reporting cadence

### Weekly during launch

- Indexed pages and sitemap errors.
- Crawl errors and blocked resources.
- Organic clicks, impressions, CTR, and average position.
- Audit starts, completed audits, errors, and PDF downloads.
- Top landing pages and queries.
- Mobile Core Web Vitals and PageSpeed regressions.

### Monthly after stabilization

- Non-brand versus brand organic traffic.
- Landing-page conversion rate.
- Query groups by intent: audit, technical SEO, Core Web Vitals, meta tags.
- New pages indexed and pages losing clicks.
- Content updates and backlinks earned.
- Search-result title/description tests.

## 10. Definition of done

- `/` and `/scoring` each have unique title, description, canonical, Open Graph, and Twitter metadata.
- Sitemap lists both indexable routes and is submitted in Search Console.
- Robots file is reachable and points to the sitemap.
- Verification file remains reachable.
- No important page has a `noindex`, accidental redirect, or canonical pointing to another page.
- Core content uses one clear H1 and logical H2/H3 sections.
- Structured data validates without false claims.
- The SEO specialist has access to Search Console and analytics data.
- Every new SEO page has original copy, a user purpose, internal links, and a measured conversion path.

## 11. Files reviewed

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
- `src/styles.css`
- `package.json`
- `vercel.json`
