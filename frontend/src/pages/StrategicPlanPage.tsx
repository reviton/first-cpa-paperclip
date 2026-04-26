import React, { useState } from 'react';

interface AgentCard {
  id: number;
  name: string;
  type: string;
  cost: string;
  target: string;
  process: string;
}

interface Phase {
  title: string;
  subtitle: string;
  color: string;
  gradient: string;
  agents: AgentCard[];
}

const phases: Phase[] = [
  {
    title: 'שלב 1: מיידי (חודש 1-2)',
    subtitle: '"עצירת הדימום"',
    color: '#e74c3c',
    gradient: 'linear-gradient(135deg, #c0392b, #e74c3c)',
    agents: [
      {
        id: 1,
        name: 'סוכן גבייה ומעבר לסליקה',
        type: 'תפעול',
        cost: '₪0',
        target: '80% על סליקה תוך 60 יום',
        process: 'שליפה מ-SUMMIT של לקוחות לא על סליקה, שליחת WhatsApp מתבנית, תזכורות, העברה לאורנה',
      },
      {
        id: 2,
        name: 'סוכן תזכורות ולוח זמנים',
        type: 'workflow',
        cost: '~₪500',
        target: '100% עמידה בדדליינים',
        process: 'יום 1 דרישת חומר, יום 5 תזכורת, יום 9 דדליין שכר, יום 15-19 הגשות, יום 16 סליקה, יום 25 דוחות',
      },
      {
        id: 3,
        name: 'סוכן תקשורת לקוחות WhatsApp',
        type: 'שירות',
        cost: '~₪850',
        target: '70% מענה אוטומטי',
        process: 'סיווג הודעות (שגרתי→תבנית, מסמך→SUMMIT, מורכב→מנהל תיק), חוק ברזל ב-15:00',
      },
    ],
  },
  {
    title: 'שלב 2: חודש 3',
    subtitle: '"אפס הפתעות מס"',
    color: '#f39c12',
    gradient: 'linear-gradient(135deg, #e67e22, #f39c12)',
    agents: [
      {
        id: 4,
        name: 'סוכן בדיקת סבירות',
        type: 'בקרה',
        cost: '~₪500',
        target: '0 הפתעות מס',
        process: 'סריקת 553 לקוחות, השוואה לחודש קודם ואשתקד, קפיצה 10%→התראה',
      },
      {
        id: 5,
        name: 'סוכן קליטת לקוח חדש',
        type: 'onboarding',
        cost: '~₪200',
        target: 'קליטה < שבוע',
        process: "צ'קליסט (מצ\"ח, גיבויים, סליקה SUMMIT, CRM, הסכם, שיוך)",
      },
      {
        id: 6,
        name: 'סוכן CRM',
        type: 'ניהול מידע',
        cost: '₪0',
        target: 'תמונת לקוח מלאה',
        process: 'משיכת נתונים מ-SUMMIT, ריכוז WhatsApp, סימון חסרים',
      },
    ],
  },
  {
    title: 'שלב 3: חודש 4-6',
    subtitle: '"שירות שגורם לוואו"',
    color: '#27ae60',
    gradient: 'linear-gradient(135deg, #1e8449, #27ae60)',
    agents: [
      {
        id: 7,
        name: 'סוכן שידור דוחות',
        type: 'רגולציה',
        cost: '~₪500',
        target: 'סגירה ב-2-3 ימים',
        process: 'הפקת 1214, PDF, חתימה דיגיטלית, שידור לשע"מ',
      },
      {
        id: 8,
        name: 'סוכן צמיחה עסקית',
        type: 'אנליטיקה',
        cost: '~₪300',
        target: '-50% נטישה',
        process: 'זיהוי סיכון נטישה, שדרוגים (פטור→מורשה, עצמאי→חברה)',
      },
      {
        id: 9,
        name: 'סוכן פורטל לקוחות',
        type: 'חוויית לקוח',
        cost: '~₪500',
        target: 'שביעות רצון > 4.5/5',
        process: "פורטל אישי, סטטוס דוחות, צ'אט עם סוכן",
      },
    ],
  },
];

