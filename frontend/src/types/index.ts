/**
 * Frontend type definitions - mirrors shared agent types
 */

export enum OrgPosition {
  CHAIR = 'CHAIR',
  CEO = 'CEO',
  HR_MANAGER = 'HR_MANAGER',
  AGENT = 'AGENT',
  EMPLOYEE = 'EMPLOYEE'
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export enum AgentStatus {
  IDLE = 'IDLE',
  BUSY = 'BUSY',
  OFFLINE = 'OFFLINE',
  ERROR = 'ERROR'
}

export enum MessageType {
  TASK_ASSIGNMENT = 'TASK_ASSIGNMENT',
  TASK_UPDATE = 'TASK_UPDATE',
  APPROVAL_REQUEST = 'APPROVAL_REQUEST',
  APPROVAL_RESPONSE = 'APPROVAL_RESPONSE',
  INFO = 'INFO',
  ALERT = 'ALERT'
}

export enum TaskCategory {
  FILING = 'FILING',
  COLLECTION = 'COLLECTION',
  CLIENT_COMM = 'CLIENT_COMM',
  REPORTING = 'REPORTING',
  ADMIN = 'ADMIN',
  RECRUITMENT = 'RECRUITMENT',
  STRATEGIC = 'STRATEGIC'
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  position: OrgPosition;
  skills: string[];
  claudeSkillCommands?: string[];
  isActive: boolean;
  status: AgentStatus;
  department?: string;
  reportsTo?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedAgent: string;
  assignedBy: string;
  status: TaskStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: TaskCategory;
  createdAt: string;
  dueDate?: string;
  completedAt?: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  type: MessageType;
  content: string;
  createdAt: string;
  readAt?: string;
}

export interface ApprovalRequest {
  id: string;
  taskId: string;
  requestedBy: string;
  approvedBy?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reason?: string;
  createdAt: string;
}

export interface InterviewQuestion {
  id: number;
  category: string;
  question: string;
}

export interface CandidateProfile {
  id: string;
  name: string;
  nickname: string;
  background: string;
  strengths: string[];
  weaknesses: string[];
  experience: string;
  philosophy: string;
}

export interface InterviewAnswer {
  questionId: number;
  answer: string;
}

export interface InterviewTranscript {
  candidateId: string;
  answers: InterviewAnswer[];
}

export interface CandidateScore {
  strategicThinking: number;
  domainExpertise: number;
  delegationAbility: number;
  techAdoption: number;
  culturalFit: number;
  hebrewCommunication: number;
  total: number;
}

export interface InterviewReport {
  questions: InterviewQuestion[];
  candidates: CandidateProfile[];
  transcripts: InterviewTranscript[];
  scores: Record<string, CandidateScore>;
  selectedCandidateId: string;
  selectionReasoning: string;
}

export interface StatCardData {
  label: string;
  value: number | string;
  icon: string;
  color: string;
  subtitle?: string;
}

// Helper maps
export const taskStatusLabels: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: 'בהמתנה',
  [TaskStatus.IN_PROGRESS]: 'בביצוע',
  [TaskStatus.COMPLETED]: 'הושלם',
  [TaskStatus.FAILED]: 'נכשל'
};

export const taskCategoryLabels: Record<TaskCategory, string> = {
  [TaskCategory.FILING]: 'דיווח',
  [TaskCategory.COLLECTION]: 'גבייה',
  [TaskCategory.CLIENT_COMM]: 'תקשורת לקוחות',
  [TaskCategory.REPORTING]: 'דוחות',
  [TaskCategory.ADMIN]: 'אדמיניסטרציה',
  [TaskCategory.RECRUITMENT]: 'גיוס',
  [TaskCategory.STRATEGIC]: 'אסטרטגי'
};

export const agentStatusLabels: Record<AgentStatus, string> = {
  [AgentStatus.IDLE]: 'פנוי',
  [AgentStatus.BUSY]: 'עסוק',
  [AgentStatus.OFFLINE]: 'לא מחובר',
  [AgentStatus.ERROR]: 'שגיאה'
};

export const priorityLabels: Record<string, string> = {
  LOW: 'נמוך',
  MEDIUM: 'בינוני',
  HIGH: 'גבוה',
  CRITICAL: 'קריטי'
};
