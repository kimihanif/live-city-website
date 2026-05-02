import type { NewsArticle } from '../lib/types';
import { Img } from './Image';
import { tagClass, tagLabel } from '../lib/tags';
import { relativeTime, readTimeMinutes } from '../lib/format';

interface Props {
  article: NewsArticle;
  showSummary?: boolean;
}

export function NewsFeature({ article, showSummary = false }: Props) {
  const href = `/news/${article.$id}`;
  return (
    <a href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <article className="news-feature">
        <Img
          src={article.thumbnail_url}
          alt={article.headline}
          category={article.category}
          label={article.headline}
        />
        <div className="overlay" />
        <div className="meta">
          <span className={`tag ${tagClass(article.category)}`}>{tagLabel(article.category)}</span>
          <h3>{article.headline}</h3>
          {showSummary && article.summary && (
            <p style={{ fontSize: 15, opacity: 0.85, marginTop: 6, marginBottom: 8, maxWidth: 680 }}>
              {article.summary}
            </p>
          )}
          <span className="stamp">
            {relativeTime(article.fetched_at)} · {readTimeMinutes(article.content)} min read
          </span>
        </div>
      </article>
    </a>
  );
}
