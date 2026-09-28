import { useState } from 'react'
import { Download, FileWarning, GitBranch, RefreshCw, Search } from 'lucide-react'
import { Button, ViewState } from '@/components/ui'
import lineageApi from '@/services/lineageApi'
import type { LineageResponse, ProvenanceEdge, ProvenanceNode, ProvenanceNodeType } from '@/types'
import './LineageViewer.css'

const nodeTypeLabel: Record<ProvenanceNodeType, string> = {
  ENTITY: 'Entidad',
  ACTIVITY: 'Actividad',
  AGENT: 'Agente',
}

function formatDate(value?: string | null): string {
  if (!value) return 'Sin fecha registrada'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('es-PE', { dateStyle: 'medium', timeStyle: 'short' })
}

function nodeById(nodes: ProvenanceNode[], id: string): ProvenanceNode | undefined {
  return nodes.find((node) => node.id === id)
}

function NodeCard({ node }: { node: ProvenanceNode }) {
  return (
    <article className={`lineage-node lineage-node--${node.type.toLowerCase()}`}>
      <div className="lineage-node-heading">
        <span className="lineage-node-type">{nodeTypeLabel[node.type]}</span>
        {node.integrity_status && <span className={`lineage-integrity lineage-integrity--${node.integrity_status.toLowerCase()}`}>{node.integrity_status === 'VERIFIED' ? 'Íntegro' : node.integrity_status === 'FAILED' ? 'Integridad fallida' : 'Sin verificar'}</span>}
      </div>
      <h3>{node.label}</h3>
      {node.description && <p>{node.description}</p>}
      <dl>
        <div><dt>ID</dt><dd title={node.id}>{node.id}</dd></div>
        <div><dt>Versión</dt><dd>{node.version || 'No registrada'}</dd></div>
        <div><dt>Registro</dt><dd>{formatDate(node.created_at)}</dd></div>
      </dl>
    </article>
  )
}

function RelationRow({ edge, nodes }: { edge: ProvenanceEdge; nodes: ProvenanceNode[] }) {
  const source = nodeById(nodes, edge.source_id)
  const target = nodeById(nodes, edge.target_id)
  return (
    <li className="lineage-relation">
      <span>{source?.label || edge.source_id}</span>
      <strong>{edge.relation}</strong>
      <span>{target?.label || edge.target_id}</span>
    </li>
  )
}

export function LineageViewer() {
  const [evaluacionId, setEvaluacionId] = useState('')
  const [loadedId, setLoadedId] = useState<string | null>(null)
  const [lineage, setLineage] = useState<LineageResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadLineage = async (id = evaluacionId.trim()) => {
    if (!id) {
      setError('Ingresa el identificador de una evaluación para consultar su linaje.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await lineageApi.get(id)
      setLineage(data)
      setLoadedId(id)
    } catch (requestError) {
      setLineage(null)
      setError(requestError instanceof Error ? requestError.message : 'No se pudo cargar el linaje.')
    } finally {
      setLoading(false)
    }
  }

  const verifiedNodes = lineage?.nodes.filter((node) => node.integrity_status === 'VERIFIED').length || 0

  return (
    <section className="lineage-page">
      <header className="lineage-header">
        <div>
          <p className="lineage-kicker">Auditoría de procedencia</p>
          <h1>Linaje de la evaluación</h1>
          <p>Recorre las fuentes, actividades y responsables que sustentan una decisión o resultado.</p>
        </div>
        {lineage && loadedId && (
          <a className="lineage-export" href={lineageApi.exportUrl(loadedId)} download={`linaje-${loadedId}.json`}>
            <Download size={17} /> Exportar JSON
          </a>
        )}
      </header>

      <form className="lineage-search" onSubmit={(event) => { event.preventDefault(); void loadLineage() }}>
        <label htmlFor="lineage-evaluation-id">ID de evaluación</label>
        <div>
          <input id="lineage-evaluation-id" value={evaluacionId} onChange={(event) => setEvaluacionId(event.target.value)} placeholder="UUID de la evaluación" autoComplete="off" />
          <Button type="submit" isLoading={loading} leftIcon={<Search size={17} />}>Consultar linaje</Button>
        </div>
      </form>

      {loading && <ViewState kind="loading" message="Reconstruyendo el linaje de la evaluación..." />}
      {error && !loading && <ViewState kind="error" message={error} onRetry={() => void loadLineage()} />}

      {lineage && !loading && (
        <>
          <div className="lineage-summary" aria-label="Resumen del linaje">
            <div><span>Esquema</span><strong>{lineage.schema_version}</strong></div>
            <div><span>Nodos reconstruidos</span><strong>{lineage.nodes.length}</strong></div>
            <div><span>Relaciones</span><strong>{lineage.edges.length}</strong></div>
            <div><span>Integridad verificada</span><strong>{verifiedNodes} / {lineage.nodes.length}</strong></div>
          </div>

          <div className="lineage-content-grid">
            <section className="lineage-panel lineage-graph-panel">
              <div className="lineage-panel-heading"><GitBranch size={19} /><div><h2>Grafo de procedencia</h2><p>Entidades, actividades y agentes vinculados.</p></div></div>
              {lineage.nodes.length > 0 ? <div className="lineage-nodes">{lineage.nodes.map((node) => <NodeCard key={node.id} node={node} />)}</div> : <p className="lineage-empty">No se registraron nodos para esta evaluación.</p>}
            </section>

            <aside className="lineage-panel lineage-gaps-panel">
              <div className="lineage-panel-heading"><FileWarning size={19} /><div><h2>Huecos detectados</h2><p>Ausencias, objetos no disponibles o versiones incompatibles.</p></div></div>
              {lineage.gaps.length === 0 ? <p className="lineage-clear">No se detectaron huecos en la reconstrucción.</p> : <ul className="lineage-gaps">{lineage.gaps.map((gap) => <li key={gap.id} className={`lineage-gap lineage-gap--${gap.severity.toLowerCase()}`}><strong>{gap.code}</strong><p>{gap.message}</p>{gap.node_id && <small>Nodo: {gap.node_id}</small>}</li>)}</ul>}
            </aside>
          </div>

          <section className="lineage-panel lineage-chain-panel">
            <div className="lineage-panel-heading"><RefreshCw size={19} /><div><h2>Cadena de relaciones</h2><p>Lectura lineal de las conexiones incluidas en el grafo.</p></div></div>
            {lineage.edges.length > 0 ? <ol className="lineage-relations">{lineage.edges.map((edge) => <RelationRow key={edge.id} edge={edge} nodes={lineage.nodes} />)}</ol> : <p className="lineage-empty">No se registraron relaciones para esta evaluación.</p>}
          </section>
        </>
      )}
    </section>
  )
}

export default LineageViewer
