import type { EventDoc } from '../lib/types';
import { Img } from './Image';
import { tagClass, tagLabel } from '../lib/tags';

interface Props {
  event: EventDoc;
}

export function EventHero({ event }: Props) {
  return (
    <div className="event-hero">
      <Img src={event.image_url} alt={event.title} category={event.category} label={event.title} />
      <span className={`tag ${tagClass(event.category)} tag-corner`}>{tagLabel(event.category)}</span>
    </div>
  );
}
