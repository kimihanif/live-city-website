import type { CSSProperties } from 'react';

interface Props {
  className?: string;
  label?: string;
  style?: CSSProperties;
}

export function PH({ className = '', label, style }: Props) {
  return (
    <div className={`ph ${className}`} style={style}>
      {label && (
        <span className="ph-label">
          <span style={{ opacity: 0.65, marginRight: 6 }}>IMG</span>
          {label}
        </span>
      )}
    </div>
  );
}
