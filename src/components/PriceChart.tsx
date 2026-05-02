import { formatShortDate } from '../lib/format';

interface Props {
  data: number[];
  dateLabels?: string[];
  color?: string;
  width?: number;
  height?: number;
}

export function PriceChart({ data, dateLabels, color = '#B0851F', width = 1080, height = 280 }: Props) {
  if (!data || data.length < 2) {
    return (
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
        <text x={width / 2} y={height / 2} fontSize="12" fill="#8A8170" textAnchor="middle">
          Not enough data for this range
        </text>
      </svg>
    );
  }
  const pad = { l: 0, r: 0, t: 24, b: 30 };
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = (width - pad.l - pad.r) / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = pad.l + i * stepX;
    const y = pad.t + (height - pad.t - pad.b) - ((v - min) / range) * (height - pad.t - pad.b);
    return [x, y] as const;
  });
  const polyline = pts.map((p) => p.join(',')).join(' ');
  const area = `${pad.l},${height - pad.b} ${polyline} ${width - pad.r},${height - pad.b}`;
  const last = pts[pts.length - 1];

  const labelPts: Array<{ text: string; at: number; anchor: 'start' | 'middle' | 'end' }> = [];
  if (dateLabels && dateLabels.length === data.length && dateLabels.length >= 1) {
    labelPts.push({ text: formatShortDate(dateLabels[0]), at: pts[0][0], anchor: 'start' });
    if (data.length >= 3) {
      const midIdx = Math.floor(pts.length / 2);
      labelPts.push({ text: formatShortDate(dateLabels[midIdx]), at: pts[midIdx][0], anchor: 'middle' });
    }
    labelPts.push({
      text: formatShortDate(dateLabels[dateLabels.length - 1]),
      at: pts[pts.length - 1][0],
      anchor: 'end',
    });
  }

  const gradId = `grad-area-${color.replace('#', '')}`;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={area} fill={`url(#${gradId})`} stroke="none" />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {last && <circle cx={last[0]} cy={last[1]} r="5" fill={color} />}
      {last && <circle cx={last[0]} cy={last[1]} r="9" fill={color} fillOpacity="0.15" />}
      {labelPts.map((l, i) => (
        <text
          key={i}
          x={l.at}
          y={height - 8}
          fontSize="11"
          fill="#8A8170"
          fontFamily="var(--font-mono)"
          textAnchor={l.anchor}
        >
          {l.text}
        </text>
      ))}
    </svg>
  );
}
