import React from 'react';
import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/': 'לוח בקרה',
  '/agents': 'סוכנים',
  '/tasks': 'קטלוג סקילים',
  '/org-chart': 'תרשים ארגוני',
  '/messages': 'הודעות',
  '/approvals': 'אישורים',
  '/interview': 'ראיונות עבודה',
};

const Header: React.FC = () => {
  const location = useLocation();
  const basePath = '/' + (location.pathname.split('/')[1] || '');
  const title = pageTitles[basePath] || 'ארגון CPA ראשון';

  const today = new Date().toLocaleDateString('he-IL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="header">
      <div className="header-right">
        <h1 className="header-title">{title}</h1>
        <span className="header-subtitle">פירסט חשבונאות ופיננסים</span>
      </div>
      <div className="header-left">
        <span className="header-date">{today}</span>
        <div className="header-avatar">ת.פ</div>
      </div>
    </header>
  );
};

export default Header;
