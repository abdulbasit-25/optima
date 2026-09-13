import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Download,
  ExternalLink,
  Loader2,
  RotateCcw,
  Search,
  ShieldCheck,
  Zap,
  XCircle,
} from "lucide-react";

import { ScoreGauge } from "@/components/ScoreGauge";
import { RadarScoreChart, SeverityDonut } from "@/components/AuditCharts";
import { AppFooter, AppHeader } from "@/components/AppChrome";
import { isValidUrl, runAudit, type AuditResult, type Issue, type Severity } from "@/lib/audit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI SEO Audit Tool for Technical & On-Page SEO | OPTIMA" },
      {
        name: "description",
        content:
          "Run a clear AI SEO audit for any website. Check on-page SEO, technical health, mobile performance, and the fixes that matter most.",
      },
      { property: "og:url", content: "https://optima-arch.vercel.app/" },
      { property: "og:title", content: "OPTIMA — AI-Powered SEO & Website Optimization" },
      {
        property: "og:description",
        content:
          "Know what's holding your website back. Turn SEO data into clear, actionable growth recommendations with OPTIMA.",
      },
      { property: "og:image", content: "https://optima-arch.vercel.app/og-image.jpg" },
      { property: "og:image:alt", content: "OPTIMA AI-powered SEO intelligence platform" },
      { property: "og:image:width", content: "1680" },
      { property: "og:image:height", content: "945" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "OPTIMA — AI-Powered SEO & Website Optimization" },
      {
        name: "twitter:description",
        content: "Know what's holding your website back. Turn SEO data into action with OPTIMA.",
      },
      { name: "twitter:image", content: "https://optima-arch.vercel.app/og-image.jpg" },
      { name: "twitter:image:alt", content: "OPTIMA AI-powered SEO intelligence platform" },
    ],
    links: [{ rel: "canonical", href: "https://optima-arch.vercel.app/" }],
  }),
  component: Index,
});

type Phase = "input" | "loading" | "results";

function Index() {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<Phase>("input");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidUrl(url)) {
      setError("That doesn't look like a valid website address. Try something like example.com");
      return;
    }
    setError(null);
    setPhase("loading");
    try {
      const res = await runAudit(url);
      setResult(res);
      setPhase("results");
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "We couldn't scan this page — it may be blocking automated requests. Try another URL.",
      );
      setPhase("input");
    }
  }

  function reset() {
    setResult(null);
    setError(null);
    setPhase("input");
  }

  return (
    <main className="app-shell app-shell--home">
      <div className="app-content">
        <AppHeader />

        {phase === "results" && result ? (
          <Results result={result} onReset={reset} />
        ) : (
          <InputScreen
            url={url}
            setUrl={setUrl}
            onSubmit={handleSubmit}
            loading={phase === "loading"}
            error={error}
          />
        )}

        <HomepageSeoContent />
      </div>
      <AppFooter />
    </main>
  );
}

