import React from 'react';

export default function ProgressRing({ percent = 0, size = 120, stroke = 8 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  const isComplete = percent === 100;

  return (
    <div className="progress-ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="rgba(7,122,125,0.2)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={isComplete ? '#7AE2CF' : '#077A7D'}
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)', filter: isComplete ? 'drop-shadow(0 0 6px rgba(122,226,207,0.6))' : 'none' }}
        />
      </svg>
      <div className="progress-ring-label">
        <span className="progress-ring-pct">{percent}%</span>
        <span className="progress-ring-sub">done</span>
      </div>
    </div>
  );
}
