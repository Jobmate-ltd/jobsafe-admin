// JobSafe Admin Dashboard — main component composition
const { useState, useMemo, useEffect, useRef } = React;

// ---------- icons (inline 1.5 stroke, Lucide-style) ----------
const Icon = ({ d, size = 16, stroke = 'currentColor', fill = 'none', strokeWidth = 1.6, children }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth}
strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {children || <path d={d} />}
  </svg>;

const IHome = (p) => <Icon {...p}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></Icon>;
const IList = (p) => <Icon {...p}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><circle cx="4" cy="6" r="1.5" /><circle cx="4" cy="12" r="1.5" /><circle cx="4" cy="18" r="1.5" /></Icon>;
const IUsers = (p) => <Icon {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Icon>;
const ITruck = (p) => <Icon {...p}><rect x="1" y="6" width="13" height="11" rx="1" /><path d="M14 9h4l3 3v5h-7" /><circle cx="6" cy="19" r="2" /><circle cx="17" cy="19" r="2" /></Icon>;
const IMap = (p) => <Icon {...p}><path d="M1 6l7-3 8 3 7-3v15l-7 3-8-3-7 3z" /><line x1="8" y1="3" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="21" /></Icon>;
const IDoc = (p) => <Icon {...p}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="14 3 14 9 20 9" /></Icon>;
const ISettings = (p) => <Icon {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.36.13.68.37.92.69.24.32.4.7.46 1.1.06.4.04.81-.08 1.2" /></Icon>;
const ISiren = (p) => <Icon {...p}><path d="M7 18v-6a5 5 0 0 1 10 0v6" /><rect x="4" y="18" width="16" height="3" rx="1" /><path d="M12 4V2" /><path d="M4 8L2.5 7" /><path d="M20 8l1.5-1" /></Icon>;
const IBell = (p) => <Icon {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></Icon>;
const ISearch = (p) => <Icon {...p}><circle cx="11" cy="11" r="7" /><line x1="20" y1="20" x2="16.65" y2="16.65" /></Icon>;
const ICalendar = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></Icon>;
const IChevDown = (p) => <Icon {...p}><polyline points="6 9 12 15 18 9" /></Icon>;
const IArrowUp = (p) => <Icon {...p}><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></Icon>;
const IArrowDown = (p) => <Icon {...p}><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></Icon>;
const IArrowRt = (p) => <Icon {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Icon>;
const ICheck = (p) => <Icon {...p}><polyline points="20 6 9 17 4 12" /></Icon>;
const IPin = (p) => <Icon {...p}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></Icon>;
const IClock = (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></Icon>;
const IMore = (p) => <Icon {...p}><circle cx="12" cy="12" r="1" /><circle cx="5" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></Icon>;
const IFilter = (p) => <Icon {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></Icon>;
const IDownload = (p) => <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></Icon>;
const IExpand = (p) => <Icon {...p}><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></Icon>;
const IPlus = (p) => <Icon {...p}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Icon>;

// =========================================================================
//   SIDEBAR
// =========================================================================
const Sidebar = ({ collapsed }) => {
  const items = [
  { key: 'home', label: 'Dashboard', icon: IHome, active: true },
  { key: 'reports', label: 'Reports', icon: IList, badge: 18 },
  { key: 'actions', label: 'Actions', icon: ICheck, badge: 3, badgeColor: '#F59E0B' },
  { key: 'sites', label: 'Sites & depots', icon: IMap },
  { key: 'fleet', label: 'Fleet', icon: ITruck },
  { key: 'people', label: 'People', icon: IUsers },
  { key: 'docs', label: 'Documents', icon: IDoc }];

  const bottom = [
  { key: 'sos', label: 'SOS', icon: ISiren, sos: true },
  { key: 'settings', label: 'Settings', icon: ISettings }];

  return (
    <aside className={`js-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="js-sidebar-brand">
        <img src={(window.__resources && window.__resources.logo) || "assets/jobsafe-logo-light.png"} alt="JobSafe" className="js-sidebar-logo" />
        {!collapsed && <div className="js-sidebar-org">
          <div className="js-sidebar-org-name">North Star Logistics</div>
          <div className="js-sidebar-org-role">HSSE manager</div>
        </div>}
      </div>
      <nav className="js-sidebar-nav">
        {items.map((it) =>
        <a key={it.key} className={`js-nav-item ${it.active ? 'active' : ''}`} href="#" title={collapsed ? it.label : undefined}>
            <it.icon size={18} />
            {!collapsed && <span className="js-nav-label">{it.label}</span>}
            {!collapsed && it.badge != null &&
          <span className="js-nav-badge" style={{ background: it.badgeColor || '#0A0A0A' }}>{it.badge}</span>
          }
          </a>
        )}
      </nav>
      <div className="js-sidebar-spacer" />
      <nav className="js-sidebar-nav">
        {bottom.map((it) =>
        <a key={it.key} className={`js-nav-item ${it.sos ? 'sos' : ''}`} href="#" title={collapsed ? it.label : undefined}>
            <it.icon size={18} />
            {!collapsed && <span className="js-nav-label">{it.label}</span>}
          </a>
        )}
      </nav>
    </aside>);

};

// =========================================================================
//   TOP HEADER STRIP
// =========================================================================
const Header = ({ dateRange, setDateRange, site, setSite, onToggleSidebar }) => {
  const ranges = ['Today', 'This week', 'This month', 'Custom'];
  const sites = ['All sites', 'Wolverhampton', 'Birmingham', 'Bristol', 'Leeds', 'Glasgow'];
  return (
    <header className="js-topbar">
      <div className="js-topbar-left">
        <button className="js-iconbtn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <Icon size={18}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></Icon>
        </button>
        <h1 className="js-page-title">Dashboard</h1>
        <span className="js-breadcrumb">/ Operations · UK</span>
      </div>
      <div className="js-topbar-right">
        <div className="js-segment" role="tablist" aria-label="Date range">
          {ranges.map((r) =>
          <button key={r}
          role="tab"
          aria-selected={dateRange === r}
          className={`js-segment-btn ${dateRange === r ? 'active' : ''}`}
          onClick={() => setDateRange(r)}>{r}</button>
          )}
        </div>
        <button className="js-pillbtn">
          <IPin size={14} />
          <span>{site}</span>
          <IChevDown size={14} />
        </button>
        <div className="js-status-chip" title="All systems operational">
          <span className="js-status-dot" />
          <span>All systems operational</span>
          <span className="js-status-sync">· synced 08:41</span>
        </div>
        <button className="js-iconbtn" aria-label="Notifications">
          <IBell size={18} />
          <span className="js-bell-dot" />
        </button>
        <div className="js-avatar" aria-label="Chris Mowbray">CM</div>
      </div>
    </header>);

};

// =========================================================================
//   KPI CARDS
// =========================================================================
const KpiCard = ({ accent, eyebrow, value, sub, delta, deltaDir, spark, sparkColor, emptyState, deltaIcon }) => {
  if (emptyState) {
    return (
      <div className="js-kpi" style={{ borderLeftColor: '#22C55E' }}>
        <div className="js-kpi-eyebrow">{eyebrow}</div>
        <div className="js-kpi-empty">
          <div className="js-kpi-empty-icon"><ICheck size={18} stroke="#15803D" /></div>
          <div>
            <div className="js-kpi-empty-title">Nothing overdue</div>
            <div className="js-kpi-empty-sub">Nice work, team</div>
          </div>
        </div>
      </div>);

  }
  return (
    <div className="js-kpi" style={{ borderLeftColor: accent }}>
      <div className="js-kpi-head">
        <div className="js-kpi-eyebrow">{eyebrow}</div>
        <button className="js-kpi-more" aria-label="More"><IMore size={14} /></button>
      </div>
      <div className="js-kpi-row">
        <div>
          <div className="js-kpi-value">{value}</div>
          <div className="js-kpi-sub">{sub}</div>
        </div>
        {spark && <Sparkline data={spark} color={sparkColor || accent} width={108} height={36} />}
      </div>
      {delta &&
      <div className={`js-kpi-delta ${deltaDir || ''}`}>
          {deltaDir === 'up' && <IArrowUp size={12} />}
          {deltaDir === 'down' && <IArrowDown size={12} />}
          {deltaDir === 'flat' && <IArrowRt size={12} />}
          <span>{delta}</span>
        </div>
      }
    </div>);

};

const KpiRow = ({ kpiState }) => {
  return (
    <div className="js-kpi-row-grid">
      <KpiCard
        accent="#E63946"
        eyebrow="Open · high-severity"
        value={KPI.openHighSeverity.value}
        sub={KPI.openHighSeverity.sub}
        delta={KPI.openHighSeverity.delta}
        deltaDir="up"
        spark={KPI.openHighSeverity.spark}
        sparkColor="#E63946" />
      
      {kpiState === 'empty' ?
      <KpiCard eyebrow="Overdue actions" emptyState /> :

      <KpiCard
        accent="#F59E0B"
        eyebrow="Overdue actions"
        value={KPI.overdueActions.value}
        sub={KPI.overdueActions.sub}
        delta={KPI.overdueActions.delta}
        deltaDir="flat"
        spark={KPI.overdueActions.spark}
        sparkColor="#F59E0B" />

      }
      <KpiCard
        accent="#0A0A0A"
        eyebrow="Incidents this week"
        value={KPI.thisWeek.value}
        sub={KPI.thisWeek.sub}
        delta={KPI.thisWeek.delta + ' vs last week'}
        deltaDir="up"
        spark={KPI.thisWeek.spark}
        sparkColor="#0A0A0A" />
      
      <KpiCard
        accent="#22C55E"
        eyebrow="Days since last LTI"
        value={KPI.daysSinceLTI.value}
        sub={KPI.daysSinceLTI.sub}
        delta={KPI.daysSinceLTI.delta}
        deltaDir="flat"
        spark={null} />
      
    </div>);

};

// =========================================================================
//   LIVE INCIDENT FEED
// =========================================================================
const CategoryTag = ({ catKey }) => {
  const c = CATEGORIES[catKey];
  const isYellow = catKey === 'NearMiss';
  return (
    <span className="js-cat-tag" style={{
      background: c.color,
      color: isYellow ? '#0A0A0A' : '#FFFFFF'
    }}>{c.label}</span>);

};

const SeverityPill = ({ sev }) => {
  const s = SEVERITY[sev];
  return <span className="js-sev-pill" style={{ color: s.color, background: s.bg }}>{s.label}</span>;
};

const StatusPill = ({ status }) => {
  const s = STATUS[status];
  return (
    <span className="js-status-pill" style={{ color: s.color, background: s.bg, boxShadow: `inset 0 0 0 1px ${s.ring}` }}>
      <span className="js-status-pill-dot" style={{ background: s.color }} />
      {status}
    </span>);

};

const IncidentRow = ({ inc }) => {
  const cat = CATEGORIES[inc.cat];
  // 4% tint of category color as the row background hint
  const tint = {
    HSSE: 'rgba(230,57,70,0.035)',
    NearMiss: 'rgba(245,158,11,0.045)',
    Incident: 'rgba(10,10,10,0.025)',
    Other: 'rgba(34,197,94,0.035)'
  }[inc.cat];
  return (
    <div className="js-feed-row" style={{ background: tint }}>
      <div className="js-feed-stripe" style={{ background: cat.color }} />
      <div className="js-feed-tag-col">
        <CategoryTag catKey={inc.cat} />
      </div>
      <div className="js-feed-main">
        <div className="js-feed-title-line">
          <span className="js-feed-id">{inc.id}</span>
          <span className="js-feed-dot">·</span>
          <a className="js-feed-title" href="#">{inc.title}</a>
        </div>
        <div className="js-feed-meta">
          <span>{inc.reporter}</span>
          <span className="js-feed-meta-sep">·</span>
          <span><IPin size={11} /> {inc.site}</span>
          <span className="js-feed-meta-sep">·</span>
          <span><IClock size={11} /> {inc.time}</span>
        </div>
      </div>
      <div className="js-feed-tail">
        <SeverityPill sev={inc.sev} />
        <StatusPill status={inc.status} />
        <div className="js-feed-actions">
          <button className="js-mini-btn">Assign</button>
          <button className="js-mini-btn">View</button>
          <button className="js-mini-btn primary">Review</button>
        </div>
      </div>
    </div>);

};

const LiveFeed = () => {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const filters = ['All', 'HSSE', 'Near Miss', 'Incident', 'Other'];
  const filtered = INCIDENTS.filter((i) => {
    if (filter !== 'All') {
      const k = filter === 'Near Miss' ? 'NearMiss' : filter;
      if (i.cat !== k) return false;
    }
    if (query) {
      const q = query.toLowerCase();
      if (!(i.title.toLowerCase().includes(q) || i.site.toLowerCase().includes(q) || i.reporter.toLowerCase().includes(q) || i.id.toLowerCase().includes(q))) return false;
    }
    return true;
  });
  return (
    <section className="js-card js-feed-card">
      <div className="js-card-head">
        <div>
          <h2 className="js-card-title">Live incident feed</h2>
          <div className="js-card-sub">{filtered.length} of {INCIDENTS.length} reports · newest first</div>
        </div>
        <div className="js-card-tools">
          <div className="js-search">
            <ISearch size={14} stroke="#9CA3AF" />
            <input placeholder="Search reports, sites, reporters…"
            value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <button className="js-ghost-btn"><IDownload size={14} />Export</button>
        </div>
      </div>
      <div className="js-feed-filters">
        {filters.map((f) =>
        <button key={f}
        className={`js-chip ${filter === f ? 'active' : ''}`}
        onClick={() => setFilter(f)}>
            {f !== 'All' &&
          <span className="js-chip-dot" style={{ ...{
              background: f === 'HSSE' ? '#E63946' :
              f === 'Near Miss' ? '#F59E0B' :
              f === 'Incident' ? '#0A0A0A' : '#22C55E'
            }, background: "rgb(63, 18, 255)" }} />
          }
            {f}
            <span className="js-chip-count">
              {f === 'All' ? INCIDENTS.length : INCIDENTS.filter((i) => f === 'Near Miss' ? i.cat === 'NearMiss' : i.cat === f).length}
            </span>
          </button>
        )}
      </div>
      <div className="js-feed-rows">
        {filtered.length === 0 ?
        <div className="js-feed-empty">No reports match those filters.</div> :
        filtered.map((i) => <IncidentRow key={i.id} inc={i} />)}
      </div>
      <div className="js-card-foot">
        <a className="js-link" href="#">View all reports <IArrowRt size={12} /></a>
      </div>
    </section>);

};

// =========================================================================
//   CATEGORY DONUT CARD
// =========================================================================
const CategoryCard = () => {
  const [range, setRange] = useState('30d');
  const donutData = CATEGORY_30D.map((c) => ({
    key: c.key, count: c.count, color: CATEGORIES[c.key].color
  }));
  return (
    <section className="js-card">
      <div className="js-card-head">
        <div>
          <h2 className="js-card-title">Reports by category</h2>
          <div className="js-card-sub">Last 30 days vs previous period</div>
        </div>
        <div className="js-segment small">
          {['30d', '90d', 'YTD'].map((r) =>
          <button key={r} className={`js-segment-btn ${range === r ? 'active' : ''}`} onClick={() => setRange(r)}>{r}</button>
          )}
        </div>
      </div>
      <div className="js-cat-body">
        <Donut data={donutData} />
        <ul className="js-cat-legend">
          {CATEGORY_30D.map((c) => {
            const dir = c.delta > 0 ? 'up' : c.delta < 0 ? 'down' : 'flat';
            const dirOk = c.key === 'Other' ? c.delta <= 0 : c.delta <= 0; // fewer is generally good
            return (
              <li key={c.key}>
                <span className="js-cat-legend-dot" style={{ background: CATEGORIES[c.key].color }} />
                <span className="js-cat-legend-label">{CATEGORIES[c.key].label}</span>
                <span className="js-cat-legend-count">{c.count}</span>
                <span className={`js-cat-legend-delta ${dirOk ? 'good' : 'bad'}`}>
                  {dir === 'up' && <IArrowUp size={11} />}
                  {dir === 'down' && <IArrowDown size={11} />}
                  {dir === 'flat' && <IArrowRt size={11} />}
                  {Math.abs(c.delta)}
                </span>
              </li>);

          })}
        </ul>
      </div>
    </section>);

};

// =========================================================================
//   HOTSPOT / SITE BREAKDOWN CARD
// =========================================================================
const SiteCard = () => {
  const max = Math.max(...SITES.map((s) => Object.values(s.stacks).reduce((a, b) => a + b, 0)));
  return (
    <section className="js-card">
      <div className="js-card-head">
        <div>
          <h2 className="js-card-title">Hotspots by site</h2>
          <div className="js-card-sub">Last 30 days · click a site to drill in</div>
        </div>
        <button className="js-ghost-btn"><IMap size={14} />Map</button>
      </div>
      <div className="js-site-list">
        {SITES.map((s) => {
          const total = Object.values(s.stacks).reduce((a, b) => a + b, 0);
          return (
            <button key={s.name} className="js-site-row">
              <div className="js-site-row-head">
                <span className="js-site-name"><IPin size={11} stroke="#9CA3AF" />{s.name}</span>
                <span className="js-site-count">{total}</span>
              </div>
              <StackedBar stacks={s.stacks} total={total} max={max} categories={CATEGORIES} />
              <div className="js-site-breakdown">
                {['HSSE', 'NearMiss', 'Incident', 'Other'].map((k) => s.stacks[k] ?
                <span key={k} className="js-site-mini">
                    <span className="js-site-mini-dot" style={{ background: CATEGORIES[k].color }} />
                    {s.stacks[k]}
                  </span> :
                null)}
              </div>
            </button>);

        })}
      </div>
    </section>);

};

// =========================================================================
//   12-WEEK TREND CARD
// =========================================================================
const TrendCard = () => {
  const [view, setView] = useState('Weekly');
  const [keys, setKeys] = useState({ HSSE: true, NearMiss: true, Incident: true, Other: true });
  return (
    <section className="js-card">
      <div className="js-card-head">
        <div>
          <h2 className="js-card-title">Incidents over time</h2>
          <div className="js-card-sub">Last 12 weeks · by category · annotations mark high-severity events</div>
        </div>
        <div className="js-card-tools">
          <div className="js-segment small">
            {['Weekly', 'Monthly'].map((v) =>
            <button key={v} className={`js-segment-btn ${view === v ? 'active' : ''}`} onClick={() => setView(v)}>{v}</button>
            )}
          </div>
          <button className="js-ghost-btn"><IExpand size={14} />Expand</button>
        </div>
      </div>
      <div className="js-trend-legend">
        {['HSSE', 'NearMiss', 'Incident', 'Other'].map((k) =>
        <button key={k} className={`js-trend-key ${keys[k] ? '' : 'off'}`}
        onClick={() => setKeys({ ...keys, [k]: !keys[k] })}>
            <span className="js-trend-key-line" style={{
            background: CATEGORIES[k].color,
            opacity: keys[k] ? 1 : 0.25
          }} />
            <span>{CATEGORIES[k].label}</span>
            <span className="js-trend-key-total">{TREND_12W[k].reduce((a, b) => a + b, 0)}</span>
          </button>
        )}
        <div className="js-trend-legend-spacer" />
        <span className="js-trend-annot-key"><span className="js-trend-annot-dot" />High-severity event</span>
      </div>
      <div className="js-trend-chart-wrap">
        <TrendChart data={TREND_12W} annotations={TREND_ANNOTATIONS} activeKeys={keys} categories={CATEGORIES} />
      </div>
    </section>);

};

// =========================================================================
//   APP ROOT
// =========================================================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "comfortable",
  "accentBars": true,
  "kpiState": "default",
  "showAnnotations": true,
  "sidebarCollapsed": false
} /*EDITMODE-END*/;

const App = () => {
  const [t, setTweak] = typeof useTweaks !== 'undefined' ?
  useTweaks(TWEAK_DEFAULTS) :
  [TWEAK_DEFAULTS, () => {}];
  const [dateRange, setDateRange] = useState('This week');
  const [site, setSite] = useState('All sites');
  const [collapsed, setCollapsed] = useState(t.sidebarCollapsed);

  useEffect(() => {setCollapsed(t.sidebarCollapsed);}, [t.sidebarCollapsed]);

  return (
    <div className={`js-app density-${t.density} ${t.accentBars ? '' : 'no-accent'}`}>
      <Sidebar collapsed={collapsed} />
      <div className="js-main">
        <Header
          dateRange={dateRange} setDateRange={setDateRange}
          site={site} setSite={setSite}
          onToggleSidebar={() => setCollapsed((c) => !c)} />
        
        <div className="js-content">
          <KpiRow kpiState={t.kpiState} />
          <div className="js-mid-grid">
            <LiveFeed />
            <div className="js-side-stack">
              <CategoryCard />
              <SiteCard />
            </div>
          </div>
          <TrendCard />
          <footer className="js-pagefoot">
            <span>JobSafe · v2.4.1</span>
            <span className="js-pagefoot-sep">·</span>
            <span>UK region · AWS eu-west-2</span>
            <span className="js-pagefoot-sep">·</span>
            <span>Data refresh: 30s</span>
          </footer>
        </div>
      </div>

      {typeof TweaksPanel !== 'undefined' &&
      <TweaksPanel title="Tweaks">
          <TweakSection label="Layout">
            <TweakRadio label="Density" value={t.density}
          options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]}
          onChange={(v) => setTweak('density', v)} />
            <TweakToggle label="Sidebar collapsed" value={t.sidebarCollapsed}
          onChange={(v) => setTweak('sidebarCollapsed', v)} />
            <TweakToggle label="Coloured accent bars" value={t.accentBars}
          onChange={(v) => setTweak('accentBars', v)} />
          </TweakSection>
          <TweakSection label="Data states">
            <TweakRadio label="Overdue KPI" value={t.kpiState}
          options={[{ value: 'default', label: 'With items' }, { value: 'empty', label: 'Empty state' }]}
          onChange={(v) => setTweak('kpiState', v)} />
            <TweakToggle label="Trend annotations" value={t.showAnnotations}
          onChange={(v) => setTweak('showAnnotations', v)} />
          </TweakSection>
        </TweaksPanel>
      }
    </div>);

};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);