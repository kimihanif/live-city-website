import { formatINR, formatShortDate } from '../lib/format';
import { Sparkline } from './Sparkline';

interface Props {
  metal: 'gold' | 'silver';
  current: number;
  prev?: number;
  asOf: string;
  history?: number[];
  reference30dAgo?: number;
  active?: boolean;
  hover?: boolean;
  onClick?: () => void;
  showSparkline?: boolean;
}

export function PriceCard({
  metal,
  current,
  prev,
  asOf,
  history,
  reference30dAgo,
  active = false,
  hover = false,
  onClick,
  showSparkline = false,
}: Props) {
  const delta = prev != null ? current - prev : 0;
  const isUp = delta > 0;
  const isDown = delta < 0;
  const color = metal === 'gold' ? '#B0851F' : '#8C8C8C';
  const label = metal === 'gold' ? 'Gold 22K' : 'Silver';

  const refDelta =
    reference30dAgo != null && reference30dAgo > 0 ? ((current - reference30dAgo) / reference30dAgo) * 100 : null;

  return (
    <div
      className={`price-card ${metal} ${active ? 'active' : hover ? 'hover' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <span className="label">
        <span className="swatch" /> {label}
      </span>
      <div className="value">
        <span className="ru">₹</span>
        {formatINR(current)}
      </div>
      <div className="sub">per gram · {formatShortDate(asOf)}</div>
      {delta !== 0 && (
        <span className={`delta ${isUp ? 'up' : isDown ? 'down' : ''}`}>
          {isUp ? '▴' : '▾'} ₹{Math.abs(delta).toFixed(0)}
        </span>
      )}
      {showSparkline && history && history.length > 1 && (
        <>
          <div style={{ marginTop: 18 }}>
            <Sparkline data={history} width={400} height={64} color={color} />
          </div>
          {reference30dAgo != null && refDelta != null && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 11,
                color: 'var(--ink-4)',
                fontWeight: 600,
                marginTop: 6,
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span>30 days ago · ₹{formatINR(reference30dAgo)}</span>
              <span style={{ color: refDelta >= 0 ? 'var(--green)' : 'var(--red)' }}>
                {refDelta >= 0 ? '+' : ''}
                {refDelta.toFixed(2)}%
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
