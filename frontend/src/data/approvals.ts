import { ApprovalRequest } from '../types';

export const approvals: ApprovalRequest[] = [
  {
    id: 'apr-001',
    taskId: 'task-008',
    requestedBy: 'agent-hr',
    approvedBy: 'agent-ceo',
    status: 'APPROVED',
    reason: 'גיוס סוכן כספים נדרש לשיפור ניהול תזרים המזומנים. מאושר.',
    createdAt: '2026-04-02T14:30:00Z'
  },
  {
    id: 'apr-002',
    taskId: 'task-009',
    requestedBy: 'agent-client-relations',
    status: 'PENDING',
    reason: 'מבקשת אישור לשלוח הצעת הסדר תשלום אוטומטי ל-250 לקוחות. הודעה מבוססת תבנית מאושרת.',
    createdAt: '2026-04-03T11:00:00Z'
  },
  {
    id: 'apr-003',
    taskId: 'task-007',
    requestedBy: 'agent-case-manager',
    approvedBy: 'agent-ceo',
    status: 'APPROVED',
    reason: 'אישור לביצוע בדיקת סבירות מעמיקה ל-12 לקוחות עם קפיצת מחזור חריגה.',
    createdAt: '2026-04-03T10:20:00Z'
  },
  {
    id: 'apr-004',
    taskId: 'task-004',
    requestedBy: 'agent-auditor',
    status: 'PENDING',
    reason: 'מבקש אישור להגשת דיווחי מע"מ ב-batch אחד לכל 413 לקוחות עצמאים. חוסך 3 ימי עבודה.',
    createdAt: '2026-04-05T09:00:00Z'
  }
];
