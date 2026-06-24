// מאגר ידע First CPA - הופק על ידי נגה (סוכנת מנכ"לית)
// עדכון: אפריל 2026 | אפיון ארגוני + 70+ נהלים + לקוחות מסאמיט + לוחות זמנים + מקורות

export interface EmployeeRow {
  name: string;
  total: number;
  companies: number;
  authorized: number;
  exempt: number;
  partnerships: number;
  associations: number;
}

export interface ClientRow {
  index: number;
  name: string;
  department: string;
  note?: string;
  flag?: 'vip-chain' | 'vip-branch' | 'flagship' | 'self-managed';
}

export interface Procedure {
  name: string;
  status: 'קרוא' | 'ריק' | 'קרוא / ריק' | 'ריק — זבל-מקלדת' | 'ריק — קריטי לסוכן מנכ"ל';
  type?: string;
}

export interface ManagerRow {
  level: number;
  name: string;
  role: string;
  responsibility: string;
  clients: string;
}

export const lastUpdated = 'אפריל 2026';

// טאב 1: לקוחות ועובדים
export const totalClients = 565;
export const unassignedClients = 27;
export const assignedToTwoEmployees = 71; // %
export const businessClientsPct = 52; // %

export const concentrationAlert = {
  title: 'נורה אדומה — ריכוז קיצוני',
  text: 'חנה רוטנברג (203) + עזרא חיו (198) = 401 לקוחות = 71% מהמשרד. אם אחד עוזב — המשרד בסכנה מיידית.',
};

export const employeeDistribution: { name: string; count: number }[] = [
  { name: 'חנה רוטנברג', count: 203 },
  { name: 'עזרא חיו', count: 198 },
  { name: 'יוכבד בורנשטיין', count: 28 },
  { name: 'לא משויך', count: 27 },
  { name: 'צירי', count: 26 },
  { name: 'שושי', count: 25 },
  { name: 'ברכה צייגר', count: 21 },
  { name: 'יעל אסף', count: 16 },
  { name: 'רוית אטיאס / לינה', count: 10 },
  { name: 'שאר 9 עובדים', count: 17 },
];

export const heavyHitters = [
  {
    name: 'חנה רוטנברג',
    total: 203,
    breakdown: 'מורשים: 134 | פטורים: 58 | חברות: 3 | שותפויות: 7',
    note: 'בעיקר מורשים/עצמאיים',
  },
  {
    name: 'עזרא חיו',
    total: 198,
    breakdown: 'מורשים: 148 | פטורים: 39 | חברות: 5 | שותפויות: 6',
    note: 'בעיקר מורשים/עצמאיים',
  },
];

export const clientTypeBreakdown = [
  { label: 'עוסק מורשה', count: 293, pct: 52 },
  { label: 'חברה', count: 134, pct: 24 },
  { label: 'עוסק פטור', count: 112, pct: 20 },
  { label: 'שותפות', count: 15, pct: 3 },
  { label: 'עמותה', count: 6, pct: 1 },
  { label: 'לא משויך', count: 27, pct: null, alert: true },
];

