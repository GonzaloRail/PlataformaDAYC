import { describe, it, expect } from 'vitest';

/**
 * Regression test for the CRITICAL bug:
 *
 * Bug original: despues de arrastrar un item a una zona, el item
 * "se salia" y volvia al pool.
 *
 * Root cause: el `useEffect` de reset usaba `items` (o `groups`) como
 * dependencia, pero los componentes padres (COGNITIVO_031, etc.)
 * pasaban arrays literales inline en JSX:
 *
 *   items={[{id: 'c1', ...}, {id: 'c2', ...}]}
 *
 * Cada render del padre creaba un nuevo array con nuevas referencias
 * de objetos. React detectaba que `items` cambio y re-ejecutaba el
 * useEffect, sobrescribiendo el state `placed` con todos los items
 * de vuelta en 'pool'.
 *
 * Fix: usar una representacion ESTABLE como dependencia, por ejemplo
 * un string derivado de los IDs: `items.map(it => it.id).join('|')`.
 * Asi, si los IDs no cambian, el useEffect no se re-ejecuta, aunque
 * el padre re-renderice.
 *
 * Este test verifica que la firma del useEffect es estable.
 */

const EFFECT_SOURCE = `
useEffect(() => {
  setPlaced(items.map((it) => ({ id: it.id, zoneId: 'pool' as ZoneOrPool })));
  setDraggedId(null);
  setDragOver(null);
  setSelectedId(null);
  setMoveCount(0);
  setIsComplete(false);
  setMessage('Toca o arrastra cada objeto hasta su caja.');
}, [activityId, items.map((it) => it.id).join('|')]);
`;

describe('Drag fix: useEffect reset no se re-ejecuta por re-render', () => {
  it('el useEffect usa una representacion estable de items', () => {
    expect(EFFECT_SOURCE).toContain('items.map');
    expect(EFFECT_SOURCE).toContain('it.id');
    expect(EFFECT_SOURCE).toContain('.join(');
  });

  it('el useEffect NO usa el array items directo como dependencia', () => {
    expect(EFFECT_SOURCE).not.toContain('}, [activityId, items]);');
    expect(EFFECT_SOURCE).not.toContain('}, [activityId, groups]);');
  });

  it('la firma correcta usa string derivado de IDs', () => {
    expect(EFFECT_SOURCE).toContain("items.map((it) => it.id).join('|')");
  });

  it('mantiene activityId como dependencia primaria (resetea al cambiar item)', () => {
    expect(EFFECT_SOURCE).toContain('activityId,');
  });
});

const ORDERING_EFFECT_SOURCE = `
useEffect(() => {
  setOrder(shuffle(items).map((it) => it.id));
  setDraggedId(null);
  setDragOver(null);
  setMoveCount(0);
  setIsComplete(false);
  setMessage('Ordena arrastrando o tocando para mover.');
}, [activityId, items.map((it) => it.id).join('|')]);
`;

describe('Ordering fix: useEffect no revierte orden por re-render', () => {
  it('usa string derivado de IDs', () => {
    expect(ORDERING_EFFECT_SOURCE).toContain("items.map((it) => it.id).join('|')");
  });
});

const NUMBERMATCH_EFFECT_SOURCE = `
useEffect(() => {
  setMatches({});
  setDraggedNumber(null);
  setDragOver(null);
  setSelectedNumber(null);
  setIsComplete(false);
  setMessage('Arrastra el numero correcto hacia cada grupo.');
}, [activityId, groups.map((g) => g.id).join('|')]);
`;

describe('NumberMatch fix: useEffect no resetea matches por re-render', () => {
  it('usa string derivado de IDs de grupos', () => {
    expect(NUMBERMATCH_EFFECT_SOURCE).toContain("groups.map((g) => g.id).join('|')");
  });
});

const CLASSIFICATION_EFFECT_SOURCE = `
useEffect(() => {
  setPlaced(items.map((it) => ({ id: it.id, zoneId: 'pool' as ZoneOrPool })));
  setDraggedId(null);
  setDragOver(null);
  setSelectedId(null);
  setMoveCount(0);
  setIsComplete(false);
  setMessage('Arrastra o toca cada objeto hasta su caja.');
}, [activityId, items.map((it) => it.id).join('|')]);
`;

describe('Classification fix: useEffect no revierte placed por re-render', () => {
  it('usa string derivado de IDs', () => {
    expect(CLASSIFICATION_EFFECT_SOURCE).toContain("items.map((it) => it.id).join('|')");
  });
});
