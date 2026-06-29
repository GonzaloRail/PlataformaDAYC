import React, { useState } from 'react';
import type { Diagnostico } from '@/types';
import { api } from '@/services/api';
import './DiagnosisEdit.css';

interface DiagnosisEditProps {
  diagnostico: Diagnostico;
  evaluacionId: string;
  onSave: (updated: Diagnostico) => void;
  onCancel: () => void;
}

export const DiagnosisEdit: React.FC<DiagnosisEditProps> = ({
  diagnostico,
  evaluacionId,
  onSave,
  onCancel,
}) => {
  const [contenido, setContenido] = useState(diagnostico.contenido);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await api.put<{ status: string }>(
        `/api/diagnostico/${evaluacionId}/editar/`,
        { contenido }
      );

      const updatedDiagnostico: Diagnostico = {
        ...diagnostico,
        contenido,
        modificado_por_psicologo: true,
      };

      onSave(updatedDiagnostico);
    } catch (err) {
      setError('Error al guardar el diagnóstico. Intenta de nuevo.');
      console.error('Error saving diagnosis:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="diagnosis-edit-container">
      <div className="diagnosis-edit-header">
        <h3>✏️ Editar Diagnóstico</h3>
        <p className="edit-warning">
          ⚠️ Al editar, se marcará como modificado por psicólogo
        </p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="diagnostico-content">
          Contenido del Diagnóstico
        </label>
        <textarea
          id="diagnostico-content"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          rows={12}
          placeholder="Escribe el diagnóstico modificado..."
          className="diagnosis-textarea"
        />
        <span className="char-count">
          {contenido.length} / 5000 caracteres
        </span>
      </div>

      <div className="diagnosis-edit-actions">
        <button
          className="cancel-button"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancelar
        </button>
        <button
          className="save-button"
          onClick={handleSave}
          disabled={isSaving || !contenido.trim()}
        >
          {isSaving ? 'Guardando...' : '💾 Guardar Cambios'}
        </button>
      </div>
    </div>
  );
};

export default DiagnosisEdit;