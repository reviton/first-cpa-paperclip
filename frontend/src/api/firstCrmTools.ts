import { supabase } from './supabase';

// ============================================================================
// Tool registry for Claude tool-use
// Each tool = { definition sent to Claude, execute function run client-side }
// ============================================================================

type Entity =
  | 'clients' | 'jobs' | 'tasks' | 'pipelineItems' | 'messages' | 'invoices'
  | 'teamMembers' | 'automationRules' | 'documents' | 'signatureRequests' | 'timeEntries';

// ---- Low-level helper ----
async function fetchEntity(entity: Entity, filters?: Record<string, any>, limit = 1000): Promise<any[]> {
  let q = supabase.from('first_crm_data').select('data').eq('entity', entity).limit(limit);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  let items = (data ?? []).map((r: any) => r.data);
  if (filters) {
    const keys = Object.keys(filters);
    items = items.filter(item =>
      keys.every(k => {
        const v = filters[k];
        if (v === undefined || v === null) return true;
        const iv = item[k];
        if (typeof v === 'string') return String(iv ?? '').toLowerCase().includes(v.toLowerCase());
        return iv === v;
      })
    );
  }
  return items;
}

async function countEntity(entity: Entity): Promise<number> {
  const { count, error } = await supabase
    .from('first_crm_data')
    .select('*', { count: 'exact', head: true })
    .eq('entity', entity);
  if (error) throw new Error(error.message);
  return count ?? 0;
}

// ============================================================================
// Tool implementations
// ============================================================================

