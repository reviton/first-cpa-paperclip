import React from 'react';
import { Link } from 'react-router-dom';
import { agents } from '../data/agents';
import { AgentStatus, agentStatusLabels } from '../types';

const DashboardPage: React.FC = () => {
  const activeAgents = agents.filter(a => a.isActive && a.id !== 'chair-tomer');
  const busyAgents = agents.filter(a => a.status === AgentStatus.BUSY);

  const today = new Date().getDate();

  const timelineItems = [
    { label: 'תזכורות', days: '1-5', done: today > 5 },
    { label: 'משכורות', days: '9', done: today > 9 },
    { label: 'מעקב חומר', days: '10', done: today > 10 },
    { label: 'דיווחים', days: '15-19', done: today > 19 },
    { label: 'חיוב אשראי', days: '16', done: today > 16 },
    { label: 'דוחות', days: '25', done: today > 25 },
    { label: 'מאזנים', days: '25-31', done: false },
  ];

  return (
    <div>
      {/* Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">סוכנים פעילים</span>
            <span className="stat-card-icon" style={{ background: '#f0f4ff' }}>🤖</span>
          </div>
          <div className="stat-card-value">{activeAgents.length}</div>
          <div className="stat-card-subtitle">{busyAgents.length} עסוקים כרגע</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">לקוחות</span>
            <span className="stat-card-icon" style={{ background: '#ede9fe' }}>👥</span>
          </div>
          <div className="stat-card-value">553</div>
          <div className="stat-card-subtitle">~500 פעילים</div>
        </div>
      </div>

      {/* Monthly Timeline */}
      <div className="dashboard-timeline">
        <div className="card">
          <div className="card-header">
            <h2>לוח זמנים חודשי</h2>
          </div>
          <div className="card-body">
            <div className="timeline">
              {timelineItems.map((item, i) => {
                const isActive = !item.done && (i === 0 || timelineItems[i - 1].done);
                return (
                  <div key={i} className="timeline-item">
                    <div className={`timeline-dot ${item.done ? 'timeline-dot-done' : isActive ? 'timeline-dot-active' : 'timeline-dot-pending'}`} />
                    <div className="timeline-label">{item.label}</div>
                    <div className="timeline-date">יום {item.days}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Agent Status */}
      <div className="card">
        <div className="card-header">
          <h2>סטטוס סוכנים</h2>
          <Link to="/agents" style={{ fontSize: '0.85rem' }}>הצג הכל</Link>
        </div>
        <div className="card-body">
          {activeAgents.map(agent => (
            <div key={agent.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className={`status-dot ${agent.status === AgentStatus.BUSY ? '' : 'status-online'}`}
                  style={{ background: agent.status === AgentStatus.BUSY ? 'var(--primary-color)' : undefined }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{agent.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{agent.role}</div>
                </div>
              </div>
              <span className={`badge badge-${agent.status.toLowerCase()}`}>
                {agentStatusLabels[agent.status]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
