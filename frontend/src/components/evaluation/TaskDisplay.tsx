import React from 'react';
import type { EvaluationTask } from '@/types';
import './TaskDisplay.css';

interface TaskDisplayProps {
  task: EvaluationTask;
  progress?: {
    totalItems: number;
    completedItems: number;
    currentItem: string;
  };
}

export const TaskDisplay: React.FC<TaskDisplayProps> = ({ task, progress }) => {
  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'visual': return '👁️';
      case 'audio': return '🔊';
      case 'mixed': return '🎯';
      default: return '📝';
    }
  };

  return (
    <div className="task-display">
      <div className="task-header">
        <span className="task-id">Ítem {task.item_id}</span>
        {progress && (
          <div className="task-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(progress.completedItems / progress.totalItems) * 100}%` }}
              />
            </div>
            <span className="progress-text">
              {progress.completedItems}/{progress.totalItems}
            </span>
          </div>
        )}
      </div>

      <div className="task-instruction">
        <div className="task-type">
          <span className="type-icon">{getInteractionIcon(task.tipo_interaction)}</span>
          <span className="type-label">
            {task.tipo_interaction === 'visual' && 'Actividad Visual'}
            {task.tipo_interaction === 'audio' && 'Actividad de Audio'}
            {task.tipo_interaction === 'text' && 'Actividad de Texto'}
            {task.tipo_interaction === 'mixed' && 'Actividad Mixta'}
          </span>
        </div>
        <p className="instruction-text">{task.instrucciones}</p>
      </div>
    </div>
  );
};

export default TaskDisplay;