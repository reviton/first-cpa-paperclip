import { Message, MessageType } from '../types';

export const messages: Message[] = [
  // === יום 1 באפריל - פתיחת חודש ===
  {
    id: 'msg-001',
    from: 'agent-ceo',
    to: 'agent-client-relations',
    type: MessageType.TASK_ASSIGNMENT,
    content: 'שירה, בוקר טוב. נא להתחיל בשליחת תזכורות איסוף חומר ללקוחות. זה יום 1 בחודש - נתחיל עם הפנייה הראשונית. עדיפות גבוהה.',
    createdAt: '2026-04-01T08:15:00Z'
  },
  {
    id: 'msg-002',
    from: 'agent-ceo',
    to: 'agent-auditor',
    type: MessageType.TASK_ASSIGNMENT,
    content: 'דוד, תתחיל בהכנות למשכורות של החודש. הדד-ליין ביום 9 - קריטי. אני צריכה עדכון התקדמות יומי.',
    createdAt: '2026-04-01T08:20:00Z'
  },
  {
    id: 'msg-003',
    from: 'agent-ceo',
    to: 'agent-case-manager',
    type: MessageType.TASK_ASSIGNMENT,
    content: 'רונית, תתחילי לרוץ על בדיקת סבירות חודש מרץ. כל קפיצה מעל 10% - אלי מיד. אני רוצה דוח עד ה-5 לחודש.',
    createdAt: '2026-04-01T08:25:00Z'
  },
  {
    id: 'msg-004',
    from: 'agent-client-relations',
    to: 'agent-ceo',
    type: MessageType.TASK_UPDATE,
    content: 'נועה, שלחתי תזכורות ל-487 לקוחות פעילים. 312 פתחו את ההודעה. 47 לקוחות עדיין לא הגיבו - אעקוב מחר.',
    createdAt: '2026-04-01T16:30:00Z'
  },
  {
    id: 'msg-005',
    from: 'agent-ceo',
    to: 'chair-tomer',
    type: MessageType.INFO,
    content: 'תומר, דו"ח סטטוס יומי:\n• תזכורות איסוף חומר: נשלחו ל-487 לקוחות, 312 פתחו\n• משכורות: דוד התחיל הכנות, צפי לסיום ביום 8\n• בדיקת סבירות: רונית התחילה סריקה של מרץ\n• גבייה: 308 חיובי אשראי מתוזמנים ליום 16\n• אין בעיות דחופות',
    createdAt: '2026-04-01T18:00:00Z',
    readAt: '2026-04-01T20:15:00Z'
  },

  // === יום 2 - ראיונות והיערכות ===
  {
    id: 'msg-006',
    from: 'agent-hr',
    to: 'agent-ceo',
    type: MessageType.INFO,
    content: 'נועה, סיימתי את תהליך הראיונות למנכ"ל. ראיינתי 3 מועמדים - דנה ביט-לוגיק, יוסף חשבון, ונועה לוי-אלגוריתם. הדו"ח המלא עם ציונים מוכן לעיון.',
    createdAt: '2026-04-02T14:00:00Z'
  },
  {
    id: 'msg-007',
    from: 'agent-ceo',
    to: 'agent-hr',
    type: MessageType.APPROVAL_RESPONSE,
    content: 'מיכל, עברתי על הדוח. עבודה מעולה. אני מאשרת את תהליך הגיוס לסוכנים הבאים: סוכן גבייה, סוכן תזכורות, וסוכן תקשורת WhatsApp. תתחילי להכין דרישות. תקציב: ללא מגבלה.',
    createdAt: '2026-04-02T15:00:00Z'
  },
  {
    id: 'msg-008',
    from: 'agent-hr',
    to: 'agent-ceo',
    type: MessageType.TASK_UPDATE,
    content: 'מצוין, נועה. הכנתי תיאור תפקיד ל-3 הסוכנים הראשונים. הנה הסיכום:\n1. סוכן גבייה: העברת 245 לקוחות לסליקה ב-SUMMIT\n2. סוכן תזכורות: אוטומציה של לוח הזמנים החודשי\n3. סוכן WhatsApp: מענה מיידי ל-20+ הודעות ביום\nמחכה לאישורך.',
    createdAt: '2026-04-02T16:30:00Z'
  },

  // === יום 3 - בעיות וטיפול ===
  {
    id: 'msg-009',
    from: 'agent-case-manager',
    to: 'agent-ceo',
    type: MessageType.ALERT,
    content: 'נועה, זיהיתי 12 לקוחות עם קפיצה של מעל 10% במחזור. לפי ההנחיות - נדרשת בדיקה מיידית כדי למנוע חובות מס עתידיים. מצרפת רשימה:\n• 4 חברות בע"מ - עלייה בהכנסות\n• 5 עוסקים מורשים - ירידה בהוצאות\n• 3 עצמאים - קפיצה חדה במע"מ',
    createdAt: '2026-04-03T10:15:00Z'
  },
  {
    id: 'msg-010',
    from: 'agent-ceo',
    to: 'agent-case-manager',
    type: MessageType.INFO,
    content: 'רונית, תודה על הזיהוי המהיר. תעדיפי את הבדיקה של 4 החברות - שם הסיכון הכי גבוה. דו"ח מפורט עד מחר. שום הפתעות מס.',
    createdAt: '2026-04-03T10:30:00Z'
  },
  {
    id: 'msg-011',
    from: 'agent-case-manager',
    to: 'agent-client-relations',
    type: MessageType.INFO,
    content: 'שירה, יש 3 לקוחות מהרשימה שלי שצריכים התייחסות מיוחדת. תשימי לב אם הם פונים - תעבירי ישירות ליעל אסף (מנהלת תיקים שלהם). לא לתת תשובות כלליות.',
    createdAt: '2026-04-03T11:00:00Z'
  },
  {
    id: 'msg-012',
    from: 'agent-client-relations',
    to: 'agent-case-manager',
    type: MessageType.TASK_UPDATE,
    content: 'הבנתי, רונית. סימנתי אותם כ-VIP. כל פנייה שלהם תועבר ישירות למנהל תיק. בנוסף, שלחתי להם הודעת מעקב אישית.',
    createdAt: '2026-04-03T11:15:00Z'
  },
  {
    id: 'msg-013',
    from: 'agent-auditor',
    to: 'agent-ceo',
    type: MessageType.TASK_UPDATE,
    content: 'נועה, עדכון משכורות:\n• עיבדתי 95 מתוך 140 חברות\n• רומן ואסיה סיימו את ההכנות מצד השכר\n• 3 חברות עם שינויים - מחכה לאישור מיעל\n• צפי לסיום: מחר בצהריים - יום לפני הדדליין',
    createdAt: '2026-04-03T17:00:00Z'
  },
  {
    id: 'msg-014',
    from: 'agent-ceo',
    to: 'chair-tomer',
    type: MessageType.INFO,
    content: 'תומר, דו"ח סטטוס יומי - יום 3:\n• משכורות: 95/140 עובדו, צפי סיום מחר (יום 4) - לפני הזמן!\n• בדיקת סבירות: 12 חריגות זוהו, 4 בטיפול מיידי\n• תזכורות: 312/487 לקוחות שלחו חומר. 47 טרם הגיבו\n• גבייה: מכינה תוכנית העברת 245 לקוחות לסליקה\n• ראיונות מנכ"ל: הושלמו - 3 מועמדים, דוח מוכן',
    createdAt: '2026-04-03T18:00:00Z',
    readAt: '2026-04-03T21:00:00Z'
  },

  // === יום 5-6 - מעקב ===
  {
    id: 'msg-015',
    from: 'agent-client-relations',
    to: 'agent-ceo',
    type: MessageType.TASK_UPDATE,
    content: 'נועה, עדכון יום 5:\n• 432 לקוחות שלחו חומר (89%)\n• 47 לקוחות טרם הגיבו - מתחילה סבב טלפונים\n• 8 הודעות WhatsApp נענו אוטומטית היום\n• 3 פניות הועברו למנהלי תיקים',
    createdAt: '2026-04-05T16:00:00Z'
  },
  {
    id: 'msg-016',
    from: 'agent-client-relations',
    to: 'agent-case-manager',
    type: MessageType.TASK_UPDATE,
    content: 'רונית, מעדכנת: 47 לקוחות לא הגישו חומר עד יום 5. התחלתי טלפונים. תעדכני אותי אם יש לקוחות שלא כדאי ללחוץ עליהם כרגע.',
    createdAt: '2026-04-06T09:15:00Z'
  },
  {
    id: 'msg-017',
    from: 'agent-case-manager',
    to: 'agent-client-relations',
    type: MessageType.INFO,
    content: 'שירה, 5 מהלקוחות האלה בתהליך סגירת שנה - אל תלחצי עליהם. שאר 42 - תמשיכי כרגיל. אגב, שקד מהביקורת ביקש שתזכירי ל-3 לקוחות ספציפיים לשלוח אישורי ניכוי מס.',
    createdAt: '2026-04-06T09:30:00Z'
  },

  // === יום 8-9 - דדליין שכר ===
  {
    id: 'msg-018',
    from: 'agent-auditor',
    to: 'agent-ceo',
    type: MessageType.TASK_UPDATE,
    content: 'נועה, משכורות הושלמו! 140/140 חברות. רומן ואסיה בדקו הכל. מוכן להגשה מחר (יום 9). אין חריגות.',
    createdAt: '2026-04-08T14:00:00Z'
  },
  {
    id: 'msg-019',
    from: 'agent-ceo',
    to: 'agent-auditor',
    type: MessageType.APPROVAL_RESPONSE,
    content: 'מעולה דוד! סיום יום לפני הדדליין - ככה צריך. תגיש מחר בבוקר ותעדכן אותי כשזה עבר. שום קנסות!',
    createdAt: '2026-04-08T14:15:00Z'
  },

  // === סוכן גבייה - תוכנית ===
  {
    id: 'msg-020',
    from: 'agent-ceo',
    to: 'agent-hr',
    type: MessageType.TASK_ASSIGNMENT,
    content: 'מיכל, נא להפעיל את סוכן הגבייה. רוצה שישלוף את 245 הלקוחות שלא על סליקה ב-SUMMIT ויתחיל לשלוח להם הודעות WhatsApp מהתבנית המאושרת. תזכורת ראשונה היום, שנייה אחרי 3 ימים.',
    createdAt: '2026-04-07T09:00:00Z'
  },
  {
    id: 'msg-021',
    from: 'agent-hr',
    to: 'agent-ceo',
    type: MessageType.TASK_UPDATE,
    content: 'סוכן הגבייה הופעל. שלף 245 לקוחות מ-SUMMIT. מיון לפי גודל חוב:\n• 18 לקוחות עם חוב מעל 10,000₪\n• 67 לקוחות עם חוב 3,000-10,000₪\n• 160 לקוחות עם חוב עד 3,000₪\nהודעות ראשונות נשלחו.',
    createdAt: '2026-04-07T11:00:00Z'
  },
  {
    id: 'msg-022',
    from: 'agent-ceo',
    to: 'chair-tomer',
    type: MessageType.INFO,
    content: 'תומר, דו"ח שבועי - שבוע ראשון:\n\n📊 תוצאות:\n• משכורות: הושלמו 100% - יום לפני הדדליין!\n• איסוף חומר: 89% מהלקוחות הגישו\n• בדיקת סבירות: 12 חריגות זוהו, 4 בטיפול\n• גבייה: התחלנו להעביר 245 לקוחות לסליקה\n\n🎯 שלב 1 מהתוכנית האסטרטגית מתקדם:\n• סוכן גבייה: פעיל\n• סוכן תזכורות: פעיל\n• סוכן WhatsApp: בהקמה\n\n⚠️ דורש תשומת לב:\n• 47 לקוחות לא הגישו חומר - שירה בטיפול\n• 3 לקוחות VIP עם חריגות - יעל מטפלת',
    createdAt: '2026-04-07T18:00:00Z',
    readAt: '2026-04-07T22:00:00Z'
  }
];

export const getMessagesForAgent = (agentId: string) =>
  messages.filter(m => m.from === agentId || m.to === agentId);

export const getUnreadCount = (agentId: string) =>
  messages.filter(m => m.to === agentId && !m.readAt).length;
