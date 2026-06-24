import COGNITIVO_001 from './Cognitivo/COGNITIVO_001';
import SOCIAL_EMOCIONAL_001 from './Social_Emocional/SOCIAL_EMOCIONAL_001';
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

const Placeholder = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Actividad en desarrollo</h3>
      <p>Esta actividad aún no está disponible.</p>
    </div>
  );
};

export const minijuegosRegistry: Record<string, MinijuegoEntry> = {
  COGNITIVO_001: {
    nombre: 'COGNITIVO_001 Mano a la boca',
    area: 'COGNITIVA',
    descripcion: 'Deteccion mano-boca con validacion automatica y manual.',
    estado: 'ready',
    component: COGNITIVO_001,
    fallback: FallbackManual,
  },
  COGNITIVO_003: {
    nombre: 'COGNITIVO_003',
    area: 'COGNITIVA',
    descripcion: 'Actividad cognitiva en desarrollo.',
    estado: 'placeholder',
    component: Placeholder,
    fallback: FallbackManual,
  },
  COGNITIVO_004: {
    nombre: 'COGNITIVO_004',
    area: 'COGNITIVA',
    descripcion: 'Actividad cognitiva en desarrollo.',
    estado: 'placeholder',
    component: Placeholder,
    fallback: FallbackManual,
  },
  COGNITIVO_005: {
    nombre: 'COGNITIVO_005',
    area: 'COGNITIVA',
    descripcion: 'Actividad cognitiva en desarrollo.',
    estado: 'placeholder',
    component: Placeholder,
    fallback: FallbackManual,
  },
  COGNITIVO_045: {
    nombre: 'COGNITIVO_045 Imita una cara',
    area: 'COGNITIVO',
    descripcion: 'Cara modelo con lienzo de dibujo para copia asistida.',
    estado: 'ready',
    component: COGNITIVO_045,
    fallback: FallbackManual,
  },
  COMUNICACION_001: {
    nombre: 'COMUNICACION_001',
    area: 'COMUNICACION',
    descripcion: 'Actividad de comunicacion en desarrollo.',
    estado: 'placeholder',
    component: Placeholder,
    fallback: FallbackManual,
  },
  SOCIAL_EMOCIONAL_001: {
    nombre: 'SOCIAL_EMOCIONAL_001',
    area: 'SOCIAL_EMOCIONAL',
    descripcion: 'Ejemplo base de social emocional creado con plantilla.',
    estado: 'ready',
    component: SOCIAL_EMOCIONAL_001,
    fallback: FallbackManual,
  },
  DESARROLLO_FISICO_001: {
    nombre: 'DESARROLLO_FISICO_001',
    area: 'DESARROLLO_FISICO',
    descripcion: 'Actividad de desarrollo fisico en desarrollo.',
    estado: 'placeholder',
    component: Placeholder,
    fallback: FallbackManual,
  },
  CONDUCTA_ADAPTATIVA_001: {
    nombre: 'CONDUCTA_ADAPTATIVA_001',
    area: 'CONDUCTA_ADAPTATIVA',
    descripcion: 'Actividad de conducta adaptativa en desarrollo.',
    estado: 'placeholder',
    component: Placeholder,
    fallback: FallbackManual,
  },
};

const buildRangeIds = (prefix: string, start: number, end: number): string[] => {
  const ids: string[] = [];
  for (let i = start; i <= end; i += 1) {
    ids.push(`${prefix}_${String(i).padStart(3, '0')}`);
  }
  return ids;
};

for (const id of buildRangeIds('SOCIAL_EMOCIONAL', 2, 5)) {
  minijuegosRegistry[id] = {
    nombre: id,
    area: 'SOCIAL_EMOCIONAL',
    descripcion: 'Actividad social emocional en desarrollo.',
    estado: 'ready',
    component: SOCIAL_EMOCIONAL_001,
    fallback: FallbackManual,
  };
}

for (const id of buildRangeIds('COMUNICACION', 2, 5)) {
  minijuegosRegistry[id] = {
    nombre: id,
    area: 'COMUNICACION',
    descripcion: 'Actividad de comunicacion en desarrollo.',
    estado: 'placeholder',
    component: Placeholder,
    fallback: FallbackManual,
  };
}

for (const id of buildRangeIds('DESARROLLO_FISICO', 2, 5)) {
  minijuegosRegistry[id] = {
    nombre: id,
    area: 'DESARROLLO_FISICO',
    descripcion: 'Actividad de desarrollo fisico en desarrollo.',
    estado: 'placeholder',
    component: Placeholder,
    fallback: FallbackManual,
  };
}

for (const id of buildRangeIds('CONDUCTA_ADAPTATIVA', 2, 5)) {
  minijuegosRegistry[id] = {
    nombre: id,
    area: 'CONDUCTA_ADAPTATIVA',
    descripcion: 'Actividad de conducta adaptativa en desarrollo.',
    estado: 'placeholder',
    component: Placeholder,
    fallback: FallbackManual,
  };
}

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