const summaryData = [
  { id: 1, name: 'סוכן גבייה ומעבר לסליקה', type: 'תפעול', phase: '1', cost: '₪0', kpi: '80% על סליקה' },
  { id: 2, name: 'סוכן תזכורות ולוח זמנים', type: 'workflow', phase: '1', cost: '~₪500', kpi: '100% עמידה בדדליינים' },
  { id: 3, name: 'סוכן תקשורת WhatsApp', type: 'שירות', phase: '1', cost: '~₪850', kpi: '70% מענה אוטומטי' },
  { id: 4, name: 'סוכן בדיקת סבירות', type: 'בקרה', phase: '2', cost: '~₪500', kpi: '0 הפתעות מס' },
  { id: 5, name: 'סוכן קליטת לקוח חדש', type: 'onboarding', phase: '2', cost: '~₪200', kpi: 'קליטה < שבוע' },
  { id: 6, name: 'סוכן CRM', type: 'ניהול מידע', phase: '2', cost: '₪0', kpi: 'תמונת לקוח מלאה' },
  { id: 7, name: 'סוכן שידור דוחות', type: 'רגולציה', phase: '3', cost: '~₪500', kpi: 'סגירה ב-2-3 ימים' },
  { id: 8, name: 'סוכן צמיחה עסקית', type: 'אנליטיקה', phase: '3', cost: '~₪300', kpi: '-50% נטישה' },
  { id: 9, name: 'סוכן פורטל לקוחות', type: 'חוויית לקוח', phase: '3', cost: '~₪500', kpi: 'שביעות רצון > 4.5/5' },
];

const kpiData = [
  { kpi: 'זמן מענה', current: 'שעות-ימים', target: '< 5 דקות' },
  { kpi: 'קנסות שנתיים', current: '~7,000₪', target: '₪0' },
  { kpi: 'לקוחות על סליקה', current: '308 (56%)', target: '450+ (82%)' },
  { kpi: 'סגירת חודש', current: '8-10 ימים', target: '2-3 ימים' },
  { kpi: 'נטישה', current: 'עשרות/שנה', target: '< 10/שנה' },
  { kpi: 'רווח נקי', current: '25%', target: '30%+' },
];

const guidingPrinciples = [
  { icon: '🏗️', text: 'SUMMIT היא הבסיס - לא מחליפים, מחברים' },
  { icon: '📋', text: 'תבניות מאושרות בלבד' },
  { icon: '👁️', text: 'פיקוח אנושי תמיד' },
  { icon: '🛡️', text: 'אפס סיכון' },
];