export const employeeFullTable: EmployeeRow[] = [
  { name: 'חנה רוטנברג', total: 203, companies: 3, authorized: 134, exempt: 58, partnerships: 7, associations: 0 },
  { name: 'עזרא חיו', total: 198, companies: 5, authorized: 148, exempt: 39, partnerships: 6, associations: 0 },
  { name: 'יוכבד בורנשטיין', total: 28, companies: 28, authorized: 0, exempt: 0, partnerships: 0, associations: 0 },
  { name: 'צירי', total: 26, companies: 24, authorized: 0, exempt: 0, partnerships: 0, associations: 0 },
  { name: 'שושי', total: 25, companies: 25, authorized: 0, exempt: 0, partnerships: 0, associations: 0 },
  { name: 'ברכה צייגר', total: 21, companies: 19, authorized: 0, exempt: 0, partnerships: 0, associations: 1 },
  { name: 'יעל אסף', total: 16, companies: 13, authorized: 0, exempt: 0, partnerships: 0, associations: 1 },
  { name: 'רוית אטיאס', total: 10, companies: 10, authorized: 0, exempt: 0, partnerships: 0, associations: 0 },
  { name: 'לינה', total: 10, companies: 10, authorized: 0, exempt: 0, partnerships: 0, associations: 0 },
  { name: 'אמיר', total: 6, companies: 6, authorized: 0, exempt: 0, partnerships: 0, associations: 0 },
  { name: 'ציבורי', total: 5, companies: 3, authorized: 1, exempt: 0, partnerships: 0, associations: 0 },
  { name: 'אסיק/פפרין', total: 5, companies: 0, authorized: 0, exempt: 0, partnerships: 4, associations: 0 },
  { name: 'אסף', total: 5, companies: 5, authorized: 0, exempt: 0, partnerships: 0, associations: 0 },
  { name: 'סיוון', total: 3, companies: 3, authorized: 0, exempt: 0, partnerships: 0, associations: 0 },
  { name: 'שחר די ולנסה', total: 2, companies: 1, authorized: 1, exempt: 0, partnerships: 0, associations: 0 },
  { name: 'לא משויך', total: 27, companies: 0, authorized: 0, exempt: 0, partnerships: 0, associations: 0 },
];

// רשימת לקוחות מאיר (לקוח מרכזי)
export const meirClients: ClientRow[] = [
  { index: 1, name: 'יאשקה כפר סבא בעמ', department: 'חברות — מאיר', note: 'רשת אוכל' },
  { index: 2, name: 'יאשקה רמת אפעל בעמ', department: 'חברות — מאיר', note: 'סניף נוסף' },
  { index: 3, name: 'א.מ פלד בע"מ', department: 'חברות — מאיר' },
  { index: 4, name: 'ע.א פלד אחזקות בע"מ', department: 'חברות — מאיר', note: 'קבוצת פלד — 2 ישויות' },
  { index: 5, name: 'קאי תאי בע"מ', department: 'חברות — מאיר', note: 'מסעדה תאילנדית?' },
  { index: 6, name: 'אס.איי.ג\'יי בע"מ', department: 'חברות — מאיר' },
  { index: 7, name: 'כימתר בע"מ', department: 'חברות — מאיר', note: 'כימיקלים / תרופות' },
  { index: 8, name: 'רפאלו עין שמר בעם', department: 'חברות — מאיר', note: 'סניף רפאלו' },
  { index: 9, name: 'ארומה לב המושבה בע"מ', department: 'חברות — מאיר', note: 'לקוח VIP — רשת ארומה', flag: 'vip-chain' },
  { index: 10, name: 'ארומה תל חנן בע"מ', department: 'חברות — מאיר', note: 'לקוח VIP — סניף נוסף', flag: 'vip-branch' },
  { index: 11, name: 'הגלידה בע"מ', department: 'חברות — מאיר', note: 'עסק קמעונאי' },
  { index: 12, name: 'תומר פרי בע"מ', department: 'חברות — מאיר', note: 'החברה האישית של הבעלים!', flag: 'flagship' },
  { index: 13, name: 'פירסט חשבונאות ופיננסים בע"מ', department: 'חברות — מאיר', note: 'המשרד עצמו — מנהל את חשבונותיו', flag: 'self-managed' },
];

// טאב 2: מבנה ארגוני
export const departments = [
  { name: 'שיווק', status: 'לא הוגדר', services: '—', procedures: 'אפס', alert: true },
  { name: 'אוטומציות לעסקים', status: 'לא הוגדר', services: '—', procedures: 'אפס', alert: true },
  { name: 'קבלה', status: 'תקין', services: 'שירותי לקוחות, תפעול', procedures: '16' },
  { name: 'ביקורת', status: 'תקין', services: 'החזרי מס, דוחות, הצהרת הון, קיבוע זכויות, דו"חות שנתיים', procedures: '+22' },
  { name: 'הנה"ח עצמאיים', status: 'תקין', services: 'פטורים, מורשים', procedures: '21' },
  { name: 'הנה"ח חברות', status: 'טעון שיפור', services: 'הנה"ח OS', procedures: '12' },
  { name: 'שכר', status: 'תקין', services: 'תלושים, פנסיה, בדק שכר, קרן פנסיה/השתלמות', procedures: '9' },
  { name: 'ניהול כספים', status: '2 אדומות ❌', services: 'תזרים ❌, גביה ❌, חשבוניות ❌, הלוואות', procedures: 'אפס', alert: true },
];

