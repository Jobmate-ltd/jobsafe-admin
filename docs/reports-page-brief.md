# JobSafe — Reports page brief (for Claude Design)

> Paste this into a Claude Design session attached with the JobSafe design system.
> Build two linked screens: **Reports list** and **Report detail**. Click-through must work end-to-end in the prototype.

---

## Context

You are designing the **Reports** surface for JobSafe — a standalone HSSE (Health, Safety, Security, Environment) incident reporting app for UK transport and logistics operators. The dashboard you've already built (`JobSafe Admin Dashboard.html`) is the manager's home screen. The Reports page is where they actually do the work: triage what came in, drill into a single report, investigate it, sign it off.

Brand and design system are already loaded — JobSafe Design System, white-canvas admin variant. Use the same palette, typography, spacing, and component primitives as the dashboard. Red `#E63946`, yellow for Near Miss, black for Incident, green for Other / safe states, Manrope throughout. Tight 8 px / 6 px / 4 px radii. 1 px `#E5E7EB` borders. Restrained shadows.

**JobSafe does not include checklists. Do not introduce checklist UI under any pretext.**

---

## What an HSSE manager needs to answer on this page

Grounded in real UK HSE practice (RIDDOR notification, ICAM root cause analysis, weekly trend review). Every component on these screens should earn its place against one of these:

1. **What came in, and what needs me first?** Newest reports, sorted by severity and overdue actions. Open > Investigating > Awaiting sign-off > Closed.
2. **Is this report RIDDOR-reportable, and has it been notified?** Under UK RIDDOR, deaths, specified injuries, over-7-day injuries, certain occupational diseases, and Schedule 2 dangerous occurrences must be reported to HSE — by quickest practical means, with written notification within 10 days. The manager needs an unambiguous flag and countdown.
3. **What's the full story of this incident?** Who, where, when, what happened, what was the immediate cause, who's been hurt or affected, what photos / witness statements exist.
4. **Have I seen this before?** Same vehicle, same site, same shift pattern, same hazard category. Pattern detection across the last 4–12 weeks is where systemic causes surface.
5. **What's the investigation status?** ICAM four-level analysis (task / environmental conditions → individual factors → job factors → organisational factors), assigned investigator, current findings, open corrective actions, deadlines.
6. **Who did what, when?** Full audit trail — reported by, reviewed by, assigned by, sign-off by — with timestamps. Regulatory requirement, also defensive in case of HSE inspection.
7. **Can I action it?** Assign, comment, request more info, close, mark RIDDOR-notified, export PDF, share securely.

Anything that doesn't serve one of those questions is decoration and should be cut.

---

## Screen 1 — Reports list (`/reports`)

Full-width admin layout. Same sidebar and topbar as the dashboard (sidebar item "Reports" now active). Replace the dashboard's KPI row with a tighter context strip, then the table.

### 1.1 Context strip — top, full width

A single horizontal row, height ~64 px, no card chrome, divided into four cells by faint vertical lines:

- **Total reports** in current filter — large number, label below
- **Open + Investigating** — number, red if > 0, "needs action" sublabel
- **Awaiting sign-off** — number, blue accent if > 0, "pending your approval" sublabel  
- **RIDDOR notification due** — number with countdown — e.g. "1 — 2 days left" — red if any overdue. This is the regulatory tripwire. Treat it like a deadline alarm.

### 1.2 Filter and toolbar — sticky bar above the table

Left side, in order:
- **Search** — full-text across IDs, titles, reporters, sites, vehicle regs. Placeholder "Search reports, sites, reporters, vehicle reg…"
- **Filter chips** with counts:
  - Status: All · Open · Investigating · Awaiting sign-off · Closed
  - Category: HSSE · Near Miss · Incident · Other  
  - Severity: High · Medium · Low
  - RIDDOR: Reportable · Notified · Not reportable
- **Date range** — segmented "Today · This week · This month · YTD · Custom"
- **Site** — multi-select dropdown of depots (Wolverhampton, Birmingham, Bristol, Leeds, Glasgow)
- **Assigned to** — "Anyone · Me · Unassigned · pick person"

Right side:
- **Saved views** dropdown — "My open · Awaiting my sign-off · RIDDOR pending · This week's high-severity"
- **Export** — CSV / PDF
- **+ New report** — primary button (red, JobSafe red)

Active filters render as removable pills below the toolbar. Visible filter state matters — managers need to know exactly what they're looking at.

### 1.3 Reports table — dense, scannable

Columns (left to right):
1. **Category stripe** — 4 px coloured left edge of the row (red/yellow/black/green)
2. **ID** — JetBrains Mono, e.g. `INC-2418`
3. **Title** — bold, truncates with ellipsis on overflow
4. **Site** — text with small pin icon
5. **Reporter** — name + tiny avatar
6. **Reported** — relative time, e.g. "12 min ago", absolute on hover
7. **Severity** — pill (High red / Medium amber / Low green)
8. **Status** — pill (Open red / Investigating amber / Awaiting sign-off blue / Closed green)
9. **RIDDOR** — small icon — red exclamation if reportable & not yet notified, grey check if notified, blank otherwise. Tooltip on hover with deadline.
10. **Assigned** — avatar of investigator, or "—" / "Assign" link if unassigned
11. **Actions** — kebab menu (three dots) revealing Assign / Mark reviewed / Notify RIDDOR / Archive / Export PDF

