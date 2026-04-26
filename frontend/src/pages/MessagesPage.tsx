import React from 'react';

const MessagesPage: React.FC = () => {
  return (
    <div className="card">
      <div className="card-body" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>💬</div>
        <h2 style={{ marginBottom: 8 }}>הודעות בין סוכנים</h2>
        <p style={{ color: 'var(--text-light)' }}>
          אין נתונים אמיתיים עדיין — העמוד יתמלא כשהסוכנים יתחילו לפעול במערכת.
        </p>
      </div>
    </div>
  );
};

export default MessagesPage;