export const departmentsAlertText = 'גביה + הפקת חשבוניות ללקוחות = בעיה פעילה. זה מסביר את "כיבוי השריפות" בבוקר.';

export const sharDiscovery = {
  title: 'גילוי חדש — שחר: השותף העסקי',
  status: 'לא ידוע עד עכשיו',
  intro: 'תומר פרי אינו לבד — יש שותף בשם שחר. שניהם אחראים על הבקרה המרכזית של המשרד. לפי תומר: "לא מספיק מסודר ומעט מאוד מידע אמין".',
  fields: [
    { label: 'שם', value: 'שחר (שם משפחה — לא ידוע)' },
    { label: 'תואר', value: 'שותף — רואה חשבון מוסמך (CPA)' },
    { label: 'תפקיד עסקי', value: 'פרסונה מקצועית של החברה — הפנים המקצועיות ללקוחות' },
    { label: 'אחריות מחלקתית', value: 'מחלקת עצמאים + מחלקת ביקורת' },
    { label: 'לקוחות תחתיו', value: 'חנה רוטנברג (200) + עזרא חיו (213) = 413 לקוחות' },
    { label: 'יחס לתומר', value: 'תומר = מנכ"ל (ניהול ואסטרטגיה) | שחר = שותף CPA (מקצועי ותפעולי)' },
    { label: 'בקרה משותפת', value: 'שניהם אחראים על בקרה — "לא מסודר, מעט מאוד מידע אמין"' },
  ],
  hierarchyNote: 'השלכה ישירה לסוכן: הסוכן מנכ"ל ("רדני") מדווח לתומר. אבל כל הקשר למחלקת עצמאים וביקורת — אסקלציה לשחר, לא לתומר.',
};

export const centralControlFailure = {
  title: 'כשל בקרה מרכזית — איך מגלים בעיות',
  alertSeverity: 'קריטי לסוכן',
  problems: [
    'טלפון זועם מלקוח שקיבל קנס',
    'גילוי בדיעבד — "לא דווח ללקוח"',
    'לא שולם זה חודשיים ולא שמו לב',
    'אין מנגנון פרואקטיבי כלל',
  ],
  remedies: [
    'דוח בקר: מה עלול ליפול היום',
    'התראה אוטומטית: לקוח לא שילם 14 יום',
    'זיהוי דיווחים קרובים לפני מועד',
    'אסקלציה לשחר/תומר לפני שהלקוח כועס',
  ],
};

export const orgChart: ManagerRow[] = [
  { level: 1, name: 'תומר פרי', role: 'מנכ"ל + שותף', responsibility: 'מחלקת חברות | שכר ומשכורות | ניהול כספים + אסטרטגיה כללית', clients: '114 לקוחות (דרך יוכבד, יעל, צירי, שושי, ברכה, מאיר)' },
  { level: 2, name: 'שחר', role: 'שותף — CPA — פרסונה מקצועית', responsibility: 'מחלקת עצמאים + מחלקת ביקורת', clients: '413 לקוחות (דרך חנה + עזרא)' },
  { level: 3, name: 'חנה רוטנבברג', role: 'מנהלת מחלקת עצמאים', responsibility: 'מנהלת תיקים — עצמאים', clients: '200 עצמאים + חשבון אישי תומר פרי' },
  { level: 3, name: 'עזרא חיו', role: 'מנהל מחלקת עצמאים', responsibility: 'מנהל תיקים — עצמאים', clients: '213 עצמאים' },
  { level: 3, name: 'יוכבד בורנשטיין', role: 'מנהלת תיקים — חברות', responsibility: '28 חברות כולל חי דור', clients: '28' },
  { level: 3, name: 'יעל אסף', role: 'מנהלת מחלקת חברות', responsibility: '19 חברות + 6 עמותות', clients: '27' },
  { level: 3, name: 'צירי', role: 'מנהלת תיקים — חברות', responsibility: '24 חברות', clients: '26' },
  { level: 3, name: 'שושי', role: 'מנהלת תיקים — חברות', responsibility: '25 חברות', clients: '25' },
  { level: 3, name: 'ברכה צייגר', role: 'מנהלת תיקים — חברות', responsibility: '19 חברות + 1 עמותה', clients: '21' },
  { level: 3, name: 'מאיר', role: 'מנהל תיקים — חברות', responsibility: '13 חברות כולל ארומה, תומר פרי בע"מ, פירסט', clients: '13' },
  { level: 3, name: 'לאה', role: 'עוזרת מנכ"ל', responsibility: 'דיווחים לרשויות המס (מוסמכת!), כיסוי חנה/עזרא בהיעדרות', clients: '—' },
  { level: 4, name: 'אורנה', role: 'מזכירה + גביה', responsibility: 'גביה, חשבוניות דרך Summit, אדמיניסטרציה', clients: '—' },
];