Row interactions:
- Hover lifts row with `#FAFBFC` tint and shows a subtle right-edge chevron hinting at click-through.
- **Whole row clickable** → opens the report detail.
- Multi-select with checkbox column when "Select all" is pressed in the header (off by default). Bulk actions appear in a sticky bottom bar: Assign · Export · Mark reviewed · Close.

Row density: comfortable default (~52 px), compact toggle in toolbar (~40 px).

Pagination: server-style "Showing 1–25 of 137 · ‹ 1 2 3 … 6 ›" at the bottom. 25 / 50 / 100 per page picker.

Empty filter state: "No reports match those filters." with a "Clear filters" link. Don't show illustrations.

---

## Screen 2 — Report detail (`/reports/:id`)

Click-through destination. Full-width layout, same sidebar, but the topbar now shows a back chevron, breadcrumb `Reports / INC-2418`, the report ID in mono, and two right-aligned actions: **Export PDF** (ghost) and **Mark closed** (primary red).

### 2.1 Header block — full width, no card

- Category tag pill (HSSE / Near Miss / Incident / Other)
- Report title in `h1` weight, e.g. "Reversing manoeuvre near miss — Bay 4"
- Metadata row in 13 px secondary text: `INC-2418 · Birmingham depot · 12 minutes ago · Reported by Harrison Stanford`
- Right side of header: status pill, severity pill, RIDDOR badge with deadline (`"RIDDOR · notify within 9 days"` or `"RIDDOR · notified 03/06/26"`)

Below the title, a thin row of quick-action buttons: **Assign investigator · Add comment · Request more info · Notify RIDDOR · Export PDF · Share**.

### 2.2 Body — two-column layout

**Left column (~62%)** — the incident itself, top to bottom:

