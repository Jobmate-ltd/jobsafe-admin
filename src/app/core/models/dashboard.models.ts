export interface Category {
  label: string;
  color: string;
  dot: string;
}

export interface SeverityDef {
  color: string;
  bg: string;
  label: string;
}

export interface StatusDef {
  color: string;
  bg: string;
  ring: string;
}

export interface KpiDef {
  value: number;
  label: string;
  sub: string;
  spark: number[] | null;
  delta: string;
  up?: boolean;
}

export type CategoryKey = 'HSSE' | 'NearMiss' | 'Incident' | 'Other';
export type SeverityKey = 'High' | 'Medium' | 'Low';
export type StatusKey = 'Open' | 'Investigating' | 'Awaiting Sign-off' | 'Closed';

export interface Incident {
  id: string;
  title: string;
  cat: CategoryKey;
  site: string;
  reporter: string;
  time: string;
  sev: SeverityKey;
  status: StatusKey;
}

export interface SiteData {
  name: string;
  stacks: Record<CategoryKey, number>;
}

export interface CategoryStat {
  key: CategoryKey;
  count: number;
  delta: number;
}

export interface TrendAnnotation {
  week: number;
  label: string;
}

export interface KpiData {
  openHighSeverity: KpiDef;
  overdueActions: KpiDef;
  thisWeek: KpiDef;
  daysSinceLTI: KpiDef;
}
