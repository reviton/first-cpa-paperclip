# Claude Code Prompt — Unified Knowledge Base for 16 Virtual Agents

> Paste this entire file as the first message in a new Claude Code session opened at
> `~/Desktop/first-cpa-organization/`.

---

## Your role

You are Claude Code working inside the repo `first-cpa-organization/`. Your job is to build a **single shared knowledge base** that all 16 virtual agents of פירסט חשבונאות ופיננסים import as their system context. The project is TypeScript/Node — do **not** write Python, bash orchestration, rollback scripts, monitoring daemons, or ROI calculators. Keep it tight.

## Tech stack (verified — do not reinvent)

- `agents/` — TypeScript agents. Existing: `agent-ceo/`, `agent-hr/`, `shared/`
- `agents/shared/types.ts` + `agents/shared/utils.ts` — extend these, don't parallel them
- `frontend/` — React (deployed at build-azure-gamma.vercel.app)
- `backend/` — Node
- Each agent folder has `package.json` + `index.ts` + optional `skills/`

---

## Company facts (source of truth — put these in `knowledge-base.ts`)

**פירסט חשבונאות ופיננסים בע"מ**
- כתובת: שד' פלי"ם 7, חיפה
- 24 שנות ותק, ~20 עובדים
- לקוחות: 553 ב-SUMMIT (~500 פעילים)
- הכנסות: ~₪400K/חודש · הוצאות: ~₪300K · רווח: ~₪100K (25%)

**הנהלה**
- תומר פרי — יו"ר ומייסד
- שחר — שותף רו"ח
- נועה לוי-אלגוריתם — מנכ"לית

**מחלקות**
| מחלקה | מנהל | צוות | לקוחות |
|---|---|---|---|
| עצמאים | שחר | עזרא חיו, חנה רוטנברג | 413 (74.7%) |
| חברות | תומר | יעל אסף, יוכבד, צירי, שושי, ברכה, מאיר | ~140 |
| שכר | תומר | רומן, אסיה | — |
| ביקורת | שחר | שקד, סאידה, נידאא | — |

**לוח זמנים חודשי**
- ימים 1–5: תזכורות חומרים
- יום 9: דדליין שכר
- ימים 15–19: הגשות מע"מ/מקדמות
- יום 16: סליקה
- יום 25: דוחות

**כאבים**
- איחורי הגשות → ₪20K+ קנסות ב-3 שנים
- WhatsApp overload → 20+ הודעות ביום
- גבייה ידנית ל-245 לקוחות (308 על סליקה אוטומטית ב-SUMMIT)
- Monday.com לא מספק כ-CRM
- נטישת לקוחות — עשרות בשנה

**חוקי ברזל**
1. **15:00 כל יום**: אף לקוח לא נשאר ללא מענה
2. **בדיקת סבירות**: קפיצה של 10%+ בכל מדד → בירור אנושי מיידי
3. **תבניות מאושרות בלבד**: שום הודעה אוטומטית שלא עברה אישור 100%

**גבולות AI (תומר)**
- אוטונומיה: 8/10 · תקציב: ללא מגבלה
- איסור מוחלט: כל פעולה שגורמת נזק כספי או תדמיתי
- חובת אישור אנושי: נגיעה במס, תקשורת עם רשויות, חתימות, קפיצה של 10%

---

## Agent roster (16 — use these exact ids)

**Management (3)**
- `tomer-peri` — יו"ר ומייסד
- `noa-levi-algo` — מנכ"לית
- `michal-barak` — HR Manager

**Active production agents (13)**
- `david-hashav` — דוחות וביקורת, טופס 1214
- `ronit-tik` — ניהול תיקיות A/B/C, בדיקת סבירות
- `shira-kesher` — שירות לקוחות, תקשורת, WhatsApp
- `agent-gviya` — גבייה, סליקה, מדרג תזכורות
- `agent-reminders` — תזכורות דדליינים, לוח שנה עברי
- `alex-tech-start` — הקמת חברות
- `agent-payroll` — חשב שכר
- `shira-finance` — פנסיות
- `rex-pro-account` — עצמאים
- `shira-cohen-levi` — בדיקת סבירות
- `onboard-pro` — קליטת לקוחות
- `taxflow-enterprise` — חשבונאות חברות
- `agent-whatsapp` — WhatsApp Business API

**Pending (to scaffold as stubs, but not fully wire)**
- `pro-com-digital` — שידורים
- `sarah-service` — צמיחה
- `danny-practical` — פורטל לקוחות
- `alex-crm` — ניהול CRM

---

## Build tasks

