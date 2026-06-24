import COGNITIVO_045 from '../../minijuegos/cognitivo/COGNITIVO_045';

interface MinijuegoEntry {
  nombre: string;
  area: string;
  descripcion: string;
  estado: 'ready' | 'placeholder';
  component: (props: any) => JSX.Element | null;
  fallback: (props: any) => JSX.Element | null;
}

const FallbackManual = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Modo de evaluación manual</h3>
      <p>Esta actividad requiere interacción manual con el evaluador.</p>
    </div>
  );
};

export const minijuegosRegistry: Record<string, MinijuegoEntry> = {
  COGNITIVO_045: {
    nombre: 'COGNITIVO_045 Imita una cara',
    area: 'COGNITIVO',
    descripcion: 'Cara modelo con lienzo de dibujo para copia asistida.',
    estado: 'ready',
    component: COGNITIVO_045,
    fallback: FallbackManual,
  },
};

export const getMinijuego = (id: string): MinijuegoEntry | undefined => {
  return minijuegosRegistry[id];
};

export const getAvailableMinijuegos = (): string[] => {
  return Object.keys(minijuegosRegistry);
};

export const getMinijuegosCatalog = () => {
  return Object.entries(minijuegosRegistry)
    .map(([id, entry]) => ({
      id,
      nombre: entry.nombre,
      area: entry.area,
      descripcion: entry.descripcion,
      estado: entry.estado,
    }))
    .sort((a, b) => {
      const byArea = a.area.localeCompare(b.area);
      if (byArea !== 0) {
        return byArea;
      }
      return a.id.localeCompare(b.id, undefined, { numeric: true });
    });
};
