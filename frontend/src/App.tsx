import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import AgentsPage from './pages/AgentsPage';
import AgentDetailPage from './pages/AgentDetailPage';
import TasksPage from './pages/TasksPage';
import OrgChartPage from './pages/OrgChartPage';
import MessagesPage from './pages/MessagesPage';
import ApprovalsPage from './pages/ApprovalsPage';
import InterviewPage from './pages/InterviewPage';
import StrategicPlanPage from './pages/StrategicPlanPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div dir="rtl">
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/agents/:id" element={<AgentDetailPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/org-chart" element={<OrgChartPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/approvals" element={<ApprovalsPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/strategic-plan" element={<StrategicPlanPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