const styles = {
  page: {
    direction: 'rtl' as const,
    fontFamily: 'inherit',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '24px',
  },
  hero: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2c5f8a 100%)',
    borderRadius: 16,
    padding: '48px 40px',
    textAlign: 'center' as const,
    marginBottom: 40,
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 800,
    margin: 0,
    marginBottom: 12,
    letterSpacing: '-0.5px',
  },
  heroSubtitle: {
    color: '#a8d4f0',
    fontSize: 18,
    fontWeight: 400,
    margin: 0,
  },
  heroDecor: {
    position: 'absolute' as const,
    top: -60,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: '50%',
    background: 'rgba(77, 168, 218, 0.1)',
  },
  heroDecor2: {
    position: 'absolute' as const,
    bottom: -40,
    right: -40,
    width: 150,
    height: 150,
    borderRadius: '50%',
    background: 'rgba(77, 168, 218, 0.08)',
  },
  phaseSection: {
    marginBottom: 40,
  },
  phaseHeader: {
    borderRadius: 12,
    padding: '20px 28px',
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center' as const,
    gap: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  phaseTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 700,
    margin: 0,
  },
  phaseSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    fontWeight: 400,
    margin: 0,
  },
  agentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: 20,
  },
  agentCard: {
    background: '#fff',
    borderRadius: 12,
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #e8ecf1',
    transition: 'transform 0.2s, box-shadow 0.2s',
    position: 'relative' as const,
  },
  agentBadge: {
    position: 'absolute' as const,
    top: -12,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontWeight: 800,
    fontSize: 16,
    boxShadow: '0 2px 8px rgba(22,50,91,0.3)',
  },
  agentName: {
    fontSize: 17,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 12,
    marginTop: 4,
  },
  tagRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap' as const,
    marginBottom: 14,
  },
  typeTag: {
    background: '#eef4ff',
    color: '#1e293b',
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },
  costTag: {
    background: '#f0fdf4',
    color: '#166534',
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },
  targetTag: {
    background: '#fef3c7',
    color: '#92400e',
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },
  processLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: '#6b7280',
    marginBottom: 4,
  },
  processText: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 1.6,
    margin: 0,
    padding: '8px 12px',
    background: '#f9fafb',
    borderRadius: 8,
    borderRight: '3px solid #2dd4bf',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: '#0f172a',
    marginBottom: 20,
    textAlign: 'center' as const,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    background: '#fff',
    borderRadius: 12,
    overflow: 'hidden' as const,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    marginBottom: 40,
  },
  th: {
    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
    color: '#fff',
    padding: '14px 16px',
    fontSize: 14,
    fontWeight: 700,
    textAlign: 'right' as const,
  },
  td: {
    padding: '12px 16px',
    fontSize: 14,
    color: '#374151',
    borderBottom: '1px solid #e8ecf1',
    textAlign: 'right' as const,
  },
  tdAlt: {
    padding: '12px 16px',
    fontSize: 14,
    color: '#374151',
    borderBottom: '1px solid #e8ecf1',
    background: '#f9fafb',
    textAlign: 'right' as const,
  },
  roiSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20,
    marginBottom: 40,
  },
  roiBox: {
    borderRadius: 12,
    padding: '32px 24px',
    textAlign: 'center' as const,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  roiValue: {
    fontSize: 32,
    fontWeight: 800,
    marginBottom: 8,
  },
  roiLabel: {
    fontSize: 15,
    fontWeight: 500,
  },
  principlesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: 16,
    marginBottom: 40,
  },
  principleCard: {
    background: '#fff',
    borderRadius: 12,
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #e8ecf1',
    display: 'flex',
    alignItems: 'center' as const,
    gap: 16,
  },
  principleIcon: {
    fontSize: 28,
    width: 48,
    height: 48,
    borderRadius: 12,
    background: '#f0f4ff',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexShrink: 0,
  },
  principleText: {
    fontSize: 15,
    fontWeight: 600,
    color: '#0f172a',
    margin: 0,
  },
  kpiCurrent: {
    color: '#dc2626',
    fontWeight: 600,
  },
  kpiTarget: {
    color: '#16a34a',
    fontWeight: 600,
  },
  totalRow: {
    background: '#f0f4ff',
    fontWeight: 700,
  },
};

