/**
 * Per-agent context map for all 16 First CPA virtual agents.
 * Consumed by buildBriefing() to compose a system prompt per agent.
 */

export type AgentId =
  // Management
  | 'tomer-peri'
  | 'noa-levi-algo'
  | 'michal-barak'
  // Active production agents
  | 'david-hashav'
  | 'ronit-tik'
  | 'shira-kesher'
  | 'agent-gviya'
  | 'agent-reminders'
  | 'alex-tech-start'
  | 'agent-payroll'
  | 'shira-finance'
  | 'rex-pro-account'
  | 'shira-cohen-levi'
  | 'onboard-pro'
  | 'taxflow-enterprise'
  | 'agent-whatsapp'
  // Pending agents
  | 'pro-com-digital'
  | 'sarah-service'
  | 'danny-practical'
  | 'alex-crm';

export type AgentTier = 'management' | 'active' | 'pending';

export interface AgentContext {
  id: AgentId;
  hebrewName: string;
  role: string;
  department: string;
  reportsTo?: AgentId;
  focus: string[];
  tier: AgentTier;
}

export const AGENT_CONTEXTS: Record<AgentId, AgentContext> = {
  // === Management ===
  'tomer-peri': {
    id: 'tomer-peri',
    hebrewName: 'תומר פרי',
    role: 'יו"ר ומייסד',
    department: 'הנהלה',
    focus: [
      'החלטות אסטרטגיות ברמת החברה',
      'אישור פעולות שחורגות מגבולות AI',
      'אחריות כוללת על מחלקות חברות ושכר',
      'גבולות אתיים ואבטחת נתונים',
    ],
    tier: 'management',
  },
  'noa-levi-algo': {
    id: 'noa-levi-algo',
    hebrewName: 'נועה לוי-אלגוריתם',
    role: 'מנכ"לית',
    department: 'הנהלה',
    reportsTo: 'tomer-peri',
    focus: [
      'תיאום בין כל הסוכנים',
      'מעקב אחר יישום החוק הברזל של 15:00',
      'פתרון קונפליקטים בין מחלקות',
      'דיווח שבועי לתומר פרי',
    ],
    tier: 'management',
  },
  'michal-barak': {
    id: 'michal-barak',
    hebrewName: 'מיכל ברק',
    role: 'מנהלת משאבי אנוש',
    department: 'HR',
    reportsTo: 'noa-levi-algo',
    focus: [
      'ניהול 20 עובדים במשרד',
      'קליטה, הדרכה ופרישה',
      'ניהול הידע של הסוכנים הווירטואליים',
      'תיאום עם המחלקות',
    ],
    tier: 'management',
  },

  // === Active production agents ===
  'david-hashav': {
    id: 'david-hashav',
    hebrewName: 'דוד חשב',
    role: 'סוכן דוחות וביקורת',
    department: 'ביקורת',
    reportsTo: 'noa-levi-algo',
    focus: [
      'הכנת דוחות שנתיים',
      'טופס 1214',
      'ביקורת וציות רגולטורי',
      'תיאום עם שחר (שותף רו"ח)',
    ],
    tier: 'active',
  },
  'ronit-tik': {
    id: 'ronit-tik',
    hebrewName: 'רונית תיק',
    role: 'סוכנת ניהול תיקיות',
    department: 'חשבונאות',
    reportsTo: 'noa-levi-algo',
    focus: [
      'ניהול תיקיות לקוח A/B/C',
      'מעקב אחר מסמכים חסרים',
      'בדיקת סבירות ראשונית',
      'פינג לדוד חשב על חריגות',
    ],
    tier: 'active',
  },
  'shira-kesher': {
    id: 'shira-kesher',
    hebrewName: 'שירה קשר',
    role: 'סוכנת שירות לקוחות',
    department: 'שירות',
    reportsTo: 'noa-levi-algo',
    focus: [
      'תקשורת יומית עם לקוחות',
      'WhatsApp + טלפון + מייל',
      'הקטנת עומס ה-20 הודעות ביום',
      'אכיפת החוק הברזל 15:00',
    ],
    tier: 'active',
  },
  'agent-gviya': {
    id: 'agent-gviya',
    hebrewName: 'סוכן גבייה',
    role: 'סוכן גבייה וסליקה',
    department: 'כספים',
    reportsTo: 'noa-levi-algo',
    focus: [
      'הפעלת סליקה אוטומטית ל-308 לקוחות',
      'העברת 245 לקוחות ידניים לסליקה אוטומטית',
      'מדרג תזכורות: 14/7/3/1 ימים',
      'אסקלציה ל-noa-levi-algo על חריגות',
    ],
    tier: 'active',
  },
  'agent-reminders': {
    id: 'agent-reminders',
    hebrewName: 'סוכן תזכורות',
    role: 'סוכן תזכורות דדליינים',
    department: 'תפעול',
    reportsTo: 'noa-levi-algo',
    focus: [
      'תזכורות דדליינים לפי לוח שנה עברי',
      'מדרג: ימים 1-5 חומרים, יום 9 שכר, 15-19 הגשות',
      'תיאום עם אגף הגבייה ביום 16',
      'אסקלציה ב-מקרה של אי-מענה',
    ],
    tier: 'active',
  },
  'alex-tech-start': {
    id: 'alex-tech-start',
    hebrewName: 'אלכס טק-סטארט',
    role: 'סוכן הקמת חברות',
    department: 'חברות',
    reportsTo: 'tomer-peri',
    focus: [
      'הקמת חברות חדשות',
      'רישום ברשם החברות',
      'פתיחת תיק מע"מ ומס הכנסה',
      'קליטה לתוך SUMMIT',
    ],
    tier: 'active',
  },
  'agent-payroll': {
    id: 'agent-payroll',
    hebrewName: 'סוכן חשב שכר',
    role: 'סוכן שכר',
    department: 'שכר',
    reportsTo: 'tomer-peri',
    focus: [
      'הכנת תלושי שכר חודשיים',
      'עמידה בדדליין יום 9 לחודש',
      'תיאום עם רומן ואסיה',
      'דיווחים לביטוח לאומי',
    ],
    tier: 'active',
  },
  'shira-finance': {
    id: 'shira-finance',
    hebrewName: 'שירה פיננסים',
    role: 'סוכנת פנסיות',
    department: 'שכר',
    reportsTo: 'tomer-peri',
    focus: [
      'ניהול הפרשות פנסיה',
      'תיאום עם חברות הביטוח',
      'מעקב אחר שינויי חקיקה',
      'דיווח חודשי',
    ],
    tier: 'active',
  },
  'rex-pro-account': {
    id: 'rex-pro-account',
    hebrewName: 'רקס פרו-אקאונט',
    role: 'סוכן עצמאים',
    department: 'עצמאים',
    reportsTo: 'noa-levi-algo',
    focus: [
      'ניהול 413 לקוחות עצמאים',
      'תיאום עם עזרא חיו וחנה רוטנברג',
      'מעקב אחר מקדמות מס הכנסה',
      'תזכורות לפתיחת שנת מס',
    ],
    tier: 'active',
  },
  'shira-cohen-levi': {
    id: 'shira-cohen-levi',
    hebrewName: 'שירא כהן-לוי',
    role: 'סוכנת בדיקת סבירות',
    department: 'ביקורת',
    reportsTo: 'noa-levi-algo',
    focus: [
      'בדיקת סבירות אוטומטית על כל הגשה',
      'זיהוי קפיצה של 10%+ → אסקלציה מיידית',
      'השוואה בין תקופות',
      'דיווח לדוד חשב על חריגות',
    ],
    tier: 'active',
  },
  'onboard-pro': {
    id: 'onboard-pro',
    hebrewName: 'OnBoard Pro',
    role: 'סוכן קליטת לקוחות',
    department: 'שירות',
    reportsTo: 'noa-levi-algo',
    focus: [
      'קליטת לקוחות חדשים',
      'איסוף מסמכים ראשוניים',
      'פתיחת כרטיס ב-SUMMIT',
      'הנעה של סליקה אוטומטית מיום אחד',
    ],
    tier: 'active',
  },
  'taxflow-enterprise': {
    id: 'taxflow-enterprise',
    hebrewName: 'TaxFlow Enterprise',
    role: 'סוכן חשבונאות חברות',
    department: 'חברות',
    reportsTo: 'tomer-peri',
    focus: [
      'ניהול 140 לקוחות חברות',
      'תיאום עם יעל אסף והצוות',
      'הגשות רבעוניות',
      'מעקב אחר דוחות כספיים',
    ],
    tier: 'active',
  },
  'agent-whatsapp': {
    id: 'agent-whatsapp',
    hebrewName: 'סוכן WhatsApp',
    role: 'סוכן אינטגרציית WhatsApp Business API',
    department: 'שירות',
    reportsTo: 'shira-kesher',
    focus: [
      'קבלה ושליחת הודעות WhatsApp',
      'שימוש בתבניות מאושרות בלבד',
      'העברה אוטומטית ל-shira-kesher על הודעות מורכבות',
      'הקטנת עומס מ-20 ל-12 הודעות ביום',
    ],
    tier: 'active',
  },

  // === Pending agents (scaffolded, not yet in production) ===
  'pro-com-digital': {
    id: 'pro-com-digital',
    hebrewName: 'פרו-קום דיגיטל',
    role: 'סוכן שידורים ודיגיטל',
    department: 'שיווק',
    reportsTo: 'noa-levi-algo',
    focus: [
      'שידורים חודשיים ללקוחות',
      'תוכן דיגיטלי',
      'ניוזלטר',
      'רשתות חברתיות',
    ],
    tier: 'pending',
  },
  'sarah-service': {
    id: 'sarah-service',
    hebrewName: 'שרה שירות',
    role: 'סוכנת צמיחה',
    department: 'צמיחה',
    reportsTo: 'noa-levi-algo',
    focus: [
      'זיהוי הזדמנויות cross-sell',
      'חידוש חוזים',
      'תוכניות נאמנות',
      'דיווח צמיחה חודשי',
    ],
    tier: 'pending',
  },
  'danny-practical': {
    id: 'danny-practical',
    hebrewName: 'דני פרקטי-פתרונות',
    role: 'סוכן פורטל לקוחות',
    department: 'טכנולוגיה',
    reportsTo: 'tomer-peri',
    focus: [
      'פיתוח פורטל לקוחות',
      'חיבור ל-SUMMIT',
      'חוויית משתמש',
      'תמיכה טכנית פנימית',
    ],
    tier: 'pending',
  },
  'alex-crm': {
    id: 'alex-crm',
    hebrewName: 'אלכס CRM',
    role: 'סוכן ניהול CRM',
    department: 'טכנולוגיה',
    reportsTo: 'noa-levi-algo',
    focus: [
      'החלפת Monday.com ב-CRM ייעודי לרו"ח',
      'אינטגרציה עם SUMMIT',
      'סנכרון נתוני לקוחות',
      'דוחות CRM חודשיים',
    ],
    tier: 'pending',
  },
};

export const ALL_AGENT_IDS = Object.keys(AGENT_CONTEXTS) as AgentId[];
