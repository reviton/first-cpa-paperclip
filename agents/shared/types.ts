/**
 * Shared type definitions for all agents and the system
 */

export enum OrgPosition {
  CHAIR = 'CHAIR',
  CEO = 'CEO',
  HR_MANAGER = 'HR_MANAGER',
  AGENT = 'AGENT'
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
  isActive: boolean;
  status: AgentStatus;
  department?: string;
  reportsTo?: string;
  systemPrompt?: string;
  createdAt: Date;
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
  createdAt: Date;
  dueDate?: Date;
  completedAt?: Date;
  result?: any;
  parentTaskId?: string;
  subtasks?: string[];
  messages?: string[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  agentId: string;
  filePath: string;
  version: string;
  createdAt: Date;
}

export interface AgentConfig {
  id: string;
  name: string;
  role: string;
  position: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  type: MessageType;
  content: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  readAt?: Date;
}

export interface ApprovalRequest {
  id: string;
  taskId: string;
  requestedBy: string;
  approvedBy?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reason?: string;
  createdAt: Date;
}

export interface AgentRuntime {
  config: AgentConfig;
  status: AgentStatus;
  currentTask?: string;
  messageQueue: Message[];
  skills: Skill[];
  systemPrompt: string;
}

export interface LLMRequest {
  messages: Array<{ role: string; content: string }>;
  systemPrompt: string;
  maxTokens?: number;
}

export interface LLMResponse {
  content: string;
  usage: { input_tokens: number; output_tokens: number };
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