const StrategicPlanPage: React.FC = () => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroDecor} />
        <div style={styles.heroDecor2} />
        <h1 style={styles.heroTitle}>
          תוכנית אסטרטגית - פירסט חשבונאות ופיננסים
        </h1>
        <p style={styles.heroSubtitle}>
          מגישה: נועה לוי-אלגוריתם, מנכ&quot;לית
        </p>
      </div>

      {/* Phases */}
      {phases.map((phase, phaseIndex) => (
        <div key={phaseIndex} style={styles.phaseSection}>
          <div
            style={{
              ...styles.phaseHeader,
              background: phase.gradient,
              cursor: 'pointer',
            }}
            onClick={() =>
              setExpandedPhase(expandedPhase === phaseIndex ? null : phaseIndex)
            }
          >
            <div style={{ flex: 1 }}>
              <h2 style={styles.phaseTitle}>{phase.title}</h2>
              <p style={styles.phaseSubtitle}>{phase.subtitle}</p>
            </div>
            <span
              style={{
                color: '#fff',
                fontSize: 24,
                transition: 'transform 0.2s',
                transform:
                  expandedPhase === phaseIndex
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)',
              }}
            >
              ▼
            </span>
          </div>

          <div
            style={{
              ...styles.agentGrid,
              display:
                expandedPhase === null || expandedPhase === phaseIndex
                  ? 'grid'
                  : 'none',
            }}
          >
            {phase.agents.map((agent) => (
              <div
                key={agent.id}
                style={styles.agentCard}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 2px 8px rgba(0,0,0,0.08)';
                }}
              >
                <div style={styles.agentBadge}>{agent.id}</div>
                <div style={styles.agentName}>{agent.name}</div>
                <div style={styles.tagRow}>
                  <span style={styles.typeTag}>{agent.type}</span>
                  <span style={styles.costTag}>{agent.cost}</span>
                  <span style={styles.targetTag}>{agent.target}</span>
                </div>
                <div style={styles.processLabel}>תהליך:</div>
                <p style={styles.processText}>{agent.process}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Summary Table */}
      <h2 style={styles.sectionTitle}>סיכום 9 הסוכנים</h2>
      <div style={{ overflowX: 'auto', marginBottom: 40 }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>שם</th>
              <th style={styles.th}>סוג</th>
              <th style={styles.th}>שלב</th>
              <th style={styles.th}>עלות חודשית</th>
              <th style={styles.th}>KPI עיקרי</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((row, i) => (
              <tr key={row.id}>
                <td style={i % 2 === 0 ? styles.td : styles.tdAlt}>
                  <span
                    style={{
                      background: '#0f172a',
                      color: '#fff',
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {row.id}
                  </span>
                </td>
                <td
                  style={{
                    ...(i % 2 === 0 ? styles.td : styles.tdAlt),
                    fontWeight: 600,
                    color: '#0f172a',
                  }}
                >
                  {row.name}
                </td>
                <td style={i % 2 === 0 ? styles.td : styles.tdAlt}>
                  <span style={styles.typeTag}>{row.type}</span>
                </td>
                <td style={i % 2 === 0 ? styles.td : styles.tdAlt}>
                  {row.phase}
                </td>
                <td
                  style={{
                    ...(i % 2 === 0 ? styles.td : styles.tdAlt),
                    fontWeight: 600,
                  }}
                >
                  {row.cost}
                </td>
                <td style={i % 2 === 0 ? styles.td : styles.tdAlt}>
                  {row.kpi}
                </td>
              </tr>
            ))}
            <tr style={styles.totalRow}>
              <td style={styles.td} colSpan={4}>
                <strong>סה&quot;כ</strong>
              </td>
              <td style={{ ...styles.td, fontWeight: 800, color: '#0f172a' }}>
                ~₪3,350/חודש
              </td>
              <td style={styles.td}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* KPI Before/After */}
      <h2 style={styles.sectionTitle}>KPIs - לפני ואחרי</h2>
      <div style={{ overflowX: 'auto', marginBottom: 40 }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>KPI</th>
              <th style={styles.th}>מצב נוכחי</th>
              <th style={styles.th}>יעד חודש 6</th>
            </tr>
          </thead>
          <tbody>
            {kpiData.map((row, i) => (
              <tr key={row.kpi}>
                <td
                  style={{
                    ...(i % 2 === 0 ? styles.td : styles.tdAlt),
                    fontWeight: 700,
                    color: '#0f172a',
                  }}
                >
                  {row.kpi}
                </td>
                <td
                  style={{
                    ...(i % 2 === 0 ? styles.td : styles.tdAlt),
                    ...styles.kpiCurrent,
                  }}
                >
                  {row.current}
                </td>
                <td
                  style={{
                    ...(i % 2 === 0 ? styles.td : styles.tdAlt),
                    ...styles.kpiTarget,
                  }}
                >
                  {row.target}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ROI */}
      <h2 style={styles.sectionTitle}>ROI - החזר על השקעה</h2>
      <div style={styles.roiSection}>
        <div
          style={{
            ...styles.roiBox,
            background: 'linear-gradient(135deg, #fef2f2, #fecaca)',
            border: '1px solid #fca5a5',
          }}
        >
          <div style={{ ...styles.roiValue, color: '#dc2626' }}>~₪40K</div>
          <div style={{ ...styles.roiLabel, color: '#991b1b' }}>
            עלות שנתית
          </div>
        </div>
        <div
          style={{
            ...styles.roiBox,
            background: 'linear-gradient(135deg, #f0fdf4, #bbf7d0)',
            border: '1px solid #86efac',
          }}
        >
          <div style={{ ...styles.roiValue, color: '#16a34a' }}>~₪200K+</div>
          <div style={{ ...styles.roiLabel, color: '#166534' }}>חיסכון</div>
        </div>
        <div
          style={{
            ...styles.roiBox,
            background: 'linear-gradient(135deg, #eff6ff, #bfdbfe)',
            border: '1px solid #93c5fd',
          }}
        >
          <div style={{ ...styles.roiValue, color: '#1e293b' }}>400-500%</div>
          <div style={{ ...styles.roiLabel, color: '#0f172a' }}>ROI</div>
        </div>
      </div>

      {/* Guiding Principles */}
      <h2 style={styles.sectionTitle}>עקרונות מנחים</h2>
      <div style={styles.principlesGrid}>
        {guidingPrinciples.map((principle, i) => (
          <div key={i} style={styles.principleCard}>
            <div style={styles.principleIcon}>{principle.icon}</div>
            <p style={styles.principleText}>{principle.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategicPlanPage;
