/**
 * CEO Agent — נועה לוי-אלגוריתם
 *
 * Role: Executive leadership
 * System prompt is built from the shared knowledge base so all 16 agents
 * stay in sync on company facts, iron rules, and AI boundaries.
 */

import { buildBriefing } from '../shared/agent-briefing';

const AGENT_ID = 'noa-levi-algo' as const;

export function getSystemPrompt(): string {
  return buildBriefing(AGENT_ID);
}

const agentConfig = {
  id: 'agent-ceo',
  agentContextId: AGENT_ID,
  name: 'סוכן מנכ״ל',
  role: 'CEO',
  position: 'מנהלת עליונה',
};

console.log(`🚀 CEO Agent initialized:`, agentConfig);
console.log(`📁 Skills directory: ./skills`);
console.log(`📋 System prompt length: ${getSystemPrompt().length} chars`);
console.log(`⏳ Waiting for tasks...`);
