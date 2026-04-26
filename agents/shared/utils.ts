/**
 * Shared utility functions for all agents
 */

import { Agent, Task, OrgPosition, TaskStatus } from './types';

export class AgentUtils {
  /**
   * Get agent position hierarchy level
   */
  static getPositionLevel(position: OrgPosition): number {
    const levels: Record<OrgPosition, number> = {
      [OrgPosition.CHAIR]: 1,
      [OrgPosition.CEO]: 2,
      [OrgPosition.HR_MANAGER]: 3,
      [OrgPosition.AGENT]: 4
    };
    return levels[position];
  }

  /**
   * Check if agent can supervise another agent
   */
  static canSupervise(supervisor: Agent, subordinate: Agent): boolean {
    const supervisorLevel = this.getPositionLevel(supervisor.position);
    const subordinateLevel = this.getPositionLevel(subordinate.position);
    return supervisorLevel < subordinateLevel;
  }

  /**
   * Format agent name with role
   */
  static formatAgentName(agent: Agent): string {
    return `${agent.name} (${agent.role})`;
  }
}

export class TaskUtils {
  /**
   * Check if task is overdue
   */
  static isOverdue(task: Task): boolean {
    if (!task.dueDate || task.status === TaskStatus.COMPLETED) {
      return false;
    }
    return new Date() > task.dueDate;
  }

  /**
   * Get task status display text
   */
  static getStatusDisplay(status: TaskStatus): string {
    const displays: Record<TaskStatus, string> = {
      [TaskStatus.PENDING]: 'בהמתנה',
      [TaskStatus.IN_PROGRESS]: 'בביצוע',
      [TaskStatus.COMPLETED]: 'הושלם',
      [TaskStatus.FAILED]: 'נכשל'
    };
    return displays[status];
  }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
