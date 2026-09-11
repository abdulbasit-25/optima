import { useEffect, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { AuditResult, Severity } from "@/lib/audit";

const chartColors = {
  signal: "var(--signal)",
  coral: "#E0524A",
  amber: "#D98A2B",
  mint: "#2FAE79",
  ink: "var(--ink)",
  muted: "var(--muted-foreground)",
  line: "var(--line)",
};

const categoryLabels = [
  { key: "onPage", label: "On-Page" },
  { key: "performance", label: "Performance" },
  { key: "technical", label: "Technical" },
] as const;

const severityLabels: Array<{ key: Severity; label: string; color: string }> = [
  { key: "critical", label: "Critical", color: chartColors.coral },
  { key: "warning", label: "Warning", color: chartColors.amber },
  { key: "passed", label: "Passed", color: chartColors.mint },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function RadarScoreChart({ result }: { result: AuditResult }) {
  const reduced = usePrefersReducedMotion();
  const data = categoryLabels.map(({ key, label }) => ({
    label,
    score: result.categories[key] ?? 0,
    shown: result.categories[key] ?? "—",
  }));

  return (
    <div className="radar-panel chart-panel">
      <div className="chart-heading">
        <div>
          <p className="section-kicker">THREE SIGNALS</p>
          <h2>Audit profile</h2>
        </div>
        <span className="section-heading__meta">RANGE / 0—100</span>
      </div>
      <div className="radar-chart-wrap">
        <ResponsiveContainer width="100%" height={290}>
          <RadarChart data={data} outerRadius="68%">
            <PolarGrid stroke={chartColors.line} radialLines={false} />
            <PolarAngleAxis
              dataKey="label"
              tick={{ fill: chartColors.muted, fontFamily: "DM Mono, monospace", fontSize: 10 }}
            />
            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Score"
              dataKey="score"
              stroke={chartColors.signal}
              fill={chartColors.signal}
              fillOpacity={0.18}
              strokeWidth={2}
              isAnimationActive={!reduced}
              animationDuration={850}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>
        <span className="radar-value radar-value--top">{data[0].shown}</span>
        <span className="radar-value radar-value--left">{data[1].shown}</span>
        <span className="radar-value radar-value--right">{data[2].shown}</span>
      </div>
    </div>
  );
}

export function SeverityDonut({ result }: { result: AuditResult }) {
  const reduced = usePrefersReducedMotion();
  const data = severityLabels.map(({ key, label, color }) => ({
    name: label,
    value: result.issues.filter((issue) => issue.severity === key).length,
    color,
  }));

  return (
    <aside className="donut-panel chart-panel">
      <div className="chart-heading">
        <div>
          <p className="section-kicker">CHECK STATUS</p>
          <h2>Severity mix</h2>
        </div>
      </div>
      <div className="donut-chart-wrap">
        <ResponsiveContainer width="100%" height={190}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={82}
              paddingAngle={3}
              stroke="none"
              isAnimationActive={!reduced}
              animationDuration={850}
              animationEasing="ease-out"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                border: `1px solid ${chartColors.line}`,
                borderRadius: 0,
                backgroundColor: "var(--card)",
                color: chartColors.ink,
                fontFamily: "DM Mono, monospace",
                fontSize: 11,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-center">
          <strong>{result.issues.length}</strong>
          <span>checks</span>
        </div>
      </div>
      <div className="donut-legend">
        {data.map((entry) => (
          <div key={entry.name}>
            <span className="donut-legend__label">
              <i style={{ backgroundColor: entry.color }} />
              {entry.name}
            </span>
            <strong>{entry.value}</strong>
          </div>
        ))}
      </div>
    </aside>
  );
}
