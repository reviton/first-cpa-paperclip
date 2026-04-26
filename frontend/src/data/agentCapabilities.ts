// Shared catalog of agent capabilities.
// Each capability = a pre-built prompt tied to a specific agent + optional skill reference.
// The user can trigger capabilities manually from first-crm /capabilities OR schedule them to run automatically.

export interface AgentCapability {
  id: string;
  agentId: string;
  name: string;
  description: string;
  icon: string;
  skillId?: string; // reference to /skill-finder skill (for context)
  prompt: string;   // the pre-built Hebrew prompt sent to Claude when the capability runs
  defaultSchedule?: 'hourly' | 'daily' | 'weekly' | 'monthly';
  category: 'monitoring' | 'analysis' | 'operational' | 'strategic';
}

export const agentCapabilities: AgentCapability[] = [
  // ───────────────────────── CEO (נועה) ─────────────────────────
  { id: 'ceo-weekly-health', agentId: 'agent-ceo', name: '📊 דוח בריאות שבועי', description: 'סקירה שבועית של מצב העסק: הכנסות, חובות, סיכונים, תפעול', icon: '📊', skillId: 'business-health-diagnostic', category: 'strategic', defaultSchedule: 'weekly',
    prompt: 'תן לי דוח בריאות עסקי שבועי. השתמש ב-get_dashboard_stats, revenue_breakdown, collection_aging_report, high_value_at_risk, ו-team_workload_analysis. סכם ב-3-5 bullets עם דגל אדום/ירוק לכל תחום.' },
  { id: 'ceo-kpi-dashboard', agentId: 'agent-ceo', name: '📈 KPI מרכזיים', description: 'מדדי ביצוע עיקריים של המשרד', icon: '📈', skillId: 'metrics-dashboard', category: 'monitoring',
    prompt: 'חשב את ה-KPIs המרכזיים של המשרד: סה"כ לקוחות, חלוקה לפי סוג, הכנסה חודשית, הכנסה שנתית צפויה, יחס גביה, סה"כ חוב פתוח, לקוחות בסיכון. השתמש ב-revenue_breakdown ו-clients_at_risk.' },
  { id: 'ceo-forecast', agentId: 'agent-ceo', name: '🔮 תחזית חודשית', description: 'תחזית הכנסות והוצאות', icon: '🔮', skillId: 'forecast-model', category: 'strategic', defaultSchedule: 'monthly',
    prompt: 'הכן תחזית חודש הבא: ARR צפוי, גבייה צפויה, פער גבייה, חשבוניות פתוחות. השתמש ב-revenue_breakdown, monthly_billing_summary ו-collection_aging_report.' },
  { id: 'ceo-risk-scan', agentId: 'agent-ceo', name: '⚠️ סריקת סיכונים', description: 'לקוחות ותחומים בסיכון', icon: '⚠️', skillId: 'risk-assessment', category: 'analysis', defaultSchedule: 'weekly',
    prompt: 'בצע סריקת סיכונים מלאה: clients_at_risk(70), churn_risk_candidates, high_value_at_risk. זהה את 5 הסיכונים הקריטיים והצע פעולה לכל אחד.' },
  { id: 'ceo-growth-op', agentId: 'agent-ceo', name: '🚀 הזדמנויות צמיחה', description: 'זיהוי הזדמנויות הרחבה', icon: '🚀', skillId: 'growth-strategy', category: 'strategic',
    prompt: 'נתח את התפלגות סוגי השירות (service_type_distribution) וסוגי לקוחות (revenue_breakdown). היכן יש הזדמנויות upsell/cross-sell? הצע 3 רעיונות קונקרטיים.' },

  // ───────────────────────── HR (מיכל) ─────────────────────────
  { id: 'hr-workload-balance', agentId: 'agent-hr', name: '⚖️ איזון עומסים', description: 'מי עמוס מדי, מי חסר עומס', icon: '⚖️', skillId: 'team-structure', category: 'operational', defaultSchedule: 'weekly',
    prompt: 'בצע team_workload_analysis ו-list_team. זהה מי מעל 85% עומס ומי מתחת ל-60%. הצע שיבוץ מחדש של לקוחות/משימות.' },
  { id: 'hr-performance', agentId: 'agent-hr', name: '🏆 דוח ביצועים', description: 'ביצועי עובדים', icon: '🏆', skillId: 'performance-review', category: 'analysis', defaultSchedule: 'monthly',
    prompt: 'עבור כל חבר צוות (list_team), חשב את מספר הלקוחות, ה-jobs הפתוחים וה-overdue. דרג את הצוות לפי פרודוקטיביות ודגל אדום על מי שיש לו הרבה overdue.' },
  { id: 'hr-capacity', agentId: 'agent-hr', name: '📊 תכנון תפוסה', description: 'כמה עוד לקוחות אפשר לקבל', icon: '📊', skillId: 'unit-economics', category: 'strategic',
    prompt: 'נתח את team_workload_analysis. לפי עומס ממוצע של 75%, כמה לקוחות נוספים אפשר לקלוט? האם יש צורך בגיוס? איזה תפקידים הכי עמוסים?' },

  // ─────────────────────── Auditor (דוד) ───────────────────────
  { id: 'audit-compliance', agentId: 'agent-auditor', name: '✅ בדיקת ציות', description: 'מסמכים חסרים, חתימות פגות', icon: '✅', category: 'monitoring', defaultSchedule: 'weekly',
    prompt: 'בצע signatures_summary. כמה חתימות פגות תוקף? אילו לקוחות לא חתומים על מסמכים חיוניים? רשום את הרשימה ואמור למי לשלוח תזכורת.' },
  { id: 'audit-jobs-stuck', agentId: 'agent-auditor', name: '🔍 עבודות תקועות', description: 'מה לא זז', icon: '🔍', category: 'operational',
    prompt: 'השתמש ב-stuck_jobs ו-upcoming_deadlines(7). איזה jobs תקועים יותר מדי זמן? מה המכשול? הצע פעולה לכל אחד.' },
  { id: 'audit-unassigned', agentId: 'agent-auditor', name: '👤 ללא שיוך', description: 'פריטים ללא אחראי', icon: '👤', category: 'operational', defaultSchedule: 'daily',
    prompt: 'בדוק unassigned_items. אם יש מעל 10 פריטים ללא שיוך, זו בעיה גוברת. הצע אחראי לכל סוג.' },

  // ─────────────────── Case Manager (רונית) ─────────────────────
  { id: 'case-daily-standup', agentId: 'agent-case-manager', name: '☀️ סטנדאפ בוקר', description: 'מה בוער היום', icon: '☀️', skillId: 'process-map', category: 'monitoring', defaultSchedule: 'daily',
    prompt: 'הכן סטנדאפ בוקר: upcoming_deadlines(3), stuck_jobs, inbox_unread_summary, pipeline_status. רשום ב-bullets מה הכי בוער היום.' },
  { id: 'case-pipeline', agentId: 'agent-case-manager', name: '🌊 מצב ה-Pipeline', description: 'סקירת צנרת העבודה', icon: '🌊', category: 'operational',
    prompt: 'בצע pipeline_status ו-jobs_by_status. איזה שלבים נסתמו? מהי נקודת הכשל העיקרית? הצע פעולות לפתרון.' },
  { id: 'case-bottlenecks', agentId: 'agent-case-manager', name: '🚧 צווארי בקבוק', description: 'איפה יש עיכובים', icon: '🚧', skillId: 'sop-write', category: 'analysis',
    prompt: 'זהה צווארי בקבוק: stuck_jobs, unassigned_items, team_workload_analysis. הצע שינוי ב-SOP לפתרון בעיה חוזרת.' },

  // ─────────────── Client Relations (שירה) ─────────────────
  { id: 'cr-satisfaction', agentId: 'agent-client-relations', name: '😊 סיכום שביעות רצון', description: 'מי מרוצה, מי לא', icon: '😊', skillId: 'customer-success', category: 'monitoring',
    prompt: 'השתמש ב-vip_clients_health, inbox_unread_summary (כמה לקוחות לא ענינו להם?). אילו לקוחות VIP צריכים יחס מיוחד השבוע?' },
  { id: 'cr-churn-watch', agentId: 'agent-client-relations', name: '🚨 אזהרת churn', description: 'מי בסכנת עזיבה', icon: '🚨', skillId: 'churn-analysis', category: 'analysis', defaultSchedule: 'weekly',
    prompt: 'רוץ churn_risk_candidates ו-high_value_at_risk. עבור כל לקוח, פרט מדוע הוא בסיכון והמלץ על פעולת הצלה קונקרטית.' },
  { id: 'cr-retention', agentId: 'agent-client-relations', name: '💎 תוכנית שימור', description: 'תוכנית שימור ל-VIP', icon: '💎', skillId: 'retention-plan', category: 'strategic',
    prompt: 'הכן תוכנית שימור ללקוחות VIP שיש להם בעיות: vip_clients_health. עבור כל אחד, המלץ על 1-2 פעולות שימור מדויקות.' },

  // ─────────────────── Collection (גבייה) ──────────────────────
  { id: 'coll-top-debtors', agentId: 'agent-collection', name: '💸 חייבים גדולים', description: 'לקוחות עם חוב גבוה', icon: '💸', category: 'operational', defaultSchedule: 'daily',
    prompt: 'רוץ top_debtors(10) ו-collection_aging_report. מי החייבים העיקריים? כמה כסף תקוע בכל רמת איחור? מה דחוף?' },
  { id: 'coll-aging', agentId: 'agent-collection', name: '📅 דוח גיל חובות', description: 'חוב לפי ימי איחור', icon: '📅', category: 'analysis', defaultSchedule: 'weekly',
    prompt: 'רוץ collection_aging_report ו-list_overdue_invoices. נתח את מגמת החוב: האם החוב ישן (90+) גדל? מה אחוז הגבייה?' },
  { id: 'coll-action-plan', agentId: 'agent-collection', name: '📋 תוכנית גבייה יומית', description: 'מה לעשות היום', icon: '📋', category: 'operational', defaultSchedule: 'daily',
    prompt: 'הכן תוכנית גבייה יומית: מי החייבים שצריכים שיחה/מייל היום? תשתמש ב-top_debtors(20) ודרג לפי גודל חוב וגיל. הצע נוסח תזכורת לכל אחד.' },

  // ────────────────── Reminders (תזכורות) ──────────────────────
  { id: 'rem-today', agentId: 'agent-reminders', name: '⏰ מה לשלוח היום', description: 'תזכורות יומיות', icon: '⏰', category: 'operational', defaultSchedule: 'daily',
    prompt: 'זהה מי צריך תזכורת היום: חתימות פגות (signatures_summary), חשבוניות באיחור (list_overdue_invoices), דדליינים קרבים (upcoming_deadlines(3)). הפק רשימה של תזכורות לשליחה.' },
  { id: 'rem-weekly', agentId: 'agent-reminders', name: '📆 סריקת שבוע', description: 'תזכורות לשבוע', icon: '📆', category: 'monitoring', defaultSchedule: 'weekly',
    prompt: 'סקור את upcoming_deadlines(14) והכן רשימת תזכורות לשבוע. לכל תזכורת — מועד שליחה מומלץ.' },

  // ─────────────────── Payroll (שכר) ───────────────────────
  { id: 'pay-monthly', agentId: 'agent-payroll', name: '💰 סקירת שכר חודשית', description: 'לקוחות שכר וסטטוס', icon: '💰', category: 'operational', defaultSchedule: 'monthly',
    prompt: 'רוץ service_type_distribution וסנן לקוחות שכר. מה מצב ה-jobs של סוג payroll? jobs_by_status מסונן לשכר. מה לא הושלם?' },

  // ─────────────────── Pension (פנסיה) ────────────────────
  { id: 'pen-clients', agentId: 'agent-pension', name: '🏦 לקוחות פנסיה', description: 'סקירת שירותי פנסיה', icon: '🏦', category: 'monitoring',
    prompt: 'חפש לקוחות עם שירותי פנסיה. רוץ service_type_distribution והתמקד ב"פנסיה". פרט סה"כ, חוב, סיכון.' },

  // ──────────────── Bookkeeping (הנה"ח) ────────────────────
  { id: 'book-month-close', agentId: 'agent-bookkeeping', name: '📚 סגירת חודש', description: 'סטטוס הנה"ח לסגירת חודש', icon: '📚', category: 'operational', defaultSchedule: 'monthly',
    prompt: 'עבור לקוחות הנה"ח שוטפת (service_type_distribution), בדוק jobs_by_status. מי עדיין לא סגור לחודש? רשום רשימה לסיום.' },

  // ──────────── Reasonability (שירא - סבירות) ─────────────
  { id: 'reas-anomalies', agentId: 'agent-reasonability', name: '🔎 חריגות בנתונים', description: 'זיהוי חריגות', icon: '🔎', category: 'analysis',
    prompt: 'בצע revenue_breakdown ו-top_debtors. האם יש לקוח עם ריטיינר חריג (גבוה מדי/נמוך מדי) לעומת הממוצע של הסוג שלו? רשום חריגות.' },

  // ─────────────── Onboarding (קליטה) ──────────────────────
  { id: 'onb-new-clients', agentId: 'agent-onboarding', name: '🎯 לקוחות חדשים', description: 'סקירת קליטות אחרונות', icon: '🎯', skillId: 'onboarding-plan', category: 'monitoring', defaultSchedule: 'weekly',
    prompt: 'רוץ new_clients(2026). עבור כל לקוח חדש, בדוק get_client_full: האם יש לו jobs פעילים? מסמכים? האם הקליטה הושלמה כראוי?' },

  // ─────────────── Corporate (חברות) ──────────────────────
  { id: 'corp-companies', agentId: 'agent-corporate', name: '🏢 סקירת חברות', description: 'לקוחות חברה בע"מ', icon: '🏢', category: 'monitoring',
    prompt: 'רוץ list_clients({type: "company"}). סכם: כמה חברות, חוב כולל, בסיכון. אילו חברות VIP זקוקות ליחס?' },

  // ─────────────── WhatsApp (וואטסאפ) ──────────────────────
  { id: 'wa-daily-blast', agentId: 'agent-whatsapp', name: '📱 מסרון יומי', description: 'למי לשלוח וואטסאפ היום', icon: '📱', category: 'operational', defaultSchedule: 'daily',
    prompt: 'זהה מי צריך מסרון וואטסאפ היום: חתימות פגות, חובות > 30 יום, דדליינים ב-3 ימים. השתמש ב-upcoming_deadlines(3), signatures_summary, top_debtors(10). הצע ניסוח קצר לכל מסרון.' },

  // ─────────────── Virtual Company (חברה וירטואלית - אלכס) ───────────────
  { id: 'vc-tech-health', agentId: 'agent-virtual-co', name: '⚙️ בריאות מערכת', description: 'סקירת אוטומציות', icon: '⚙️', category: 'monitoring', defaultSchedule: 'weekly',
    prompt: 'רוץ automation_rules_summary. כמה כללים פעילים? כמה בשגיאה? סה"כ ריצות? הצע שיפורים.' },

  // ────────── Broadcast (שידור - פרו-קום דיגיטל) ──────────
  { id: 'bc-segments', agentId: 'agent-broadcast', name: '📣 פילוח לשידור', description: 'סגמנטים לשליחה המונית', icon: '📣', category: 'analysis',
    prompt: 'פלח את הלקוחות לקבוצות לתקשורת המונית: עצמאים/חברות/עמותות (revenue_breakdown). עבור כל סגמנט, הצע נושא שידור רלוונטי לשבוע הקרוב.' },

  // ─────────── Growth (שרה שירות) ───────────
  { id: 'gr-upsell', agentId: 'agent-growth', name: '📈 הזדמנויות upsell', description: 'לקוחות שיכולים לעלות רמה', icon: '📈', skillId: 'growth-strategy', category: 'strategic',
    prompt: 'זהה לקוחות עם ריטיינר נמוך אבל פוטנציאל גבוה (new_clients, list_clients). הצע למי להציע שדרוג שירות ומה להציע.' },

  // ─────────── Portal (דני פרקטי-פתרונות) ───────────
  { id: 'port-usage', agentId: 'agent-portal', name: '🖥️ שימוש בפורטל', description: 'מי משתמש בפורטל', icon: '🖥️', category: 'monitoring',
    prompt: 'נתח inbox_unread_summary ו-signatures_summary. האם לקוחות מתקשרים דרך הפורטל או ערוצים אחרים? אילו לקוחות לא פעילים בפורטל כלל?' },

  // ─────────── CRM (אלכס-CRM) ───────────
  { id: 'crm-health', agentId: 'agent-crm', name: '🔧 בריאות נתוני CRM', description: 'איכות נתונים', icon: '🔧', category: 'monitoring', defaultSchedule: 'weekly',
    prompt: 'בצע unassigned_items, service_type_distribution, revenue_breakdown. האם יש לקוחות ללא sevice_type? ללא assignee? דווח על בעיות איכות נתונים.' },

  // ─────────── Chair (תומר) ───────────
  { id: 'chair-overview', agentId: 'chair-tomer', name: '👁️ סקירת יו"ר', description: 'סקירה אסטרטגית', icon: '👁️', category: 'strategic', defaultSchedule: 'weekly',
    prompt: 'תן לי סקירה אסטרטגית של המשרד לישיבת יו"ר: get_dashboard_stats, revenue_breakdown, high_value_at_risk, team_workload_analysis. סכם ב-5 נקודות מה חשוב להחליט עליו השבוע.' },
];

export function getCapabilitiesByAgent(agentId: string): AgentCapability[] {
  return agentCapabilities.filter(c => c.agentId === agentId);
}

export function getCapability(id: string): AgentCapability | undefined {
  return agentCapabilities.find(c => c.id === id);
}