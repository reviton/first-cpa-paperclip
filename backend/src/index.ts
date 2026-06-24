import express from 'express';
import cors from 'cors';
import agentsRouter from './routes/agents';
import chatRouter from './routes/chat';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '256kb' }));

// Routes
app.use('/api/agents', agentsRouter);
app.use('/chat', chatRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
