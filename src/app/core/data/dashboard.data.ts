import type {
  Category,
  SeverityDef,
  StatusDef,
  KpiData,
  Incident,
  SiteData,
  CategoryStat,
  TrendAnnotation,
  CategoryKey,
} from '../models/dashboard.models';

export const CATEGORIES: Record<CategoryKey, Category> = {
  HSSE:     { label: 'HSSE',      color: '#E63946', dot: '#E63946' },
  NearMiss: { label: 'Near Miss', color: '#F59E0B', dot: '#F59E0B' },
  Incident: { label: 'Incident',  color: '#0A0A0A', dot: '#0A0A0A' },
  Other:    { label: 'Other',     color: '#22C55E', dot: '#22C55E' },
};

export const SEVERITY: Record<string, SeverityDef> = {
  High:   { color: '#E63946', bg: 'rgba(230,57,70,0.08)',  label: 'High' },
  Medium: { color: '#B45309', bg: 'rgba(245,158,11,0.10)', label: 'Medium' },
  Low:    { color: '#15803D', bg: 'rgba(34,197,94,0.10)',  label: 'Low' },
};

export const STATUS: Record<string, StatusDef> = {
  Open:                { color: '#E63946', bg: 'rgba(230,57,70,0.08)',   ring: 'rgba(230,57,70,0.20)' },
  Investigating:       { color: '#B45309', bg: 'rgba(245,158,11,0.10)',  ring: 'rgba(245,158,11,0.25)' },
  'Awaiting Sign-off': { color: '#1D4ED8', bg: 'rgba(29,78,216,0.08)',   ring: 'rgba(29,78,216,0.20)' },
  Closed:              { color: '#15803D', bg: 'rgba(34,197,94,0.10)',   ring: 'rgba(34,197,94,0.25)' },
};

export const KPI: KpiData = {
  openHighSeverity: {
    value: 7,
    label: 'Open high-severity',
    sub: 'Requires immediate attention',
    spark: [3, 4, 5, 5, 6, 7, 7],
    delta: '+2 vs 7d ago',
  },
  overdueActions: {
    value: 3,
    label: 'Overdue actions',
    sub: '2 assigned to you',
    spark: [1, 1, 2, 2, 3, 3, 3],
    delta: 'Oldest: 4 days',
  },
  thisWeek: {
    value: 18,
    label: 'Incidents this week',
    sub: 'vs 16 last week',
    spark: [2, 4, 3, 5, 1, 2, 1],
    delta: '+12.5%',
    up: true,
  },
  daysSinceLTI: {
    value: 47,
    label: 'Days since last LTI',
    sub: 'Last: 14/05/26 · Wolverhampton',
    spark: null,
    delta: 'Best: 89 days',
  },
};

export const INCIDENTS: Incident[] = [
  { id: 'INC-2418', title: 'Reversing manoeuvre near miss — Bay 4',         cat: 'NearMiss', site: 'Birmingham',    reporter: 'Harrison Stanford', time: '12 min ago',   sev: 'High',   status: 'Open' },
  { id: 'INC-2417', title: 'Diesel spill on apron — Bay 7 ramp',            cat: 'HSSE',     site: 'Wolverhampton', reporter: 'Sara Okafor',       time: '38 min ago',   sev: 'High',   status: 'Investigating' },
  { id: 'INC-2416', title: 'PPE non-compliance — driver briefing area',     cat: 'NearMiss', site: 'Leeds',         reporter: 'Tom Whelan',        time: '1 hour ago',   sev: 'Medium', status: 'Open' },
  { id: 'INC-2415', title: 'Forklift contact with stacked pallets',         cat: 'Incident', site: 'Bristol',       reporter: 'Priya Shah',        time: '2 hours ago',  sev: 'High',   status: 'Awaiting Sign-off' },
  { id: 'INC-2414', title: 'Trapped finger during trailer coupling',        cat: 'HSSE',     site: 'Glasgow',       reporter: 'Callum Ross',       time: '3 hours ago',  sev: 'High',   status: 'Open' },
  { id: 'INC-2413', title: 'Speeding flagged by telematics — A38 corridor', cat: 'Other',    site: 'Birmingham',    reporter: 'Mariam Hussain',    time: '4 hours ago',  sev: 'Low',    status: 'Closed' },
  { id: 'INC-2412', title: 'Driver fatigue concern raised by supervisor',   cat: 'HSSE',     site: 'Wolverhampton', reporter: 'Adeola Adebayo',    time: '5 hours ago',  sev: 'Medium', status: 'Investigating' },
  { id: 'INC-2411', title: 'Unsecured load identified at gatehouse',        cat: 'NearMiss', site: 'Leeds',         reporter: 'Joel Pickering',    time: '6 hours ago',  sev: 'Medium', status: 'Awaiting Sign-off' },
  { id: 'INC-2410', title: 'Spill kit deployed — minor coolant leak',       cat: 'Other',    site: 'Glasgow',       reporter: 'Ines Marchetti',    time: '8 hours ago',  sev: 'Low',    status: 'Closed' },
  { id: 'INC-2409', title: 'Reversing camera failure — Truck WX72 GHJ',     cat: 'Incident', site: 'Bristol',       reporter: 'Daniel Egwu',       time: '11 hours ago', sev: 'Medium', status: 'Closed' },
];

export const SITES: SiteData[] = [
  { name: 'Wolverhampton', stacks: { HSSE: 3, NearMiss: 2, Incident: 2, Other: 1 } },
  { name: 'Birmingham',    stacks: { HSSE: 2, NearMiss: 2, Incident: 1, Other: 1 } },
  { name: 'Bristol',       stacks: { HSSE: 1, NearMiss: 1, Incident: 2, Other: 1 } },
  { name: 'Leeds',         stacks: { HSSE: 1, NearMiss: 2, Incident: 1, Other: 0 } },
  { name: 'Glasgow',       stacks: { HSSE: 1, NearMiss: 1, Incident: 0, Other: 1 } },
];

export const TREND_12W: Record<CategoryKey, number[]> = {
  HSSE:     [4, 3, 5, 6, 4, 5, 3, 4, 6, 5, 6, 7],
  NearMiss: [6, 5, 7, 8, 6, 7, 9, 8, 7, 9, 8, 9],
  Incident: [2, 3, 2, 4, 3, 2, 3, 4, 3, 2, 3, 4],
  Other:    [1, 2, 1, 2, 3, 2, 1, 2, 2, 1, 2, 2],
};

export const TREND_ANNOTATIONS: TrendAnnotation[] = [
  { week: 3,  label: 'LTI — Wolverhampton' },
  { week: 7,  label: 'Forklift collision — Bristol' },
  { week: 11, label: 'Diesel spill — Wolverhampton' },
];

export const CATEGORY_30D: CategoryStat[] = [
  { key: 'HSSE',     count: 12, delta: 3  },
  { key: 'NearMiss', count: 18, delta: 5  },
  { key: 'Incident', count: 7,  delta: -2 },
  { key: 'Other',    count: 4,  delta: -1 },
];
