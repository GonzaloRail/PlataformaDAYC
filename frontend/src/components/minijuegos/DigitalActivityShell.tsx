import React from 'react';
import { getMinijuego } from '@/components/minijuegos/registry';
import { EvaluationTask } from '@/types';
import { Item, AreaDAYC2, Answer } from '@/minijuegos/types';

interface DigitalActivityShellProps {
  task: EvaluationTask;
  onComplete: (resultado: 'CORRECT' | 'ERROR' | 'NOT_APPLICABLE', confidence?: number, rawData?: any) => void;
}

export const DigitalActivityShell: React.FC<DigitalActivityShellProps> = ({ task, onComplete }) => {
  const activityId = task.actividad_digital || task.item_id;
  const entry = getMinijuego(activityId);

  if (!entry) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--surface)', borderRadius: '8px' }}>
        <h3>Actividad no encontrada</h3>
        <p>No se pudo cargar la actividad digital para {activityId}.</p>
        <button onClick={() => onComplete('NOT_APPLICABLE')} className="fallback-cta">
          Saltar actividad
        </button>
      </div>
    );
  }

  const item: Item = {
    id: task.item_id,
    area: (task.area?.toUpperCase() || 'COGNITIVA') as AreaDAYC2,
    nivel: 1,
    instruccion: task.instrucciones,
  };

  const handleAnswer = (answer: Answer) => {
    // Cuando el minijuego emite la respuesta (ej. COGNITIVO_001 emite 'CORRECT' por mediapipe)
    // El shell lo retransmite hacia EvaluationSession con una confianza arbitraria alta (0.9)
    onComplete(answer.resultado, 0.9, { 
      minijuego_id: activityId,
      answer_details: answer.respuesta_usuario 
    });
  };

  const Component = entry.component;

  return (
    <div className="digital-activity-shell" style={{ width: '100%', height: '100%' }}>
      <Component currentItem={item} onAnswer={handleAnswer} />
    </div>
  );
};
