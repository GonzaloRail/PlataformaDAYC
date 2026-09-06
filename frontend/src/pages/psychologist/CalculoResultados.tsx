import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import evaluacionesApi from '@/services/evaluacionesApi';
import type { CalculoOnlineResponse } from '@/types';
import './CalculoResultados.css';

const AREAS = [
  { code: 'COG', label: 'Cognitivo', color: 'var(--cog)', short: 'COG' },
  { code: 'LEN', label: 'Comunicación', color: 'var(--len)', short: 'LEN' },
  { code: 'FIS', label: 'Desarrollo Físico', color: 'var(--fis)', short: 'FIS' },
  { code: 'SOC', label: 'Social Emocional', color: 'var(--soc)', short: 'SOC' },
  { code: 'ADA', label: 'Conducta Adaptativa', color: 'var(--ada)', short: 'ADA' },
];

const REF_LEVELS = [
  { range: '131+', label: 'Muy Superior', swatch: 'var(--gdq-superior)' },
  { range: '121-130', label: 'Superior', swatch: 'var(--gdq-average)' },
  { range: '111-120', label: 'Encima del Promedio', swatch: 'var(--gdq-average)' },
  { range: '90-110', label: 'Promedio', swatch: 'var(--gdq-average)' },
  { range: '80-89', label: 'Debajo del Promedio', swatch: 'var(--gdq-below)' },
  { range: '70-79', label: 'Bajo', swatch: 'var(--gdq-low)' },
  { range: '<70', label: 'Muy Bajo', swatch: 'var(--gdq-low)' },
];

function interpretacionBadge(text: string | null | undefined): string {
  if (!text) return '';
  const t = text.toLowerCase();
  if (t.includes('muy superior')) return 'cr-badge--muy-superior';
  if (t.includes('superior') && !t.includes('muy')) return 'cr-badge--superior';
  if (t.includes('por encima')) return 'cr-badge--encima';
  if (t.includes('promedio') && !t.includes('por debajo')) return 'cr-badge--promedio';
  if (t.includes('por debajo')) return 'cr-badge--debajo';
  if (t.includes('bajo')) return 'cr-badge--bajo';
  if (t.includes('muy bajo')) return 'cr-badge--muy-bajo';
  return 'cr-badge--promedio';
}

function gdqLevel(gdq: number): string {
  if (gdq >= 110) return 'cr-gdq-number--superior';
  if (gdq >= 90) return 'cr-gdq-number--average';
  if (gdq >= 80) return 'cr-gdq-number--below';
  return 'cr-gdq-number--low';
}

function gdqBarFill(gdq: number): string {
  if (gdq >= 110) return 'var(--gdq-superior)';
  if (gdq >= 90) return 'var(--gdq-average)';
  if (gdq >= 80) return 'var(--gdq-below)';
  return 'var(--gdq-low)';
}

const hexColors = ['#3b82f6', '#06b6d4', '#f59e0b', '#8b5cf6', '#ec4899'];

