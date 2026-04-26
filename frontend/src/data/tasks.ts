import { Task, TaskStatus, TaskCategory } from '../types';

export const tasks: Task[] = [
  {
    id: 'task-001',
    title: 'שליחת תזכורות איסוף חומר - יום 1-5',
    description: 'שליחת תזכורות אוטומטיות ללקוחות להגשת מסמכים חודשיים. יום 1: בקשה ראשונית, יום 5: תזכורת שנייה.',
    assignedAgent: 'agent-client-relations',
    assignedBy: 'agent-ceo',
    status: TaskStatus.COMPLETED,
    priority: 'HIGH',
    category: TaskCategory.CLIENT_COMM,
    createdAt: '2026-04-01T08:00:00Z',
    dueDate: '2026-04-05T23:59:00Z',
    completedAt: '2026-04-04T14:30:00Z'
  },
  {
    id: 'task-002',
    title: 'הכנת משכורות - יום 9',
    description: 'הכנה ועיבוד משכורות לכל לקוחות השכר. דד-ליין קריטי - אין אפשרות לדחייה.',
    assignedAgent: 'agent-auditor',
    assignedBy: 'agent-ceo',
    status: TaskStatus.IN_PROGRESS,
    priority: 'CRITICAL',
    category: TaskCategory.FILING,
    createdAt: '2026-04-01T08:00:00Z',
    dueDate: '2026-04-09T12:00:00Z'
  },
  {
    id: 'task-003',
    title: 'מעקב לקוחות שלא הגישו חומר',
    description: 'התקשרות טלפונית ללקוחות שלא הגישו חומר עד יום 10. רשימה של 47 לקוחות.',
    assignedAgent: 'agent-client-relations',
    assignedBy: 'agent-case-manager',
    status: TaskStatus.IN_PROGRESS,
    priority: 'HIGH',
    category: TaskCategory.CLIENT_COMM,
    createdAt: '2026-04-06T09:00:00Z',
    dueDate: '2026-04-10T18:00:00Z'
  },
  {
    id: 'task-004',
    title: 'דיווח מע"מ ומס הכנסה - ימים 15-19',
    description: 'הגשת דיווחי מע"מ ומס הכנסה לרשויות המס. כולל אימות סכומים ובדיקת סבירות.',
    assignedAgent: 'agent-auditor',
    assignedBy: 'agent-ceo',
    status: TaskStatus.PENDING,
    priority: 'CRITICAL',
    category: TaskCategory.FILING,
    createdAt: '2026-04-01T08:00:00Z',
    dueDate: '2026-04-19T23:59:00Z'
  },
  {
    id: 'task-005',
    title: 'חיוב אשראי אוטומטי - יום 16',
    description: 'ביצוע חיוב אוטומטי של 308 לקוחות בכרטיס אשראי. בדיקת הצלחת/כשלון חיובים.',
    assignedAgent: 'agent-case-manager',
    assignedBy: 'agent-ceo',
    status: TaskStatus.PENDING,
    priority: 'HIGH',
    category: TaskCategory.COLLECTION,
    createdAt: '2026-04-01T08:00:00Z',
    dueDate: '2026-04-16T12:00:00Z'
  },
  {
    id: 'task-006',
    title: 'שליחת דוחות חודשיים - יום 25',
    description: 'הפקת ושליחת דוחות חודשיים לכל הלקוחות הפעילים. כולל מאזן בוחן ודו"ח רווח/הפסד.',
    assignedAgent: 'agent-auditor',
    assignedBy: 'agent-ceo',
    status: TaskStatus.PENDING,
    priority: 'MEDIUM',
    category: TaskCategory.REPORTING,
    createdAt: '2026-04-01T08:00:00Z',
    dueDate: '2026-04-25T18:00:00Z'
  },
  {
    id: 'task-007',
    title: 'בדיקת סבירות - לקוחות עם קפיצת מחזור',
    description: 'זוהו 12 לקוחות עם קפיצה של 10%+ במחזור/מע"מ. נדרשת בדיקה מיידית למניעת חובות עתידיים.',
    assignedAgent: 'agent-case-manager',
    assignedBy: 'agent-ceo',
    status: TaskStatus.IN_PROGRESS,
    priority: 'HIGH',
    category: TaskCategory.REPORTING,
    createdAt: '2026-04-03T10:00:00Z',
    dueDate: '2026-04-08T18:00:00Z'
  },
  {
    id: 'task-008',
    title: 'גיוס סוכן כספים (Finance Agent)',
    description: 'הכנת דרישות ותהליך גיוס לסוכן כספים שיטפל בתכנון פיננסי וניהול תזרים מזומנים.',
    assignedAgent: 'agent-hr',
    assignedBy: 'agent-ceo',
    status: TaskStatus.PENDING,
    priority: 'MEDIUM',
    category: TaskCategory.RECRUITMENT,
    createdAt: '2026-04-01T08:00:00Z',
    dueDate: '2026-04-30T23:59:00Z'
  },
  {
    id: 'task-009',
    title: 'מעקב גבייה - לקוחות ללא הוראת קבע',
    description: 'יצירת קשר עם ~250 לקוחות שאין להם הוראת קבע. הצעת הסדר תשלום אוטומטי.',
    assignedAgent: 'agent-client-relations',
    assignedBy: 'agent-ceo',
    status: TaskStatus.PENDING,
    priority: 'MEDIUM',
    category: TaskCategory.COLLECTION,
    createdAt: '2026-04-02T08:00:00Z',
    dueDate: '2026-04-30T23:59:00Z'
  },
  {
    id: 'task-010',
    title: 'דו"ח סטטוס יומי למנכ"לית',
    description: 'הכנת דו"ח סיכום יומי הכולל: משימות שהושלמו, בעיות שנתגלו, משימות מאחרות, אישורים ממתינים.',
    assignedAgent: 'agent-ceo',
    assignedBy: 'chair-tomer',
    status: TaskStatus.COMPLETED,
    priority: 'LOW',
    category: TaskCategory.STRATEGIC,
    createdAt: '2026-04-02T07:00:00Z',
    completedAt: '2026-04-02T08:30:00Z'
  }
];

export const getTasksForAgent = (agentId: string) => tasks.filter(t => t.assignedAgent === agentId);
export const getTasksByStatus = (status: TaskStatus) => tasks.filter(t => t.status === status);