// טאב 3: נהלים
export const proceduresCompanies: Procedure[] = [
  { name: 'נוהל אישור תשלום לרשויות מלקוח', status: 'קרוא' },
  { name: 'נוהל בדיקת חוסרים', status: 'קרוא' },
  { name: 'נוהל הכנת חומרים לביקורת', status: 'קרוא' },
  { name: 'נוהל העברת שיחות', status: 'קרוא' },
  { name: 'נוהל חפיפה והכשרת עובד חדש', status: 'קרוא' },
  { name: 'נוהל ישיבה שבועי/חודש/אישי', status: 'ריק — זבל-מקלדת' },
  { name: 'נוהל סדר יום עבודה', status: 'קרוא' },
  { name: 'נוהל עדכון מערכת CRM', status: 'קרוא' },
  { name: 'נוהל פתיחת לקוח, קביעת תאריכים קבועים', status: 'קרוא / ריק' },
  { name: 'נוהל קליטת חומר, שליחת הודעה ללקוח', status: 'קרוא' },
];

export const proceduresSelfEmployed: Procedure[] = [
  { name: 'נוהל אישור תשלום, בדיקת חוסרים (כלל 10%), הכנת חומרים לביקורת', status: 'קרוא', type: 'docx.' },
  { name: 'נוהל העברת שיחות, חפיפה, סדר יום, פתיחת לקוח, קליטת חומר', status: 'קרוא', type: 'docx.' },
  { name: 'נוהל שליחת הודעה לאישור דיווחים (1/5/10/12/15/17 לחודש)', status: 'קרוא', type: 'docx.' },
  { name: '11 מדריכים ואינפוגרפיקות', status: 'קרוא', type: 'png.' },
];

export const proceduresSalary: Procedure[] = [
  { name: 'נוהל אישור תשלום (עד 9 + 13 לחודש)', status: 'קרוא' },
  { name: 'נוהל בדיקת חוסרים בתלושים (10-25 לחודש)', status: 'קרוא' },
  { name: 'נוהל הכנת חומרים + שידור 126/856 (ימאר-יוני)', status: 'קרוא' },
  { name: 'נוהל העברת שיחות + 5 מדריכים PNG', status: 'קרוא' },
];

export const proceduresAudit: Procedure[] = [
  { name: 'נ"ע מלא לביקורת חברות קטנות', status: 'קרוא' },
  { name: 'נוהל קבלת חומר (28 סעיפים), שידור (1214/6111), שמירה, חתימה', status: 'קרוא' },
  { name: 'נוהל שאלון לקוח', status: 'ריק' },
  { name: 'נוהל בדיקת מצ"ח ללקוחות', status: 'ריק' },
  { name: '+9 אינפוגרפיקות + 2 קבצי Excel', status: 'קרוא' },
];

