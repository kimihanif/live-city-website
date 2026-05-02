import type { EventDoc } from '../lib/types';
import { TicketsIcon, BellIcon } from './Icon';
import { formatEventWhen, formatTimeLabel } from '../lib/format';
import { tagLabel } from '../lib/tags';

interface Props {
  event: EventDoc;
}

function buildIcs(event: EventDoc): string | null {
  const timePart = (() => {
    const t = (event.event_time ?? '').trim();
    const m = /^(\d{1,2}):(\d{2})/.exec(t);
    if (!m) return '00:00';
    return `${m[1].padStart(2, '0')}:${m[2]}`;
  })();
  const dt = new Date(`${event.event_date}T${timePart}:00+05:30`);
  if (isNaN(dt.getTime())) return null;
  const start = dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const end = new Date(dt.getTime() + 2 * 60 * 60 * 1000)
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//live-city//web//EN',
    'BEGIN:VEVENT',
    `UID:${event.$id}@live-city`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `DESCRIPTION:${escapeIcs(event.description ?? '')}`,
    `LOCATION:${escapeIcs(event.venue_name ?? event.venue_area ?? '')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(lines.join('\r\n'));
}

function escapeIcs(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

export function BookCTA({ event }: Props) {
  const fromLabel = event.price ?? 'See partner site';
  const doors = event.event_time ? formatTimeLabel(event.event_time) : '—';
  const icsHref = buildIcs(event);
  return (
    <div className="cta-card">
      <div style={{ fontSize: 12, color: 'var(--ink-4)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
        Starting from
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: '-0.8px',
          color: 'var(--gold-2)',
          margin: '6px 0 4px',
        }}
      >
        {fromLabel}
      </div>
      <div style={{ fontSize: 13, color: 'var(--ink-4)' }}>Booking via partner platform</div>
      <a
        className="btn-primary"
        href={event.source_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: '100%',
          marginTop: 18,
          justifyContent: 'center',
          padding: '14px',
          textDecoration: 'none',
          display: 'inline-flex',
        }}
      >
        <TicketsIcon /> Book tickets
      </a>
      {icsHref && (
        <a
          className="btn-ghost"
          href={icsHref}
          download={`${event.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.ics`}
          style={{
            width: '100%',
            marginTop: 8,
            justifyContent: 'center',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
          }}
        >
          <BellIcon /> Add to calendar
        </a>
      )}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(26,23,20,0.08)', margin: '18px 0' }} />
      <Detail label="Category" value={tagLabel(event.category)} />
      <Detail label="When" value={formatEventWhen(event.event_date, event.event_time)} />
      <Detail label="Doors" value={doors} />
      {event.duration && <Detail label="Duration" value={event.duration} />}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-3)', marginBottom: 6 }}>
      <span>{label}</span>
      <span style={{ fontWeight: 600, color: 'var(--ink-1)' }}>{value}</span>
    </div>
  );
}
