import type { CSSProperties } from 'react';
import { PH } from './PH';
import { phClass } from '../lib/tags';
import { imageWithFallback } from '../lib/images';

interface Props {
  src: string | null | undefined;
  alt: string;
  category?: string | null;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function Img({ src, alt, category, label, className, style }: Props) {
  const resolved = imageWithFallback(src, category);
  if (resolved) {
    return (
      <img
        src={resolved}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          ...style,
        }}
      />
    );
  }
  return <PH className={`${phClass(category)} ${className ?? ''}`} label={label} style={style} />;
}