### 1. `agents/shared/knowledge-base.ts` (new)
Export a single typed constant `COMPANY_KNOWLEDGE` holding all the facts above as structured TypeScript (not a string blob). Shape:
```ts
export interface CompanyKnowledge {
  company: { name; address; clientsTotal; clientsActive; monthlyRevenueILS; profitMarginPct; yearsActive };
  leadership: { chairman; ceo; cpaPartner };
  departments: Record<'עצמאים' | 'חברות' | 'שכר' | 'ביקורת', Department>;
  monthlyTimeline: TimelineDay[];
  painPoints: PainPoint[];
  ironRules: string[];
  aiBoundaries: { autonomyLevel: number; prohibited: string[]; requiresHumanApproval: string[] };
}
```
All Hebrew strings stay Hebrew. Numbers are numbers (not formatted strings).

### 2. `agents/shared/types.ts` (extend)
Add:
```ts
export type AgentId = 'tomer-peri' | 'noa-levi-algo' | /* ...all 16 */;
export interface AgentContext { id: AgentId; hebrewName: string; department: string; reportsTo?: AgentId; focus: string[]; criticalKnowledgeKeys: (keyof CompanyKnowledge)[]; }
```

### 3. `agents/shared/agent-contexts.ts` (new)
Export `AGENT_CONTEXTS: Record<AgentId, AgentContext>` — one entry per agent with realistic `focus` (2–5 bullets) and `criticalKnowledgeKeys`.

### 4. `agents/shared/agent-briefing.ts` (new)
```ts
export function buildBriefing(agentId: AgentId): string
```
Returns a Hebrew system-prompt string that composes:
- Identity line ("אתה {hebrewName}, חלק מצוות פירסט חשבונאות ופיננסים בע"מ")
- The core company facts relevant to that agent (pulled from `COMPANY_KNOWLEDGE` via `criticalKnowledgeKeys`)
- Iron rules + AI boundaries (always included, verbatim)
- The agent's `focus` areas
- "אם אתה לא בטוח — העבר לאדם מיידית"

Target length: 600–1500 chars per agent. No lorem ipsum, no placeholder phone numbers.

### 5. Wire up existing agents
Update `agents/agent-ceo/index.ts` and `agents/agent-hr/index.ts` to:
- Import `buildBriefing` from `../shared/agent-briefing`
- Use `buildBriefing('noa-levi-algo')` / `buildBriefing('michal-barak')` as the system prompt in their Anthropic SDK call (or wherever the system prompt currently lives)

Keep all existing agent behavior. Don't remove skills or change their public interface.

### 6. Scaffold stubs for the 14 new agents
For each missing agent id, create `agents/{agent-id}/` with:
- `package.json` (minimal, copy shape from `agent-ceo/package.json`)
- `index.ts` that imports `buildBriefing('{agent-id}')` and exports a function `getSystemPrompt()`
- No real logic yet — just the briefing wired up

### 7. `agents/shared/validate-knowledge.ts` (new)
A small script runnable with `npx ts-node agents/shared/validate-knowledge.ts` that:
1. Iterates all 16 `AgentId` values
2. Calls `buildBriefing(id)` for each
3. Asserts `briefing.length > 500` and contains the strings `"פירסט"`, `"15:00"`, `"10%"`
4. Prints a table: `id | length | ✅/❌`
5. Exits with code 1 if any agent fails

---

## Hard constraints

- **TypeScript only.** No Python, no bash pipelines, no async mass-deployers.
- **No mock/fake data.** Every number comes from the facts above.
- **Hebrew content stays Hebrew. Code identifiers stay English.**
- **Reuse `agents/shared/`.** Don't create `agents/common/`, `agents/lib/`, or a parallel folder.
- **No rollback scripts, no monitoring daemons, no "emergency protocols".** If someone breaks the briefing, `validate-knowledge.ts` catches it.
- **No deploy.** Leave deployment to the user.

## Acceptance criteria

1. `cd agents/shared && npx tsc --noEmit` passes
2. `npx ts-node agents/shared/validate-knowledge.ts` prints 16 rows, all ✅, exit 0
3. Existing `agent-ceo` and `agent-hr` still compile and their system prompt is now sourced from `buildBriefing()`
4. Git diff is self-contained to `agents/` — no changes to `frontend/` or `backend/`
5. Total new code ≲ 800 lines

## Start here

1. Read `agents/shared/types.ts`, `agents/shared/utils.ts`, `agents/agent-ceo/index.ts`, `agents/agent-hr/index.ts` to understand existing patterns.
2. Build in order: types → knowledge-base → agent-contexts → agent-briefing → validate-knowledge → wire existing agents → scaffold stubs.
3. Run validation after each major step.
4. Report back with: file tree of `agents/`, validation output, any assumptions you had to make.