export const proceduresReception: Procedure[] = [
  { name: 'פנייה ללקוח, עזיבת לקוח, אדמיניסטרציה, קליטת/עזיבת עובד, ראיון עבודה', status: 'קרוא' },
  { name: 'קבלת חומר, חיוב של"ט, ניקיון, חגים, חופשה, פתיחת יום, קליטת לקוח חדש', status: 'קרוא' },
  { name: 'נוהל בקרה על כל המחלקות', status: 'ריק — קריטי לסוכן מנכ"ל' },
  { name: 'נוהל סקרים לקוחות/עובדים', status: 'ריק' },
];

// טאב 4: לוחות זמנים
export const dailySchedule = [
  { time: '08:00–09:00', tasks: 'פתיחת יום: מעבר על מיילים, וואטסאפ ובקשת חומר מלקוחות. תעדוף משימות דחופות.' },
  { time: '09:00–12:00', tasks: 'הנה"ח: טיפול בחומרים שוטפים ובקשות חוסרים. שכר: הכנת תלושים ופניות עובדים. ביקורת: טיפול בתיקים פתוחים. ניהול כספים: דוחות ומעקב תזרים.' },
  { time: '12:00–13:00', tasks: 'הפסקת צהריים.' },
  { time: '13:00–16:00', tasks: 'הנה"ח: המשך טיפול בחומרים והכנת דוחות. שכר: שליחת תלושים ועדכון נתונים. ביקורת: סיום ביקורות ותיאום פגישות. ניהול כספים: תחזיות פיננסיות וגניות.' },
  { time: '16:00–17:00', tasks: 'מענה למיילים וואטסאפ. סיכום יום ועדכון סטטוס משימות ב-CRM.' },
];

export const dailyRoutines = [
  { who: 'כל עובד', what: 'עדכון סטטוס לקוח ב-CRM בכל שלב בעבודה' },
  { who: 'כל עובד', what: 'עדכון שעות עבודה על כל לקוח במהלך היום' },
  { who: 'SLA', what: 'מענה ראשוני לפניות לקוחות — תוך יום עסקים אחד, סגירת פנייה — תוך 3 ימי עסקים' },
];

export const weeklySchedule = [
  { day: 'יום ראשון', items: ['ביקורת: הוצאת רשימת מכתבים וחריגים בביטוח לאומי וטיפול בהם', 'הנה"ח: מעקב גבייה מלקוחות'] },
  { day: 'יום שני', items: ['הנ"ח: עדכון מנהל מחלקה על בעיות', 'ישיבת סטטוס קצרה עם המחלקה'] },
  { day: 'יום שלישי', items: ['שכר: טיפול בשירות התעסוקה', 'פתיחת תיקי דיווח חודשיים'] },
  { day: 'יום רביעי', items: ['הנ"ח: מעקב גבייה מלקוחות'] },
  { day: 'יום חמישי', items: ['הנ"ח: עדכון מנהל מחלקה על בעיות', 'ישיבת סטטוס קצרה'] },
  { day: 'יום שישי', items: ['הנ"ח: הכנת רשימה של לקוחות שדווחו ב-19-18 לחודש'] },
];

export const weeklyTeamMeeting = 'ישיבת צוות שבועית: כל מחלקה מעדכנת על סטטוס משימות ואתגרים קיימים.';

export const monthlySchedule = [
  { range: '1–5 לחודש', items: ['שליחת תזכורות ללקוחות להעברת ניירת חודשית', 'בהתאם למוהל בקשת חומר מלקוח'] },
  { range: '5–10 לחודש', items: ['מעקב אחר קבלת ניירת', 'הכנת תלושי שכר ושליחתם ללקוחות'] },
  { range: '10–15 לחודש', items: ['מעקב טלפוני אחר לקוחות שלא העבירו ניירת', 'שליחת סיכומים לתשלוויות לרשויות ללקוחות'] },
  { range: '15–19 לחודש', items: ['דיווח ותשלום לרשויות המס', 'מע"מ, מס הכנסה, ביטוח לאומי'] },
  { range: '19–25 לחודש', items: ['ביצוע התאמות בנקים וכרטיסי אשראי', 'שליחת קובץ חוסרים ללקוחות'] },
  { range: '25–31 לחודש', items: ['הכנת מאזנים והעברתם למחלקת ביקורת', 'בדיקת התאמות והכנת דוחות דו-חודשיים', 'שליחת דוחות ללקוחות'] },
];

