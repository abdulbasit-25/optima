import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number;
  label?: string;
}

export function scoreTone(score: number) {
  if (score >= 80) return "good" as const;
  if (score >= 50) return "mid" as const;
  return "bad" as const;
}

const toneColor = {
  good: "var(--score-good)",
  mid: "var(--score-mid)",
  bad: "var(--score-bad)",
};

export function ScoreGauge({ score, label }: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const tone = scoreTone(score);
  const color = toneColor[tone];

  useEffect(() => {
    const start = performance.now();
    const duration = 850;
    let frame = 0;

    function animate(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(score * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  return (
    <div className="score-reading" data-tone={tone}>
      <div className="score-reading__value">
        <span className="score-reading__number" style={{ color }}>
          {displayScore}
        </span>
        <span className="score-reading__denominator">/100</span>
      </div>
      <div className="score-reading__track" aria-hidden="true">
        <div
          className="score-reading__fill"
          style={{ width: `${Math.min(Math.max(score, 0), 100)}%`, backgroundColor: color }}
        />
      </div>
      {label ? <p className="score-reading__label">{label}</p> : null}
    </div>
  );
}
