import type { NewsArticle } from '../lib/types';
import { Img } from './Image';
import { tagClass, tagLabel } from '../lib/tags';
import { relativeTime } from '../lib/format';

interface Props {
  article: NewsArticle;
}

export function NewsRow({ article }: Props) {
  const href = `/news/${article.$id}`;
  return (
    <a
      href={href}
      className="news-row"
      data-category={article.category}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="body">
        <span className={`tag ${tagClass(article.category)}`}>{tagLabel(article.category)}</span>
        <h4>{article.headline}</h4>
        <span className="stamp">{relativeTime(article.fetched_at)}</span>
      </div>
      <div className="thumb" style={{ position: 'relative' }}>
        <Img src={article.thumbnail_url} alt={article.headline} category={article.category} />
      </div>
    </a>
  );
}
