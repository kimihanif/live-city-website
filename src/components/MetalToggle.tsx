import { useMemo, useState } from 'react';
import { PriceCard } from './PriceCard';
import { PriceChart } from './PriceChart';
import { PriceTable, type PriceRow } from './PriceTable';
import { formatINR, formatShortDate } from '../lib/format';

type Metal = 'gold' | 'silver';
type Range = '7D' | '1M' | '3M' | '6M' | '1Y';

const RANGE_DAYS: Record<Range, number> = { '7D': 7, '1M': 30, '3M': 90, '6M': 180, '1Y': 365 };

interface SeriesPoint {
  gold: number;
  silver: number;
  date: string;
}

interface Props {
  series: SeriesPoint[];
  initialMetal?: Metal;
  initialRange?: Range;
}

export function MetalToggle({ series, initialMetal = 'gold', initialRange = '1M' }: Props) {
  const [metal, setMetal] = useState<Metal>(initialMetal);
  const [range, setRange] = useState<Range>(initialRange);

  const isGold = metal === 'gold';
  const color = isGold ? '#B0851F' : '#8C8C8C';

  const allValues = useMemo(() => series.map((p) => (isGold ? p.gold : p.silver)), [series, isGold]);
  const allDates = useMemo(() => series.map((p) => p.date), [series]);

  const sliceLen = Math.min(RANGE_DAYS[range], series.length);
  const data = allValues.slice(-sliceLen);
  const dateLabels = allDates.slice(-sliceLen);

  const cur = data[data.length - 1] ?? 0;
  const weekIdx = Math.max(0, data.length - 8);
  const weekRef = data[weekIdx];
  const weekChange = weekRef != null ? cur - weekRef : 0;
  const weekPct = weekRef ? ((weekChange / weekRef) * 100).toFixed(2) : '0.00';

  const todayDate = allDates[allDates.length - 1] ?? '';

  const tableRows: PriceRow[] = useMemo(() => {
    const last8Idx = Math.max(0, allValues.length - 8);
    const slice = allValues.slice(last8Idx);
    const dateSlice = allDates.slice(last8Idx);
    const rows: PriceRow[] = [];
    for (let i = slice.length - 1; i >= 0; i--) {
      const change = i > 0 ? slice[i] - slice[i - 1] : 0;
      rows.push({ date: dateSlice[i], rate: slice[i], change });
    }
    return rows;
  }, [allValues, allDates]);

  const goldCur = series[series.length - 1]?.gold ?? 0;
  const goldPrev = series[series.length - 2]?.gold;
  const silverCur = series[series.length - 1]?.silver ?? 0;
  const silverPrev = series[series.length - 2]?.silver;

  const availableRanges: Range[] = (['7D', '1M', '3M', '6M', '1Y'] as Range[]).filter(
    (r) => series.length >= Math.min(RANGE_DAYS[r], 7),
  );

  const earliestDate = allDates[0] ?? '';

  return (
    <>
      <div className="prices-grid">
        <PriceCard
          metal="gold"
          current={goldCur}
          prev={goldPrev}
          asOf={todayDate}
          active={isGold}
          hover={!isGold}
          onClick={() => setMetal('gold')}
        />
        <PriceCard
          metal="silver"
          current={silverCur}
          prev={silverPrev}
          asOf={todayDate}
          active={!isGold}
          hover={isGold}
          onClick={() => setMetal('silver')}
        />
      </div>

      <div className="card" style={{ padding: '32px 36px 24px', marginBottom: 24 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 24,
            flexWrap: 'wrap',
            gap: 18,
          }}
        >
          <div>
            <span className="eyebrow">
              <span className="dot-g" /> {isGold ? 'Gold 22K' : 'Silver'}
            </span>
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                letterSpacing: '-2.4px',
                lineHeight: 1,
                marginTop: 8,
              }}
            >
              <span style={{ fontWeight: 700 }}>₹</span>
              {formatINR(cur)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 14, color: 'var(--ink-4)' }}>
                per gram · {formatShortDate(todayDate)}
              </span>
              {weekRef != null && (
                <span
                  className={`delta ${weekChange >= 0 ? 'up' : 'down'}`}
                  style={{ position: 'static', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                >
                  {weekChange >= 0 ? '▴' : '▾'} ₹{formatINR(Math.abs(Math.round(weekChange)))} this week ({weekPct}%)
                </span>
              )}
            </div>
          </div>
          <div className="chart-tabs" style={{ margin: 0 }}>
            {availableRanges.map((r) => (
              <button
                key={r}
                type="button"
                className={`chart-tab ${range === r ? 'active' : ''}`}
                onClick={() => setRange(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <PriceChart data={data} dateLabels={dateLabels} color={color} />
        {availableRanges.length < 5 && earliestDate && (
          <div style={{ marginTop: 12, fontSize: 12, color: 'var(--ink-4)' }}>
            History available from {formatShortDate(earliestDate)}.
          </div>
        )}
      </div>

      <PriceTable rows={tableRows} />
    </>
  );
}
