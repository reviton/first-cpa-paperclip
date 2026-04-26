import React from 'react';
import LegoAvatar from '../components/shared/LegoAvatar';

const AgentTitle: React.FC<{ id: string; name: string }> = ({ id, name }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
    <LegoAvatar agentId={id} size={42} />
    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>{name}</span>
  </div>
);

const nodeStyle = (bg: string, border?: string): React.CSSProperties => ({
  background: 'white',
  border: `2px solid ${border || bg}`,
  borderRadius: 14,
  padding: '14px 18px',
  textAlign: 'center',
  minWidth: 160,
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
});

const sectionStyle = (color: string): React.CSSProperties => ({
  background: color,
  color: 'white',
  padding: '10px 18px',
  borderRadius: '10px 10px 0 0',
  fontWeight: 700,
  fontSize: '0.9rem',
});

const cardStyle: React.CSSProperties = {
  background: 'white',
  borderRadius: '0 0 10px 10px',
  padding: '12px 16px',
  border: '1px solid var(--border-color)',
  borderTop: 'none',
};

const personBadge = (name: string, isAgent?: boolean): React.CSSProperties => ({
  display: 'inline-block',
  padding: '3px 10px',
  borderRadius: 8,
  fontSize: '0.78rem',
  margin: '2px 3px',
  background: isAgent ? '#e0f7f0' : '#f1f5f9',
  color: isAgent ? '#0f172a' : 'var(--text-dark)',
  border: isAgent ? '1px solid #2dd4bf' : '1px solid var(--border-color)',
  fontWeight: isAgent ? 600 : 400,
});

const connectorDown: React.CSSProperties = {
  width: 2,
  height: 20,
  background: '#cbd5e1',
  margin: '0 auto',
};

