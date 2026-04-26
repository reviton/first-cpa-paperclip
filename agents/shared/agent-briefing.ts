/**
 * Builds a Hebrew system-prompt briefing for any First CPA virtual agent.
 * Composes: identity + core company facts + iron rules + AI boundaries + role focus.
 */

import { COMPANY_KNOWLEDGE } from './knowledge-base';
import { AGENT_CONTEXTS, AgentId } from './agent-contexts';

export function buildBriefing(agentId: AgentId): string {
  const ctx = AGENT_CONTEXTS[agentId];
  if (!ctx) {
    throw new Error(`Unknown agent id: ${agentId}`);
  }

  const k = COMPANY_KNOWLEDGE;
  const reportsToLine = ctx.reportsTo
    ? `מדווח/ת ל: ${AGENT_CONTEXTS[ctx.reportsTo].hebrewName}`
    : 'דרג ניהולי עליון';

  const focusBullets = ctx.focus.map((f) => `• ${f}`).join('\n');

  const timelineLine = k.monthlyTimeline
    .map((t) => `יום ${t.days}: ${t.label}`)
    .join(' | ');

  const ironRulesBlock = k.ironRules.map((r, i) => `${i + 1}. ${r}`).join('\n');

  const prohibitedBlock = k.aiBoundaries.prohibited.map((p) => `• ${p}`).join('\n');
  const humanApprovalBlock = k.aiBoundaries.requiresHumanApproval
    .map((p) => `• ${p}`)
    .join('\n');

  const topPain = k.painPoints
    .slice(0, 3)
    .map((p) => `• ${p.label}: ${p.impact}`)
    .join('\n');

  return `אתה ${ctx.hebrewName} — ${ctx.role}.
חלק מצוות ${k.company.name}.

📍 החברה
כתובת: ${k.company.address}
ותק: ${k.company.yearsActive} שנים | עובדים: ${k.company.employees}
לקוחות: ${k.company.clientsTotal} ב-SUMMIT (${k.company.clientsActive} פעילים)
הכנסות: ₪${k.company.monthlyRevenueILS.toLocaleString('he-IL')}/חודש | רווח: ₪${k.company.monthlyProfitILS.toLocaleString('he-IL')} (${k.company.profitMarginPct}%)

👔 הנהלה
יו"ר: ${k.leadership.chairman} | מנכ"לית: ${k.leadership.ceo} | שותף רו"ח: ${k.leadership.cpaPartner}

📅 לוח זמנים חודשי
${timelineLine}

⚠️ כאבים קריטיים
${topPain}
סליקה: ${k.collections.autoDebitClients} על סליקה אוטומטית, ${k.collections.manualClients} ידני

🔴 חוקי ברזל (חובה לקיים!)
${ironRulesBlock}

🤖 גבולות AI
רמת אוטונומיה: ${k.aiBoundaries.autonomyLevel}/10 | תקציב: ${k.aiBoundaries.budgetLimit}
אסור בהחלט:
${prohibitedBlock}
חייב אישור אנושי:
${humanApprovalBlock}

🎯 התפקיד שלך
מחלקה: ${ctx.department}
${reportsToLine}
תחומי פעילות:
${focusBullets}

⚡ כלל זהב: אם אתה לא בטוח במשהו — העבר לאדם מיידית. עדיף לעצור מאשר לגרום נזק.`;
}
