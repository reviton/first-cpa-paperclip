import React, { useState } from 'react';
import * as kb from '../data/knowledgeBase';

type Tab = 'clients' | 'org' | 'procedures' | 'schedule' | 'missing' | 'sources';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'clients', label: 'לקוחות ועובדים', icon: '👥' },
  { id: 'org', label: 'מבנה ארגוני', icon: '🏢' },
  { id: 'procedures', label: 'נהלים', icon: '📋' },
  { id: 'schedule', label: 'לוחות זמנים', icon: '🗓️' },
  { id: 'missing', label: 'חסר', icon: '⚠️' },
  { id: 'sources', label: 'מקורות', icon: '📚' },
];

const KnowledgeBasePage: React.FC = () => {
  const [tab, setTab] = useState<Tab>('clients');

  return (
    <div style={s.page}>
      <header style={s.header}>
        <div>
          <h1 style={s.h1}>פירסט CPA — מאגר ידע</h1>
          <p style={s.sub}>
            עודכן: {kb.lastUpdated} · אפיון ארגוני · 70+ נהלים · לקוחות מסאמיט · לוחות זמנים · מקורות
          </p>
          <p style={s.author}>הופק על ידי נגה — סוכנת מנכ"לית</p>
        </div>
      </header>

      <nav style={s.tabs}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{ ...s.tab, ...(tab === t.id ? s.tabActive : {}) }}
          >
            <span style={{ marginLeft: 8 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>

      <div>
        {tab === 'clients' && <ClientsTab />}
        {tab === 'org' && <OrgTab />}
        {tab === 'procedures' && <ProceduresTab />}
        {tab === 'schedule' && <ScheduleTab />}
        {tab === 'missing' && <MissingTab />}
        {tab === 'sources' && <SourcesTab />}
      </div>
    </div>
  );
};

/* ----------------------------- Clients & Employees ----------------------------- */
const ClientsTab: React.FC = () => {
  const max = Math.max(...kb.employeeDistribution.map(e => e.count));

  return (
    <div>
      {/* Critical alert */}
      <Card style={{ background: '#fef2f2', borderColor: '#fecaca' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 22 }}>🚨</span>
          <h3 style={{ margin: 0, color: '#991b1b' }}>{kb.concentrationAlert.title}</h3>
        </div>
        <p style={{ margin: 0, color: '#7f1d1d', fontSize: 14, lineHeight: 1.7 }}>
          {kb.concentrationAlert.text}
        </p>
      </Card>

      {/* KPI strip */}
      <div style={s.kpiStrip}>
        <KPI value={kb.totalClients} label="לקוחות בסאמיט" />
        <KPI value={`${kb.businessClientsPct}%`} label="עוסק מורשה" />
        <KPI value={`${kb.assignedToTwoEmployees}%`} label="בידי 2 עובדים" tone="warn" />
        <KPI value={kb.unassignedClients} label="לא משויכים" tone="warn" />
      </div>

      {/* Employee distribution bars */}
      <Section title="התפלגות לפי עובד">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {kb.employeeDistribution.map(e => (
            <div key={e.name} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 60px', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>{e.name}</span>
              <div style={{ background: '#f3f4f6', borderRadius: 6, height: 22, position: 'relative' }}>
                <div
                  style={{
                    width: `${(e.count / max) * 100}%`,
                    height: '100%',
                    background: e.count > 150 ? 'linear-gradient(90deg, #ef4444, #f87171)' : e.name === 'לא משויך' ? '#fbbf24' : 'linear-gradient(90deg, #2dd4bf, #22c55e)',
                    borderRadius: 6,
                  }}
                />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', textAlign: 'left' }}>{e.count}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Heavy hitters */}
      <Section title="פירוט 2 הכבדים">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {kb.heavyHitters.map(h => (
            <div key={h.name} style={s.heavyCard}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <h4 style={{ margin: 0, color: '#0f172a' }}>{h.name}</h4>
                <span style={s.bigCount}>{h.total}</span>
              </div>
              <p style={{ margin: '4px 0', fontSize: 13, color: '#475569' }}>{h.breakdown}</p>
              <p style={{ margin: 0, fontSize: 12, color: '#64748b', fontStyle: 'italic' }}>{h.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Client type breakdown */}
      <Section title="לפי סוג לקוח">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          {kb.clientTypeBreakdown.map(c => (
            <div key={c.label} style={{ ...s.typeCard, ...(c.alert ? { background: '#fef3c7', borderColor: '#fde68a' } : {}) }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: c.alert ? '#92400e' : '#0f172a' }}>{c.count}</div>
              <div style={{ fontSize: 13, color: c.alert ? '#92400e' : '#64748b', marginTop: 4 }}>
                {c.label} {c.pct !== null && <span style={{ fontSize: 11 }}>({c.pct}%)</span>}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Full employee table */}
      <Section title="כל העובדים — טבלה מלאה">
        <div style={{ overflowX: 'auto' }}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>עובד</th>
                <th style={s.th}>סה"כ</th>
                <th style={s.th}>חברות</th>
                <th style={s.th}>מורשים</th>
                <th style={s.th}>פטורים</th>
                <th style={s.th}>שותפויות</th>
                <th style={s.th}>עמותות</th>
              </tr>
            </thead>
            <tbody>
              {kb.employeeFullTable.map(r => (
                <tr key={r.name}>
                  <td style={s.td}><strong>{r.name}</strong></td>
                  <td style={s.td}>{r.total}</td>
                  <td style={s.td}>{r.companies}</td>
                  <td style={s.td}>{r.authorized}</td>
                  <td style={s.td}>{r.exempt}</td>
                  <td style={s.td}>{r.partnerships}</td>
                  <td style={s.td}>{r.associations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Meir clients — VIP list */}
      <Section title='רשימת לקוחות מאיר — מחלקת חברות'>
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
          תגלית: תומר פרי בע"מ ופירסט חשבונאות ופיננסים בע"מ עצמם נמצאות ברשימה — המשרד מנהל את חשבונות עצמו. גם ארומה (2 סניפים) — לקוח מרכזי.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>#</th>
                <th style={s.th}>שם חברה</th>
                <th style={s.th}>מחלקה</th>
                <th style={s.th}>הערה</th>
              </tr>
            </thead>
            <tbody>
              {kb.meirClients.map(c => (
                <tr key={c.index} style={c.flag === 'flagship' || c.flag === 'self-managed' ? { background: '#f0fdf4' } : c.flag?.startsWith('vip') ? { background: '#fef3c7' } : {}}>
                  <td style={s.td}>{c.index}</td>
                  <td style={s.td}><strong>{c.name}</strong></td>
                  <td style={s.td}>{c.department}</td>
                  <td style={{ ...s.td, fontSize: 12, color: '#64748b' }}>{c.note || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
};

/* ----------------------------- Org structure ----------------------------- */
const OrgTab: React.FC = () => {
  return (
    <div>
      <Section title="מבנה ארגוני — אפיון #1">
        <div style={{ overflowX: 'auto' }}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>מחלקה</th>
                <th style={s.th}>סטטוס</th>
                <th style={s.th}>שירותים</th>
                <th style={s.th}>נהלים</th>
              </tr>
            </thead>
            <tbody>
              {kb.departments.map(d => (
                <tr key={d.name} style={d.alert ? { background: '#fef2f2' } : {}}>
                  <td style={s.td}><strong>{d.name}</strong></td>
                  <td style={{ ...s.td, color: d.status.includes('❌') || d.status === 'לא הוגדר' ? '#991b1b' : d.status.includes('שיפור') ? '#92400e' : '#166534', fontWeight: 600 }}>{d.status}</td>
                  <td style={{ ...s.td, fontSize: 13 }}>{d.services}</td>
                  <td style={{ ...s.td, fontWeight: 700 }}>{d.procedures}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: '#7f1d1d', background: '#fef2f2', padding: 12, borderRadius: 8 }}>
          <strong>⚠️ </strong>{kb.departmentsAlertText}
        </p>
      </Section>

      {/* Shahar discovery */}
      <Card style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderColor: '#fbbf24' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 22 }}>💡</span>
          <h3 style={{ margin: 0, color: '#78350f' }}>{kb.sharDiscovery.title}</h3>
          <span style={s.statusBadge}>{kb.sharDiscovery.status}</span>
        </div>
        <p style={{ marginTop: 4, color: '#78350f', fontSize: 14, lineHeight: 1.7 }}>
          {kb.sharDiscovery.intro}
        </p>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
          {kb.sharDiscovery.fields.map(f => (
            <div key={f.label} style={{ background: '#fff', padding: 12, borderRadius: 8, border: '1px solid #fde68a' }}>
              <div style={{ fontSize: 11, color: '#92400e', fontWeight: 700, marginBottom: 4 }}>{f.label}</div>
              <div style={{ fontSize: 13, color: '#0f172a' }}>{f.value}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: '#78350f', fontStyle: 'italic' }}>
          <strong>השלכה ישירה לסוכן: </strong>{kb.sharDiscovery.hierarchyNote}
        </p>
      </Card>

      {/* Central control failure */}
      <Section title={kb.centralControlFailure.title}>
        <span style={{ ...s.statusBadge, background: '#dc2626', color: '#fff' }}>{kb.centralControlFailure.alertSeverity}</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 12 }}>
          <div>
            <h4 style={{ marginTop: 0, color: '#991b1b' }}>איך מגלים שמשהו נפל — היום</h4>
            <ul style={{ paddingRight: 20 }}>
              {kb.centralControlFailure.problems.map(p => (
                <li key={p} style={{ marginBottom: 6, color: '#7f1d1d', fontSize: 13 }}>🔴 {p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ marginTop: 0, color: '#166534' }}>מה הסוכן צריך לעשות</h4>
            <ul style={{ paddingRight: 20 }}>
              {kb.centralControlFailure.remedies.map(r => (
                <li key={r} style={{ marginBottom: 6, color: '#14532d', fontSize: 13 }}>✅ {r}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Org chart table */}
      <Section title={`מבנה ניהולי מלא — עדכון ${kb.lastUpdated}`}>
        <div style={{ overflowX: 'auto' }}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>דרג</th>
                <th style={s.th}>שם</th>
                <th style={s.th}>תפקיד</th>
                <th style={s.th}>אחריות</th>
                <th style={s.th}>לקוחות</th>
              </tr>
            </thead>
            <tbody>
              {kb.orgChart.map(m => (
                <tr key={m.name} style={m.level <= 2 ? { background: '#eef2ff' } : {}}>
                  <td style={s.td}><strong>{m.level}</strong></td>
                  <td style={s.td}><strong>{m.name}</strong></td>
                  <td style={s.td}>{m.role}</td>
                  <td style={{ ...s.td, fontSize: 12 }}>{m.responsibility}</td>
                  <td style={{ ...s.td, fontSize: 12 }}>{m.clients}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Tomer persona */}
      <Section title="פרסונה של תומר — הקול של פירסט">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
          {kb.tomerPersona.map(p => (
            <div key={p.label} style={s.field}>
              <div style={s.fieldLabel}>{p.label}</div>
              <div style={s.fieldValue}>{p.value}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Survey 80 */}
      <Section title={`ממצאי שאלון בדיקת נאותות — ${kb.lastUpdated} (80 שאלות | תומר מילא)`}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          <div style={{ background: '#fef2f2', padding: 16, borderRadius: 10, border: '1px solid #fecaca' }}>
            <h4 style={{ marginTop: 0, color: '#991b1b' }}>🔴 הממצאים הכי כואבים</h4>
            <ul style={{ paddingRight: 20, fontSize: 13, color: '#7f1d1d' }}>
              {kb.surveyPainPoints.map(p => <li key={p} style={{ marginBottom: 4 }}>{p}</li>)}
            </ul>
          </div>
          <div style={{ background: '#f0fdf4', padding: 16, borderRadius: 10, border: '1px solid #bbf7d0' }}>
            <h4 style={{ marginTop: 0, color: '#166534' }}>🟢 נקודות כח ונתונים חשובים</h4>
            <ul style={{ paddingRight: 20, fontSize: 13, color: '#14532d' }}>
              {kb.surveyStrengths.map(p => <li key={p} style={{ marginBottom: 4 }}>{p}</li>)}
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 16, overflowX: 'auto' }}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>קטגוריה</th>
                <th style={s.th}>ממצא מרכזי</th>
                <th style={s.th}>השלכה לסוכן</th>
              </tr>
            </thead>
            <tbody>
              {kb.survey80Highlights.map(h => (
                <tr key={h.label}>
                  <td style={s.td}><strong>{h.label}</strong></td>
                  <td style={{ ...s.td, fontSize: 13 }}>{h.finding}</td>
                  <td style={{ ...s.td, fontSize: 13, color: '#0f766e' }}>{h.remedy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
};

/* ----------------------------- Procedures ----------------------------- */
const ProceduresTab: React.FC = () => {
  const groups = [
    { title: 'הנה"ח חברות', subtitle: 'טעון שיפור · 12 נהלים', items: kb.proceduresCompanies },
    { title: 'הנה"ח עצמאיים', subtitle: '21 נהלים + 11 מדריכים', items: kb.proceduresSelfEmployed },
    { title: 'שכר ופנסיה', subtitle: '9 נהלים', items: kb.proceduresSalary },
    { title: 'ביקורת ודוחות', subtitle: '+22 נהלים', items: kb.proceduresAudit },
    { title: 'קבלה / מזכירות', subtitle: '16 נהלים', items: kb.proceduresReception },
  ];

  return (
    <div>
      {groups.map(g => (
        <Section key={g.title} title={`${g.title} — ${g.subtitle}`}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>נוהל</th>
                {g.items.some(i => i.type) && <th style={s.th}>סוג</th>}
                <th style={s.th}>סטטוס</th>
              </tr>
            </thead>
            <tbody>
              {g.items.map(p => (
                <tr key={p.name}>
                  <td style={s.td}>{p.name}</td>
                  {g.items.some(i => i.type) && <td style={{ ...s.td, fontSize: 12, color: '#64748b' }}>{p.type || '—'}</td>}
                  <td style={s.td}><StatusPill status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      ))}
    </div>
  );
};

/* ----------------------------- Schedule ----------------------------- */
const ScheduleTab: React.FC = () => {
  return (
    <div>
      <Section title="לוז יומי — משרד רואי חשבון">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
          <div>
            <h4 style={{ marginTop: 0, color: '#0f172a' }}>שגרת היום</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {kb.dailySchedule.map(d => (
                <div key={d.time} style={s.timeRow}>
                  <div style={s.timeBadge}>{d.time}</div>
                  <div style={{ fontSize: 13, color: '#374151' }}>{d.tasks}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ marginTop: 0, color: '#0f172a' }}>משימות קבועות יומיות</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {kb.dailyRoutines.map((r, i) => (
                <div key={i} style={{ background: '#f0fdfa', padding: 12, borderRadius: 8, border: '1px solid #99f6e4' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#0f766e' }}>{r.who}</div>
                  <div style={{ fontSize: 13, color: '#0f172a', marginTop: 4 }}>{r.what}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="לוז שבועי">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {kb.weeklySchedule.map(d => (
            <div key={d.day} style={s.dayCard}>
              <h4 style={{ marginTop: 0, color: '#0369a1' }}>{d.day}</h4>
              <ul style={{ paddingRight: 18, margin: 0, fontSize: 13, color: '#374151' }}>
                {d.items.map(i => <li key={i} style={{ marginBottom: 4 }}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: '#64748b', fontStyle: 'italic' }}>{kb.weeklyTeamMeeting}</p>
      </Section>

      <Section title="לוז חודשי — לפי תאריכים">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
          {kb.monthlySchedule.map(m => (
            <div key={m.range} style={s.monthCard}>
              <div style={s.monthBadge}>{m.range}</div>
              <ul style={{ paddingRight: 18, margin: 0, fontSize: 13, color: '#374151' }}>
                {m.items.map(i => <li key={i} style={{ marginBottom: 4 }}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="KPIs ויעדים לפי מחלקות">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
          {kb.kpisByDepartment.map(k => (
            <div key={k.name} style={s.kpiCard}>
              <h4 style={{ marginTop: 0, color: '#0f172a' }}>{k.name}</h4>
              <ul style={{ paddingRight: 18, margin: 0, fontSize: 13, color: '#374151' }}>
                {k.items.map(i => <li key={i} style={{ marginBottom: 4 }}>{i}</li>)}
              </ul>
              {k.extras && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dashed #e5e7eb', fontSize: 12, color: '#64748b' }}>
                  {k.extras.join(' · ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Collection dashboard */}
      <Section title='דשבורד גביה — תמונה מלאה'>
        <div style={s.kpiStrip}>
          <KPI value={kb.collectionDashboard.active} label="לקוחות פעילים" />
          <KPI value={kb.collectionDashboard.unpaid} label="לא פעילים" tone="warn" />
          <KPI value={kb.collectionDashboard.totalUnpaid} label="תאי לא שולם" tone="warn" />
          <KPI value={kb.collectionDashboard.generations} label="גיליונות" />
        </div>
        <div style={{ overflowX: 'auto', marginTop: 12 }}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>גיליון</th>
                <th style={s.th}>שורות</th>
                <th style={s.th}>תוכן</th>
              </tr>
            </thead>
            <tbody>
              {kb.collectionDashboard.generationsList.map(g => (
                <tr key={g.period}>
                  <td style={s.td}><strong>{g.period}</strong></td>
                  <td style={s.td}>{g.count}</td>
                  <td style={{ ...s.td, fontSize: 13, color: '#475569' }}>{g.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Revenue growth */}
      <Section title="צמיחת הכנסות חודשיות — 3 שנים">
        <p style={{ fontSize: 13, color: '#475569', marginBottom: 12, lineHeight: 1.7 }}>{kb.revenueGrowth.intro}</p>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>שנה</th>
              <th style={s.th}>ינואר</th>
              <th style={s.th}>יוני</th>
              <th style={s.th}>דצמבר</th>
              <th style={s.th}>שינוי</th>
            </tr>
          </thead>
          <tbody>
            {kb.revenueGrowth.rows.map(r => (
              <tr key={r.year}>
                <td style={s.td}><strong>{r.year}</strong></td>
                <td style={s.td}>{r.jan}</td>
                <td style={s.td}>{r.jun}</td>
                <td style={s.td}>{r.dec}</td>
                <td style={{ ...s.td, color: '#059669', fontWeight: 700 }}>{r.diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Payment methods */}
      <Section title="אמצעי תשלום — פילוח">
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>אמצעי תשלום</th>
              <th style={s.th}>לקוחות</th>
              <th style={s.th}>הערה</th>
            </tr>
          </thead>
          <tbody>
            {kb.paymentMethods.map(p => (
              <tr key={p.method}>
                <td style={s.td}><strong>{p.method}</strong></td>
                <td style={s.td}>{p.count}{p.pct !== null && ` (${p.pct}%)`}</td>
                <td style={{ ...s.td, fontSize: 13, color: '#64748b' }}>{p.note}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 16, background: '#fef3c7', padding: 16, borderRadius: 10, border: '1px solid #fde68a' }}>
          <h4 style={{ marginTop: 0, color: '#78350f' }}>תהליך גביה נוכחי (מלא):</h4>
          <p style={{ margin: 0, fontSize: 13, color: '#78350f' }}><strong>אחראית: </strong>{kb.collectionFlow.responsible}</p>
          <ul style={{ paddingRight: 20, marginTop: 8, fontSize: 13, color: '#78350f' }}>
            {kb.collectionFlow.steps.map(st => (
              <li key={st.label} style={{ marginBottom: 4 }}><strong>{st.label}: </strong>{st.value}</li>
            ))}
          </ul>
          <p style={{ marginTop: 8, marginBottom: 0, fontSize: 13, color: '#7f1d1d', fontWeight: 600 }}>
            <strong>שורש הבעיה: </strong>{kb.collectionFlow.rootCause}
          </p>
        </div>
      </Section>
    </div>
  );
};

/* ----------------------------- Missing ----------------------------- */
const MissingTab: React.FC = () => {
  return (
    <Section title="מה עוד חסר לפני בניית הסוכנים">
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>פריט</th>
            <th style={s.th}>דחיפות</th>
            <th style={s.th}>הערה</th>
          </tr>
        </thead>
        <tbody>
          {kb.missingItems.map(m => (
            <tr key={m.item}>
              <td style={s.td}><strong>{m.item}</strong></td>
              <td style={s.td}><UrgencyPill urgency={m.urgency} /></td>
              <td style={{ ...s.td, fontSize: 13, color: '#475569' }}>{m.note || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
};

/* ----------------------------- Sources ----------------------------- */
const SourcesTab: React.FC = () => {
  return (
    <Section title="מקורות מידע — מאגר הידע">
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>מקור</th>
            <th style={s.th}>פירוט</th>
          </tr>
        </thead>
        <tbody>
          {kb.sources.map(src => (
            <tr key={src.name}>
              <td style={s.td}><strong>{src.name}</strong></td>
              <td style={{ ...s.td, fontSize: 13, color: '#475569' }}>{src.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: 12, fontSize: 13, color: '#64748b', fontStyle: 'italic' }}>{kb.sourcesNote}</p>
    </Section>
  );
};

/* ----------------------------- Helpers ----------------------------- */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={s.section}>
    <h2 style={s.h2}>● {title}</h2>
    {children}
  </div>
);

const Card: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style: extra, children }) => (
  <div style={{ ...s.card, ...extra }}>{children}</div>
);

const KPI: React.FC<{ value: React.ReactNode; label: string; tone?: 'warn' }> = ({ value, label, tone }) => (
  <div style={{ ...s.kpi, ...(tone === 'warn' ? { background: '#fef3c7', borderColor: '#fde68a' } : {}) }}>
    <div style={{ fontSize: 32, fontWeight: 800, color: tone === 'warn' ? '#92400e' : '#0f172a' }}>{value}</div>
    <div style={{ fontSize: 13, color: tone === 'warn' ? '#92400e' : '#64748b' }}>{label}</div>
  </div>
);

const StatusPill: React.FC<{ status: string }> = ({ status }) => {
  const isEmpty = status.includes('ריק');
  const critical = status.includes('קריטי');
  return (
    <span style={{
      padding: '3px 10px',
      borderRadius: 12,
      fontSize: 11,
      fontWeight: 700,
      background: critical ? '#dc2626' : isEmpty ? '#fef3c7' : '#dcfce7',
      color: critical ? '#fff' : isEmpty ? '#92400e' : '#166534',
    }}>{status}</span>
  );
};

const UrgencyPill: React.FC<{ urgency: string }> = ({ urgency }) => {
  const map: Record<string, { bg: string; fg: string }> = {
    'גבוהה': { bg: '#fef2f2', fg: '#991b1b' },
    'בינונית': { bg: '#fef3c7', fg: '#92400e' },
    'נמוכה': { bg: '#f0fdf4', fg: '#166534' },
    'מתועד חלקית': { bg: '#dbeafe', fg: '#1e40af' },
  };
  const c = map[urgency] || { bg: '#f3f4f6', fg: '#374151' };
  return (
    <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700, background: c.bg, color: c.fg }}>
      {urgency}
    </span>
  );
};

/* ----------------------------- Styles ----------------------------- */
const s: { [k: string]: React.CSSProperties } = {
  page: { maxWidth: 1280, margin: '0 auto', padding: '8px 4px 40px' },
  header: { padding: '20px 24px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderRadius: 16, color: '#fff', marginBottom: 20 },
  h1: { margin: 0, fontSize: 28, fontWeight: 800 },
  sub: { margin: '6px 0 0', fontSize: 14, opacity: 0.85 },
  author: { margin: '8px 0 0', fontSize: 13, color: '#5eead4', fontWeight: 600 },
  tabs: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20, borderBottom: '2px solid #e5e7eb', paddingBottom: 8 },
  tab: {
    padding: '10px 16px', border: 'none', background: 'transparent', cursor: 'pointer',
    fontSize: 14, fontWeight: 600, color: '#64748b', borderRadius: 8,
    fontFamily: 'inherit',
  },
  tabActive: { background: '#0f172a', color: '#fff' },
  section: { background: '#fff', borderRadius: 12, padding: 20, marginBottom: 16, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  h2: { margin: '0 0 14px', fontSize: 17, fontWeight: 700, color: '#0f172a' },
  card: { background: '#fff', borderRadius: 12, padding: 18, marginBottom: 16, border: '1px solid #e5e7eb' },
  kpiStrip: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 },
  kpi: { background: '#fff', padding: 18, borderRadius: 12, border: '1px solid #e5e7eb', textAlign: 'center' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { textAlign: 'right', padding: '10px 12px', borderBottom: '2px solid #e5e7eb', background: '#f9fafb', color: '#475569', fontWeight: 700, fontSize: 12 },
  td: { padding: '10px 12px', borderBottom: '1px solid #f1f5f9', color: '#0f172a' },
  heavyCard: { background: '#fff', padding: 16, borderRadius: 10, border: '1px solid #e5e7eb' },
  bigCount: { fontSize: 26, fontWeight: 800, color: '#0f172a' },
  typeCard: { background: '#fff', padding: 16, borderRadius: 10, border: '1px solid #e5e7eb', textAlign: 'center' },
  field: { background: '#f9fafb', padding: 12, borderRadius: 8, border: '1px solid #e5e7eb' },
  fieldLabel: { fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 4 },
  fieldValue: { fontSize: 13, color: '#0f172a', lineHeight: 1.6 },
  statusBadge: { background: '#fbbf24', color: '#78350f', padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700 },
  timeRow: { display: 'flex', gap: 12, alignItems: 'flex-start', padding: 8, background: '#f9fafb', borderRadius: 8 },
  timeBadge: { background: '#0f172a', color: '#fff', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' },
  dayCard: { background: '#f0f9ff', padding: 14, borderRadius: 10, border: '1px solid #bae6fd' },
  monthCard: { background: '#fff', padding: 14, borderRadius: 10, border: '1px solid #e5e7eb' },
  monthBadge: { display: 'inline-block', background: 'linear-gradient(135deg, #2dd4bf, #22c55e)', color: '#fff', padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 700, marginBottom: 8 },
  kpiCard: { background: '#fff', padding: 16, borderRadius: 10, border: '1px solid #e5e7eb' },
};

export default KnowledgeBasePage;