const OrgChartPage: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <p style={{ color: 'var(--text-light)', margin: 0, fontSize: '0.85rem' }}>
          המבנה הארגוני החדש - פירסט חשבונאות ופיננסים בע"מ | 20 סוכנים פעילים
        </p>
      </div>

      {/* === Level 1: דירקטוריון === */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 0 }}>
        <div style={nodeStyle('#0f172a')}>
          <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>👨‍💼</div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>תומר פרי</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>יו"ר הדירקטוריון</div>
        </div>
        <div style={nodeStyle('#0f172a')}>
          <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>👨‍⚖️</div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>שחר דה ולנסה</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>רו"ח, סמכות מקצועית</div>
        </div>
      </div>
      <div style={connectorDown} />

      {/* === Level 2: מנכ"לית === */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
        <div style={{ ...nodeStyle('#2dd4bf'), borderWidth: 3, minWidth: 200 }}>
          <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>👩‍💼</div>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>נועה לוי-אלגוריתם</div>
          <div style={{ fontSize: '0.8rem', color: '#2dd4bf', fontWeight: 600 }}>מנכ"לית</div>
        </div>
      </div>
      <div style={connectorDown} />

      {/* === Level 3: HR === */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
        <div style={nodeStyle('#8e44ad')}>
          <div style={{ fontSize: '1.3rem', marginBottom: 4 }}>👩‍🦰</div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>מיכל ברק</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>מנהלת HR סוכנים</div>
        </div>
      </div>
      <div style={connectorDown} />

      {/* === Level 4: תחומים === */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 8 }}>

        {/* תחום שחר - עצמאים וביקורת */}
        <div>
          <div style={sectionStyle('#0f172a')}>
            בפיקוח שחר דה ולנסה
          </div>
          <div style={cardStyle}>
            <div style={{ marginBottom: 14 }}>
              <AgentTitle id="agent-bookkeeping" name="רקס-פרו-אקאונט" />
              <div style={{ fontSize: '0.75rem', color: '#2dd4bf', fontWeight: 600, marginBottom: 4 }}>סוכן הנח"ש עצמאים</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: 6 }}>413 לקוחות (74.7%)</div>
              <div>
                <span style={personBadge('עזרא חיו')}>עזרא חיו</span>
                <span style={personBadge('חנה רוטנברג')}>חנה רוטנברג</span>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
              <AgentTitle id="agent-auditor" name="דוד חשב" />
              <div style={{ fontSize: '0.75rem', color: '#2dd4bf', fontWeight: 600, marginBottom: 4 }}>סוכן דוחות וביקורת</div>
              <div>
                <span style={personBadge('שקד')}>שקד</span>
                <span style={personBadge('סאידה')}>סאידה</span>
                <span style={personBadge('נידאא')}>נידאא</span>
              </div>
            </div>
          </div>
        </div>

        {/* תחום תומר - חברות ושכר */}
        <div>
          <div style={sectionStyle('#1e293b')}>
            בפיקוח תומר פרי
          </div>
          <div style={cardStyle}>
            <div style={{ marginBottom: 14 }}>
              <AgentTitle id="agent-corporate" name="TaxFlow Enterprise" />
              <div style={{ fontSize: '0.75rem', color: '#2dd4bf', fontWeight: 600, marginBottom: 4 }}>סוכן הנח"ש חברות</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: 6 }}>~140 לקוחות</div>
              <div>
                <span style={personBadge('יעל אסף')}>יעל אסף</span>
                <span style={personBadge('יוכבד')}>יוכבד</span>
                <span style={personBadge('צירי')}>צירי</span>
                <span style={personBadge('שושי')}>שושי</span>
                <span style={personBadge('ברכה')}>ברכה</span>
                <span style={personBadge('מאיר')}>מאיר</span>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
              <AgentTitle id="agent-payroll" name="סוכן חשב שכר" />
              <div style={{ fontSize: '0.75rem', color: '#2dd4bf', fontWeight: 600, marginBottom: 4 }}>חשב שכר AI בכיר</div>
              <div>
                <span style={personBadge('רומן')}>רומן</span>
                <span style={personBadge('אסיה')}>אסיה</span>
              </div>
            </div>
          </div>
        </div>

        {/* בקרת איכות */}
        <div>
          <div style={sectionStyle('#ef4444')}>
            בקרת איכות
          </div>
          <div style={cardStyle}>
            <div>
              <AgentTitle id="agent-reasonability" name="שירא כהן-לוי" />
              <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 600, marginBottom: 4 }}>סוכנת בדיקת סבירות</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: 6 }}>553 לקוחות | 3 שכבות התראה | "אפס הפתעות מס"</div>
              <div>
                <span style={personBadge('שירא כהן-לוי', true)}>🔍 פעילה</span>
              </div>
            </div>
          </div>
        </div>

        {/* תחומים מיוחדים */}
        <div>
          <div style={sectionStyle('#22c55e')}>
            תחומים מיוחדים
          </div>
          <div style={cardStyle}>
            <div style={{ marginBottom: 14 }}>
              <AgentTitle id="agent-virtual-co" name="אלכס טק-סטארט" />
              <div style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 600, marginBottom: 4 }}>סוכן חברות וירטואליות</div>
              <div>
                <span style={personBadge('אלכס טק-סטארט', true)}>🏢 פעיל</span>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
              <AgentTitle id="agent-pension" name="שירה פיננסים" />
              <div style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 600, marginBottom: 4 }}>סוכנת פנסיוני והשקעות</div>
              <div>
                <span style={personBadge('שירה פיננסים', true)}>💎 פעילה</span>
              </div>
            </div>
          </div>
        </div>

        {/* תפעול */}
        <div>
          <div style={sectionStyle('#2dd4bf')}>
            תפעול וניהול
          </div>
          <div style={cardStyle}>
            <div style={{ marginBottom: 14 }}>
              <AgentTitle id="agent-case-manager" name="רונית תיק" />
              <div style={{ fontSize: '0.75rem', color: '#2dd4bf', fontWeight: 600, marginBottom: 4 }}>מנהלת תיקיות לקוחות</div>
              <div>
                <span style={personBadge('רונית תיק', true)}>👩‍🔬 פעילה</span>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
              <AgentTitle id="agent-client-relations" name="שירה קשר" />
              <div style={{ fontSize: '0.75rem', color: '#2dd4bf', fontWeight: 600, marginBottom: 4 }}>סוכנת קשרי לקוחות</div>
              <div>
                <span style={personBadge('שירה קשר', true)}>👩‍🎤 פעילה</span>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
              <AgentTitle id="agent-onboarding" name="OnBoard Pro" />
              <div style={{ fontSize: '0.75rem', color: '#2dd4bf', fontWeight: 600, marginBottom: 4 }}>סוכן קליטת לקוחות</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>553 לקוחות | SUMMIT מומחה | 95% הצלחת קליטה</div>
            </div>
          </div>
        </div>

        {/* גבייה ותזכורות */}
        <div>
          <div style={sectionStyle('#f59e0b')}>
            גבייה ותזכורות
          </div>
          <div style={cardStyle}>
            <div style={{ marginBottom: 14 }}>
              <AgentTitle id="agent-collection" name="סוכן גבייה" />
              <div style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600, marginBottom: 4 }}>גבייה אוטומטית</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>מדרג תזכורות 3/8/12 ימים</div>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
              <AgentTitle id="agent-reminders" name="סוכן תזכורות" />
              <div style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600, marginBottom: 4 }}>תזכורות דדליינים</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>מדרג 14/7/3/1 ימים</div>
            </div>
          </div>
        </div>

        {/* תקשורת לקוחות */}
        <div>
          <div style={sectionStyle('#3b82f6')}>
            תקשורת לקוחות
          </div>
          <div style={cardStyle}>
            <div style={{ marginBottom: 14 }}>
              <AgentTitle id="agent-whatsapp" name="סוכן וואטסאפ" />
              <div style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 600, marginBottom: 4 }}>תקשורת לקוחות בוואטסאפ</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>מענה מיידי, זיהוי לקוח מ-SUMMIT, sentiment analysis</div>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
              <AgentTitle id="agent-broadcast" name="פרו-קום דיגיטל" />
              <div style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 600, marginBottom: 4 }}>סוכן שידור חכם</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>553 לקוחות | multi-channel orchestration | crisis protocol</div>
            </div>
          </div>
        </div>

        {/* מכירות וצמיחה */}
        <div>
          <div style={sectionStyle('#10b981')}>
            מכירות וצמיחה
          </div>
          <div style={cardStyle}>
            <div>
              <AgentTitle id="agent-growth" name="שרה שירות" />
              <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, marginBottom: 4 }}>סוכנת צמיחה</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: 6 }}>cross-sell + up-sell | 5 הזדמנויות/חודש | ₪20K הכנסות נוספות</div>
              <div>
                <span style={personBadge('שרה שירות', true)}>📈 פעילה</span>
              </div>
            </div>
          </div>
        </div>

        {/* טכנולוגיה ופיתוח */}
        <div>
          <div style={sectionStyle('#6366f1')}>
            טכנולוגיה ופיתוח
          </div>
          <div style={cardStyle}>
            <div>
              <AgentTitle id="agent-portal" name="דני פרקטי-פתרונות" />
              <div style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: 600, marginBottom: 4 }}>מפתח פורטל לקוחות</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: 6 }}>Vue.js + Laravel | אינטגרציה SUMMIT | חיסכון 15-20 שעות/שבוע</div>
              <div>
                <span style={personBadge('דני פרקטי-פתרונות', true)}>💻 פעיל</span>
              </div>
            </div>
          </div>
        </div>

        {/* CRM ושימור לקוחות */}
        <div>
          <div style={sectionStyle('#ec4899')}>
            CRM ושימור לקוחות
          </div>
          <div style={cardStyle}>
            <div>
              <AgentTitle id="agent-crm" name="אלכס-CRM" />
              <div style={{ fontSize: '0.75rem', color: '#ec4899', fontWeight: 600, marginBottom: 4 }}>מנהל קשרי לקוחות דיגיטלי</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: 6 }}>גישור SUMMIT↔Monday | סיווג סיכונים | דו"ח יומי 17:00</div>
              <div>
                <span style={personBadge('אלכס-CRM', true)}>🎯 פעיל</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrgChartPage;