function HomepageSeoContent() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://optima-arch.vercel.app/#website",
        url: "https://optima-arch.vercel.app/",
        name: "OPTIMA",
        description:
          "AI-powered SEO audits for on-page, performance, and technical website health.",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://optima-arch.vercel.app/#application",
        name: "OPTIMA",
        url: "https://optima-arch.vercel.app/",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "A web application that audits on-page SEO, mobile performance, and technical website health.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <section className="seo-content" aria-labelledby="seo-content-heading">
        <div className="seo-content__intro">
          <p className="section-kicker">THE OPTIMA AUDIT</p>
          <h2 id="seo-content-heading">A clear SEO audit for your next fix.</h2>
          <p>
            An SEO audit checks the signals that help search engines understand, crawl, and measure
            a page. OPTIMA turns those checks into a plain-English report with priorities.
          </p>
        </div>
        <div className="seo-content__grid">
          <article>
            <h3>What OPTIMA checks</h3>
            <p>
              OPTIMA checks the title tag, meta description, H1 and heading structure, image alt
              text, approximate word count, canonical URL, internal and external links, HTTPS, meta
              robots, robots.txt, sitemap.xml, and the mobile viewport. OPTIMA also reads Google
              PageSpeed data for mobile performance, including LCP, INP or TBT, and CLS.
            </p>
          </article>
          <article>
            <h3>Who OPTIMA is for</h3>
            <p>
              OPTIMA is for small business owners, freelancers and agencies, marketing teams, and
              developers preparing a launch or redesign. It gives each audience a fast technical
              baseline before deeper SEO work.
            </p>
          </article>
          <article>
            <h3>What the score means</h3>
            <p>
              OPTIMA scores available checks from 0 to 100. Passed checks earn full credit, warning
              checks earn half credit, and critical checks earn no credit. Scores from 0-49 need
              urgent attention, 50-79 need work, and 80-100 represent a healthy baseline.
            </p>
          </article>
          <article>
            <h3>What you receive</h3>
            <p>
              After you submit a URL, OPTIMA returns an overall score, category scores, grouped
              issues, plain-English explanations, and a downloadable PDF report. Results are
              generated for the submitted page and are not published as public URLs.
            </p>
          </article>
          <article>
            <h3>Why use OPTIMA with another SEO tool</h3>
            <p>
              OPTIMA is a focused second opinion. It translates a live page scan into a short list
              of fixes, while a broader SEO platform can continue to handle keywords, backlinks,
              rank tracking, and campaign-level analysis.
            </p>
          </article>
        </div>
      </section>

      <section className="seo-faq" aria-labelledby="faq-heading">
        <div className="seo-content__intro">
          <p className="section-kicker">COMMON QUESTIONS</p>
          <h2 id="faq-heading">Questions about SEO audits</h2>
        </div>
        <div className="seo-faq__list">
          <details>
            <summary>What is an SEO audit?</summary>
            <p>
              An SEO audit is a review of a web page&apos;s content, technical setup, crawlability,
              and performance signals. OPTIMA turns that review into prioritized recommendations.
            </p>
          </details>
          <details>
            <summary>What does OPTIMA check?</summary>
            <p>
              OPTIMA checks on-page HTML signals, technical crawlability, mobile performance, and
              Core Web Vitals-related measurements from Google PageSpeed Insights.
            </p>
          </details>
          <details>
            <summary>Does OPTIMA check mobile performance?</summary>
            <p>
              Yes. OPTIMA requests the mobile PageSpeed Insights result and reports performance
              signals such as LCP, INP or TBT, CLS, and the overall performance score.
            </p>
          </details>
          <details>
            <summary>Is an audit result saved?</summary>
            <p>
              OPTIMA displays the audit in the current browser session and can generate a PDF
              download. OPTIMA does not create a public, crawlable result URL.
            </p>
          </details>
          <details>
            <summary>Does OPTIMA replace an SEO specialist?</summary>
            <p>
              No. OPTIMA provides an automated starting point for technical and on-page checks. An
              SEO specialist is still needed for strategy, content quality, links, research, and
              decisions that require business context.
            </p>
          </details>
        </div>
      </section>
    </>
  );
}

/* ------------------------------- Input ------------------------------ */

function InputScreen({
  url,
  setUrl,
  onSubmit,
  loading,
  error,
}: {
  url: string;
  setUrl: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
}) {
  return (
    <section className="input-screen">
      <div className="input-screen__copy">
        <p className="eyebrow">AI-POWERED SEO INTELLIGENCE</p>
        <h1>
          Run an SEO audit. <em>Know what to fix first.</em>
        </h1>
        <p className="input-screen__intro">
          Point OPTIMA at a page and it reads it the way a search engine does — on-page signals,
          performance, technical health — then tells you exactly what to fix first.
        </p>

        <form onSubmit={onSubmit} className="audit-form">
          <label htmlFor="target-url">TARGET URL</label>
          <div className="audit-form__field">
            <span className="audit-form__prefix">audit ›</span>
            <input
              id="target-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              placeholder="example.com"
              aria-label="Website URL"
              autoComplete="off"
              spellCheck={false}
            />
            <button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ArrowRight className="size-4" />
              )}
              {loading ? "Scanning" : "Analyze"}
            </button>
          </div>

          {error ? (
            <p className="audit-form__error">
              <AlertTriangle className="size-4 shrink-0" />
              {error}
            </p>
          ) : null}
        </form>

        {loading ? (
          <div className="scan-status" role="status">
            <span className="scan-status__pulse" aria-hidden="true" />
            <p>Reading the page. This usually takes under a minute.</p>
          </div>
        ) : null}
      </div>

      <aside className="signal-map" aria-label="What OPTIMA checks">
        <div className="signal-map__heading">
          <span>SCAN PROFILE</span>
          <strong>03 SIGNALS</strong>
        </div>
        <div className="signal-map__line" />
        <div className="signal-map__item">
          <BarChart3 className="size-5" />
          <span>
            <strong>On-page</strong>
            <small>Content & structure</small>
          </span>
          <em>01</em>
        </div>
        <div className="signal-map__item">
          <Zap className="size-5" />
          <span>
            <strong>Performance</strong>
            <small>Speed & experience</small>
          </span>
          <em>02</em>
        </div>
        <div className="signal-map__item">
          <ShieldCheck className="size-5" />
          <span>
            <strong>Technical</strong>
            <small>Crawlability & access</small>
          </span>
          <em>03</em>
        </div>
        <p className="signal-map__footer">A clear starting point for your next fix.</p>
      </aside>
    </section>
  );
}

