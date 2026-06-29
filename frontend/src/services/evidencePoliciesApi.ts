import api from './api';

export interface EvidencePolicy {
  item_id: string;
  evidence_types: string[];
  enabled: boolean;
  updated_at: string | null;
  is_override?: boolean;
}

export async function listEvidencePolicies(): Promise<EvidencePolicy[]> {
  return api.get<EvidencePolicy[]>('/api/evaluaciones/evidence-policies/');
}

export async function getEvidencePolicy(itemId: string): Promise<EvidencePolicy> {
  return api.get<EvidencePolicy>(`/api/evaluaciones/evidence-policies/${encodeURIComponent(itemId)}/`);
}

export async function updateEvidencePolicy(
  itemId: string,
  evidenceTypes: string[],
  enabled = true,
): Promise<EvidencePolicy> {
  return api.put<EvidencePolicy>(`/api/evaluaciones/evidence-policies/${encodeURIComponent(itemId)}/`, {
    evidence_types: evidenceTypes,
    enabled,
  });
}

export async function resetEvidencePolicy(itemId: string): Promise<void> {
  await api.delete(`/api/evaluaciones/evidence-policies/${encodeURIComponent(itemId)}/`);
}
