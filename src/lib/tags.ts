const TAG_CLASS_MAP: Record<string, string> = {
  sports: 'tag-sports',
  magic: 'tag-magic',
  music: 'tag-music',
  comedy: 'tag-comedy',
  'stand up comedy': 'tag-comedy',
  food: 'tag-food',
  'food & drink': 'tag-food',
  concerts: 'tag-concerts',
  concert: 'tag-concerts',
  elections: 'tag-elections',
  election: 'tag-elections',
  politics: 'tag-elections',
  disaster: 'tag-disaster',
  national: 'tag-national',
  'national news': 'tag-national',
  civic: 'tag-civic',
  metro: 'tag-civic',
  tech: 'tag-tech',
  technology: 'tag-tech',
  weather: 'tag-weather',
};

const PH_CLASS_MAP: Record<string, string> = {
  sports: 'ph-yellow',
  magic: 'ph-purple',
  music: 'ph-purple',
  comedy: 'ph-mint',
  'stand up comedy': 'ph-mint',
  food: 'ph-green',
  'food & drink': 'ph-green',
  concerts: 'ph-orange',
  concert: 'ph-orange',
  elections: 'ph-orange',
  election: 'ph-orange',
  politics: 'ph-orange',
  disaster: 'ph-rose',
  national: 'ph-slate',
  'national news': 'ph-slate',
  civic: 'ph-mint',
  metro: 'ph-blue',
  tech: 'ph-slate',
  technology: 'ph-slate',
  weather: 'ph-orange',
};

export function tagClass(category: string | null | undefined): string {
  if (!category) return 'tag-civic';
  return TAG_CLASS_MAP[category.trim().toLowerCase()] ?? 'tag-civic';
}

export function phClass(category: string | null | undefined): string {
  if (!category) return 'ph-stone';
  return PH_CLASS_MAP[category.trim().toLowerCase()] ?? 'ph-stone';
}

export function tagLabel(category: string | null | undefined): string {
  return (category ?? '').toUpperCase();
}
