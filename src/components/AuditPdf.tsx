import {
  Circle,
  Document,
  Image,
  Line,
  Page,
  Polygon,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";

import type { AuditResult, Issue, Severity } from "@/lib/audit";

const colors = {
  ink: "#0B1220",
  paper: "#F6F4EF",
  signal: "#2F6FED",
  mint: "#2FAE79",
  amber: "#D98A2B",
  coral: "#E0524A",
  line: "#DEDAD0",
  muted: "#6D716F",
};

const severityOrder: Severity[] = ["critical", "warning", "passed"];
const severityColor: Record<Severity, string> = {
  critical: colors.coral,
  warning: colors.amber,
  passed: colors.mint,
};
const categoryLabels = [
  ["onPage", "On-Page SEO"],
  ["performance", "Performance"],
  ["technical", "Mobile & Technical"],
] as const;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.paper,
    color: colors.ink,
    padding: 42,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  header: {
    borderBottom: `1 solid ${colors.line}`,
    paddingBottom: 18,
    marginBottom: 24,
  },
  eyebrow: {
    color: colors.signal,
    fontFamily: "Courier",
    fontSize: 8,
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  wordmark: {
    fontSize: 21,
    fontFamily: "Helvetica-Bold",
    marginBottom: 7,
  },
  url: {
    color: colors.muted,
    fontFamily: "Courier",
    fontSize: 9,
  },
  date: {
    color: colors.muted,
    fontSize: 8,
    marginTop: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontFamily: "Courier",
    fontSize: 8,
    letterSpacing: 1,
    color: colors.signal,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderBottom: `1 solid ${colors.line}`,
    paddingBottom: 24,
  },
  score: {
    color: colors.signal,
    fontFamily: "Courier-Bold",
    fontSize: 62,
    lineHeight: 0.9,
  },
  denominator: {
    color: colors.muted,
    fontFamily: "Courier",
    fontSize: 10,
    marginLeft: 8,
    marginBottom: 7,
  },
  scoreNote: {
    color: colors.muted,
    fontSize: 9,
    marginLeft: 28,
    marginBottom: 8,
    maxWidth: 190,
    lineHeight: 1.4,
  },
  chart: {
    alignSelf: "center",
    marginVertical: 4,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: `1 solid ${colors.ink}`,
    paddingBottom: 7,
    marginBottom: 0,
  },
  tableHeaderText: {
    color: colors.muted,
    fontFamily: "Courier",
    fontSize: 8,
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: `1 solid ${colors.line}`,
    paddingVertical: 9,
  },
  categoryName: {
    flex: 1,
  },
  categoryScore: {
    color: colors.signal,
    fontFamily: "Courier-Bold",
    width: 70,
    textAlign: "right",
  },
  issueGroup: {
    marginBottom: 15,
  },
  severityHeading: {
    color: colors.ink,
    fontFamily: "Courier-Bold",
    fontSize: 9,
    borderBottom: `2 solid ${colors.ink}`,
    paddingBottom: 6,
    marginBottom: 0,
  },
  issue: {
    borderBottom: `1 solid ${colors.line}`,
    paddingVertical: 9,
  },
  issueTitle: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  issueDescription: {
    color: colors.muted,
    fontSize: 9,
    lineHeight: 1.4,
  },
  footer: {
    borderTop: `1 solid ${colors.line}`,
    marginTop: "auto",
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerText: {
    color: colors.muted,
    fontSize: 8,
  },
  footerBrand: {
    color: colors.ink,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    letterSpacing: 1,
  },
  footerLogo: {
    width: 18,
    height: 18,
    objectFit: "contain",
    marginRight: 6,
  },
});

function radarPoints(result: AuditResult, radius: number) {
  const center = 110;
  const angles = [-90, 30, 150];
  return categoryLabels
    .map(([key], index) => {
      const score = result.categories[key] ?? 0;
      const angle = (angles[index] * Math.PI) / 180;
      return `${center + Math.cos(angle) * radius * (score / 100)},${center + Math.sin(angle) * radius * (score / 100)}`;
    })
    .join(" ");
}

function PdfRadar({ result }: { result: AuditResult }) {
  const center = 110;
  const radius = 72;
  const outerPoints = [0, 1, 2]
    .map((index) => {
      const angle = ([-90, 30, 150][index] * Math.PI) / 180;
      return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`;
    })
    .join(" ");

  return (
    <Svg width={220} height={220} viewBox="0 0 220 220" style={styles.chart}>
      <Polygon points={outerPoints} fill="none" stroke={colors.line} strokeWidth={1} />
      <Polygon
        points={radarPoints(result, radius)}
        fill={colors.signal}
        fillOpacity={0.18}
        stroke={colors.signal}
        strokeWidth={2}
      />
      <Circle cx={center} cy={center} r={2.5} fill={colors.signal} />
      {[0, 1, 2].map((index) => {
        const angle = ([-90, 30, 150][index] * Math.PI) / 180;
        return (
          <Line
            key={index}
            x1={center}
            y1={center}
            x2={center + Math.cos(angle) * radius}
            y2={center + Math.sin(angle) * radius}
            stroke={colors.line}
            strokeWidth={1}
          />
        );
      })}
      <Text x={center - 30} y={18} style={{ fontFamily: "Courier", fontSize: 9, fill: colors.ink }}>
        {result.categories.onPage ?? "-"}
      </Text>
      <Text x={19} y={191} style={{ fontFamily: "Courier", fontSize: 9, fill: colors.ink }}>
        {result.categories.performance ?? "-"}
      </Text>
      <Text x={184} y={191} style={{ fontFamily: "Courier", fontSize: 9, fill: colors.ink }}>
        {result.categories.technical ?? "-"}
      </Text>
    </Svg>
  );
}

function IssueGroup({ severity, issues }: { severity: Severity; issues: Issue[] }) {
  if (issues.length === 0) return null;
  return (
    <View style={styles.issueGroup}>
      <Text style={[styles.severityHeading, { color: severityColor[severity] }]}>
        {severity.toUpperCase()} / {issues.length}
      </Text>
      {issues.map((issue) => (
        <View key={issue.id} style={styles.issue}>
          <Text style={styles.issueTitle}>{issue.title}</Text>
          <Text style={styles.issueDescription}>{issue.description}</Text>
        </View>
      ))}
    </View>
  );
}

export function AuditPdfDocument({
  result,
  generatedAt,
}: {
  result: AuditResult;
  generatedAt: Date;
}) {
  return (
    <Document title={`OPTIMA SEO Audit - ${result.url}`} author="OPTIMA">
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>OPTIMA / AI SEO INTELLIGENCE</Text>
          <Text style={styles.wordmark}>OPTIMA</Text>
          <Text style={styles.url}>{result.url}</Text>
          <Text style={styles.date}>Generated {generatedAt.toLocaleString()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall health</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.score}>{result.overallScore}</Text>
            <Text style={styles.denominator}>/100</Text>
            <Text style={styles.scoreNote}>
              Overall SEO score from on-page, performance, and technical checks.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Signal breakdown</Text>
          <PdfRadar result={result} />
          <View style={styles.tableHeader}>
            <Text style={styles.categoryName}>Category</Text>
            <Text style={styles.categoryScore}>Score / 100</Text>
          </View>
          {categoryLabels.map(([key, label]) => (
            <View key={key} style={styles.tableRow}>
              <Text style={styles.categoryName}>{label}</Text>
              <Text style={styles.categoryScore}>{result.categories[key] ?? "-"}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inspection log</Text>
          {severityOrder.map((severity) => (
            <IssueGroup
              key={severity}
              severity={severity}
              issues={result.issues.filter((issue) => issue.severity === severity)}
            />
          ))}
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Report generated by OPTIMA - powered by</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image src="https://abdulbasit-archer.vercel.app/logo.png" style={styles.footerLogo} />
            <Text style={styles.footerBrand}>ARCHER</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
