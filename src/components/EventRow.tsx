import type { EventDoc } from '../lib/types';
import { Img } from './Image';
import { ClockIcon, PinIcon } from './Icon';
import { tagClass, tagLabel } from '../lib/tags';
import { formatEventWhen, shortPrice } from '../lib/format';

interface Props {
  event: EventDoc;
}

export function EventRow({ event }: Props) {
  const href = `/events/${event.$id}`;
  const venueShort = event.venue_area ?? event.venue_name ?? '';
  return (
    <a
      href={href}
      className="event-listrow"
      data-category={event.category}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="poster" style={{ position: 'relative' }}>
        <Img src={event.image_url} alt={event.title} category={event.category} />
      </div>
      <div>
        <span className={`tag ${tagClass(event.category)}`}>{tagLabel(event.category)}</span>
        <h4>{event.title}</h4>
        <div className="when">
          <ClockIcon /> {formatEventWhen(event.event_date, event.event_time)}
          {venueShort && (
            <>
              {' · '}
              <PinIcon /> {venueShort}
            </>
          )}
        </div>
      </div>
      {event.price && (
        <div style={{ textAlign: 'right' }}>
          <div className="price-chip">{shortPrice(event.price)}</div>
          {event.price.toLowerCase().includes('onwards') && (
            <div style={{ fontSize: 12, color: 'var(--ink-4)', marginTop: 4 }}>onwards</div>
          )}
        </div>
      )}
    </a>
  );
}
