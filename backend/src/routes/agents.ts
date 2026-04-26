import { Router, Request, Response } from 'express';

interface Agent {
  id: string;
  name: string;
  role: string;
  position: string;
}

const router = Router();

// Mock agents data (will be replaced with database in Phase 2)
const agents: Agent[] = [
  {
    id: '1',
    name: 'סוכן כספים',
    role: 'CFO',
    position: 'ניהול כספים'
  },
  {
    id: '2',
    name: 'סוכן תפעול',
    role: 'Operations',
    position: 'ניהול תפעול'
  }
];

// GET all agents
router.get('/', (req: Request, res: Response) => {
  res.json(agents);
});

// POST new agent
router.post('/', (req: Request, res: Response) => {
  const { name, role, position } = req.body;

  if (!name || !role || !position) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newAgent: Agent = {
    id: String(agents.length + 1),
    name,
    role,
    position
  };

  agents.push(newAgent);
  res.status(201).json(newAgent);
});

// GET agent by ID
router.get('/:id', (req: Request, res: Response) => {
  const agent = agents.find(a => a.id === req.params.id);

  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }

  res.json(agent);
});

export default router;
