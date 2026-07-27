import type { Answer, Item } from '@/minijuegos/types';
import { ClassificationGame } from '@/minijuegos/shared/ClassificationGame';
import { COGNITIVO_049_CONFIG } from './config';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function COGNITIVO_049({ currentItem, onAnswer }: Props) {
  return (
    <ClassificationGame
      currentItem={currentItem}
      onAnswer={onAnswer}
      activityId={COGNITIVO_049_CONFIG.id}
      title="Clasifica por forma y color"
      instruction={currentItem.instruccion || 'Combina forma y color para decidir la caja de cada objeto.'}
      modo="multicriterio"
      items={[
        { id: 'circulo_rojo', label: 'Circulo rojo', emoji: '🔴', zoneId: 'circulo_rojo' },
        { id: 'circulo_rojo2', label: 'Circulo rojo', emoji: '🍎', zoneId: 'circulo_rojo' },
        { id: 'circulo_azul', label: 'Circulo azul', emoji: '🔵', zoneId: 'circulo_azul' },
        { id: 'circulo_azul2', label: 'Circulo azul', emoji: '🫐', zoneId: 'circulo_azul' },
        { id: 'cuadrado_rojo', label: 'Cuadrado rojo', emoji: '🟥', zoneId: 'cuadrado_rojo' },
        { id: 'cuadrado_rojo2', label: 'Cuadrado rojo', emoji: '🚗', zoneId: 'cuadrado_rojo' },
        { id: 'cuadrado_azul', label: 'Cuadrado azul', emoji: '🟦', zoneId: 'cuadrado_azul' },
        { id: 'cuadrado_azul2', label: 'Cuadrado azul', emoji: '📘', zoneId: 'cuadrado_azul' },
      ]}
      zones={[
        { id: 'circulo_rojo', label: 'Circulos rojos', emoji: '🔴', criteria: ['forma: circulo', 'color: rojo'] },
        { id: 'circulo_azul', label: 'Circulos azules', emoji: '🔵', criteria: ['forma: circulo', 'color: azul'] },
        { id: 'cuadrado_rojo', label: 'Cuadrados rojos', emoji: '🟥', criteria: ['forma: cuadrado', 'color: rojo'] },
        { id: 'cuadrado_azul', label: 'Cuadrados azules', emoji: '🟦', criteria: ['forma: cuadrado', 'color: azul'] },
      ]}
    />
  );
}