export function CalculoResultados() {
  const [edadMeses, setEdadMeses] = useState('');
  const [puntajes, setPuntajes] = useState<Record<string, string>>({
    COG: '', LEN: '', FIS: '', SOC: '', ADA: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculoOnlineResponse | null>(null);

  const handlePuntajeChange = (code: string, value: string) => {
    setPuntajes((prev) => ({ ...prev, [code]: value }));
  };

  const handleCalculate = async () => {
    setError(null);
    setResult(null);

    const edad = parseInt(edadMeses, 10);
    if (isNaN(edad) || edad < 0 || edad > 200) {
      setError('La edad debe ser un número entre 0 y 200 meses');
      return;
    }

    const parsed: Record<string, number> = {};
    for (const { code } of AREAS) {
      const v = parseInt(puntajes[code], 10);
      if (isNaN(v) || v < 0) {
        setError(`El puntaje de ${code} debe ser un número válido`);
        return;
      }
      parsed[code] = v;
    }

    setLoading(true);
    try {
      const data = await evaluacionesApi.calcularOnline(edad, parsed);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular resultados');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCalculate();
  };

  const chartData = result
    ? AREAS.map((area, idx) => {
        const r = result.resultados.find((rr) => rr.area === area.code);
        return {
          name: area.short,
          fullName: area.label,
          estandar: r?.puntuacion_estandar ?? 0,
          color: hexColors[idx],
        };
      })
    : [];

  const gdq = result?.gdq?.cociente_general ?? null;

  return (
    <div className="cr-page">
      {/* Header */}
      <header className="cr-header">
        <div className="cr-header-badge">DAYC-2 Calculator</div>
        <h1>Cálculo de Resultados</h1>
        <p>Simulador de puntajes — ingrese la edad y los puntajes brutos para calcular todos los indicadores del test</p>
      </header>

      {/* Main Grid */}
      <div className="cr-grid">
        {/* Input Card */}
        <div className="cr-card">
          <div className="cr-card-header">
            <h2 className="cr-card-title">Datos de entrada</h2>
            <p className="cr-card-subtitle">Complete todos los campos</p>
          </div>

          <div className="cr-age-group">
            <label htmlFor="cr-edad" className="cr-label">
              Edad del niño
            </label>
            <div className="cr-input-row">
              <input
                id="cr-edad"
                type="number"
                min="0"
                max="200"
                value={edadMeses}
                onChange={(e) => setEdadMeses(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="37"
                className="cr-input"
              />
              <span className="cr-unit">meses</span>
            </div>
          </div>

          <div className="cr-domains">
            {AREAS.map((area) => (
              <div key={area.code} className="cr-domain">
                <label htmlFor={`cr-${area.code}`} className="cr-domain-label">
                  <span className={`cr-domain-indicator cr-domain-indicator--${area.code.toLowerCase()}`} />
                  {area.code} — {area.label}
                </label>
                <input
                  id={`cr-${area.code}`}
                  type="number"
                  min="0"
                  value={puntajes[area.code]}
                  onChange={(e) => handlePuntajeChange(area.code, e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="0"
                  data-domain={area.code.toLowerCase()}
                  className="cr-domain-input"
                />
              </div>
            ))}
          </div>

          <button className="cr-submit" onClick={handleCalculate} disabled={loading}>
            {loading ? (
              <>
                <span className="cr-spinner" />
                Calculando...
              </>
            ) : (
              <>
                <span>→</span>
                Calcular Resultados
              </>
            )}
          </button>
        </div>

        {/* Reference Panel */}
        <div className="cr-ref-panel">
          <h3 className="cr-ref-title">Clasificación GDQ</h3>
          <div className="cr-ref-list">
            {REF_LEVELS.map((level) => (
              <div key={level.label} className="cr-ref-item">
                <span className="cr-ref-swatch" style={{ background: level.swatch }} />
                <span className="cr-ref-label">{level.label}</span>
                <span className="cr-ref-range">{level.range}</span>
              </div>
            ))}
          </div>
          {gdq && (
            <>
              <div className="cr-ref-divider" />
              <div className="cr-ref-current">
                GDQ actual: <strong style={{ color: gdqBarFill(gdq) }}>{gdq}</strong>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Error */}
      {error && <div className="cr-error">{error}</div>}

      {/* Results */}
      {result && (
        <div className="cr-results">
          {/* Table */}
          <div className="cr-section-header">
            <div className="cr-section-icon">📋</div>
            <h2 className="cr-section-title">Resultados por dominio</h2>
          </div>

          <div className="cr-table-wrap">
            <table className="cr-table">
              <thead>
                <tr>
                  <th>Área</th>
                  <th>PD</th>
                  <th>PE</th>
                  <th>Percentil</th>
                  <th>Edad Equivalente</th>
                  <th>Interpretación</th>
                </tr>
              </thead>
              <tbody>
                {AREAS.map((area) => {
                  const r = result.resultados.find((rr) => rr.area === area.code);
                  return (
                    <tr key={area.code}>
                      <td>
                        <div className="cr-domain-badge">
                          <span className={`cr-domain-code cr-domain-code--${area.code.toLowerCase()}`}>
                            {area.code}
                          </span>
                          {area.label}
                        </div>
                      </td>
                      <td className="cr-pd">{r?.puntuacion_directa ?? '-'}</td>
                      <td className={`cr-pe cr-pe--${area.code.toLowerCase()}`}>
                        {r?.puntuacion_estandar ?? '-'}
                      </td>
                      <td className="cr-percentil">{r?.percentil ?? '-'}</td>
                      <td className="cr-edad">{r?.edad_equivalente ?? '-'}</td>
                      <td>
                        {r?.interpretacion && (
                          <span className={`cr-badge ${interpretacionBadge(r.interpretacion)}`}>
                            {r.interpretacion}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* GDQ */}
          {result.gdq && (
            <div className="cr-gdq-grid">
              <div className="cr-gdq-card">
                <h3 className="cr-gdq-header">Cociente General de Desarrollo</h3>
                <div className="cr-gdq-value-row">
                  <span className={`cr-gdq-number ${gdqLevel(result.gdq.cociente_general)}`}>
                    {result.gdq.cociente_general}
                  </span>
                  <span className="cr-gdq-label">GDQ</span>
                </div>
                <div className="cr-gdq-meta">
                  <span>Suma PE: <strong>{result.suma_puntajes_estandar}</strong></span>
                  <span>Percentil: <strong>{result.gdq.percentil_general}</strong></span>
                </div>
                <div className="cr-progress-track">
                  <div
                    className="cr-progress-fill"
                    style={{
                      width: `${Math.min(100, (result.gdq.cociente_general / 160) * 100)}%`,
                      background: gdqBarFill(result.gdq.cociente_general),
                    }}
                  />
                </div>
                <div className="cr-progress-labels">
                  <span>40</span>
                  <span>100</span>
                  <span>160</span>
                </div>
                <div className="cr-gdq-clasif">
                  <span className={`cr-badge ${interpretacionBadge(result.gdq.clasificacion_general)}`}>
                    {result.gdq.clasificacion_general}
                  </span>
                  <span className="cr-gdq-clasif-note">— clasificación general</span>
                </div>
              </div>

              <div className="cr-gdq-card">
                <h3 className="cr-gdq-header">Referencia de clasificación</h3>
                <div className="cr-ref-list">
                  {REF_LEVELS.map((level) => (
                    <div key={level.label} className="cr-ref-item">
                      <span className="cr-ref-swatch" style={{ background: level.swatch }} />
                      <span className="cr-ref-label">{level.label}</span>
                      <span className="cr-ref-range">{level.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Charts */}
          <div className="cr-charts-grid">
            <div className="cr-chart-card">
              <h3 className="cr-chart-title">Puntaje Estándar por Dominio</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }}
                    interval={0}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 160]}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    axisLine={false}
                    tickLine={false}
                    width={36}
                  />
                  <Tooltip
                    formatter={(value) => [value, 'PE']}
                    labelFormatter={(label) => {
                      const area = AREAS.find((a) => a.short === label);
                      return area?.label ?? label;
                    }}
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      fontSize: '13px',
                    }}
                  />
                  <ReferenceLine
                    y={100}
                    stroke="#94a3b8"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: 'Media 100',
                      position: 'right',
                      fontSize: 10,
                      fill: '#94a3b8',
                    }}
                  />
                  <Bar dataKey="estandar" radius={[6, 6, 0, 0]} maxBarSize={48}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {result.gdq && (
              <div className="cr-chart-card">
                <h3 className="cr-chart-title">GDQ — Cociente General</h3>
                <div className="cr-gauge-container">
                  <div
                    className="cr-gauge-number"
                    style={{
                      color: gdqBarFill(result.gdq.cociente_general),
                    }}
                  >
                    {result.gdq.cociente_general}
                  </div>
                  <p className="cr-gauge-subtitle">Cociente General de Desarrollo</p>

                  <div className="cr-gauge-track">
                    <div
                      className="cr-gauge-marker"
                      style={{
                        left: `calc(${Math.min(100, (result.gdq.cociente_general / 160) * 100)}% - 10px)`,
                        borderColor: gdqBarFill(result.gdq.cociente_general),
                      }}
                    />
                  </div>
                  <div className="cr-gauge-labels">
                    <span>40</span>
                    <span>100</span>
                    <span>160</span>
                  </div>

                  <div style={{ marginTop: '24px' }}>
                    <span className={`cr-badge ${interpretacionBadge(result.gdq.clasificacion_general)}`} style={{ fontSize: 13, padding: '6px 16px' }}>
                      {result.gdq.clasificacion_general}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CalculoResultados;
