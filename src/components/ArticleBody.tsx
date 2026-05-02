import { renderMarkdown } from '../lib/markdown';

interface Props {
  markdown: string | null | undefined;
  fallbackSummary?: string | null;
  brandName?: string;
}

export function ArticleBody({ markdown, fallbackSummary, brandName }: Props) {
  if (markdown && markdown.trim().length > 0) {
    return <div className="article" dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }} />;
  }

  return (
    <div className="article">
      <h2>What we know</h2>
      {fallbackSummary && <p>{fallbackSummary}</p>}
      <p>
        {brandName ?? 'The desk'} is following this story. We'll update this page as official statements come in. The
        reporting is local — our team is in the city, on the ground, and we won't post until we've confirmed at least
        two sources.
      </p>
      <h2>Why this matters</h2>
      <p>
        Stories like this shape the next twelve hours of life in the city — your school run, your commute, the queue at
        the petrol pump. We try to write the version you can act on, not the version designed to upset you.
      </p>
    </div>
  );
}