export const kpisByDepartment = [
  {
    name: 'הנה"ח (עצמאים + חברות)',
    items: [
      'השלמת התאמות בנקים לכל לקוח עד ה-20',
      'שליחת דוחות חודשיים ללקוחות עד ה-25',
      '100% עמידה בדיווחים לרשויות המס',
    ],
  },
  {
    name: 'שכר',
    items: [
      'הכנת תלושים לכל לקוחות עד ה-9',
      'שליחת דוחות שכר למפורטים עד ה-10',
      'זיהוי תהליכים ידניים לאוטומציה',
    ],
  },
  {
    name: 'ביקורת',
    items: [
      'השלמת סקירות ל-80% מהחברות עד סוף החודש',
      'תיאום פגישות חודשיות עם לקוחות גדולים',
      'מעקב בסטטוס ביקורות במאגרי',
    ],
    extras: ['% דוחות שהושלמו', 'זמן ממוצע לביקורת'],
  },
  {
    name: 'ניהול כספים',
    items: [
      'הכנת תחזיות פיננסיות חודשיות ל-50% מהחברות',
      'זיהוי פערים בתזרים + המלצות עד סוף החודש',
      'פיתוח שליפת נתונים אוטומטית מסאמיט',
    ],
    extras: ['מספר תחזיות שהוכנו', '% המלצות שיושמו'],
  },
];

// טאב 5: חסר
export const missingItems = [
  { item: 'נהלי ניהול כספים — גביה, חשבוניות', urgency: 'מתועד חלקית', note: 'גביה = אורנה. אשראי נסלק 16 לחודש. הוראת קבע / שיקים / מזומן ידניים. מגלים פיגורים בדיעבד' },
  { item: 'נוהל בקרה מרכזית', urgency: 'מתועד חלקית', note: 'תומר + שחר (שותף) אחראים — "לא מסודר, מעט מאוד מידע אמין". גילוי בעיות = טלפון זועם מלקוח' },
  { item: 'אפיוני המשך (#2, #3...)', urgency: 'גבוהה', note: 'תומר אמר "הכל כוסה" — לאמת מה נשאר' },
  { item: 'נהלי אוטומציות לעסקים', urgency: 'בינונית', note: 'מחלקה קיימת באפיון' },
  { item: 'נוהל ישיבה שבוע/חודשי (חברות)', urgency: 'בינונית', note: 'קיים אבל ריק לחלוטין' },
  { item: 'נוהל שאלון לקוח (ביקורת)', urgency: 'בינונית', note: 'קיים אבל ריק' },
  { item: 'נהלי שיווק', urgency: 'נמוכה' },
  { item: 'תוכן YouTube @tomerperry1', urgency: 'נמוכה', note: 'לזיהוי קול ופרסונה' },
];

// פרסונת תומר (קול הבעלים)
export const tomerPersona = [
  { label: 'נושא YouTube מרכזי', value: '"איפה הכסף?" — מסביר לעצמאים את הפער בין רווח בדו"ח לאפס בבנק' },
  { label: 'גישה ללקוח', value: 'עובד עם הלקוח על הפרמטרים העסקיים שלו — לא רק חשבון, אלא מלווה עסקי' },
  { label: '3 המילים שלקוח יגיד', value: 'מקצועי | זמין | יוצא דופן' },
  { label: 'הבטחת ערך', value: '"לא עוד אחד" — נותן ערך מוסף, עוזר בכל מה שצריך בצד הפיננסי ובכלל' },
  { label: 'קהל יעד עיקרי (YouTube)', value: 'עצמאים שלא מבינים למה יש רווח על הנייר אבל חסר כסף בבנק' },
];

