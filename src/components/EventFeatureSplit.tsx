import type { EventDoc } from '../lib/types';
import { Img } from './Image';
import { tagClass, tagLabel } from '../lib/tags';
import { formatEventWhen } from '../lib/format';

interface Props {
  event: EventDoc;
}

export function EventFeatureSplit({ event }: Props) {
  const href = `/events/${event.$id}`;
  const venueShort = event.venue_area ?? event.venue_name ?? '';
  return (
    <a
      href={href}
      className="card hover"
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        overflow: 'hidden',
        marginBottom: 24,
      }}
    >
      <div style={{ position: 'relative', minHeight: 320 }}>
        <Img src={event.image_url} alt={event.title} category={event.category} />
        <span
          className={`tag ${tagClass(event.category)} tag-corner`}
          style={{ position: 'absolute', top: 18, left: 18 }}
        >
          {tagLabel(event.category)}
        </span>
      </div>
      <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span className="eyebrow" style={{ color: 'var(--gold-2)' }}>
          Featured this weekend
        </span>
        <h3
          style={{
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: '-0.8px',
            lineHeight: 1.1,
            margin: '10px 0 12px',
          }}
        >
          {event.title}
        </h3>
        <p style={{ color: 'var(--ink-3)', fontSize: 15, lineHeight: 1.5, margin: 0 }}>
          {event.description}
        </p>
        <div
          style={{
            display: 'flex',
            gap: 24,
            marginTop: 20,
            paddingTop: 20,
            borderTop: '1px solid rgba(26,23,20,0.06)',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: 'var(--ink-4)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
              When
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>
              {formatEventWhen(event.event_date, event.event_time)}
            </div>
          </div>
          {venueShort && (
            <div>
              <div style={{ fontSize: 11, color: 'var(--ink-4)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                Where
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>
                {event.venue_name ?? venueShort}
              </div>
            </div>
          )}
          {event.price && (
            <div style={{ marginLeft: 'auto' }}>
              <div style={{ fontSize: 11, color: 'var(--ink-4)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                Tickets
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4, color: 'var(--gold-2)' }}>
                {event.price}
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
