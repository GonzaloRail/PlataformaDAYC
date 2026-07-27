import type { Answer, Item } from '@/minijuegos/types';
import { InteractiveQA } from '@/minijuegos/shared/InteractiveQA';
import { COMUNICACION_067_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const STORY = 'La ardilla que perdio su nuez. Habia una vez una ardillita que guardo su nuez mas preciada bajo un arbol. Pero al dia siguiente, la nuez ya no estaba! La ardillita busco por todas partes. Pregunto al pajaro, al conejo y al raton. Finalmente, encontro su nuez escondida entre las hojas. El viento la habia movido sin querer. La ardillita guardo su nuez en un lugar mas seguro y fue muy feliz.';

const ROUNDS = [
  { key: 'r1', question: STORY + ' Que perdio la ardillita?', options: [{ emoji: '🥜', label: 'Una nuez', value: 'nuez' }, { emoji: '🧸', label: 'Un juguete', value: 'juguete' }, { emoji: '📖', label: 'Un libro', value: 'libro' }], correct: 'nuez' },
  { key: 'r2', question: 'Donde guardo la nuez al principio?', options: [{ emoji: '🌳', label: 'Bajo un arbol', value: 'arbol' }, { emoji: '🏠', label: 'En su casa', value: 'casa' }, { emoji: '🕳️', label: 'En un hoyo', value: 'hoyo' }], correct: 'arbol' },
  { key: 'r3', question: 'Quien movio la nuez?', options: [{ emoji: '💨', label: 'El viento', value: 'viento' }, { emoji: '🐦', label: 'El pajaro', value: 'pajaro' }, { emoji: '🐭', label: 'El raton', value: 'raton' }], correct: 'viento' },
  { key: 'r4', question: 'Como se sintio la ardillita al final?', options: [{ emoji: '😊', label: 'Feliz', value: 'feliz' }, { emoji: '😢', label: 'Triste', value: 'triste' }, { emoji: '😡', label: 'Enojada', value: 'enojada' }], correct: 'feliz' },
];

export default function COMUNICACION_067({ currentItem, onAnswer }: Props) {
  return <InteractiveQA currentItem={currentItem} onAnswer={onAnswer} activityId={COMUNICACION_067_CONFIG.id} title="Cuento y preguntas" instruction={COMUNICACION_067_CONFIG.descripcion} rounds={ROUNDS} layout="options-grid" />;
}
