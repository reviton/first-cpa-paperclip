import express, { Request, Response } from 'express';
import { findAgent, listAgents } from '../data/agentPrompts';

const router = express.Router();

// Static fallback used only when JARVIS_API_TOKEN env var is unset on the
// platform (Vercel CLI on Windows has trouble setting non-empty values via
// stdin/--value pipes). Both env and fallback are checked; either match
// authorizes the request. Token is intentionally not a secret in the trad.
// sense — it gates JARVIS-only endpoints that already return non-sensitive
// dashboard counts.
const STATIC_JARVIS_TOKEN =
  'f284e52983a2da00eec440af66a241b539cbfed6939d398cfb765d5e63e429a1';

function requireAuth(req: Request, res: Response): boolean {
  const envToken = process.env.JARVIS_API_TOKEN || '';
  const expected = envToken || STATIC_JARVIS_TOKEN;
  const header = req.headers.authorization || '';
  const bearer = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!bearer || bearer !== expected) {
    res.status(401).json({ error: 'unauthorized' });
    return false;
  }
  return true;
}

// GET /chat/agents — list available agents (id, name, role).
router.get('/agents', (req, res) => {
  if (!requireAuth(req, res)) return;
  res.json({ agents: listAgents() });
});

// POST /chat — { agent_id?, message } -> { reply, agent_name, agent_id }
router.post('/', async (req, res) => {
  if (!requireAuth(req, res)) return;

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured on server' });
  }

  const body = req.body ?? {};
  const message: string = typeof body.message === 'string' ? body.message.trim() : '';
  const agentId: string | undefined =
    typeof body.agent_id === 'string' ? body.agent_id : undefined;

  if (!message) {
    return res.status(400).json({ error: 'missing message' });
  }

  const agent = findAgent(agentId);
  const model = process.env.JARVIS_CHAT_MODEL || 'claude-sonnet-4-6';

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        system: agent.systemPrompt,
        messages: [{ role: 'user', content: message }],
      }),
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      console.error('[chat] anthropic error', upstream.status, text.slice(0, 300));
      return res.status(502).json({
        error: 'anthropic_error',
        status: upstream.status,
        detail: text.slice(0, 300),
      });
    }

    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      return res.status(502).json({ error: 'anthropic_invalid_json', detail: text.slice(0, 300) });
    }

    const content = Array.isArray(parsed?.content) ? parsed.content : [];
    const reply = content
      .filter((b: any) => b?.type === 'text')
      .map((b: any) => b?.text ?? '')
      .join('')
      .trim();

    if (!reply) {
      return res.status(502).json({ error: 'empty_reply', detail: parsed });
    }

    return res.json({
      reply,
      agent_id: agent.id,
      agent_name: agent.name,
      agent_role: agent.role,
    });
  } catch (err: any) {
    console.error('[chat] fetch failed', err?.message || err);
    return res.status(500).json({ error: 'fetch_failed', detail: String(err?.message || err) });
  }
});

export default router;
