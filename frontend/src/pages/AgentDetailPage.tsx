import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { agents, getAgentName } from '../data/agents';
import { tasks } from '../data/tasks';
import { messages } from '../data/messages';
import { taskStatusLabels, agentStatusLabels } from '../types';
import { getSkillByCommand, categoryColors } from '../data/claudeSkills';

const avatarEmoji: Record<string, string> = {
  'chair-tomer': '👑',
  'agent-ceo': '🎯',
  'agent-hr': '👥',
  'agent-auditor': '📊',
  'agent-case-manager': '📁',
  'agent-client-relations': '💬',
};

const AgentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'tasks' | 'messages' | 'skills' | 'knowledge'>('tasks');

  const agent = agents.find(a => a.id === id);
  if (!agent) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <div className="empty-state-text">סוכן לא נמצא</div>
        <Link to="/agents" style={{ marginTop: '16px', display: 'inline-block' }}>חזרה לרשימת סוכנים</Link>
      </div>
    );
  }

  const agentTasks = tasks.filter(t => t.assignedAgent === agent.id || t.assignedBy === agent.id);
  const agentMessages = messages.filter(m => m.from === agent.id || m.to === agent.id);

  return (
    <div>
      <Link to="/agents" style={{ fontSize: '0.85rem', marginBottom: '16px', display: 'inline-block' }}>
        ← חזרה לסוכנים
      </Link>

      <div className="agent-detail-header">
        <div className="agent-detail-avatar" style={{
          background: agent.position === 'CHAIR' ? 'linear-gradient(135deg, #a18cd1, #fbc2eb)' :
            agent.position === 'CEO' ? 'linear-gradient(135deg, #2dd4bf, #22c55e)' :
            agent.position === 'HR_MANAGER' ? 'linear-gradient(135deg, #f093fb, #f5576c)' :
            'linear-gradient(135deg, #2dd4bf, #00f2fe)'
        }}>
          {avatarEmoji[agent.id] || '🤖'}
        </div>
        <div className="agent-detail-info">
          <h1>{agent.name}</h1>
          <div className="agent-detail-role">
            {agent.role} | {agent.department || 'כללי'} |{' '}
            <span className={`badge badge-${agent.status.toLowerCase()}`}>
              {agentStatusLabels[agent.status]}
            </span>
          </div>
          <div className="agent-detail-skills">
            {agent.skills.map(skill => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'tasks' ? 'tab-active' : ''}`} onClick={() => setActiveTab('tasks')}>
          משימות ({agentTasks.length})
        </button>
        <button className={`tab ${activeTab === 'messages' ? 'tab-active' : ''}`} onClick={() => setActiveTab('messages')}>
          הודעות ({agentMessages.length})
        </button>
        <button className={`tab ${activeTab === 'skills' ? 'tab-active' : ''}`} onClick={() => setActiveTab('skills')}>
          כישורים ({agent.skills.length})
        </button>
        {(agent.id === 'agent-hr' || agent.id === 'agent-ceo') && (
          <button className={`tab ${activeTab === 'knowledge' ? 'tab-active' : ''}`} onClick={() => setActiveTab('knowledge')}>
            מאגר ידע
          </button>
        )}
      </div>

      {activeTab === 'tasks' && (
        <div className="card">
          {agentTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <div className="empty-state-text">אין משימות</div>
            </div>
          ) : (
            agentTasks.map(task => (
              <div key={task.id} className="task-row">
                <div className={`task-priority-bar ${task.priority.toLowerCase()}`} />
                <div className="task-info">
                  <div className="task-title">{task.title}</div>
                  <div className="task-meta">
                    <span>{task.assignedAgent === agent.id ? `מאת: ${getAgentName(task.assignedBy)}` : `ל: ${getAgentName(task.assignedAgent)}`}</span>
                    {task.dueDate && <span>עד {new Date(task.dueDate).toLocaleDateString('he-IL')}</span>}
                  </div>
                </div>
                <span className={`badge badge-${task.status.toLowerCase().replace('_', '-')}`}>
                  {taskStatusLabels[task.status]}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="card">
          <div className="card-body">
            <div className="messages-thread">
              {agentMessages.map(msg => {
                const isSent = msg.from === agent.id;
                return (
                  <div key={msg.id} className={`message-bubble ${isSent ? 'message-bubble-sent' : 'message-bubble-received'}`}>
                    <div className="message-sender">
                      {isSent ? agent.name : getAgentName(msg.from)}
                    </div>
                    <div className="message-content">{msg.content}</div>
                    <div className="message-time">
                      {new Date(msg.createdAt).toLocaleString('he-IL')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'skills' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title">כישורים אנושיים</div>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {agent.skills.map(skill => (
                  <div key={skill} style={{
                    padding: '16px',
                    background: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⚡</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{skill}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {agent.claudeSkillCommands && agent.claudeSkillCommands.length > 0 && (
            <div className="card">
              <div className="card-header">
                <div className="card-title">סקילים של Claude Code ({agent.claudeSkillCommands.length})</div>
                <div className="card-sub">לחיצה על סקיל פותחת אותו בקטלוג</div>
              </div>
              <div className="card-body">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                  {agent.claudeSkillCommands.map(cmd => {
                    const skill = getSkillByCommand(cmd);
                    if (!skill) return null;
                    return (
                      <Link
                        key={cmd}
                        to={`/tasks?q=${encodeURIComponent(cmd)}`}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          padding: 14,
                          background: '#fff',
                          borderRadius: 10,
                          border: '1px solid var(--border-color)',
                          borderRight: `3px solid ${categoryColors[skill.category] || '#94a3b8'}`,
                          display: 'block',
                          transition: 'box-shadow 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                          <strong style={{ fontSize: 14 }}>{skill.name}</strong>
                        </div>
                        <code style={{
                          display: 'inline-block',
                          background: '#f1f5f9',
                          padding: '2px 8px',
                          borderRadius: 4,
                          fontSize: 12,
                          color: '#0f172a',
                          marginBottom: 6,
                          direction: 'ltr',
                          fontFamily: 'monospace',
                        }}>
                          {skill.command}
                        </code>
                        <p style={{ margin: 0, fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>
                          {skill.description}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'knowledge' && agent.id === 'agent-hr' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-header"><div className="card-title">פרופיל אישי</div></div>
            <div className="card-body" style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>
              <p><strong>שם:</strong> מיכל ברק</p>
              <p><strong>ניסיון:</strong> 12 שנות HR | 3 שנים ב-Payoneer (פינטק)</p>
              <p><strong>השכלה:</strong> תואר בכלכלה + תעודת מנהלת משאבי אנוש</p>
              <p><strong>פילוסופיה:</strong> "השינוי הזה הוא 70% אנשים ו-30% טכנולוגיה"</p>
              <p><strong>מדווחת ל:</strong> נועה לוי-אלגוריתם (מנכ"לית)</p>
              <p><strong>נבחרה:</strong> מתוך 3 מועמדים בראיון של 26 שאלות</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">מבנה ארגוני - מה היא מכירה</div></div>
            <div className="card-body" style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>
              <p><strong>דירקטוריון:</strong> תומר פרי (יו"ר) + שחר דה ולנסה (רו"ח)</p>
              <p><strong>הנהלה:</strong> נועה לוי (מנכ"לית)</p>
              <p><strong>HR:</strong> מיכל ברק (היא)</p>
              <p style={{ marginTop: 8 }}><strong>תחום עצמאים+ביקורת (שחר):</strong></p>
              <p style={{ paddingRight: 16 }}>סוכן הנח"ש עצמאים + עזרא חיו, חנה רוטנברג (413 לקוחות)</p>
              <p style={{ paddingRight: 16 }}>סוכן דוחות וביקורת (דוד חשב) + שקד, סאידה, נידאא</p>
              <p style={{ marginTop: 8 }}><strong>תחום חברות+שכר (תומר):</strong></p>
              <p style={{ paddingRight: 16 }}>סוכן הנח"ש חברות + יעל אסף, יוכבד, צירי, שושי, ברכה, מאיר (~140 לקוחות)</p>
              <p style={{ paddingRight: 16 }}>סוכן חשב שכר + רומן, אסיה</p>
              <p style={{ marginTop: 8 }}><strong>תפעול:</strong> סוכן תפעול (רונית תיק) + סוכן אדמיניסטרציה (שירה קשר)</p>
              <p style={{ marginTop: 8 }}><strong>ממתינים לגיוס:</strong> סוכן חברות וירטואליות, סוכן פנסיוני והשקעות</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">מתודולוגיית ראיון (26 שאלות, 8 קטגוריות)</div></div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                {[
                  { cat: 'רקע ומוטיבציה', count: 3, icon: '👤' },
                  { cat: 'הבנה טכנולוגית', count: 5, icon: '💻' },
                  { cat: 'חשיבה אנליטית', count: 4, icon: '🧠' },
                  { cat: 'ניהול תהליכים', count: 4, icon: '⚙️' },
                  { cat: 'התמודדות עם לחץ', count: 2, icon: '🔥' },
                  { cat: 'חשיבה יצירתית', count: 3, icon: '💡' },
                  { cat: 'בקרת איכות', count: 3, icon: '✅' },
                  { cat: 'שאלות סיום', count: 2, icon: '🎯' },
                ].map(c => (
                  <div key={c.cat} style={{ padding: 12, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.3rem' }}>{c.icon}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', marginTop: 4 }}>{c.cat}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.count} שאלות</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">עקרונות גיוס סוכנים</div></div>
            <div className="card-body" style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>
              {[
                'גיוס סוכנים = התאמת טכנולוגיה לתהליכים, לא HR מסורתי',
                'במקום ראיון - POC ו-pilots עם נתונים אמיתיים',
                'במקום שאלות רכות - בדיקת ביצועים, דיוק, מהירות',
                'במקום התאמה תרבותית - integration למערכות (SUMMIT)',
                'כל סוכן חייב guardrails, kill switch, audit trail',
                'סוכן לא מקבל החלטות כספיות - מעביר לאנושי',
              ].map((p, i) => (
                <div key={i} style={{ padding: '6px 0', borderBottom: i < 5 ? '1px solid #f1f5f9' : 'none' }}>
                  <span style={{ color: '#2dd4bf', marginLeft: 8 }}>●</span> {p}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">גבולות AI (הנחיות תומר)</div></div>
            <div className="card-body" style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>
              <p><strong>אוטונומיה:</strong> 8/10</p>
              <p><strong>תקציב:</strong> ללא הגבלה</p>
              <p><strong>איסור:</strong> פעולה שתגרום נזק כספי או תדמיתי</p>
              <p><strong>הודעות ללקוחות:</strong> רק מתבניות מאושרות 100%</p>
              <p><strong>שינויי רגולציה:</strong> חייבים אישור שחר/תומר לפני יישום</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'knowledge' && agent.id === 'agent-ceo' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-header"><div className="card-title">פרופיל אישי</div></div>
            <div className="card-body" style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>
              <p><strong>שם:</strong> נועה לוי-אלגוריתם</p>
              <p><strong>ניסיון:</strong> CPA + MBA, 10 שנים בחשבונאות, 4 שנים בניהול + AI</p>
              <p><strong>הישג:</strong> הטמעת AI שחסך 40% מזמן העבודה במשרד קודם</p>
              <p><strong>פילוסופיה:</strong> AI מטפל ב-80% מהמשימות הטכניות, תמיד עם פיקוח אנושי</p>
              <p><strong>מדווחת ל:</strong> תומר פרי (יו"ר)</p>
              <p><strong>נבחרה:</strong> מתוך 3 מועמדים בראיון של 10 שאלות</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">תוכנית אסטרטגית (9 סוכנים, 3 שלבים)</div></div>
            <div className="card-body" style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>
              <p><strong>שלב 1 (מיידי):</strong> סוכן גבייה (₪0) | סוכן תזכורות (₪500) | סוכן WhatsApp (₪850)</p>
              <p><strong>שלב 2 (חודש 3):</strong> סוכן סבירות (₪500) | סוכן קליטה (₪200) | סוכן CRM (₪0)</p>
              <p><strong>שלב 3 (חודש 4-6):</strong> סוכן שידור (₪500) | סוכן צמיחה (₪300) | סוכן פורטל (₪500)</p>
              <p style={{ marginTop: 8 }}><strong>סה"כ:</strong> ~₪3,350/חודש | <strong>ROI:</strong> 400-500%</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">כאבים שהיא מטפלת בהם</div></div>
            <div className="card-body" style={{ fontSize: '0.85rem', lineHeight: 1.8 }}>
              {[
                'איחורי הגשות → 20,000₪+ בקנסות ב-3 שנים',
                'עומס וואטסאפ → 20+ הודעות ביום',
                'גבייה ידנית → ~245 לקוחות לא על סליקה אוטומטית',
                'Monday.com לא מספיק טוב כ-CRM',
                'נטישת לקוחות → עשרות בשנה',
              ].map((p, i) => (
                <div key={i} style={{ padding: '6px 0', borderBottom: i < 4 ? '1px solid #f1f5f9' : 'none' }}>
                  <span style={{ color: '#f59e0b', marginLeft: 8 }}>⚠</span> {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDetailPage;
