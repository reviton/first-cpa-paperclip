/**
 * HR Agent — מיכל ברק
 *
 * Role: Human Resources Management
 * System prompt is built from the shared knowledge base so all 16 agents
 * stay in sync on company facts, iron rules, and AI boundaries.
 */

import { buildBriefing } from '../shared/agent-briefing';

const AGENT_ID = 'michal-barak' as const;

export function getSystemPrompt(): string {
  return buildBriefing(AGENT_ID);
}

const agentConfig = {
  id: 'agent-hr',
  agentContextId: AGENT_ID,
  name: 'סוכן מנהל HR',
  role: 'HR Manager',
  position: 'גיוס סוכנים',
};

console.log(`🚀 HR Agent initialized:`, agentConfig);
console.log(`📁 Skills directory: ./skills`);
console.log(`📋 System prompt length: ${getSystemPrompt().length} chars`);
console.log(`⏳ Waiting for recruitment tasks...`);
