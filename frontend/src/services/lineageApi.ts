import api, { toApiUrl } from '@/services/api'
import type { LineageResponse } from '@/types'

const lineagePath = (evaluacionId: string) => `/api/evaluaciones/${evaluacionId}/lineage/`

export const lineageApi = {
  get: (evaluacionId: string) => api.get<LineageResponse>(lineagePath(evaluacionId)),
  exportUrl: (evaluacionId: string) => toApiUrl(`${lineagePath(evaluacionId)}export/`),
}

export default lineageApi
