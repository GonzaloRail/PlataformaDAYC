import type { Answer, Item } from '@/minijuegos/types';
import { RhymeGame } from '@/minijuegos/shared/RhymeGame';
import { COMUNICACION_052_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const PAIRS = [
  { word1: { text: 'sol', emoji: '☀️' }, word2: { text: 'col', emoji: '🥬' }, rhyme: true, key: 'p1' },
  { word1: { text: 'gato', emoji: '🐱' }, word2: { text: 'pato', emoji: '🦆' }, rhyme: true, key: 'p2' },
  { word1: { text: 'luna', emoji: '🌙' }, word2: { text: 'cuna', emoji: '🛏️' }, rhyme: true, key: 'p3' },
  { word1: { text: 'mesa', emoji: '🪑' }, word2: { text: 'silla', emoji: '🪑' }, rhyme: false, key: 'p4' },
  { word1: { text: 'flor', emoji: '🌸' }, word2: { text: 'tambor', emoji: '🥁' }, rhyme: false, key: 'p5' },
];

export default function COMUNICACION_052({ currentItem, onAnswer }: Props) {
  return <RhymeGame currentItem={currentItem} onAnswer={onAnswer} activityId={COMUNICACION_052_CONFIG.id} title="Riman o no?" instruction={COMUNICACION_052_CONFIG.descripcion} pairs={PAIRS} />;
}