1. **What happened** — the narrative as submitted. 4–8 lines of body text. Markdown-formatted (paragraphs, lists are fine if the reporter wrote them — but no checklist UI).
2. **Evidence** — gallery strip of photos / videos / documents attached. 3-up thumbnails with file-type badges. Click to lightbox.
3. **People involved** — small cards: name, role, "injured" / "witness" / "first aider" tag, employee ID, contact link.
4. **Vehicle / asset** — if applicable: registration plate (mono font), make/model, mileage, last inspection date, last service date, prior incidents on this vehicle (number, link).
5. **Site & location** — depot, area within depot (e.g. "Bay 4 ramp"), small embedded map or location card. GPS coords if captured. Prior incidents at this location (number, link).
6. **ICAM root-cause analysis** — four-level structured panel:
   - **Absent / failed defences** (what should have prevented this but didn't)
   - **Individual / team actions** (what people did or didn't do)
   - **Task / environmental conditions** (immediate conditions at time of incident)
   - **Organisational factors** (policy, training, supervision, design)

   Each level is an editable card with current entries plus an "+ Add factor" button. Empty levels show a faint "Not yet documented" hint, not a stark blank.

7. **Corrective actions** — list of open and closed actions. Each row: title, owner avatar, due date (red if overdue), status pill. NOT a checklist. Each action is a workflow item with its own state machine (Open → In progress → Done → Verified). Display them as a clean list of rows with a "+ Add action" button — list, not checkbox column.

**Right column (~38%)** — context and audit, top to bottom:

1. **Status & ownership card**
   - Current status with state-change history mini-line
   - Investigator: avatar + name + "Reassign" link
   - Approver: avatar + name (or "Unassigned")
   - Last activity: relative time
   - "Move to investigation" / "Send for sign-off" / "Mark closed" primary action button (changes based on current status)

2. **Similar past reports** — pattern detection card. 3–5 rows showing reports with matches on (in order of relevance): same vehicle, same site + same hazard category, same shift pattern. Each row shows: ID · title · how long ago · match reason. The point is to surface "you've seen this before".

3. **RIDDOR card** — only renders if reportable. Title "RIDDOR notification". Shows: reportable category (e.g. "Schedule 2 — dangerous occurrence"), notification deadline countdown, status (Pending / Notified / Not applicable). If pending: a "Mark notified" button that opens a small form (notification date, reference number, attached confirmation file).

4. **Activity timeline** — vertical timeline of every event on this report. Most recent at the top. Each entry: avatar, actor, what happened, relative timestamp.
   - "Sara Okafor opened report" — 38 min ago
   - "Tom Whelan assigned to Adam Mowbray" — 22 min ago  
   - "Adam Mowbray added ICAM analysis: 3 entries" — 14 min ago
   - "Status changed: Open → Investigating" — 12 min ago
   - Includes system events (e.g. "RIDDOR deadline calculated"), comment events, status changes, attachment adds.
   - Comments inline — typed avatar messages with timestamps. Persistent comment box at the bottom of the timeline: "Add a comment…"

### 2.3 Sticky bottom bar — context-aware

When user scrolls, sticky bottom bar appears showing the current state's next action. E.g.:
- If Open: `[Assign investigator] [Investigate]`
- If Investigating: `[Save analysis] [Send for sign-off]`
- If Awaiting sign-off: `[Reject] [Approve and close]`
- If Closed: `[Reopen]` (subtle ghost)

Plus a "Discard changes" link on the left if there are unsaved edits in the ICAM cards or actions.

---

## Click-through requirements

The prototype must demonstrate the navigation, not just two static screens:

- Clicking any row on the list opens the detail. Use the existing list of 10 incidents from the dashboard's `INCIDENTS` data set as the corpus (extend to ~25 entries for a meaningful list).
- Detail page header back-chevron returns to the list with filters preserved.
- Within the detail page, clicking a "similar past report" card navigates to that report.
- Action buttons (Assign, Notify RIDDOR, Mark closed) can be non-functional but must show realistic confirmation states — e.g. clicking "Mark closed" flips the status pill, adds a timeline entry, and toggles the sticky bar's primary action to "Reopen".

Use client-side routing — no full page reloads.

---

## Visual / interaction principles

Same discipline as the dashboard:

- **Typography is ruthless.** Manrope. One dominant title per panel. Body 14–15 px. JetBrains Mono on IDs, timestamps, vehicle regs, RIDDOR reference numbers.
- **Red `#E63946` is sparingly used** — High severity, Open status, RIDDOR-reportable badges, the primary CTA. If every chip is red, none of them are.
- **Category colour discipline is absolute** — red HSSE, yellow Near Miss, black Incident, green Other. Do not deviate, do not invent purple or blue for new categories.
- **Borders not shadows.** 1 px `#E5E7EB`. Cards 8 px radius, buttons 6 px, pills 4 px.
- **Hover everywhere.** Rows lift, cursors change, accents brighten ~5 %.
- **Loading states use shimmer skeletons** matched to final layout — not spinners.
- **Empty states reward, don't punish.** If "Corrective actions = 0" and the report is closed: "No corrective actions — well-handled". If a section truly has no data because the form didn't capture it: "Not recorded — request more info" with the request-more-info action inline.
- **Audit trail entries are dense but readable** — single line each where possible.

---

## What to deliver

A single self-contained prototype that shows both screens with working click-through, populated with realistic data:

- ~25 sample reports varied across categories, severities, statuses, depots, with 3 of them flagged RIDDOR (1 notified, 1 pending within deadline, 1 overdue) so the badge states are visible
- One worked-up detail page that includes 2 photos / 1 video evidence (placeholder thumbnails are fine), 2 people involved, vehicle data, 3 ICAM entries spread across the levels, 2 open + 1 closed corrective action, and a 6-entry activity timeline including comments
- Functional filters and search on the list
- Functional state transitions on the detail (Open → Investigating → Awaiting sign-off → Closed) that update the status pill, sticky bar, and timeline

Render at full desktop width (1920 × 1080 target). No horizontal scroll. No mobile work — this is admin / desktop only.

---

## What NOT to do

- **No checklists.** Corrective actions are workflow rows, not tick boxes. Evidence is a gallery, not a tick list. ICAM is structured cards, not a multi-step checklist wizard.
- **No "AI summary" panel, no chatbot, no auto-generated narrative.** Out of scope.
- **No gamification / safety score / streak counter.** Out of scope.
- **No old Canva blue.** JobSafe is red `#E63946`.
- **No marketing-card explainers** ("Welcome to Reports — here's what to do…"). Managers use this hourly; they don't need onboarding chrome.
- **No motivational quote, no greeting, no weather widget, no random charts.** Detail is not a dashboard.
- **No invented compliance frameworks.** Use ICAM and RIDDOR — both are real and the user knows them.

---

## Tone

Calm, operational, regulatory-aware. This is the page someone opens when a serious thing has happened and they need to handle it correctly, defensibly, and traceably. It should feel like the case file a competent safety officer would actually want at their desk — dense, organised, every fact in its place, every action accountable.

Aesthetic reference: Linear's issue detail page, Stripe's payment detail page, GitHub's PR view. Information-dense, scannable, no fluff.

---

## Sources used to ground this brief

- HSE — [RIDDOR overview](https://www.hse.gov.uk/riddor/)
- HSE — [Reportable incidents](https://www.hse.gov.uk/riddor/reportable-incidents.htm) and [When do I need to report](https://www.hse.gov.uk/riddor/when-do-i-report.htm)
- HSE — [Investigating accidents and incidents (HSG245)](https://www.hse.gov.uk/pubns/books/hsg245.htm)
- ORR — [RIDDOR guidance for rail/transport](https://www.orr.gov.uk/sites/default/files/om/riddor-guidance.pdf)
- ICAM methodology — [SmartQHSE overview](https://www.smartqhse.com/safety-blog/incident-investigation-icam-method) and [HSE International ICAM training](https://www.hseigroup.com/icam)