/* ------------------------------ Results ----------------------------- */

const SEVERITY_ORDER: Severity[] = ["critical", "warning", "passed"];

const SEVERITY_META: Record<
  Severity,
  { label: string; description: string; icon: typeof CheckCircle2; color: string }
> = {
  critical: {
    label: "Critical",
    description: "Fix these first — they're actively hurting rankings or usability.",
    icon: XCircle,
    color: "var(--score-bad)",
  },
  warning: {
    label: "Needs attention",
    description: "Worth addressing, but not urgent.",
    icon: AlertTriangle,
    color: "var(--score-mid)",
  },
  passed: {
    label: "Passed",
    description: "Already in good shape.",
    icon: CheckCircle2,
    color: "var(--score-good)",
  },
};

function Results({ result, onReset }: { result: AuditResult; onReset: () => void }) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const hostname = new URL(result.url).hostname.replace(/^www\./, "");

  const grouped = SEVERITY_ORDER.map((severity) => ({
    severity,
    issues: result.issues.filter((i) => i.severity === severity),
  })).filter((g) => g.issues.length > 0);

  async function downloadPdf() {
    setPdfLoading(true);
    try {
      const [{ pdf }, { AuditPdfDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/AuditPdf"),
      ]);
      const generatedAt = new Date();
      const blob = await pdf(
        <AuditPdfDocument result={result} generatedAt={generatedAt} />,
      ).toBlob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `optima-audit-${hostname}-${generatedAt.toISOString().slice(0, 10)}.pdf`;
      link.click();
      URL.revokeObjectURL(downloadUrl);
    } finally {
      setPdfLoading(false);
    }
  }

  return (
    <section className="results-screen">
      <div className="results-heading">
        <a
          className="results-heading__url"
          href={result.url}
          target="_blank"
          rel="noreferrer"
          title={result.url}
        >
          {hostname}
          <ExternalLink className="size-3.5" />
        </a>
        <div className="results-heading__actions">
          <button onClick={downloadPdf} className="text-button" disabled={pdfLoading}>
            {pdfLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Download className="size-4" />
            )}
            {pdfLoading ? "Building report" : "Download report"}
          </button>
          <button onClick={onReset} className="text-button">
            <RotateCcw className="size-4" />
            New audit
          </button>
        </div>
      </div>

      <div className="results-layout">
        <aside className="results-rail">
          <div className="score-panel">
            <ScoreGauge score={result.overallScore} label="Overall score" />
            <p className="score-panel__note">
              Based on on-page, performance, and technical signals.
            </p>
          </div>
          <RadarScoreChart result={result} />
          <SeverityDonut result={result} />
        </aside>

        <div className="results-main">
          {result.warnings.length > 0 ? (
            <div className="report-notice">
              {result.warnings.map((w) => (
                <p key={w}>{w}</p>
              ))}
            </div>
          ) : null}

          {grouped.map(({ severity, issues }) => (
            <IssueGroup key={severity} severity={severity} issues={issues} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IssueGroup({ severity, issues }: { severity: Severity; issues: Issue[] }) {
  const meta = SEVERITY_META[severity];
  const Icon = meta.icon;
  const [collapsed, setCollapsed] = useState(severity === "passed");

  return (
    <div className={`issue-group issue-group--${severity}`}>
      <button
        className="issue-group__header"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
      >
        <Icon className="size-4 shrink-0" style={{ color: meta.color }} />
        <span className="issue-group__label">{meta.label}</span>
        <span className="issue-group__count">{issues.length}</span>
        <span className="issue-group__desc">{meta.description}</span>
        <ChevronDown
          className={`size-4 shrink-0 issue-group__chevron ${collapsed ? "" : "is-open"}`}
        />
      </button>

      {!collapsed ? (
        <div className="issue-group__list">
          {issues.map((issue) => (
            <IssueRow key={issue.id} issue={issue} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function IssueRow({ issue }: { issue: Issue }) {
  const [open, setOpen] = useState(issue.severity === "critical");

  return (
    <div className="issue-row">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="issue-row__trigger"
      >
        <span className="issue-row__title">{issue.title}</span>
        <ChevronDown className={`size-4 shrink-0 issue-row__chevron ${open ? "is-open" : ""}`} />
      </button>
      {open ? <div className="issue-row__description">{issue.description}</div> : null}
    </div>
  );
}
