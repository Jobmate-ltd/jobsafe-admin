// JobSafe Admin Dashboard — small SVG charts
// Sparkline, donut, stacked bars, multi-line trend chart.

const Sparkline = ({ data, color = '#E63946', width = 96, height = 28, fill = true }) => {
  if (!data || !data.length) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const pts = data.map((v, i) => [i * stepX, height - 4 - ((v - min) / range) * (height - 8)]);
  const line = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const area = `${line} L${width},${height} L0,${height} Z`;
  const gid = `spark-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {fill && (
        <>
          <defs>
            <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.18" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#${gid})`} />
        </>
      )}
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.5" fill={color} />
    </svg>
  );
};

const Donut = ({ data, size = 168, thickness = 22 }) => {
  // data: [{ key, count, color }]
  const total = data.reduce((s, d) => s + d.count, 0);
  const r = size / 2 - thickness / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F3F4F6" strokeWidth={thickness} />
      {data.map((d, i) => {
        const frac = d.count / total;
        const dash = c * frac;
        const offset = -acc;
        const el = (
          <circle key={d.key}
            cx={size/2} cy={size/2} r={r}
            fill="none" stroke={d.color} strokeWidth={thickness}
            strokeDasharray={`${dash} ${c - dash}`}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size/2} ${size/2})`}
            strokeLinecap="butt"
          />
        );
        acc += dash + 2; // small gap
        return el;
      })}
      <text x={size/2} y={size/2 - 2} textAnchor="middle" style={{
        fontFamily: 'Manrope', fontWeight: 800, fontSize: 28, fill: '#0A0A0A', letterSpacing: '-0.02em'
      }}>{total}</text>
      <text x={size/2} y={size/2 + 16} textAnchor="middle" style={{
        fontFamily: 'Manrope', fontWeight: 500, fontSize: 11, fill: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase'
      }}>reports</text>
    </svg>
  );
};

const StackedBar = ({ stacks, total, max, categories, onHover }) => {
  // Renders a single horizontal stacked bar segment array. Total = sum of stacks.
  const order = ['HSSE', 'NearMiss', 'Incident', 'Other'];
  return (
    <div style={{ display: 'flex', height: 10, borderRadius: 4, overflow: 'hidden', background: '#F3F4F6', width: `${(total/max)*100}%`, minWidth: 8 }}>
      {order.map(k => {
        const v = stacks[k] || 0;
        if (!v) return null;
        return (
          <div key={k}
            onMouseEnter={() => onHover && onHover(k)}
            onMouseLeave={() => onHover && onHover(null)}
            style={{ background: categories[k].color, width: `${(v/total)*100}%`, transition: 'opacity 150ms' }} />
        );
      })}
    </div>
  );
};

// 12-week multi-line trend chart with annotation pins
const TrendChart = ({ data, annotations, width = 1280, height = 240, padding = { l: 44, r: 24, t: 24, b: 32 }, activeKeys, categories }) => {
  const order = ['HSSE', 'NearMiss', 'Incident', 'Other'];
  const W = width, H = height;
  const PL = padding.l, PR = padding.r, PT = padding.t, PB = padding.b;
  const innerW = W - PL - PR;
  const innerH = H - PT - PB;

  const weeks = data.HSSE.length;
  const allValues = order.flatMap(k => data[k]);
  const maxY = Math.max(...allValues);
  const niceMax = Math.ceil(maxY / 2) * 2 + 2;

  const xFor = i => PL + (innerW * i) / (weeks - 1);
  const yFor = v => PT + innerH - (v / niceMax) * innerH;

  // gridlines (4 horizontal)
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(t => PT + innerH * (1 - t));

  // 12-week labels - show w-12 .. w-1 (most recent = this week)
  const xLabels = Array.from({ length: weeks }, (_, i) => `W${i - weeks + 1 === 0 ? '' : i - weeks + 1}`)
    .map((_, i) => (i === weeks - 1 ? 'This wk' : `${weeks - 1 - i}w ago`));

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      {/* gridlines */}
      {gridLines.map((y, i) => (
        <line key={i} x1={PL} x2={W - PR} y1={y} y2={y} stroke="#F3F4F6" strokeWidth="1" />
      ))}
      {/* Y axis labels */}
      {[0, 0.5, 1].map((t, i) => {
        const v = Math.round(niceMax * t);
        return (
          <text key={i} x={PL - 10} y={PT + innerH * (1 - t) + 4} textAnchor="end"
            style={{ fontFamily: 'Manrope', fontWeight: 500, fontSize: 10, fill: '#9CA3AF' }}>{v}</text>
        );
      })}
      {/* X axis labels — every 3 weeks */}
      {Array.from({ length: weeks }).map((_, i) => {
        if (i % 2 !== 0 && i !== weeks - 1) return null;
        return (
          <text key={i} x={xFor(i)} y={H - 10} textAnchor="middle"
            style={{ fontFamily: 'Manrope', fontWeight: 500, fontSize: 10, fill: '#9CA3AF' }}>
            {i === weeks - 1 ? 'This week' : `${weeks - 1 - i}w`}
          </text>
        );
      })}

      {/* category lines */}
      {order.map(k => {
        if (!activeKeys[k]) return null;
        const points = data[k].map((v, i) => `${xFor(i)},${yFor(v)}`).join(' ');
        const color = categories[k].color;
        const isIncident = k === 'Incident';
        return (
          <g key={k}>
            <polyline points={points} fill="none" stroke={color}
              strokeWidth={k === 'HSSE' ? 2 : 1.75}
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray={isIncident ? '4 3' : '0'} />
            {data[k].map((v, i) => (
              <circle key={i} cx={xFor(i)} cy={yFor(v)} r={i === weeks - 1 ? 3 : 0} fill={color} />
            ))}
          </g>
        );
      })}

      {/* annotations - small red dots above the trend with hover labels */}
      {annotations.map((a, i) => {
        const y = yFor(data.HSSE[a.week]) - 14;
        return (
          <g key={i} className="annot">
            <line x1={xFor(a.week)} x2={xFor(a.week)} y1={yFor(data.HSSE[a.week])} y2={y + 4}
              stroke="#E63946" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
            <circle cx={xFor(a.week)} cy={y} r="4" fill="#FFFFFF" stroke="#E63946" strokeWidth="1.5" />
            <circle cx={xFor(a.week)} cy={y} r="1.5" fill="#E63946" />
            <title>{a.label}</title>
          </g>
        );
      })}
    </svg>
  );
};

Object.assign(window, { Sparkline, Donut, StackedBar, TrendChart });
