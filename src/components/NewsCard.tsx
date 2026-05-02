import type { NewsArticle } from '../lib/types';
import { Img } from './Image';
import { tagClass, tagLabel } from '../lib/tags';
import { relativeTime } from '../lib/format';

interface Props {
  article: NewsArticle;
}

export function NewsCard({ article }: Props) {
  const href = `/news/${article.$id}`;
  return (
    <a
      href={href}
      className="card hover"
      data-category={article.category}
      style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer', display: 'block' }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/10' }}>
        <Img src={article.thumbnail_url} alt={article.headline} category={article.category} />
      </div>
      <div style={{ padding: '14px 18px 18px' }}>
        <span className={`tag ${tagClass(article.category)}`}>{tagLabel(article.category)}</span>
        <h4
          style={{
            fontSize: 15,
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: '-0.2px',
            margin: '10px 0 8px',
            textWrap: 'pretty',
          }}
        >
          {article.headline}
        </h4>
        <span style={{ fontSize: 12, color: 'var(--ink-4)', fontWeight: 500 }}>
          {relativeTime(article.fetched_at)}
        </span>
      </div>
    </a>
  );
}
