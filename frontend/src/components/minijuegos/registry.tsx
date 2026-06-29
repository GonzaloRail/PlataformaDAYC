import COGNITIVO_045 from '../../minijuegos/cognitivo/COGNITIVO_045';
import COGNITIVO_046 from '../../minijuegos/cognitivo/COGNITIVO_046';
import COGNITIVO_047 from '../../minijuegos/cognitivo/COGNITIVO_047';
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
    nombre: 'Imita una cara',
    area: 'COGNITIVO',
    descripcion: 'Cara modelo con lienzo de dibujo para copia asistida.',
    estado: 'ready',
    component: COGNITIVO_045,
    fallback: FallbackManual,
  },
  COGNITIVO_046: {
    nombre: 'Clasifica animales y juguetes',
    area: 'COGNITIVO',
    descripcion: 'Clasifica objetos en categorías (juguetes, animales)',
    estado: 'ready',
    component: COGNITIVO_046,
    fallback: FallbackManual,
  },
  COGNITIVO_047: {
    nombre: 'Identifica el intruso',
    area: 'COGNITIVO',
    descripcion: 'El niño toca el objeto que no pertenece al grupo.',
    estado: 'ready',
    component: COGNITIVO_047,
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
