import { Fragment, type ReactNode } from 'react';

interface Props {
  goldPrice?: number | null;
  goldDelta?: number | null;
  silverPrice?: number | null;
  silverDelta?: number | null;
  state?: string;
  topVenue?: string;
  topHeadline?: string | null;
}

function fmtDelta(delta: number | null | undefined) {
  if (delta == null || delta === 0) return null;
  const up = delta > 0;
  return (
    <span style={{ color: up ? 'var(--green)' : 'var(--red)' }}>
      {up ? '▴' : '▾'} ₹{Math.abs(Math.round(delta))}
    </span>
  );
}

export function LiveTicker({
  goldPrice,
  goldDelta,
  silverPrice,
  silverDelta,
  state,
  topVenue,
  topHeadline,
}: Props) {
  const items: ReactNode[] = [];
  if (goldPrice != null) {
    items.push(
      <>
        <strong>GOLD 22K</strong> ₹{goldPrice.toLocaleString('en-IN')} {fmtDelta(goldDelta)}
      </>,
    );
  }
  if (silverPrice != null) {
    items.push(
      <>
        <strong>SILVER</strong> ₹{silverPrice.toLocaleString('en-IN')} {fmtDelta(silverDelta)}
      </>,
    );
  }
  if (topHeadline) {
    items.push(
      <>
        <strong>BREAKING</strong> {topHeadline}
      </>,
    );
  }
  if (topVenue && state) {
    items.push(
      <>
        <strong>EVENT</strong> {topVenue} this weekend · {state}
      </>,
    );
  }

  if (items.length === 0) {
    items.push(
      <>
        <strong>LIVE</strong> Editorial desk standing by — today's edition publishes at 7 AM IST
      </>,
    );
  }

  const doubled = [...items, ...items];

  return (
    <div className="ticker">
      <span className="ticker-label">
        <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--gold-1)' }} />
        Live now
      </span>
      <div className="ticker-track-wrap">
        <div className="ticker-track">
          {doubled.map((it, i) => (
            <Fragment key={i}>
              <span>{it}</span>
              <span className="sep">·</span>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
