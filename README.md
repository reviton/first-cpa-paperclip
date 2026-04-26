# First CPA Organization - Multi-Agent System

A comprehensive multi-agent autonomous system for managing organizational tasks in a CPA firm. Each agent has specialized skills and can autonomously execute tasks within their domain of expertise.

## 🏢 Organizational Structure

```
יו"ר (Chair)
└── מנכ"ל (CEO)
    └── מנהל HR (HR Manager)
        └── סוכנים (Agents)
            - סוכן כספים (CFO Agent)
            - סוכן תפעול (Operations Agent)
            - סוכן אדמיניסטרציה (Admin Agent)
            - ... (more agents to come in Phase 2+)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/reviton/first-cpa-organization.git
cd first-cpa-organization

# Install dependencies for all workspaces
npm install
```

### Running the Project

#### Frontend (React Dashboard)
```bash
npm run start:frontend
# Opens at http://localhost:3000
```

#### Backend (Express API)
```bash
npm run start:backend
# Runs at http://localhost:3001
```

#### Individual Agents
```bash
# CEO Agent
cd agents/agent-ceo && npm start

# HR Agent
cd agents/agent-hr && npm start
```

## 📁 Project Structure

```
first-cpa-organization/
├── frontend/                 # React + TypeScript dashboard
│   ├── src/
│   │   ├── components/      # React components (OrgChart, AgentCard, etc.)
│   │   ├── styles/          # Global and component styles
│   │   └── App.tsx          # Main app component
│   └── package.json
│
├── backend/                  # Express.js API server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   └── index.ts         # Server entry point
│   └── package.json
│
├── agents/                   # Multi-agent system
│   ├── shared/              # Shared types and utilities
│   │   ├── types.ts         # TypeScript interfaces and enums
│   │   └── utils.ts         # Shared helper functions
│   │
│   ├── agent-ceo/           # CEO Agent
│   │   ├── index.ts         # Agent entry point
│   │   ├── skills/          # Agent skills (for Phase 2+)
│   │   └── package.json
│   │
│   ├── agent-hr/            # HR Manager Agent
│   │   ├── index.ts         # Agent entry point
│   │   ├── skills/          # Agent skills (for Phase 2+)
│   │   └── package.json
│   │
│   └── (More agents in Phase 2+)
│
├── package.json             # Root workspace configuration
├── .gitignore
└── README.md
```

## 🔄 Monorepo Architecture

This project uses **npm workspaces** for efficient monorepo management. Each workspace is independent but can share code through the `agents/shared` folder.

### Workspaces:
- `frontend` - React dashboard
- `backend` - Express API
- `agents/agent-ceo` - CEO agent
- `agents/agent-hr` - HR agent
- `agents/shared` - Shared utilities

## 🎯 Phase 1 (Current)

- ✅ Project structure and setup
- ✅ React frontend with organizational chart
- ✅ Express backend with agent API
- ✅ Agent folder structure with skills directories
- ✅ Shared type definitions and utilities
- ⏳ Git initialization and first commit

## 📋 Phase 2+ (Future)

- [ ] LLM integration (Claude API)
- [ ] Agent task execution system
- [ ] Web dashboard for skill management
- [ ] Real task delegation workflow
- [ ] Add CFO, Operations, Admin agents
- [ ] Database integration
- [ ] Agent communication protocol
- [ ] Performance monitoring
- [ ] Audit logging

## 🛠️ Tech Stack

### Frontend
- React 17
- TypeScript
- CSS (RTL support for Hebrew)
- React Router DOM v6

### Backend
- Node.js
- Express.js
- TypeScript
- CORS support

### Agents
- TypeScript
- Axios (for HTTP calls)
- Node.js

### Deployment
- Netlify (frontend)
- Heroku/AWS (backend - Phase 2)

## 📝 Agent Skills System

Each agent has a dedicated `skills/` folder where new skills can be added as TypeScript files. Skills are autonomous units of work that agents can execute.

Example structure:
```
agents/agent-ceo/skills/
├── task-delegation.ts
├── strategic-planning.ts
└── performance-report.ts
```

## 🔐 Security

- CORS enabled for local development
- Environment variables for sensitive data (Phase 2)
- Type-safe TypeScript throughout
- Input validation on API endpoints

## 📚 API Endpoints

### Agents
- `GET /api/agents` - Get all agents
- `GET /api/agents/:id` - Get specific agent
- `POST /api/agents` - Create new agent
- `GET /health` - Health check

## 🤝 Contributing

To add a new agent:

1. Create a folder in `agents/agent-{name}/`
2. Add `package.json` (copy from existing agent)
3. Create `index.ts` with agent initialization
4. Create `skills/` folder for agent capabilities
5. Update root `package.json` with new workspace

## 📞 Support

For issues or feature requests, please open a GitHub issue.

## 📄 License

All rights reserved - First CPA Organization
