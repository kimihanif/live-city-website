const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LONG_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function relativeTime(iso: string | null | undefined, now: Date = new Date()): string {
  if (!iso) return '';
  const t = new Date(iso).getTime();
  if (isNaN(t)) return '';
  const diffSec = Math.max(0, Math.floor((now.getTime() - t) / 1000));
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} ${diffHr === 1 ? 'hour' : 'hours'} ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay} ${diffDay === 1 ? 'day' : 'days'} ago`;
  return formatShortDate(iso);
}

export function formatShortDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = parseLooseDate(iso);
  if (!d) return '';
  return `${d.getDate()} ${SHORT_MONTHS[d.getMonth()]}`;
}

export function formatLongDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = parseLooseDate(iso);
  if (!d) return '';
  return `${d.getDate()} ${LONG_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatNavDate(d: Date = new Date()): string {
  return `${WEEKDAYS_SHORT[d.getDay()]}, ${d.getDate()} ${SHORT_MONTHS[d.getMonth()]}`;
}

export function formatINR(n: number): string {
  return n.toLocaleString('en-IN');
}

export function readTimeMinutes(content: string | null | undefined): number {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatEventWhen(date: string, time: string | null): string {
  const d = parseLooseDate(date);
  if (!d) return time ?? date;
  const dayLabel = `${WEEKDAYS_SHORT[d.getDay()]}, ${d.getDate()} ${SHORT_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  if (!time) return dayLabel;
  return `${dayLabel} · ${formatTimeLabel(time)}`;
}

export function formatTimeLabel(time: string): string {
  const m = /^(\d{1,2}):(\d{2})/.exec(time.trim());
  if (!m) return time;
  let h = parseInt(m[1], 10);
  const min = m[2];
  const suffix = h >= 12 ? 'PM' : 'AM';
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return `${h}:${min} ${suffix}`;
}

export function isPast(date: string): boolean {
  const d = parseLooseDate(date);
  if (!d) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d.getTime() < today.getTime();
}

export function shortPrice(price: string | null): string {
  if (!price) return '';
  return price.replace(/\s*onwards\s*$/i, '').trim();
}

function parseLooseDate(s: string): Date | null {
  const trimmed = s.trim();
  if (!trimmed) return null;
  const ymd = /^(\d{4})-(\d{2})-(\d{2})/.exec(trimmed);
  if (ymd) {
    const d = new Date(Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3]));
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(trimmed);
  return isNaN(d.getTime()) ? null : d;
}
