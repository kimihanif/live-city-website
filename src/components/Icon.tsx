import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  className: 'icon',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 16 16',
};

export const ArrowIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth="1.6" {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export const ArrowLeftIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth="1.6" {...p}>
    <path d="M13 8H3M7 4 3 8l4 4" />
  </svg>
);

export const ClockIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth="1.4" {...p}>
    <circle cx="8" cy="8" r="6" />
    <path d="M8 5v3.2L10 10" />
  </svg>
);

export const PinIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth="1.4" {...p}>
    <path d="M8 14s5-4.4 5-8.5A5 5 0 0 0 3 5.5C3 9.6 8 14 8 14Z" />
    <circle cx="8" cy="6" r="1.6" />
  </svg>
);

export const CalIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth="1.4" {...p}>
    <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" />
    <path d="M5 2v3M11 2v3M2.5 7h11" />
  </svg>
);

export const BellIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth="1.4" {...p}>
    <path d="M4 12V7a4 4 0 0 1 8 0v5l1.2 1.2H2.8L4 12Z" />
    <path d="M6.5 14a1.6 1.6 0 0 0 3 0" />
  </svg>
);

export const SunIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth="1.4" {...p}>
    <circle cx="8" cy="8" r="3" />
    <path d="M8 1.5v1.7M8 12.8v1.7M14.5 8h-1.7M3.2 8H1.5M12.6 3.4l-1.2 1.2M4.6 11.4l-1.2 1.2M12.6 12.6l-1.2-1.2M4.6 4.6 3.4 3.4" />
  </svg>
);

export const TicketsIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth="1.4" {...p}>
    <path d="M2.5 6V4.5h11V6a1 1 0 0 0 0 2v3.5h-11V8a1 1 0 0 0 0-2Z" />
    <path d="M9 4.5v7" />
  </svg>
);
