import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { agents } from '../../data/agents';

const navItems = [
  { path: '/', label: 'לוח בקרה', icon: '📊' },
  { path: '/agents', label: 'סוכנים', icon: '🤖' },
  { path: '/tasks', label: 'סקילים', icon: '⚡' },
  { path: '/org-chart', label: 'תרשים ארגוני', icon: '🏢' },
  { path: '/messages', label: 'הודעות', icon: '💬' },
  { path: '/approvals', label: 'אישורים', icon: '✅' },
  { path: '/interview', label: 'ראיונות עבודה', icon: '🎯' },
  { path: '/chat', label: 'שיחה עם סוכנים', icon: '🗣️' },
  { path: '/strategic-plan', label: 'תוכנית אסטרטגית', icon: '📈' },
];

const skillCategories = [
  { name: 'אסטרטגיה', icon: '📐', skills: [
    { cmd: 'strategic-plan', label: 'תוכנית אסטרטגית' },
    { cmd: 'business-case', label: 'תיק עסקי' },
    { cmd: 'risk-assessment', label: 'הערכת סיכונים' },
    { cmd: 'pricing-strategy', label: 'אסטרטגיית תמחור' },
    { cmd: 'okr-design', label: 'עיצוב OKRs' },
    { cmd: 'competitor-map', label: 'מיפוי מתחרים' },
  ]},
  { name: 'כספים', icon: '💰', skills: [
    { cmd: 'charlie-cfo', label: 'סמנכ"ל כספים AI' },
    { cmd: 'financial-analyst', label: 'אנליסט פיננסי' },
    { cmd: 'invoice-organizer', label: 'ארגון חשבוניות' },
    { cmd: 'forecast-model', label: 'מודל תחזית' },
    { cmd: 'unit-economics', label: 'כלכלת יחידה' },
  ]},
  { name: 'HR', icon: '👥', skills: [
    { cmd: 'interview-kit', label: 'ערכת ראיון' },
    { cmd: 'performance-review', label: 'הערכת ביצועים' },
    { cmd: 'onboarding-plan', label: 'תוכנית קליטה' },
    { cmd: 'retention-plan', label: 'תוכנית שימור' },
    { cmd: 'difficult-conversation', label: 'שיחה קשה' },
  ]},
  { name: 'תפעול', icon: '⚙️', skills: [
    { cmd: 'process-map', label: 'מיפוי תהליכים' },
    { cmd: 'sop-write', label: 'כתיבת SOP' },
    { cmd: 'automation-audit', label: 'ביקורת אוטומציה' },
    { cmd: 'vendor-evaluation', label: 'הערכת ספקים' },
    { cmd: 'metrics-dashboard', label: 'לוח מדדים' },
  ]},
  { name: 'צמיחה', icon: '🚀', skills: [
    { cmd: 'sales-script', label: 'תסריט מכירה' },
    { cmd: 'customer-success', label: 'הצלחת לקוחות' },
    { cmd: 'churn-analysis', label: 'ניתוח נטישה' },
    { cmd: 'growth-strategy', label: 'אסטרטגיית צמיחה' },
  ]},
  { name: 'תקשורת', icon: '📣', skills: [
    { cmd: 'exec-presentation', label: 'מצגת הנהלה' },
    { cmd: 'negotiation-prep', label: 'הכנה למו"מ' },
    { cmd: 'crisis-comms', label: 'תקשורת משבר' },
  ]},
  { name: 'עיצוב', icon: '🎨', skills: [
    { cmd: 'dashboard-design', label: 'עיצוב Dashboard' },
    { cmd: 'landing-page', label: 'דף נחיתה' },
    { cmd: 'ui-review', label: 'סקירת UI' },
    { cmd: 'nlb-brand', label: 'מיתוג' },
  ]},
  { name: 'מתקדם', icon: '🧠', skills: [
    { cmd: 'ceo-advisor', label: 'יועץ מנכ"ל' },
    { cmd: 'deep-research', label: 'מחקר מעמיק' },
    { cmd: 'contracts-review', label: 'סקירת חוזים' },
  ]},
];

const Sidebar: React.FC = () => {
  const [showSkills, setShowSkills] = useState(false);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSkillClick = (cmd: string) => {
    navigate(`/chat?skill=${cmd}`);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img src="/logo.gif" alt="First CPA" style={{ width: 42, height: 42, borderRadius: 10 }} />
        <div>
          <h2>First CPA</h2>
          <span className="sidebar-subtitle">מערכת סוכנים</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        <button
          onClick={() => setShowSkills(!showSkills)}
          className="sidebar-link"
          style={{ width: '100%', background: showSkills ? 'rgba(45,212,191,0.15)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'right', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 8, color: 'inherit', fontSize: 'inherit' }}
        >
          <span className="sidebar-icon">🛠️</span>
          <span>כלים מקצועיים</span>
          <span style={{ marginRight: 'auto', fontSize: '0.7rem', opacity: 0.6 }}>{showSkills ? '▲' : '▼'}</span>
        </button>

        {showSkills && (
          <div style={{ maxHeight: 300, overflowY: 'auto', paddingRight: 8, paddingLeft: 4 }}>
            {skillCategories.map(cat => (
              <div key={cat.name}>
                <button
                  onClick={() => setExpandedCat(expandedCat === cat.name ? null : cat.name)}
                  style={{
                    width: '100%', background: 'transparent', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                    color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', fontWeight: 600, textAlign: 'right',
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span style={{ marginRight: 'auto', fontSize: '0.6rem' }}>{expandedCat === cat.name ? '−' : '+'}</span>
                </button>
                {expandedCat === cat.name && (
                  <div style={{ paddingRight: 20 }}>
                    {cat.skills.map(skill => (
                      <button
                        key={skill.cmd}
                        onClick={() => handleSkillClick(skill.cmd)}
                        style={{
                          width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 6, padding: '5px 10px', margin: '2px 0', cursor: 'pointer',
                          color: 'rgba(255,255,255,0.85)', fontSize: '0.73rem', textAlign: 'right',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(45,212,191,0.2)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                      >
                        /{skill.cmd} — {skill.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-status">
          <span className="status-dot status-online"></span>
          <span>{agents.filter(a => a.isActive && a.id !== 'chair-tomer').length} סוכנים פעילים</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
