import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './MetricsCharts.css';

interface MetricData {
  fecha: string;
  evaluaciones: number;
  completadas: number;
  duración_promedio?: number;
}

interface AreaData {
  name: string;
  value: number;
}

interface MetricsChartsProps {
  trendData?: MetricData[];
  completionData?: MetricData[];
  areaData?: AreaData[];
  durationData?: MetricData[];
  isLoading?: boolean;
}

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const MetricsCharts: React.FC<MetricsChartsProps> = ({
  trendData = [],
  completionData = [],
  areaData = [],
  durationData = [],
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="charts-loading">
        <div className="chart-skeleton"></div>
        <div className="chart-skeleton"></div>
      </div>
    );
  }

  const hasData = trendData.length > 0 || completionData.length > 0 || areaData.length > 0;

  if (!hasData) {
    return (
      <div className="charts-empty">
        <p>No hay datos disponibles para el período seleccionado</p>
      </div>
    );
  }

  return (
    <div className="metrics-charts">
      {trendData.length > 0 && (
        <div className="chart-container">
          <h3 className="chart-title">Tendencia de Evaluaciones</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="fecha" tick={{ fontSize: 12 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="evaluaciones"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Iniciadas"
              />
              <Line
                type="monotone"
                dataKey="completadas"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Completadas"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {completionData.length > 0 && (
        <div className="chart-container">
          <h3 className="chart-title">Tasa de Completación</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="fecha" tick={{ fontSize: 12 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="evaluaciones" fill="#4f46e5" name="Iniciadas" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completadas" fill="#10b981" name="Completadas" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {areaData.length > 0 && (
        <div className="chart-container">
          <h3 className="chart-title">Evaluaciones por Área</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={areaData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {areaData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {durationData.length > 0 && (
        <div className="chart-container">
          <h3 className="chart-title">Duración Promedio (minutos)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={durationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="fecha" tick={{ fontSize: 12 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="duración_promedio"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Duración (min)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default MetricsCharts;
