/**
 * Shared knowledge base for all First CPA virtual agents.
 * Single source of truth for company facts, rules, and AI boundaries.
 * All Hebrew content stays Hebrew. Numbers are numbers.
 */

export interface Department {
  manager: string;
  staff: string[];
  clientCount?: number;
  clientPct?: number;
}

export interface TimelineEntry {
  days: string;
  label: string;
}

export interface PainPoint {
  key: string;
  label: string;
  impact: string;
}

export interface AIBoundaries {
  autonomyLevel: number; // 0-10
  budgetLimit: 'unlimited' | number;
  prohibited: string[];
  requiresHumanApproval: string[];
}

export interface CompanyKnowledge {
  company: {
    name: string;
    address: string;
    yearsActive: number;
    employees: number;
    clientsTotal: number;
    clientsActive: number;
    monthlyRevenueILS: number;
    monthlyExpensesILS: number;
    monthlyProfitILS: number;
    profitMarginPct: number;
  };
  leadership: {
    chairman: string;
    ceo: string;
    cpaPartner: string;
  };
  departments: Record<'עצמאים' | 'חברות' | 'שכר' | 'ביקורת', Department>;
  monthlyTimeline: TimelineEntry[];
  escalationProcess: TimelineEntry[];
  painPoints: PainPoint[];
  collections: {
    autoDebitClients: number;
    manualClients: number;
  };
  ironRules: string[];
  aiBoundaries: AIBoundaries;
}

export const COMPANY_KNOWLEDGE: CompanyKnowledge = {
  company: {
    name: 'פירסט חשבונאות ופיננסים בע"מ',
    address: 'שד\' פלי"ם 7, חיפה',
    yearsActive: 24,
    employees: 20,
    clientsTotal: 553,
    clientsActive: 500,
    monthlyRevenueILS: 400000,
    monthlyExpensesILS: 300000,
    monthlyProfitILS: 100000,
    profitMarginPct: 25,
  },
  leadership: {
    chairman: 'תומר פרי',
    ceo: 'נועה לוי-אלגוריתם',
    cpaPartner: 'שחר',
  },
  departments: {
    'עצמאים': {
      manager: 'שחר',
      staff: ['עזרא חיו', 'חנה רוטנברג'],
      clientCount: 413,
      clientPct: 74.7,
    },
    'חברות': {
      manager: 'תומר פרי',
      staff: ['יעל אסף', 'יוכבד', 'צירי', 'שושי', 'ברכה', 'מאיר'],
      clientCount: 140,
    },
    'שכר': {
      manager: 'תומר פרי',
      staff: ['רומן', 'אסיה'],
    },
    'ביקורת': {
      manager: 'שחר',
      staff: ['שקד', 'סאידה', 'נידאא'],
    },
  },
  monthlyTimeline: [
    { days: '1-5', label: 'תזכורות חומרים' },
    { days: '9', label: 'דדליין שכר' },
    { days: '15-19', label: 'הגשות מע"מ ומקדמות' },
    { days: '16', label: 'סליקה' },
    { days: '25', label: 'דוחות' },
  ],
  escalationProcess: [
    { days: '1', label: 'דרישה ראשונית' },
    { days: '5', label: 'תזכורת' },
    { days: '10', label: 'שיחת טלפון' },
    { days: '15', label: 'הגשת מע"מ' },
  ],
  painPoints: [
    { key: 'late_submissions', label: 'איחורי הגשות', impact: '₪20,000+ קנסות ב-3 שנים' },
    { key: 'whatsapp_overload', label: 'עומס WhatsApp', impact: '20+ הודעות ביום' },
    { key: 'manual_collections', label: 'גבייה ידנית', impact: '245 לקוחות ללא סליקה אוטומטית' },
    { key: 'crm_inadequate', label: 'Monday.com לא מתאים כ-CRM לרו"ח', impact: 'עבודה כפולה' },
    { key: 'client_churn', label: 'נטישת לקוחות', impact: 'עשרות בשנה' },
  ],
  collections: {
    autoDebitClients: 308,
    manualClients: 245,
  },
  ironRules: [
    'חוק ברזל 15:00: אף לקוח לא נשאר ללא מענה עד סוף היום',
    'בדיקת סבירות: קפיצה של 10%+ בכל מדד → בירור אנושי מיידי',
    'תבניות מאושרות בלבד: שום הודעה אוטומטית שלא עברה אישור 100%',
  ],
  aiBoundaries: {
    autonomyLevel: 8,
    budgetLimit: 'unlimited',
    prohibited: [
      'כל פעולה שגורמת נזק כספי',
      'כל פעולה שגורמת נזק תדמיתי',
      'שליחת הודעות ללא תבנית מאושרת',
      'שינוי נתונים במערכת ללא אישור',
    ],
    requiresHumanApproval: [
      'קפיצה של 10%+ בכל מטריקה',
      'נושאי מס וחבות מס',
      'תקשורת עם רשויות מס/ביטוח לאומי',
      'חתימה על מסמכים רשמיים',
    ],
  },
};
