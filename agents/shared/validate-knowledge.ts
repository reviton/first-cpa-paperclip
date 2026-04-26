/**
 * Validation script for the shared knowledge base.
 * Run: npx ts-node agents/shared/validate-knowledge.ts
 *
 * Asserts that every agent id produces a non-trivial briefing containing
 * the core company identifiers. Exits 1 on any failure.
 */

import { ALL_AGENT_IDS, AGENT_CONTEXTS } from './agent-contexts';
import { buildBriefing } from './agent-briefing';

interface Row {
  id: string;
  hebrewName: string;
  tier: string;
  length: number;
  ok: boolean;
  reason?: string;
}

const REQUIRED_SUBSTRINGS = ['פירסט', '15:00', '10%'];
const MIN_LENGTH = 500;

function validate(): Row[] {
  return ALL_AGENT_IDS.map((id) => {
    const ctx = AGENT_CONTEXTS[id];
    try {
      const briefing = buildBriefing(id);
      const missingSubstring = REQUIRED_SUBSTRINGS.find((s) => !briefing.includes(s));
      if (briefing.length < MIN_LENGTH) {
        return {
          id,
          hebrewName: ctx.hebrewName,
          tier: ctx.tier,
          length: briefing.length,
          ok: false,
          reason: `briefing too short (${briefing.length} < ${MIN_LENGTH})`,
        };
      }
      if (missingSubstring) {
        return {
          id,
          hebrewName: ctx.hebrewName,
          tier: ctx.tier,
          length: briefing.length,
          ok: false,
          reason: `missing required substring "${missingSubstring}"`,
        };
      }
      return { id, hebrewName: ctx.hebrewName, tier: ctx.tier, length: briefing.length, ok: true };
    } catch (err) {
      return {
        id,
        hebrewName: ctx?.hebrewName ?? '?',
        tier: ctx?.tier ?? '?',
        length: 0,
        ok: false,
        reason: (err as Error).message,
      };
    }
  });
}

function main(): void {
  const rows = validate();
  const failed = rows.filter((r) => !r.ok);

  console.log('\nFirst CPA — Agent Knowledge Validation');
  console.log('='.repeat(70));
  console.log(
    'id'.padEnd(22) +
      'tier'.padEnd(12) +
      'length'.padEnd(10) +
      'status'
  );
  console.log('-'.repeat(70));
  for (const r of rows) {
    const status = r.ok ? 'OK' : `FAIL: ${r.reason ?? 'unknown'}`;
    console.log(
      r.id.padEnd(22) +
        r.tier.padEnd(12) +
        String(r.length).padEnd(10) +
        status
    );
  }
  console.log('-'.repeat(70));
  console.log(`Total: ${rows.length} | OK: ${rows.length - failed.length} | Failed: ${failed.length}\n`);

  if (failed.length > 0) {
    process.exit(1);
  }
}

main();