export interface ToolDef {
  name: string;
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

type ToolHandler = (input: any) => Promise<any>;

// Log an agent write action for visibility in first-crm dashboard
async function logActivity(tool: string, input: any, result: any): Promise<void> {
  try {
    const id = `act-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const agentId = (window as any).__CURRENT_AGENT_ID__ || 'unknown';
    await supabase.from('first_crm_data').upsert({
      entity: 'agentActivity',
      id,
      data: { id, tool, input, result, agentId, createdAt: new Date().toISOString() },
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[logActivity] failed:', err);
  }
}

const handlers: Record<string, ToolHandler> = {
  get_dashboard_stats: async () => {
    const entities: Entity[] = ['clients', 'jobs', 'tasks', 'messages', 'invoices', 'signatureRequests', 'teamMembers', 'documents', 'timeEntries', 'pipelineItems', 'automationRules'];
    const counts: Record<string, number> = {};
    for (const e of entities) counts[e] = await countEntity(e);
    return counts;
  },

  list_clients: async ({ status, type, limit = 20, search }: { status?: string; type?: string; limit?: number; search?: string }) => {
    const filters: Record<string, any> = {};
    if (status) filters.status = status;
    if (type) filters.type = type;
    if (search) filters.name = search;
    const items = await fetchEntity('clients', filters, 5000);
    return { count: items.length, items: items.slice(0, limit).map(c => ({
      id: c.id, name: c.name, type: c.type, status: c.status,
      retainer: c.retainer, outstanding: c.outstanding, assignee: c.assignee,
    })) };
  },

  get_client: async ({ id }: { id: string }) => {
    const items = await fetchEntity('clients', { id }, 5000);
    const exact = items.find(c => c.id === id);
    return exact ?? { error: `client ${id} not found` };
  },

  list_jobs: async ({ status, clientId, isUrgent, limit = 20 }: { status?: string; clientId?: string; isUrgent?: boolean; limit?: number }) => {
    const filters: Record<string, any> = {};
    if (status) filters.status = status;
    if (clientId) filters.clientId = clientId;
    if (typeof isUrgent === 'boolean') filters.isUrgent = isUrgent;
    const items = await fetchEntity('jobs', filters, 10000);
    return { count: items.length, items: items.slice(0, limit).map(j => ({
      id: j.id, title: j.title, clientName: j.clientName, status: j.status,
      deadline: j.deadline, assignee: j.assignee, isUrgent: j.isUrgent,
    })) };
  },

  list_pending_signatures: async ({ limit = 20 }: { limit?: number }) => {
    const items = await fetchEntity('signatureRequests', { status: 'pending' }, 5000);
    return { count: items.length, items: items.slice(0, limit).map(s => ({
      id: s.id, clientName: s.clientName, documentName: s.documentName,
      sentAt: s.sentAt, expiresAt: s.expiresAt,
    })) };
  },

  list_overdue_invoices: async ({ limit = 20 }: { limit?: number }) => {
    const items = await fetchEntity('invoices', { status: 'overdue' }, 5000);
    return { count: items.length, items: items.slice(0, limit).map(i => ({
      id: i.id, invoiceNumber: i.invoiceNumber, clientName: i.clientName,
      amount: i.amount, dueDate: i.dueDate, daysOverdue: i.daysOverdue,
    })) };
  },

  list_open_tasks: async ({ assignee, limit = 20 }: { assignee?: string; limit?: number }) => {
    const items = await fetchEntity('tasks', assignee ? { assignee } : undefined, 5000);
    const open = items.filter(t => t.status !== 'done');
    return { count: open.length, items: open.slice(0, limit).map(t => ({
      id: t.id, label: t.label, assignee: t.assignee, status: t.status, clientName: t.clientName,
    })) };
  },

  update_client_status: async ({ id, status }: { id: string; status: string }) => {
    // Find current
    const items = await fetchEntity('clients', undefined, 5000);
    const client = items.find(c => c.id === id);
    if (!client) return { error: `client ${id} not found` };
    const updated = { ...client, status };
    const { error } = await supabase
      .from('first_crm_data')
      .upsert({ entity: 'clients', id, data: updated, updated_at: new Date().toISOString() });
    if (error) return { error: error.message };
    return { ok: true, id, newStatus: status };
  },

  update_job_status: async ({ id, status }: { id: string; status: string }) => {
    const items = await fetchEntity('jobs', undefined, 10000);
    const job = items.find(j => j.id === id);
    if (!job) return { error: `job ${id} not found` };
    const updated = { ...job, status };
    const { error } = await supabase
      .from('first_crm_data')
      .upsert({ entity: 'jobs', id, data: updated, updated_at: new Date().toISOString() });
    if (error) return { error: error.message };
    return { ok: true, id, newStatus: status };
  },

  // ---- Write tools: create/update ----

  create_task: async ({ label, assignee, clientName, status = 'new' }: { label: string; assignee: string; clientName?: string; status?: string }) => {
    const id = `t-agent-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const task = { id, label, assignee, status, clientName };
    const { error } = await supabase
      .from('first_crm_data')
      .upsert({ entity: 'tasks', id, data: task, updated_at: new Date().toISOString() });
    if (error) return { error: error.message };
    return { ok: true, id, task };
  },

  update_task: async ({ id, label, status, assignee }: { id: string; label?: string; status?: string; assignee?: string }) => {
    const items = await fetchEntity('tasks', undefined, 5000);
    const task = items.find(t => t.id === id);
    if (!task) return { error: `task ${id} not found` };
    const updated = { ...task, ...(label && { label }), ...(status && { status }), ...(assignee && { assignee }) };
    const { error } = await supabase
      .from('first_crm_data')
      .upsert({ entity: 'tasks', id, data: updated, updated_at: new Date().toISOString() });
    if (error) return { error: error.message };
    return { ok: true, id, task: updated };
  },

  create_client_note: async ({ clientId, note }: { clientId: string; note: string }) => {
    // Appends a note to the client's comments field (preserves existing comments).
    const items = await fetchEntity('clients', undefined, 5000);
    const client = items.find(c => c.id === clientId);
    if (!client) return { error: `client ${clientId} not found` };
    const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const existing = client.comments ?? '';
    const updated = { ...client, comments: existing + (existing ? '\n' : '') + `[${timestamp}] ${note}` };
    const { error } = await supabase
      .from('first_crm_data')
      .upsert({ entity: 'clients', id: clientId, data: updated, updated_at: new Date().toISOString() });
    if (error) return { error: error.message };
    return { ok: true, clientId, note };
  },

  list_team: async () => {
    const items = await fetchEntity('teamMembers', undefined, 500);
    return { count: items.length, items: items.map(m => ({
      id: m.id, name: m.name, initials: m.initials, role: m.roleLabel,
      clientsCount: m.clientsCount, jobsCount: m.jobsCount, workload: m.workload,
    })) };
  },

  list_clients_by_assignee: async ({ assignee, limit = 50 }: { assignee: string; limit?: number }) => {
    const items = await fetchEntity('clients', { assignee }, 5000);
    return { count: items.length, items: items.slice(0, limit).map(c => ({
      id: c.id, name: c.name, type: c.type, status: c.status, retainer: c.retainer, outstanding: c.outstanding,
    })) };
  },

  search_clients: async ({ query, limit = 20 }: { query: string; limit?: number }) => {
    const items = await fetchEntity('clients', undefined, 5000);
    const q = query.toLowerCase();
    const matches = items.filter(c =>
      String(c.name ?? '').toLowerCase().includes(q) ||
      String(c.idNumber ?? '').toLowerCase().includes(q) ||
      String(c.id ?? '').toLowerCase().includes(q)
    );
    return { count: matches.length, items: matches.slice(0, limit).map(c => ({
      id: c.id, name: c.name, idNumber: c.idNumber, type: c.type, status: c.status, assignee: c.assignee,
    })) };
  },

  // ============================================================================
  // Analytical tools — higher-level queries for agent skills
  // ============================================================================

  top_debtors: async ({ limit = 10 }: { limit?: number }) => {
    const items = await fetchEntity('clients', undefined, 5000);
    const sorted = items
      .filter(c => (c.outstanding ?? 0) > 0)
      .sort((a, b) => (b.outstanding ?? 0) - (a.outstanding ?? 0))
      .slice(0, limit);
    const totalDebt = sorted.reduce((s, c) => s + (c.outstanding ?? 0), 0);
    return { totalDebt, count: sorted.length, items: sorted.map(c => ({
      id: c.id, name: c.name, outstanding: c.outstanding, retainer: c.retainer,
      assignee: c.assignee, isVip: c.isVip, type: c.type,
    })) };
  },

  clients_at_risk: async ({ threshold = 70, limit = 20 }: { threshold?: number; limit?: number }) => {
    const items = await fetchEntity('clients', undefined, 5000);
    const risky = items
      .filter(c => (c.riskScore ?? 0) >= threshold)
      .sort((a, b) => (b.riskScore ?? 0) - (a.riskScore ?? 0))
      .slice(0, limit);
    return { count: risky.length, items: risky.map(c => ({
      id: c.id, name: c.name, riskScore: c.riskScore, status: c.status,
      outstanding: c.outstanding, assignee: c.assignee,
    })) };
  },

  churn_risk_candidates: async ({ limit = 20 }: { limit?: number }) => {
    // Clients who combine: high outstanding + high risk OR blocked status
    const items = await fetchEntity('clients', undefined, 5000);
    const candidates = items
      .filter(c => c.status === 'blocked' || ((c.outstanding ?? 0) > 5000 && (c.riskScore ?? 0) >= 50))
      .slice(0, limit);
    return { count: candidates.length, items: candidates.map(c => ({
      id: c.id, name: c.name, status: c.status, riskScore: c.riskScore,
      outstanding: c.outstanding, retainer: c.retainer, yearlyValue: (c.retainer ?? 0) * 12,
    })) };
  },

  vip_clients_health: async () => {
    const items = await fetchEntity('clients', undefined, 5000);
    const vips = items.filter(c => c.isVip || c.status === 'vip');
    const withIssues = vips.filter(c => (c.outstanding ?? 0) > 0 || c.status === 'blocked' || (c.riskScore ?? 0) >= 60);
    return {
      totalVips: vips.length,
      healthyVips: vips.length - withIssues.length,
      vipsWithIssues: withIssues.length,
      totalMonthlyRetainer: vips.reduce((s, c) => s + (c.retainer ?? 0), 0),
      issues: withIssues.map(c => ({ id: c.id, name: c.name, outstanding: c.outstanding, riskScore: c.riskScore, status: c.status })),
    };
  },

  revenue_breakdown: async () => {
    const items = await fetchEntity('clients', undefined, 5000);
    const byType: Record<string, { count: number; monthlyRevenue: number }> = {};
    let totalMonthly = 0;
    let totalOutstanding = 0;
    for (const c of items) {
      const t = c.type || 'unknown';
      if (!byType[t]) byType[t] = { count: 0, monthlyRevenue: 0 };
      byType[t].count++;
      byType[t].monthlyRevenue += Number(c.retainer ?? 0);
      totalMonthly += Number(c.retainer ?? 0);
      totalOutstanding += Number(c.outstanding ?? 0);
    }
    return {
      totalClients: items.length,
      totalMonthlyRevenue: totalMonthly,
      estimatedAnnualRevenue: totalMonthly * 12,
      totalOutstanding,
      collectionRatio: totalMonthly > 0 ? Math.round((1 - totalOutstanding / (totalMonthly * 12)) * 100) : 100,
      byType,
    };
  },

  team_workload_analysis: async () => {
    const [clients, jobs, tasks, team] = await Promise.all([
      fetchEntity('clients', undefined, 5000),
      fetchEntity('jobs', undefined, 10000),
      fetchEntity('tasks', undefined, 5000),
      fetchEntity('teamMembers', undefined, 500),
    ]);
    const perAssignee: Record<string, any> = {};
    for (const m of team) {
      perAssignee[m.initials] = {
        name: m.name, initials: m.initials, role: m.roleLabel,
        declaredWorkload: m.workload, clientsCount: 0, openJobs: 0, openTasks: 0, overdueJobs: 0,
      };
    }
    for (const c of clients) {
      if (c.assignee && perAssignee[c.assignee]) perAssignee[c.assignee].clientsCount++;
    }
    for (const j of jobs) {
      if (j.assignee && perAssignee[j.assignee]) {
        if (j.status !== 'completed') perAssignee[j.assignee].openJobs++;
        if (j.status === 'overdue') perAssignee[j.assignee].overdueJobs++;
      }
    }
    for (const t of tasks) {
      if (t.assignee && perAssignee[t.assignee] && t.status !== 'done') {
        perAssignee[t.assignee].openTasks++;
      }
    }
    return { team: Object.values(perAssignee) };
  },

  collection_aging_report: async () => {
    const invoices = await fetchEntity('invoices', { status: 'overdue' }, 5000);
    const buckets = { '0-30': 0, '31-60': 0, '61-90': 0, '90+': 0 };
    const amounts = { '0-30': 0, '31-60': 0, '61-90': 0, '90+': 0 };
    for (const inv of invoices) {
      const d = inv.daysOverdue ?? 0;
      const bucket = d <= 30 ? '0-30' : d <= 60 ? '31-60' : d <= 90 ? '61-90' : '90+';
      buckets[bucket]++;
      amounts[bucket] += Number(inv.amount ?? 0);
    }
    const totalOverdue = invoices.reduce((s, i) => s + Number(i.amount ?? 0), 0);
    return { totalOverdue, totalInvoices: invoices.length, buckets, amounts };
  },

  upcoming_deadlines: async ({ days = 14, limit = 30 }: { days?: number; limit?: number }) => {
    // first-crm stores deadlines as DD/MM or DD/MM/YYYY — best-effort parse
    const jobs = await fetchEntity('jobs', undefined, 10000);
    const open = jobs.filter(j => j.status !== 'completed' && j.deadline).slice(0, 500);
    const upcoming = open.filter((j: any) => {
      const m = String(j.deadline).match(/(\d{1,2})[/.-](\d{1,2})(?:[/.-](\d{2,4}))?/);
      if (!m) return false;
      const day = parseInt(m[1]); const month = parseInt(m[2]); const year = m[3] ? parseInt(m[3].length === 2 ? '20' + m[3] : m[3]) : new Date().getFullYear();
      const d = new Date(year, month - 1, day);
      const diff = (d.getTime() - Date.now()) / 86400000;
      return diff >= -1 && diff <= days;
    });
    return { count: upcoming.length, items: upcoming.slice(0, limit).map(j => ({
      id: j.id, title: j.title, clientName: j.clientName, deadline: j.deadline, assignee: j.assignee, isUrgent: j.isUrgent, status: j.status,
    })) };
  },

  stuck_jobs: async ({ limit = 20 }: { limit?: number }) => {
    const jobs = await fetchEntity('jobs', undefined, 10000);
    const stuck = jobs.filter(j => j.status === 'waitingDocs' || j.status === 'overdue').slice(0, limit);
    return { count: stuck.length, items: stuck.map(j => ({
      id: j.id, title: j.title, clientName: j.clientName, status: j.status, deadline: j.deadline, assignee: j.assignee,
    })) };
  },

  unassigned_items: async () => {
    const [jobs, tasks] = await Promise.all([
      fetchEntity('jobs', undefined, 10000),
      fetchEntity('tasks', undefined, 5000),
    ]);
    const unassignedJobs = jobs.filter(j => !j.assignee || j.assignee === '').length;
    const unassignedTasks = tasks.filter(t => !t.assignee || t.assignee === '').length;
    return { unassignedJobs, unassignedTasks, total: unassignedJobs + unassignedTasks };
  },

  new_clients: async ({ sinceYear }: { sinceYear?: number } = {}) => {
    const items = await fetchEntity('clients', undefined, 5000);
    const year = sinceYear || new Date().getFullYear();
    const recent = items.filter(c => (c.since ?? 0) >= year);
    return { count: recent.length, year, items: recent.map(c => ({
      id: c.id, name: c.name, type: c.type, since: c.since, assignee: c.assignee, retainer: c.retainer,
    })) };
  },

  service_type_distribution: async () => {
    const items = await fetchEntity('clients', undefined, 5000);
    const dist: Record<string, number> = {};
    for (const c of items) {
      const s = c.serviceType || 'unknown';
      dist[s] = (dist[s] || 0) + 1;
    }
    return { total: items.length, distribution: dist };
  },

  jobs_by_status: async () => {
    const jobs = await fetchEntity('jobs', undefined, 10000);
    const dist: Record<string, number> = {};
    for (const j of jobs) {
      const s = j.status || 'unknown';
      dist[s] = (dist[s] || 0) + 1;
    }
    return { total: jobs.length, distribution: dist };
  },

  tasks_by_status: async () => {
    const tasks = await fetchEntity('tasks', undefined, 5000);
    const dist: Record<string, number> = {};
    for (const t of tasks) {
      const s = t.status || 'unknown';
      dist[s] = (dist[s] || 0) + 1;
    }
    return { total: tasks.length, distribution: dist };
  },

  signatures_summary: async () => {
    const sigs = await fetchEntity('signatureRequests', undefined, 5000);
    const pending = sigs.filter(s => s.status === 'pending');
    const signed = sigs.filter(s => s.status === 'signed');
    const expired = sigs.filter(s => s.status === 'expired');
    return {
      total: sigs.length, pending: pending.length, signed: signed.length, expired: expired.length,
      pendingRatio: sigs.length > 0 ? Math.round((pending.length / sigs.length) * 100) : 0,
      samplePending: pending.slice(0, 10).map(s => ({ id: s.id, clientName: s.clientName, documentName: s.documentName, expiresAt: s.expiresAt })),
    };
  },

  monthly_billing_summary: async ({ month, year }: { month?: number; year?: number } = {}) => {
    const invoices = await fetchEntity('invoices', undefined, 5000);
    const now = new Date();
    const m = month ?? now.getMonth();
    const y = year ?? now.getFullYear();
    const thisMonth = invoices.filter((i: any) => {
      const d = new Date(i.issueDate);
      return !isNaN(d.getTime()) && d.getMonth() === m && d.getFullYear() === y;
    });
    const paid = thisMonth.filter(i => i.status === 'paid').reduce((s, i) => s + Number(i.amount ?? 0), 0);
    const total = thisMonth.reduce((s, i) => s + Number(i.amount ?? 0), 0);
    return { month: m + 1, year: y, invoicesCount: thisMonth.length, totalAmount: total, paidAmount: paid, collectionPct: total > 0 ? Math.round((paid / total) * 100) : 0 };
  },

  inbox_unread_summary: async () => {
    const msgs = await fetchEntity('messages', undefined, 5000);
    const unread = msgs.filter(m => m.isUnread);
    const byType: Record<string, number> = {};
    for (const m of unread) {
      const t = m.type || 'unknown';
      byType[t] = (byType[t] || 0) + 1;
    }
    return { totalUnread: unread.length, totalMessages: msgs.length, byType, sample: unread.slice(0, 10).map(m => ({ id: m.id, clientName: m.clientName, subject: m.subject, time: m.time })) };
  },

  high_value_at_risk: async () => {
    const items = await fetchEntity('clients', undefined, 5000);
    const hvar = items.filter(c => (c.retainer ?? 0) >= 4000 && ((c.outstanding ?? 0) > 0 || (c.riskScore ?? 0) >= 60));
    return { count: hvar.length, totalAnnualValue: hvar.reduce((s, c) => s + (c.retainer ?? 0) * 12, 0), items: hvar.slice(0, 20).map(c => ({
      id: c.id, name: c.name, retainer: c.retainer, outstanding: c.outstanding, riskScore: c.riskScore, status: c.status, assignee: c.assignee,
    })) };
  },

  automation_rules_summary: async () => {
    const rules = await fetchEntity('automationRules', undefined, 500);
    const active = rules.filter(r => r.status === 'active').length;
    const errors = rules.filter(r => r.status === 'error').length;
    const totalRuns = rules.reduce((s, r) => s + Number(r.runCount ?? 0), 0);
    return { total: rules.length, active, errors, totalRuns, samples: rules.slice(0, 10).map(r => ({ id: r.id, name: r.name, status: r.status, runCount: r.runCount })) };
  },

  pipeline_status: async () => {
    const items = await fetchEntity('pipelineItems', undefined, 5000);
    const byStage: Record<string, number> = {};
    for (const p of items) {
      const s = p.stage || 'unknown';
      byStage[s] = (byStage[s] || 0) + 1;
    }
    const urgent = items.filter(p => p.isUrgent).length;
    return { total: items.length, urgent, byStage };
  },

  get_client_full: async ({ id }: { id: string }) => {
    // Returns client + all linked jobs/invoices/tasks/documents for a full 360° view.
    const clients = await fetchEntity('clients', undefined, 5000);
    const client = clients.find(c => c.id === id);
    if (!client) return { error: `client ${id} not found` };
    const [allJobs, allInvoices, allTasks, allDocs] = await Promise.all([
      fetchEntity('jobs', undefined, 10000),
      fetchEntity('invoices', undefined, 5000),
      fetchEntity('tasks', undefined, 5000),
      fetchEntity('documents', undefined, 5000),
    ]);
    return {
      client,
      jobs: allJobs.filter(j => j.clientId === id || j.clientName === client.name),
      invoices: allInvoices.filter(i => i.clientId === id || i.clientName === client.name),
      tasks: allTasks.filter(t => t.clientName === client.name),
      documents: allDocs.filter(d => d.clientName === client.name),
    };
  },
};

// ============================================================================
// Tool definitions sent to Claude
// ============================================================================

export const toolDefs: ToolDef[] = [
  {
    name: 'get_dashboard_stats',
    description: 'Get total counts of all entities in the CRM: clients, jobs, tasks, messages, invoices, pending signatures, team members, etc. Call this first when the user asks about overall state.',
    input_schema: { type: 'object', properties: {} },
  },
  {
    name: 'list_clients',
    description: 'List clients from the CRM. Supports filtering by status, type, and free-text search on name. Returns summary fields only.',
    input_schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['active', 'blocked', 'vip'], description: 'Filter by client status' },
        type: { type: 'string', enum: ['individual', 'company', 'partnership', 'nonprofit'], description: 'Filter by client type' },
        search: { type: 'string', description: 'Free-text search on client name (Hebrew)' },
        limit: { type: 'number', description: 'Max items to return (default 20)' },
      },
    },
  },
  {
    name: 'get_client',
    description: 'Get full details of a single client by ID.',
    input_schema: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    },
  },
  {
    name: 'list_jobs',
    description: 'List jobs (work items) from the CRM. Filter by status, client, or urgency.',
    input_schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['inProgress', 'waitingDocs', 'review', 'completed', 'overdue'] },
        clientId: { type: 'string', description: 'Filter jobs for a specific client' },
        isUrgent: { type: 'boolean' },
        limit: { type: 'number' },
      },
    },
  },
  {
    name: 'list_pending_signatures',
    description: 'List signature requests that are still pending (not signed or expired).',
    input_schema: {
      type: 'object',
      properties: { limit: { type: 'number' } },
    },
  },
  {
    name: 'list_overdue_invoices',
    description: 'List invoices that are overdue (past due date, not paid).',
    input_schema: {
      type: 'object',
      properties: { limit: { type: 'number' } },
    },
  },
  {
    name: 'list_open_tasks',
    description: 'List tasks that are not done. Optionally filter by assignee.',
    input_schema: {
      type: 'object',
      properties: {
        assignee: { type: 'string', description: 'Filter by assignee initials (e.g. "נ.מ.")' },
        limit: { type: 'number' },
      },
    },
  },
  {
    name: 'update_client_status',
    description: 'Update the status of a client (active/blocked/vip). Use sparingly — this writes to the real CRM.',
    input_schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        status: { type: 'string', enum: ['active', 'blocked', 'vip'] },
      },
      required: ['id', 'status'],
    },
  },
  {
    name: 'update_job_status',
    description: 'Update the status of a job. Use sparingly — this writes to the real CRM.',
    input_schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        status: { type: 'string', enum: ['inProgress', 'waitingDocs', 'review', 'completed', 'overdue'] },
      },
      required: ['id', 'status'],
    },
  },
  {
    name: 'create_task',
    description: 'Create a new task in the CRM. Use when the user asks you to open a task, schedule follow-up, or remember to do something.',
    input_schema: {
      type: 'object',
      properties: {
        label: { type: 'string', description: 'Task description (Hebrew)' },
        assignee: { type: 'string', description: 'Assignee initials e.g. "נ.מ."' },
        clientName: { type: 'string', description: 'Optional: link task to a specific client by name' },
        status: { type: 'string', enum: ['new', 'pending', 'inProgress', 'urgent', 'overdue', 'done'] },
      },
      required: ['label', 'assignee'],
    },
  },
  {
    name: 'update_task',
    description: 'Update an existing task: change status (e.g. mark as done), change assignee, or update label.',
    input_schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        label: { type: 'string' },
        status: { type: 'string', enum: ['new', 'pending', 'inProgress', 'urgent', 'overdue', 'done'] },
        assignee: { type: 'string' },
      },
      required: ['id'],
    },
  },
  {
    name: 'create_client_note',
    description: 'Append a timestamped note to a client\'s comments field. Useful for logging call summaries, decisions, or context.',
    input_schema: {
      type: 'object',
      properties: {
        clientId: { type: 'string' },
        note: { type: 'string', description: 'The note text (Hebrew or English)' },
      },
      required: ['clientId', 'note'],
    },
  },
  {
    name: 'list_team',
    description: 'List all team members with their roles, client counts, job counts, and workload.',
    input_schema: { type: 'object', properties: {} },
  },
  {
    name: 'list_clients_by_assignee',
    description: 'List all clients managed by a specific team member (by initials).',
    input_schema: {
      type: 'object',
      properties: {
        assignee: { type: 'string', description: 'Assignee initials e.g. "נ.מ."' },
        limit: { type: 'number' },
      },
      required: ['assignee'],
    },
  },
  {
    name: 'search_clients',
    description: 'Search clients by name, ID number, or internal ID. Returns matches with summary info.',
    input_schema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        limit: { type: 'number' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_client_full',
    description: 'Get a full 360° view of a client: basic info + all linked jobs, invoices, tasks, and documents. Use this when the user asks "tell me everything about client X".',
    input_schema: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    },
  },

  // ---- Analytical tools ----
  { name: 'top_debtors', description: 'Return the top N clients with the highest outstanding balance. Sums total debt.', input_schema: { type: 'object', properties: { limit: { type: 'number' } } } },
  { name: 'clients_at_risk', description: 'List clients with a risk score above a threshold (default 70). Used for proactive retention work.', input_schema: { type: 'object', properties: { threshold: { type: 'number' }, limit: { type: 'number' } } } },
  { name: 'churn_risk_candidates', description: 'Identify clients likely to churn: blocked status OR high outstanding + elevated risk score.', input_schema: { type: 'object', properties: { limit: { type: 'number' } } } },
  { name: 'vip_clients_health', description: 'Summary of VIP client health: total VIPs, how many have issues (debt/risk/blocked), and a list of the problematic ones.', input_schema: { type: 'object', properties: {} } },
  { name: 'revenue_breakdown', description: 'Revenue breakdown by client type + total monthly/annual estimate + total outstanding + collection ratio.', input_schema: { type: 'object', properties: {} } },
  { name: 'team_workload_analysis', description: 'Per-assignee breakdown: how many clients, open jobs, open tasks, overdue jobs for each team member. Used for rebalancing workload.', input_schema: { type: 'object', properties: {} } },
  { name: 'collection_aging_report', description: 'Overdue invoices split into aging buckets 0-30, 31-60, 61-90, 90+ days.', input_schema: { type: 'object', properties: {} } },
  { name: 'upcoming_deadlines', description: 'Jobs with deadlines in the next N days (default 14). Best-effort date parsing from Hebrew dd/mm format.', input_schema: { type: 'object', properties: { days: { type: 'number' }, limit: { type: 'number' } } } },
  { name: 'stuck_jobs', description: 'Jobs currently waiting for docs or overdue. Used to unblock bottlenecks.', input_schema: { type: 'object', properties: { limit: { type: 'number' } } } },
  { name: 'unassigned_items', description: 'Count of jobs and tasks that have no assignee. Governance check.', input_schema: { type: 'object', properties: {} } },
  { name: 'new_clients', description: 'Clients onboarded since a given year (default = current year).', input_schema: { type: 'object', properties: { sinceYear: { type: 'number' } } } },
  { name: 'service_type_distribution', description: 'Distribution of clients by serviceType (הנה"ח/ביקורת/שכר/...)', input_schema: { type: 'object', properties: {} } },
  { name: 'jobs_by_status', description: 'Distribution of jobs by status.', input_schema: { type: 'object', properties: {} } },
  { name: 'tasks_by_status', description: 'Distribution of tasks by status.', input_schema: { type: 'object', properties: {} } },
  { name: 'signatures_summary', description: 'Signature requests summary: total, pending, signed, expired + sample of pending ones.', input_schema: { type: 'object', properties: {} } },
  { name: 'monthly_billing_summary', description: 'Invoices for a given month (default current): count, total amount, paid amount, collection percentage.', input_schema: { type: 'object', properties: { month: { type: 'number' }, year: { type: 'number' } } } },
  { name: 'inbox_unread_summary', description: 'Count of unread messages split by channel + a sample. Used for communication triage.', input_schema: { type: 'object', properties: {} } },
  { name: 'high_value_at_risk', description: 'High-retainer clients (>=4000/month) with debt or elevated risk. Highest business-impact list.', input_schema: { type: 'object', properties: {} } },
  { name: 'automation_rules_summary', description: 'Summary of automation rules: active, errors, total runs.', input_schema: { type: 'object', properties: {} } },
  { name: 'pipeline_status', description: 'Pipeline items count by stage + urgent count.', input_schema: { type: 'object', properties: {} } },
];

// ============================================================================
// Executor — called from ChatPage when Claude returns tool_use blocks
// ============================================================================

// Tools that mutate data → we log them so the dashboard can show agent activity.
const WRITE_TOOLS = new Set([
  'update_client_status',
  'update_job_status',
  'create_task',
  'update_task',
  'create_client_note',
]);

export async function executeTool(name: string, input: any): Promise<any> {
  const handler = handlers[name];
  if (!handler) return { error: `unknown tool: ${name}` };
  try {
    const result = await handler(input);
    if (WRITE_TOOLS.has(name) && !(result && result.error)) {
      // Fire-and-forget — don't block on logging
      void logActivity(name, input, result);
    }
    return result;
  } catch (err: any) {
    return { error: err.message ?? String(err) };
  }
}