// ממצאי שאלון 80 — אפריל 2026
export const surveyPainPoints = [
  '"אין דבר שאני גאה בו במשרד"',
  '"לקוחות מאוכזבים מאיתנו ברמת השירות"',
  'מעל 50,000 ש"ח קנסות ב-2-3 שנים',
  '"הרבה" לקוחות אבדו בגלל שגיאות',
  '80% בלבד עמידה בזמנים',
  'מענה מעל 24 שעות לפנייה',
  'אין ישיבת צוות קבועה',
  'תזרים מזומנים — מה שנגמר שינה',
];

export const surveyStrengths = [
  '400,000 ש/חודש הכנסות (גדל מ-326K)',
  '10 לקוחות חדשים כל חודש',
  'כל הגעמדים מ-פה לאוזן',
  'תקציב AI: ללא הגבלה',
  '3 חודשים ללוח הזמנים',
  '8/10 נכונות לתת אוטומציה',
  'ירש משרד מאביו — מחויבות אישית עמוקה',
  '"כתבר" — איך רוצה שלקוחות ירגישו',
];

export const survey80Highlights = [
  { label: 'פרופיל אישי', finding: 'ירש מאביו ז"ל לפני 24 שנים. מיזג 3 משרדים ב-2023 עם שחר', remedy: 'זה לא רק עסק, זה ירושה. הסוכן שומר על שם המשפחה' },
  { label: 'שעות עבודה', finding: 'עובד 10 שעות, רצה 5. 5 שעות/יום = "עבודה שחורה" שרוצה לתת לסוכן', remedy: 'הסוכן מפנה 5 שעות ביום לתומר. זה ה-ROI הראשי' },
  { label: 'WhatsApp', finding: 'מעל 100 הודעות ביום', remedy: 'סוכן תגובה ל-WhatsApp = עדיפות עליונה' },
  { label: 'כספים', finding: 'הכנסה 400K, הוצאות 350K, רווח 50K (12.5% מרווח)', remedy: 'מרווח צר — כל קנס נגד שירות ברווח' },
  { label: 'לקוחות', finding: '~500 פעילים בפועל, 10 חדשים/חודש, "כמה עשרות" עזבו — בגלל שירות', remedy: 'Churn > Acquisition = בעיה. הסוכן מפחית churn' },
  { label: 'מחירון', finding: 'פטור ₪300, מורשה ₪500, חברה ₪2,000 (לפני מע"מ)', remedy: 'כלי תמחור לסוכן שיזהה תת-תמחור' },
  { label: 'גביה', finding: '~250 לקוחות ללא הוראת קבע (חצי!) Follow-up = טלפון בלבד', remedy: 'להעביר מקסימום ל-הוראת קבע. תזכורות אוטומטיות' },
  { label: 'קווים אדומים', finding: '"לשקר ללקוח" | "לשקר לי"', remedy: 'כל פעולה שעלולה לפגוע — אסקלציה לתומר' },
  { label: 'KPI הצלחה', finding: 'מענה מיידי ללקוחות + 100% עמידה בזמנים + אין הפתעות מס + לקוחות אומרים "וואו"', remedy: '4 מדדים ברורים לסוכן' },
  { label: 'גבולות הסוכן', finding: 'לא לדבר לי לא יפה | לא לגרום נזק כספי/תדמיתי ללקוח | הודעה = רק אחרי הגדרה 100%', remedy: 'לא לדבר אלא רק לאסכלציה לתומר' },
  { label: 'צמיחה עתידית', finding: 'קהל יעד: מקצועות חופשיים (רופאים, עורכי דין, אדריכלים). מוצר חדש: חברה וירטואלית ללקוחות', remedy: 'הסוכן הוא גם ה-MVP של המוצר החדש' },
  { label: 'ה"תירוץ" שלו', finding: '"אין לי זמן בגלל השוטף"', remedy: 'הסוכן צריך לשבר את הלולאה הזו — זה ה-mission' },
];

