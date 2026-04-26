import React from 'react';
import { Link } from 'react-router-dom';
import { agents } from '../data/agents';
import { agentStatusLabels, AgentStatus } from '../types';
import LegoAvatar from '../components/shared/LegoAvatar';

const AgentsPage: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ color: 'var(--text-light)', margin: 0 }}>
          {agents.length} סוכנים | {agents.filter(a => a.status === AgentStatus.BUSY).length} עסוקים
        </p>
      </div>

      <div className="agents-grid">
        {agents.map(agent => {
          return (
            <Link key={agent.id} to={`/agents/${agent.id}`} className="agent-card">
              <div className="agent-card-header">
                <div className="agent-avatar agent-avatar-lego">
                  <LegoAvatar agentId={agent.id} size={64} />
                </div>
                <div className="agent-card-info">
                  <h3>{agent.name}</h3>
                  <div className="agent-card-role">{agent.role}</div>
                </div>
                <span className={`badge badge-${agent.status.toLowerCase()}`}>
                  {agentStatusLabels[agent.status]}
                </span>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '8px' }}>
                {agent.department && <span>מחלקה: {agent.department}</span>}
              </div>

              <div className="agent-card-skills">
                {agent.skills.slice(0, 4).map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
                {agent.skills.length > 4 && (
                  <span className="skill-tag">+{agent.skills.length - 4}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AgentsPage;
