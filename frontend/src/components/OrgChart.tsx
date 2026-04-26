import React from 'react';
import '../styles/orgchart.css';

interface Agent {
  id: string;
  name: string;
  role: string;
  position: string;
}

interface OrgChartProps {
  agents: Agent[];
}

const OrgChart: React.FC<OrgChartProps> = ({ agents }) => {
  return (
    <div className="org-chart-container">
      <h2>תרשים ארגוני</h2>

      <div className="org-chart">
        {/* יו"ר */}
        <div className="org-level level-1">
          <div className="org-position">
            <div className="role-title">יו"ר</div>
            <div className="org-box">
              <div className="position-label">משמנון ארגון</div>
            </div>
          </div>
        </div>

        {/* מנכ"ל */}
        <div className="org-level level-2">
          <div className="org-position">
            <div className="role-title">מנכ"ל</div>
            <div className="org-box">
              <div className="position-label">מנהלת עליונה</div>
            </div>
          </div>
        </div>

        {/* מנהל HR */}
        <div className="org-level level-3">
          <div className="org-position">
            <div className="role-title">מנהל HR</div>
            <div className="org-box">
              <div className="position-label">גיוס סוכנים</div>
            </div>
          </div>
        </div>

        {/* סוכנים */}
        <div className="org-level level-4">
          {agents.length > 0 ? (
            agents.map((agent) => (
              <div key={agent.id} className="org-position">
                <div className="role-title">{agent.role}</div>
                <div className="org-box agent-box">
                  <div className="agent-name">{agent.name}</div>
                  <div className="agent-role">{agent.position}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="org-position">
              <div className="role-title">סוכנים</div>
              <div className="org-box empty-box">
                <div className="position-label">בהמתנה לגיוס...</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgChart;
