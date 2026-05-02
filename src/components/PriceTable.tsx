import { formatINR, formatShortDate } from '../lib/format';

export interface PriceRow {
  date: string;
  rate: number;
  change: number;
}

interface Props {
  rows: PriceRow[];
}

export function PriceTable({ rows }: Props) {
  return (
    <div className="price-table">
      <div className="row head">
        <span>Date</span>
        <span>Rate / gram</span>
        <span style={{ textAlign: 'right' }}>Change</span>
      </div>
      {rows.map((d, i) => (
        <div key={i} className="row">
          <span className="date">{formatShortDate(d.date)}</span>
          <span className="rate">₹{formatINR(d.rate)}</span>
          <span className={`change ${d.change > 0 ? 'up' : d.change < 0 ? 'down' : 'flat'}`}>
            {d.change === 0 ? '—' : (d.change > 0 ? '▴' : '▾') + ' ₹' + Math.abs(d.change).toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}
