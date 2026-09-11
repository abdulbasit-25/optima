import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  FileSearch,
  Gauge,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

import { AppFooter, AppHeader } from "@/components/AppChrome";

export const Route = createFileRoute("/scoring")({
  head: () => ({
    meta: [
      { title: "How OPTIMA Scoring Works" },
      {
        name: "description",
        content:
          "Learn how OPTIMA checks on-page SEO, technical health, and performance to calculate a clear website score.",
      },
    ],
  }),
  component: ScoringPage,
});

const categories = [
  {
    icon: FileSearch,
    title: "On-page SEO",
    text: "We inspect the HTML that search engines read: title and meta description length, heading structure, image alt text, content depth, canonical URL, and internal links.",
  },
  {
    icon: Gauge,
    title: "Performance",
    text: "We use Google PageSpeed Insights to measure the page's mobile performance, including Largest Contentful Paint, Time to Interactive, Total Blocking Time, and layout stability.",
  },
  {
    icon: ShieldCheck,
    title: "Technical health",
    text: "We check HTTPS, robots directives, robots.txt, sitemap.xml, and the mobile viewport tag to catch the foundations that affect crawling and usability.",
  },
];

function ScoringPage() {
  return (
    <main className="app-shell scoring-page">
      <div className="app-content">
        <AppHeader />

        <section className="scoring-hero">
          <p className="eyebrow">OPTIMA / SCORING GUIDE</p>
          <h1>Know what the number means.</h1>
          <p className="scoring-hero__intro">
            OPTIMA turns a live website scan into a practical 0-100 score. This page explains what
            we check, how points are awarded, and what to do with the result.
          </p>
          <Link to="/" className="secondary-button scoring-hero__action">
            <ScanSearch className="size-4" />
            Run an audit
          </Link>
        </section>

        <section className="scoring-section" aria-labelledby="workflow-heading">
          <div className="scoring-section__heading">
            <p className="section-kicker">THE WORKFLOW</p>
            <h2 id="workflow-heading">Three signal groups, one readable report.</h2>
          </div>
          <div className="scoring-categories">
            {categories.map((category) => (
              <article className="scoring-category" key={category.title}>
                <category.icon className="scoring-category__icon size-5" />
                <h3>{category.title}</h3>
                <p>{category.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="scoring-section scoring-section--split"
          aria-labelledby="points-heading"
        >
          <div>
            <p className="section-kicker">THE MATH</p>
            <h2 id="points-heading">Every check earns a clear outcome.</h2>
            <p>
              Each available category score is calculated from its checks. A passed check earns 1
              point, a warning earns 0.5 points, and a critical check earns 0 points.
            </p>
            <p>
              The overall score is the average of the available category scores, rounded to the
              nearest whole number. If PageSpeed is unavailable, OPTIMA still reports the HTML
              categories and tells you that performance data was omitted.
            </p>
          </div>
          <div className="scoring-formula" aria-label="Scoring formula">
            <div className="scoring-formula__row">
              <CheckCircle2 className="size-5" style={{ color: "var(--score-good)" }} />
              <span>Passed</span>
              <strong>1.0 point</strong>
            </div>
            <div className="scoring-formula__row">
              <CircleAlert className="size-5" style={{ color: "var(--score-mid)" }} />
              <span>Warning</span>
              <strong>0.5 points</strong>
            </div>
            <div className="scoring-formula__row">
              <CircleAlert className="size-5" style={{ color: "var(--score-bad)" }} />
              <span>Critical</span>
              <strong>0 points</strong>
            </div>
            <div className="scoring-formula__note">
              <Gauge className="size-4" />
              Overall = average of available category scores
            </div>
          </div>
        </section>

        <section className="scoring-section" aria-labelledby="bands-heading">
          <div className="scoring-section__heading">
            <p className="section-kicker">READING THE RESULT</p>
            <h2 id="bands-heading">Use the score as a priority signal.</h2>
          </div>
          <div className="score-bands">
            <div className="score-band score-band--bad">
              <strong>0-49</strong>
              <span>Critical</span>
              <p>
                Start with the issues marked critical. They represent missing or seriously unhealthy
                signals.
              </p>
            </div>
            <div className="score-band score-band--mid">
              <strong>50-79</strong>
              <span>Needs work</span>
              <p>
                Core foundations are present, but warnings identify improvements likely to make the
                biggest difference.
              </p>
            </div>
            <div className="score-band score-band--good">
              <strong>80-100</strong>
              <span>Healthy baseline</span>
              <p>
                The page has a strong technical baseline. Keep improving content quality and real
                user experience.
              </p>
            </div>
          </div>
        </section>

        <section className="scoring-next-step">
          <div>
            <p className="section-kicker">READY TO LOOK CLOSER?</p>
            <h2>Ready to see your own score?</h2>
          </div>
          <Link to="/" className="text-button">
            Analyze a website
            <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>
      <AppFooter />
    </main>
  );
}
