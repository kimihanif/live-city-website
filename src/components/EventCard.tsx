import type { EventDoc } from '../lib/types';
import { Img } from './Image';
import { ClockIcon, PinIcon } from './Icon';
import { tagClass, tagLabel } from '../lib/tags';
import { formatEventWhen, shortPrice } from '../lib/format';

interface Props {
  event: EventDoc;
  showFooter?: boolean;
}

export function EventCard({ event, showFooter = true }: Props) {
  const href = `/events/${event.$id}`;
  const venueShort = event.venue_area ?? event.venue_name ?? '';
  return (
    <a
      href={href}
      className="card hover event-card"
      data-category={event.category}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div className="poster">
        <Img src={event.image_url} alt={event.title} category={event.category} />
        <span className={`tag ${tagClass(event.category)} tag-corner`}>{tagLabel(event.category)}</span>
      </div>
      <div className="body">
        <h4>{event.title}</h4>
        <span className="when">
          <ClockIcon /> {formatEventWhen(event.event_date, event.event_time)}
        </span>
        {showFooter && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 12,
              paddingTop: 12,
              borderTop: '1px solid rgba(26,23,20,0.06)',
            }}
          >
            <span style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 500 }}>
              <PinIcon /> <span style={{ marginLeft: 6 }}>{venueShort || '—'}</span>
            </span>
            {event.price && (
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold-2)' }}>
                {shortPrice(event.price)}
              </span>
            )}
          </div>
        )}
      </div>
    </a>
  );
}
