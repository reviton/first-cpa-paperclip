import React, { useState } from 'react';
import { interviewReport, hrInterviewReport, collectionInterviewReport } from '../data/interview';
import { payrollInterviewReport, virtualCompanyInterviewReport, remindersInterviewReport, whatsappInterviewReport, bookkeepingInterviewReport, corporateInterviewReport, reasonabilityInterviewReport, onboardingInterviewReport, broadcastInterviewReport, growthInterviewReport, portalInterviewReport, crmInterviewReport } from '../data/interviews-extra';

const scoreLabels: Record<string, string> = {
  strategicThinking: 'חשיבה אסטרטגית',
  domainExpertise: 'ידע מקצועי',
  delegationAbility: 'האצלת סמכויות',
  techAdoption: 'אימוץ טכנולוגיה',
  culturalFit: 'התאמה תרבותית',
  hebrewCommunication: 'תקשורת בעברית',
};

const scoreColors: Record<string, string> = {
  'candidate-a': '#2dd4bf',
  'candidate-b': '#22c55e',
  'candidate-c': '#2dd4bf',
  'candidate-d': '#f59e0b',
};

const candidateColors: Record<string, string> = {
  'candidate-a': 'linear-gradient(135deg, #2dd4bf, #00f2fe)',
  'candidate-b': 'linear-gradient(135deg, #22c55e, #38f9d7)',
  'candidate-c': 'linear-gradient(135deg, #2dd4bf, #22c55e)',
  'candidate-d': 'linear-gradient(135deg, #f59e0b, #ef4444)',
};

const InterviewPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'candidates' | 'scores' | 'report'>('comparison');
  const [activeInterview, setActiveInterview] = useState<'ceo' | 'hr' | 'collection' | 'reminders' | 'whatsapp' | 'virtual' | 'payroll' | 'bookkeeping' | 'corporate' | 'reasonability' | 'onboarding' | 'broadcast' | 'growth' | 'portal' | 'crm'>('ceo');
  const reportMap: Record<string, typeof interviewReport> = {
    ceo: interviewReport, hr: hrInterviewReport, collection: collectionInterviewReport,
    reminders: remindersInterviewReport, whatsapp: whatsappInterviewReport,
    virtual: virtualCompanyInterviewReport, payroll: payrollInterviewReport,
    bookkeeping: bookkeepingInterviewReport, corporate: corporateInterviewReport,
    reasonability: reasonabilityInterviewReport,
    onboarding: onboardingInterviewReport,
    broadcast: broadcastInterviewReport,
    growth: growthInterviewReport,
    portal: portalInterviewReport,
    crm: crmInterviewReport,
  };
  const report = reportMap[activeInterview];

  const { questions, candidates, transcripts, scores, selectedCandidateId, selectionReasoning } = report;
  const winner = candidates.find(c => c.id === selectedCandidateId)!;

  const getAnswer = (candidateId: string, questionId: number): string => {
    const transcript = transcripts.find(t => t.candidateId === candidateId);
    const answer = transcript?.answers.find(a => a.questionId === questionId);
    return answer?.answer || '';
  };

  return (
    <div>
      {/* Hero */}
      <div className="interview-hero">
        <h1>{{ ceo: 'ראיון עבודה - מנכ"ל/ית', hr: 'ראיון עבודה - מנהלת HR', collection: 'ראיון עבודה - סוכן גבייה', reminders: 'ראיון עבודה - סוכן תזכורות', whatsapp: 'ראיון עבודה - סוכן וואטסאפ', virtual: 'ראיון עבודה - סוכן חברות וירטואליות', payroll: 'ראיון עבודה - חשב שכר AI', bookkeeping: 'ראיון עבודה - סוכן הנח"ש עצמאים', corporate: 'ראיון עבודה - סוכן הנח"ש חברות', reasonability: 'ראיון עבודה - סוכנת בדיקת סבירות', onboarding: 'ראיון עבודה - סוכן קליטת לקוחות', broadcast: 'ראיון עבודה - סוכן שידור חכם', growth: 'ראיון עבודה - סוכנת צמיחה', portal: 'ראיון עבודה - מפתח פורטל לקוחות', crm: 'ראיון עבודה - סוכן CRM' }[activeInterview]}</h1>
        <p>{{ ceo: '3 מועמדים | 10 שאלות | דו"ח הערכה מלא', hr: '3 מועמדים | 26 שאלות | דו"ח הערכה מלא', collection: '4 מועמדים | 18 שאלות | דו"ח הערכה מלא', reminders: '4 מועמדים | 18 שאלות | דו"ח הערכה מלא', whatsapp: '4 מועמדים | 18 שאלות | דו"ח הערכה מלא', virtual: '3 מועמדים | 20 שאלות | דו"ח הערכה מלא', payroll: '3 מועמדים | 10 שאלות | דו"ח הערכה מלא', bookkeeping: '3 מועמדים | 20 שאלות | מיכל ברק מראיינת', corporate: '3 מועמדים | 20 שאלות | מיכל ברק מראיינת', reasonability: '3 מועמדים (מתוך 6) | 20 שאלות | מיכל ברק מראיינת', onboarding: '3 מועמדים | 20 שאלות | מיכל ברק מראיינת', broadcast: '3 מועמדים | 20 שאלות | מיכל ברק מראיינת', growth: '3 מועמדים | 20 שאלות | מיכל ברק מראיינת', portal: '3 מועמדים | 18 שאלות | מיכל ברק מראיינת', crm: '3 מועמדים | 20 שאלות | מיכל ברק מראיינת' }[activeInterview]}</p>
      </div>

      {/* Interview Selector */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '16px 0' }}>
        <button onClick={() => setActiveInterview('ceo')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          background: activeInterview === 'ceo' ? '#0f172a' : 'white',
          color: activeInterview === 'ceo' ? 'white' : '#0f172a',
          border: '2px solid #0f172a',
        }}>🎯 ראיון מנכ"ל</button>
        <button onClick={() => setActiveInterview('hr')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          background: activeInterview === 'hr' ? '#0f172a' : 'white',
          color: activeInterview === 'hr' ? 'white' : '#0f172a',
          border: '2px solid #0f172a',
        }}>👩‍🦰 ראיון מנהלת HR</button>
        <button onClick={() => setActiveInterview('collection')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          background: activeInterview === 'collection' ? '#0f172a' : 'white',
          color: activeInterview === 'collection' ? 'white' : '#0f172a',
          border: '2px solid #0f172a',
        }}>💰 ראיון סוכן גבייה</button>
        <button onClick={() => setActiveInterview('reminders')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          background: activeInterview === 'reminders' ? '#0f172a' : 'white',
          color: activeInterview === 'reminders' ? 'white' : '#0f172a',
          border: '2px solid #0f172a',
        }}>⏰ ראיון סוכן תזכורות</button>
        <button onClick={() => setActiveInterview('whatsapp')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          background: activeInterview === 'whatsapp' ? '#0f172a' : 'white',
          color: activeInterview === 'whatsapp' ? 'white' : '#0f172a',
          border: '2px solid #0f172a',
        }}>📱 ראיון סוכן וואטסאפ</button>
        <button onClick={() => setActiveInterview('virtual')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          background: activeInterview === 'virtual' ? '#0f172a' : 'white',
          color: activeInterview === 'virtual' ? 'white' : '#0f172a',
          border: '2px solid #0f172a',
        }}>🏢 ראיון סוכן חברות וירטואליות</button>
        <button onClick={() => setActiveInterview('payroll')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          background: activeInterview === 'payroll' ? '#0f172a' : 'white',
          color: activeInterview === 'payroll' ? 'white' : '#0f172a',
          border: '2px solid #0f172a',
        }}>📋 ראיון חשב שכר</button>
        <button onClick={() => setActiveInterview('bookkeeping')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          background: activeInterview === 'bookkeeping' ? '#0f172a' : 'white',
          color: activeInterview === 'bookkeeping' ? 'white' : '#0f172a',
          border: '2px solid #0f172a',
        }}>📊 ראיון הנח"ש עצמאים</button>
        <button onClick={() => setActiveInterview('corporate')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          background: activeInterview === 'corporate' ? '#0f172a' : 'white',
          color: activeInterview === 'corporate' ? 'white' : '#0f172a',
          border: '2px solid #0f172a',
        }}>🏛️ ראיון הנח"ש חברות</button>
        <button onClick={() => setActiveInterview('reasonability')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          background: activeInterview === 'reasonability' ? '#0f172a' : 'white',
          color: activeInterview === 'reasonability' ? 'white' : '#0f172a',
          border: '2px solid #0f172a',
        }}>🔍 ראיון בדיקת סבירות</button>
        <button onClick={() => setActiveInterview('onboarding')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          background: activeInterview === 'onboarding' ? '#0f172a' : 'white',
          color: activeInterview === 'onboarding' ? 'white' : '#0f172a',
          border: '2px solid #0f172a',
        }}>🎯 ראיון קליטת לקוחות</button>
        <button onClick={() => setActiveInterview('broadcast')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          background: activeInterview === 'broadcast' ? '#0f172a' : 'white',
          color: activeInterview === 'broadcast' ? 'white' : '#0f172a',
          border: '2px solid #0f172a',
        }}>📡 ראיון סוכן שידור</button>
        <button onClick={() => setActiveInterview('growth')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          background: activeInterview === 'growth' ? '#0f172a' : 'white',
          color: activeInterview === 'growth' ? 'white' : '#0f172a',
          border: '2px solid #0f172a',
        }}>📈 ראיון סוכנת צמיחה</button>
        <button onClick={() => setActiveInterview('portal')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          background: activeInterview === 'portal' ? '#0f172a' : 'white',
          color: activeInterview === 'portal' ? 'white' : '#0f172a',
          border: '2px solid #0f172a',
        }}>💻 ראיון מפתח פורטל</button>
        <button onClick={() => setActiveInterview('crm')} style={{
          padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          background: activeInterview === 'crm' ? '#0f172a' : 'white',
          color: activeInterview === 'crm' ? 'white' : '#0f172a',
          border: '2px solid #0f172a',
        }}>🎯 ראיון סוכן CRM</button>
      </div>

      {/* Winner Banner */}
      <div className="winner-banner">
        <div className="winner-badge">🏆</div>
        <div className="winner-info">
          <h3>נבחרה: {winner.name}</h3>
          <p>{winner.nickname} | ציון: {scores[winner.id].total}/60</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === 'comparison' ? 'tab-active' : ''}`} onClick={() => setActiveTab('comparison')}>
          השוואת תשובות
        </button>
        <button className={`tab ${activeTab === 'scores' ? 'tab-active' : ''}`} onClick={() => setActiveTab('scores')}>
          טבלת ציונים
        </button>
        <button className={`tab ${activeTab === 'candidates' ? 'tab-active' : ''}`} onClick={() => setActiveTab('candidates')}>
          פרופיל מועמדים
        </button>
        <button className={`tab ${activeTab === 'report' ? 'tab-active' : ''}`} onClick={() => setActiveTab('report')}>
          דו"ח סופי
        </button>
      </div>

      {/* === COMPARISON VIEW - All answers side by side === */}
      {activeTab === 'comparison' && (
        <div className="interview-section">
          {/* Candidates header strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '12px',
            marginBottom: '24px',
            position: 'sticky',
            top: '60px',
            zIndex: 10,
            paddingTop: '8px',
            paddingBottom: '8px',
            background: 'var(--background)',
          }}>
            {candidates.map(c => (
              <div key={c.id} style={{
                background: candidateColors[c.id],
                color: 'white',
                padding: '14px 16px',
                borderRadius: '10px',
                textAlign: 'center',
                boxShadow: c.id === selectedCandidateId ? '0 0 0 3px rgba(72,187,120,0.5)' : 'none',
              }}>
                <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>{c.nickname}</div>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>
                  {c.name} {c.id === selectedCandidateId && '🏆'}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: '2px' }}>
                  ציון: {scores[c.id].total}/60
                </div>
              </div>
            ))}
          </div>

          {/* Questions with side-by-side answers */}
          {questions.map(q => (
            <div key={q.id} style={{
              marginBottom: '28px',
              background: 'white',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
            }}>
              {/* Question header */}
              <div style={{
                padding: '16px 20px',
                background: '#f8fafc',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <div className="question-number">{q.id}</div>
                <div>
                  <div className="question-category">{q.category}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{q.question}</div>
                </div>
              </div>

              {/* 3-column answers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '0',
              }}>
                {candidates.map((c, idx) => (
                  <div key={c.id} style={{
                    padding: '16px 18px',
                    borderLeft: idx > 0 ? '1px solid var(--border-color)' : 'none',
                    background: c.id === selectedCandidateId ? '#f8fdf9' : 'white',
                    fontSize: '0.84rem',
                    lineHeight: '1.65',
                    color: 'var(--text-dark)',
                  }}>
                    <div style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: scoreColors[c.id],
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      {c.id === selectedCandidateId && '🏆 '}{c.name.split(' ')[0]}
                    </div>
                    {getAnswer(c.id, q.id)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* === SCORES === */}
      {activeTab === 'scores' && (
        <div className="interview-section">
          <h2>טבלת הערכה</h2>
          <table className="scores-table">
            <thead>
              <tr>
                <th>קריטריון</th>
                {candidates.map(c => (
                  <th key={c.id}>
                    {c.name}
                    {c.id === selectedCandidateId && ' 🏆'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(scoreLabels).map(([key, label]) => (
                <tr key={key}>
                  <td>{label}</td>
                  {candidates.map(c => {
                    const score = (scores[c.id] as any)[key];
                    const maxInRow = Math.max(...candidates.map(cc => (scores[cc.id] as any)[key]));
                    return (
                      <td key={c.id} className={c.id === selectedCandidateId ? 'score-winner' : ''}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <span className={score === maxInRow ? 'score-highlight' : ''}>{score}/10</span>
                          <div className="score-bar" style={{ width: '60px' }}>
                            <div className="score-bar-fill" style={{
                              width: `${score * 10}%`,
                              background: scoreColors[c.id]
                            }} />
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr style={{ fontWeight: 700, background: '#f8fafc' }}>
                <td>סה"כ</td>
                {candidates.map(c => (
                  <td key={c.id} className={c.id === selectedCandidateId ? 'score-winner' : ''}>
                    <span className={c.id === selectedCandidateId ? 'score-highlight' : ''} style={{ fontSize: '1.1rem' }}>
                      {scores[c.id].total}/60
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* === CANDIDATES === */}
      {activeTab === 'candidates' && (
        <div className="interview-section">
          <h2>המועמדים</h2>
          <div className="candidates-grid">
            {candidates.map(candidate => (
              <div key={candidate.id} className={`candidate-card candidate-${candidate.id.split('-')[1]} ${candidate.id === selectedCandidateId ? 'candidate-card-selected' : ''}`}>
                <div className="candidate-header">
                  <div className="candidate-nickname">{candidate.nickname}</div>
                  <div className="candidate-name">
                    {candidate.name}
                    {candidate.id === selectedCandidateId && ' 🏆'}
                  </div>
                </div>
                <div className="candidate-body">
                  <div className="candidate-background">{candidate.background}</div>
                  <div className="candidate-list">
                    <h4>חוזקות:</h4>
                    <ul>
                      {candidate.strengths.map(s => <li key={s}>{s}</li>)}
                    </ul>
                  </div>
                  <div className="candidate-list">
                    <h4>חולשות:</h4>
                    <ul>
                      {candidate.weaknesses.map(w => <li key={w}>{w}</li>)}
                    </ul>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '8px' }}>
                    <strong>פילוסופיה:</strong> {candidate.philosophy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === REPORT === */}
      {activeTab === 'report' && (
        <div className="interview-section">
          <div className="selection-report">
            {selectionReasoning.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
              if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>;
              if (line.startsWith('**') && line.endsWith('**')) return <p key={i}><strong>{line.replace(/\*\*/g, '')}</strong></p>;
              if (line.startsWith('- ') || line.startsWith('✅') || line.startsWith('❌') || line.startsWith('⚠️') || line.startsWith('✨')) {
                return <p key={i} style={{ paddingRight: '16px', margin: '4px 0' }}>{line}</p>;
              }
              if (line.match(/^\d+\./)) return <p key={i} style={{ paddingRight: '16px', margin: '4px 0' }}>{line}</p>;
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} style={{ margin: '6px 0' }}>{line}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;