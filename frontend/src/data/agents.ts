import { Agent, AgentStatus, OrgPosition } from '../types';

export const agents: Agent[] = [
  {
    id: 'chair-tomer',
    name: 'תומר פרי',
    role: 'שותף מנהל',
    position: OrgPosition.CHAIR,
    skills: ['ניהול אסטרטגי', 'כספים עסקיים', 'מכירות וצמיחה', 'HR וניהול צוות'],
    claudeSkillCommands: [
      '/strategic-plan', '/business-case', '/okr-design', '/market-entry', '/competitor-map',
      '/risk-assessment', '/pivot-analysis', '/ceo-advisor', '/traction-eos',
      '/charlie-cfo', '/financial-analyst', '/saas-metrics-coach', '/business-health-diagnostic',
      '/revenue-operations', '/unit-economics',
      '/growth-strategy', '/go-to-market', '/predictable-revenue', '/customer-success', '/retention-plan',
      '/performance-review', '/team-structure', '/difficult-conversation', '/drive-motivation'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'הנהלה',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'agent-ceo',
    name: 'נועה לוי-אלגוריתם',
    role: 'מנכ"לית',
    position: OrgPosition.CEO,
    skills: ['ניהול משימות', 'האצלת סמכויות', 'אישור תהליכים', 'דו"ח יומי', 'ניתוח נתונים'],
    claudeSkillCommands: ['/metrics-dashboard', '/process-map', '/omc-autopilot', '/omc-team', '/risk-assessment'],
    isActive: true,
    status: AgentStatus.BUSY,
    department: 'הנהלה',
    reportsTo: 'chair-tomer',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'agent-hr',
    name: 'מיכל ברק',
    role: 'מנהלת HR',
    position: OrgPosition.HR_MANAGER,
    skills: ['גיוס סוכנים וירטואליים', 'הערכת POC ו-Pilots', 'קליטת סוכנים (5 שלבים)', 'ניהול ביצועים', 'Change Management', 'מתודולוגיית ראיון 26 שאלות', 'שילוב צוות אנושי + AI', 'בקרת איכות סוכנים', 'Guardrails ו-Kill Switch', 'Integration עם SUMMIT', 'ניסיון Payoneer פינטק', 'מבנה ארגוני מלא'],
    claudeSkillCommands: ['/onboarding-plan', '/performance-review', '/retention-plan', '/sop-write'],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'משאבי אנוש',
    reportsTo: 'agent-ceo',
    createdAt: '2024-01-20T00:00:00Z'
  },
  {
    id: 'agent-auditor',
    name: 'דוד חשב',
    role: 'סוכן דוחות וביקורת',
    position: OrgPosition.AGENT,
    skills: ['הכנת דוחות', 'ביקורת', 'בדיקות ציות', 'טופס 1214', 'דו"ח שנתי'],
    claudeSkillCommands: ['/automation-audit', '/sop-write', '/metrics-dashboard', '/risk-assessment'],
    isActive: true,
    status: AgentStatus.BUSY,
    department: 'דוחות וביקורת',
    reportsTo: 'agent-ceo',
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: 'agent-case-manager',
    name: 'רונית תיק',
    role: 'מנהלת תיקיות לקוחות',
    position: OrgPosition.AGENT,
    skills: ['ניהול תיקיות A/B/C', 'מעקב מסמכים', 'בדיקת סבירות', 'תיאום צוות'],
    claudeSkillCommands: ['/process-map', '/sop-write', '/docx', '/xlsx'],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'חשבונאות',
    reportsTo: 'agent-ceo',
    createdAt: '2024-02-10T00:00:00Z'
  },
  {
    id: 'agent-client-relations',
    name: 'שירה קשר',
    role: 'סוכנת קשרי לקוחות',
    position: OrgPosition.AGENT,
    skills: ['תקשורת לקוחות', 'תזכורות', 'וואטסאפ', 'שירות לקוחות'],
    claudeSkillCommands: ['/customer-success', '/sales-script', '/gws-gmail-triage', '/gws-gmail-send'],
    isActive: true,
    status: AgentStatus.BUSY,
    department: 'שירות לקוחות',
    reportsTo: 'agent-ceo',
    createdAt: '2024-02-15T00:00:00Z'
  },
  {
    id: 'agent-collection',
    name: 'סוכן גבייה',
    role: 'סוכן גבייה אוטומטי',
    position: OrgPosition.AGENT,
    skills: ['גבייה אוטומטית', 'תזכורות וואטסאפ', 'מדרג תזכורות 3/8/12', 'חיבור SUMMIT', 'דוחות יומיים/שבועיים', 'זיהוי לקוחות בסיכון', 'בקרת איכות', 'אלרטים מיידיים'],
    claudeSkillCommands: ['/forecast-model', '/unit-economics', '/gws-gmail-send', '/gws-sheets'],
    isActive: true,
    status: AgentStatus.BUSY,
    department: 'גבייה',
    reportsTo: 'agent-ceo',
    createdAt: '2024-04-05T00:00:00Z'
  },
  {
    id: 'agent-reminders',
    name: 'סוכן תזכורות',
    role: 'סוכן תזכורות אוטומטי',
    position: OrgPosition.AGENT,
    skills: ['תזכורות דדליינים', 'מדרג תזכורות 14/7/3/1 ימים', 'לוח שנה עברי', 'חיבור SUMMIT', 'תיעדוף חכם', 'escalation ladder', 'דוחות שבועיים', 'digest יומי'],
    claudeSkillCommands: ['/gws-calendar-agenda', '/gws-calendar-insert', '/gws-workflow-standup-report', '/gws-gmail-send'],
    isActive: true,
    status: AgentStatus.BUSY,
    department: 'תפעול',
    reportsTo: 'agent-ceo',
    createdAt: '2024-04-05T00:00:00Z'
  },
  {
    id: 'agent-virtual-co',
    name: 'אלכס טק-סטארט',
    role: 'סוכן חברות וירטואליות',
    position: OrgPosition.AGENT,
    skills: ['הקמת חברות וירטואליות', 'רישום ברשם החברות', 'תשתית cloud-first', 'API bridge ל-SUMMIT', 'compliance אוטומטי', 'ניהול 15 פרויקטים במקביל', 'disaster recovery', 'חבילות מוכנות לתעשיות', 'KYC/AML', 'SOPs לכל שלב'],
    claudeSkillCommands: ['/contracts-review', '/sop-write', '/docx', '/system-design'],
    isActive: true,
    status: AgentStatus.BUSY,
    department: 'חברות וירטואליות',
    reportsTo: 'agent-ceo',
    createdAt: '2024-04-06T00:00:00Z'
  },
  {
    id: 'agent-payroll',
    name: 'סוכן חשב שכר',
    role: 'חשב שכר AI בכיר',
    position: OrgPosition.AGENT,
    skills: ['ביקורת תלושים 50 פרמטרים', 'חוק שכר ישראלי 2024', 'זיהוי דפוסים ML', 'מניעת קנסות', 'מדרגות מס והפקדות', 'זיהוי הונאות', 'התראות מדורגות', 'למידה אדפטיבית', 'עובדים זרים/קטינים', 'אופטימיזציה מיסויית'],
    claudeSkillCommands: ['/sop-write', '/automation-audit', '/xlsx', '/gws-sheets'],
    isActive: true,
    status: AgentStatus.BUSY,
    department: 'שכר',
    reportsTo: 'agent-ceo',
    createdAt: '2024-04-06T00:00:00Z'
  },
  {
    id: 'agent-pension',
    name: 'שירה פיננסים',
    role: 'סוכנת פנסיוני והשקעות',
    position: OrgPosition.AGENT,
    skills: ['ייעוץ פנסיוני', 'אסטרטגיות השקעה', 'תכנון פרישה', 'אופטימיזציה מיסויית', 'ניהול תיקי השקעות', 'קופות גמל וביטוח מנהלים', 'תכנון ירושה', 'ניתוח סיכונים VaR', 'אלוקציית נכסים', 'CFP מוסמכת'],
    claudeSkillCommands: ['/forecast-model', '/charlie-cfo', '/risk-assessment', '/unit-economics'],
    isActive: true,
    status: AgentStatus.BUSY,
    department: 'פנסיוני והשקעות',
    reportsTo: 'agent-ceo',
    createdAt: '2024-04-06T00:00:00Z'
  },
  {
    id: 'agent-bookkeeping',
    name: 'רקס-פרו-אקאונט',
    role: 'סוכן הנח"ש עצמאים',
    position: OrgPosition.AGENT,
    skills: ['הנהלת חשבונות סוג 3', 'SUMMIT', 'OCR חכם 98.3%', 'זיהוי העסקה מסווית', 'דיווחים רבעוניים ושנתיים', 'Predictive Analytics', 'Zero-Error Protocol 7 שכבות', 'Dependency Score Algorithm', 'Smart Processing Pipeline', 'Blockchain accounting'],
    claudeSkillCommands: ['/unit-economics', '/automation-audit', '/xlsx', '/sop-write'],
    isActive: true,
    status: AgentStatus.BUSY,
    department: 'עצמאים וביקורת',
    reportsTo: 'agent-ceo',
    createdAt: '2026-04-06T00:00:00Z'
  },
  {
    id: 'agent-reasonability',
    name: 'שירא כהן-לוי',
    role: 'סוכנת בדיקת סבירות',
    position: OrgPosition.AGENT,
    skills: ['בדיקת סבירות 3 שכבות', 'anomaly detection', 'cross-validation', 'seasonal adjustment', 'SUMMIT אינטגרציה', 'מע"מ תפוקות/תשומות', 'זיהוי כפילויות', 'industry benchmarking', 'predictive modeling', 'audit trail מלא'],
    claudeSkillCommands: ['/risk-assessment', '/automation-audit', '/metrics-dashboard', '/xlsx'],
    isActive: true,
    status: AgentStatus.BUSY,
    department: 'בקרת איכות',
    reportsTo: 'agent-ceo',
    createdAt: '2026-04-06T00:00:00Z'
  },
  {
    id: 'agent-onboarding',
    name: 'OnBoard Pro',
    role: 'סוכן קליטת לקוחות',
    position: OrgPosition.AGENT,
    skills: ['SUMMIT מומחיות מלאה', 'קליטת לקוחות 5 שלבים', 'NLP עברית + מונחי חשבונאות', 'זיהוי רגשות לקוח', 'אנליטיקה בזמן אמת', 'מסלולי קליטה מותאמים', 'שקיפות מוחלטת', 'צ\'קליסטים אוטומטיים', 'מעקב milestones', 'dashboard KPIs'],
    claudeSkillCommands: ['/onboarding-plan', '/customer-success', '/sop-write', '/process-map'],
    isActive: true,
    status: AgentStatus.BUSY,
    department: 'שירות לקוחות',
    reportsTo: 'agent-ceo',
    createdAt: '2026-04-06T00:00:00Z'
  },
  {
    id: 'agent-corporate',
    name: 'TaxFlow Enterprise',
    role: 'סוכן הנח"ש חברות',
    position: OrgPosition.AGENT,
    skills: ['מס חברות ישראלי', 'transfer pricing', 'תכנון מסי אסטרטגי', 'due diligence ו-M&A', 'BEPS ו-CFC', 'זיהוי מצוקה כספית', 'SUMMIT אינטגרציה', 'דיבידנד vs שכר', 'ניהול 140 לקוחות', 'AI prediction model'],
    claudeSkillCommands: ['/contracts-review', '/forecast-model', '/xlsx', '/docx', '/risk-assessment'],
    isActive: true,
    status: AgentStatus.BUSY,
    department: 'חברות ושכר',
    reportsTo: 'agent-ceo',
    createdAt: '2026-04-06T00:00:00Z'
  },
  {
    id: 'agent-whatsapp',
    name: 'סוכן וואטסאפ',
    role: 'סוכן תקשורת וואטסאפ',
    position: OrgPosition.AGENT,
    skills: ['מענה מיידי בוואטסאפ', 'זיהוי לקוח מ-SUMMIT', 'בדיקת סטטוס דוחות', 'תיאום פגישות', 'העלאת מסמכים', 'הפניה לרו"ח', 'sentiment analysis', 'שעות פעילות חכמות'],
    claudeSkillCommands: ['/customer-success', '/sales-script', '/gws-gmail-send'],
    isActive: true,
    status: AgentStatus.BUSY,
    department: 'שירות לקוחות',
    reportsTo: 'agent-ceo',
    createdAt: '2024-04-05T00:00:00Z'
  },
  {
    id: 'agent-broadcast',
    name: 'פרו-קום דיגיטל',
    role: 'סוכן שידור חכם',
    position: OrgPosition.AGENT,
    skills: ['multi-channel orchestration', 'behavioral segmentation', 'predictive analytics', 'A/B testing מתקדם', 'crisis management protocol', 'מערכת אישור רב-שכבתית', 'KPI dashboard', 'compliance-first approach', 'Kill Switch', 'Audit Trail מלא'],
    claudeSkillCommands: ['/landing-page', '/nlb-banner-design', '/nlb-slides', '/exec-presentation'],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'תקשורת לקוחות',
    reportsTo: 'agent-ceo',
    createdAt: '2024-04-07T00:00:00Z'
  },
  {
    id: 'agent-growth',
    name: 'שרה שירות',
    role: 'סוכנת צמיחה',
    position: OrgPosition.AGENT,
    skills: ['זיהוי הזדמנויות cross-sell', 'ניתוח בסיס לקוחות', 'הקשבה פעילה ואמפתיה', 'גישה יועצת לא לחוצה', 'מעקב pipeline', 'זיהוי פוטנציאל up-sell', 'Customer Success', 'תקשורת מותאמת אישית', 'KPIs מכירות', 'שימור קשרי לקוחות'],
    claudeSkillCommands: ['/customer-success', '/sales-script', '/retention-plan', '/forecast-model'],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'מכירות וצמיחה',
    reportsTo: 'agent-ceo',
    createdAt: '2024-04-07T00:00:00Z'
  },
  {
    id: 'agent-portal',
    name: 'דני פרקטי-פתרונות',
    role: 'מפתח פורטל לקוחות',
    position: OrgPosition.AGENT,
    skills: ['Vue.js + Laravel', 'אינטגרציה עם SUMMIT', 'business systems למשרדי רו"ח', 'UX מעשי ופשוט', 'פיתוח מדורג MVP-first', 'אבטחת מידע פיננסי', 'תחזוקה מתמשכת + SLA', 'user testing עם לקוחות אמיתיים', 'mobile-first responsive', 'הבנה עסקית עמוקה'],
    claudeSkillCommands: ['/react-best-practices', '/imp-frontend-design', '/dashboard-design', '/top-design', '/clean-code'],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'טכנולוגיה ופיתוח',
    reportsTo: 'agent-ceo',
    createdAt: '2024-04-07T00:00:00Z'
  },
  {
    id: 'agent-crm',
    name: 'אלכס-CRM',
    role: 'מנהל קשרי לקוחות דיגיטלי',
    position: OrgPosition.AGENT,
    skills: ['גישור בין SUMMIT ל-Monday.com', 'אלגוריתם סיווג סיכונים משוקלל', 'זיהוי הזדמנויות אפסייל', 'מערכת התראות מנהלים', 'דוח יומי 17:00', 'crisis management', 'ניתוח נתונים מ-553 לקוחות', 'אופטימיזציית סליקה אוטומטית', 'מעקב KPIs בזמן אמת', 'אבטחת מידע פיננסי'],
    claudeSkillCommands: ['/process-map', '/metrics-dashboard', '/risk-assessment', '/customer-success'],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'CRM ושימור לקוחות',
    reportsTo: 'agent-ceo',
    createdAt: '2024-04-07T00:00:00Z'
  },
  // ─── עובדים אמיתיים ───
  {
    id: 'employee-shachar',
    name: 'שחר דה ולנסה',
    role: 'שותף מנהל',
    position: OrgPosition.EMPLOYEE,
    skills: ['רו"ח מתקדם', 'ביקורת ובקרה', 'ניהול תהליכים'],
    claudeSkillCommands: [
      '/contracts-review', '/forecast-model', '/automation-audit', '/pricing-strategy',
      '/risk-assessment', '/post-mortem', '/aa-support-legal-compliance-checker',
      '/process-map', '/sop-write', '/metrics-dashboard'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'ביקורת',
    reportsTo: 'chair-tomer',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-ezra',
    name: 'עזרא חיו',
    role: 'רו"ח עצמאים',
    position: OrgPosition.EMPLOYEE,
    skills: ['רו"ח יסוד', 'אוטומציה', 'Google Workspace'],
    claudeSkillCommands: [
      '/invoice-organizer', '/vendor-evaluation', '/financial-analyst',
      '/automation-audit', '/process-map',
      '/gws-sheets', '/gws-docs', '/gws-gmail-triage'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'עצמאים',
    reportsTo: 'chair-tomer',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-chana',
    name: 'חנה רוטנברג',
    role: 'רו"ח עצמאים',
    position: OrgPosition.EMPLOYEE,
    skills: ['עיבוד נתונים', 'ניהול משימות', 'דוחות'],
    claudeSkillCommands: [
      '/gws-sheets', '/xlsx', '/invoice-organizer',
      '/gws-tasks', '/project-health-check',
      '/aa-support-analytics-reporter'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'עצמאים',
    reportsTo: 'chair-tomer',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-yarden',
    name: 'ירדן חן',
    role: 'רו"ח עצמאים',
    position: OrgPosition.EMPLOYEE,
    skills: ['אוטומציה', 'ניהול לקוחות', 'כלים דיגיטליים'],
    claudeSkillCommands: [
      '/gws-workflow-email-to-task', '/gws-workflow-standup-report',
      '/customer-success', '/churn-analysis',
      '/gws-gmail-send', '/gws-calendar-insert'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'עצמאים',
    reportsTo: 'chair-tomer',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-yael',
    name: 'יעל אסף',
    role: 'ראש מחלקת חברות',
    position: OrgPosition.EMPLOYEE,
    skills: ['ניהול כספי מתקדם', 'חוזים ומשא ומתן', 'דוחות מנהלים'],
    claudeSkillCommands: [
      '/charlie-cfo', '/forecast-model', '/business-health-diagnostic',
      '/contracts-review', '/contract-proposal-writer', '/negotiation-prep',
      '/exec-presentation', '/aa-support-executive-summary-generator'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'חברות',
    reportsTo: 'chair-tomer',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-yocheved',
    name: 'יוכבד בורנשטיין',
    role: 'רו"ח חברות',
    position: OrgPosition.EMPLOYEE,
    skills: ['כספים עסקיים', 'מצגות'],
    claudeSkillCommands: [
      '/unit-economics', '/revenue-operations', '/saas-metrics-coach',
      '/pptx', '/frontend-slides', '/nlb-slides'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'חברות',
    reportsTo: 'employee-yael',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-tziri',
    name: 'צירי הימל',
    role: 'רו"ח חברות',
    position: OrgPosition.EMPLOYEE,
    skills: ['ניתוח עסקי', 'תחזיות'],
    claudeSkillCommands: [
      '/business-case', '/market-entry', '/competitor-map',
      '/forecast-model', '/predictable-revenue'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'חברות',
    reportsTo: 'employee-yael',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-shoshana',
    name: 'שושנה מאינץ',
    role: 'רו"ח חברות',
    position: OrgPosition.EMPLOYEE,
    skills: ['ארגון נתונים', 'ניהול תהליכים'],
    claudeSkillCommands: [
      '/gws-sheets', '/xlsx', '/invoice-organizer',
      '/process-map', '/sop-write'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'חברות',
    reportsTo: 'employee-yael',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-bracha',
    name: 'ברכה צייגר',
    role: 'רו"ח חברות',
    position: OrgPosition.EMPLOYEE,
    skills: ['גבייה ומעקב', 'תקשורת לקוחות'],
    claudeSkillCommands: [
      '/customer-success', '/retention-plan', '/churn-analysis',
      '/gws-gmail-reply', '/internal-comms'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'חברות',
    reportsTo: 'employee-yael',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-meir',
    name: 'מאיר פישלר',
    role: 'רו"ח חברות',
    position: OrgPosition.EMPLOYEE,
    skills: ['ניתוח טכני', 'כלי עבודה'],
    claudeSkillCommands: [
      '/financial-analyst', '/business-health-diagnostic',
      '/gws-docs', '/pdf', '/docx'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'חברות',
    reportsTo: 'employee-yael',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-shaked',
    name: 'שקד קלדרון',
    role: 'ביקורת בכירה',
    position: OrgPosition.EMPLOYEE,
    skills: ['ביקורת מתקדמת', 'ניתוח עמוק', 'בקרת איכות'],
    claudeSkillCommands: [
      '/risk-assessment', '/aa-support-legal-compliance-checker', '/post-mortem',
      '/deep-research', '/gs-investigate', '/second-opinion',
      '/omc-ultraqa', '/gs-qa', '/omc-verify'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'ביקורת',
    reportsTo: 'employee-shachar',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-saida',
    name: 'סאידה רוחאנא',
    role: 'ביקורת',
    position: OrgPosition.EMPLOYEE,
    skills: ['בקרת איכות', 'תיעוד'],
    claudeSkillCommands: [
      '/gs-review', '/webapp-testing', '/clean-code',
      '/aa-specialized-document-generator', '/pdf', '/docx'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'ביקורת',
    reportsTo: 'employee-shachar',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-nidaa',
    name: 'נידאא ביבאר',
    role: 'ביקורת',
    position: OrgPosition.EMPLOYEE,
    skills: ['ביקורת שוטפת', 'דוחות ביקורת'],
    claudeSkillCommands: [
      '/performance-review', '/metrics-dashboard',
      '/aa-support-analytics-reporter'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'ביקורת',
    reportsTo: 'employee-shachar',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-roman',
    name: 'רומן מולדובסקי',
    role: 'מנהל שכר ופנסיוני',
    position: OrgPosition.EMPLOYEE,
    skills: ['HR מתקדם', 'הערכות עובדים', 'גיוס'],
    claudeSkillCommands: [
      '/aa-recruitment-specialist', '/interview-kit', '/team-survey',
      '/performance-review', '/drive-motivation', '/difficult-conversation',
      '/aa-corporate-training-designer', '/team-structure'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'שכר',
    reportsTo: 'chair-tomer',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-asia',
    name: 'אסיה ספירין',
    role: 'שכר ופנסיוני',
    position: OrgPosition.EMPLOYEE,
    skills: ['ניהול שכר', 'תהליכי HR'],
    claudeSkillCommands: [
      '/gws-sheets', '/xlsx', '/aa-support-analytics-reporter',
      '/onboarding-plan', '/sop-write', '/process-map'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'שכר',
    reportsTo: 'employee-roman',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-leah',
    name: 'לאה פרץ',
    role: 'מנהלת תפעול',
    position: OrgPosition.EMPLOYEE,
    skills: ['ניהול פרויקטים', 'תקשורת פנימית', 'אוטומציה'],
    claudeSkillCommands: [
      '/aa-project-manager-senior', '/aa-project-management-project-shepherd', '/project-health-check',
      '/internal-comms', '/crisis-comms', '/team-survey',
      '/aa-specialized-workflow-architect', '/omc-autopilot'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'תפעול',
    reportsTo: 'chair-tomer',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-liel',
    name: 'ליאל ויצמן',
    role: 'מזכירה',
    position: OrgPosition.EMPLOYEE,
    skills: ['Google Workspace', 'ניהול מסמכים', 'תיאום פגישות'],
    claudeSkillCommands: [
      '/gws-gmail-triage', '/gws-calendar-agenda', '/gws-tasks',
      '/gws-docs', '/gws-drive-upload', '/pdf', '/docx',
      '/gws-workflow-meeting-prep', '/gws-calendar-insert'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'תפעול',
    reportsTo: 'employee-leah',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'employee-orna',
    name: 'אורנה מאירסון',
    role: 'מזכירה וגבייה',
    position: OrgPosition.EMPLOYEE,
    skills: ['גבייה', 'תקשורת לקוחות', 'מעקב תשלומים'],
    claudeSkillCommands: [
      '/customer-success', '/retention-plan', '/churn-analysis',
      '/gws-gmail-send', '/gws-gmail-reply', '/gws-chat-send',
      '/invoice-organizer', '/vendor-evaluation'
    ],
    isActive: true,
    status: AgentStatus.IDLE,
    department: 'תפעול',
    reportsTo: 'employee-leah',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const getAgent = (id: string): Agent | undefined => agents.find(a => a.id === id);
export const getAgentName = (id: string): string => getAgent(id)?.name || 'לא ידוע';