// טאב 6: מקורות
export const sources = [
  { name: 'רשימת מאיר — סוף הקובץ', detail: 'לקוחות קריטיים על פיוסם — פתרונות שדורש כתבה לפי איזו, וגם מאי, צת לפעי, קי' },
  { name: 'אפיון ארגוני', detail: 'אפיוני המשך על פיוסם — אפיון ראשון מורכים, רוקה לפיוסם' },
  { name: 'אפיון פירסם', detail: 'נהלי ארגוניות, חוק כלכי' },
  { name: 'מקצוע', detail: 'בקיר העברתיו מצקת חיבים' },
  { name: 'תעלי', detail: 'תקצירי מצקת מאמתי, ניות יבטו' },
  { name: 'הואי איזון', detail: 'תיקי, פיגות, מזכמים, ססקים' },
  { name: 'נביא', detail: 'תאומר' },
];

export const sourcesNote = 'יש על כל פיגוסם פעם — מאמר זור לכבר אגי לב לאזיוני. לתחים הסיוסם הוא לתביראיות נוסיוסם משטוס אם כי, גם מסע לעיצםי, נסי לתופי כי.';

// סיכום ביצועי לקוחות (דשבורד גבייה)
export const collectionDashboard = {
  active: 442,
  unpaid: 143,
  totalUnpaid: 275,
  generations: 6,
  generationsList: [
    { period: 'גביה שוטפת 2023', count: 387, content: 'מעקב חיוב חודשי — שנה מלאה' },
    { period: 'גביה שוטפת 2024', count: 455, content: 'מעקב חיוב חודשי — שנה מלאה' },
    { period: 'גביה שוטפת 2025', count: 510, content: 'מעקב חיוב חודשי — שנה מלאה' },
    { period: 'עבודות חד פעמיות', count: 42, content: 'תיאום מס, הלוואות בערבות מדינה, הצהרת הון' },
    { period: 'תשלום על דוחות שנתיים', count: 92, content: 'מעקב הגשה ותשלום דוחות שנתיים' },
    { period: 'גביה פירסט (מאסטר)', count: 589, content: 'תצוגה מאוחדת כל לקוח מ-01/23 עד 12/25' },
  ],
};

// צמיחת הכנסות חודשיות — 3 שנים
export const revenueGrowth = {
  intro: 'הכנסות חודשיות גדלו מ-192,446 ש"ח (ינואר 2023) ל-326,540 ש"ח (דצמבר 2025) בדשבורד. לפי תומר (אפריל 2026): ~400,000 ש/חודש. הוצאות: 350,000 ש. רווח נקי: 50,000 ש (12.5% מרווח) — צר מאוד.',
  rows: [
    { year: 2023, jan: '192,446 ₪', jun: '207,525 ₪', dec: '247,989 ₪', diff: '+29%' },
    { year: 2024, jan: '225,453 ₪', jun: '237,737 ₪', dec: '248,347 ₪', diff: '+0.1%' },
    { year: 2025, jan: '259,707 ₪', jun: '272,482 ₪', dec: '326,540 ₪', diff: '+31.5%' },
  ],
};

// אמצעי תשלום (פילוח)
export const paymentMethods = [
  { method: 'כרטיס אשראי / הוראת קבע (כ"א)', count: 308, pct: 52, note: 'גביה אוטומטית — הכי טוב' },
  { method: 'העברה בנקאית', count: 83, pct: 14, note: 'דורש מעקב ידני' },
  { method: 'שיק', count: 14, pct: 2, note: 'הכי בעייתי' },
  { method: 'מזומן', count: 9, pct: 1.5, note: 'אין תיעוד אוטומטי' },
  { method: 'לא מוגדר / משתנה', count: 8, pct: null, note: 'דורש בירור' },
];

export const collectionFlow = {
  responsible: 'אורנה (מזכירה)',
  steps: [
    { label: 'כרטיס אשראי', value: 'נסלק אוטומטי ב-16 לחודש ✅' },
    { label: 'הוראת קבע / העברה בנקאית', value: 'לקוח מעביר — צריך בדיקה ✅' },
    { label: 'שיקים / מזומן', value: 'מגיעים פיזית — בעיה תפעולית ⚠️' },
    { label: 'חייבים', value: 'מתקשרים אליהם. לפעמים מגלים פיגור אחרי כמה חודשים ⚠️' },
  ],
  rootCause: 'לא שולם → שכחו לדבר → נמשך חודשים',
};
