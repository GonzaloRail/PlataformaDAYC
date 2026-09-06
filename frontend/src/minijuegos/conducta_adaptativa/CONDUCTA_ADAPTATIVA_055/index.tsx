import type { Answer, Item } from '@/minijuegos/types';
import { WeatherClothesGame } from '@/minijuegos/shared/WeatherClothesGame';
import { CONDUCTA_ADAPTATIVA_055_CONFIG } from './config';

interface Props { currentItem: Item; onAnswer: (answer: Answer) => void; }

const ROUNDS = [
  {
    weather: { emoji: '⛄', label: 'Mucho frio' },
    message: 'Nieva. Que ropa te pones?',
    clothes: [
      { id: 'bufanda', label: 'Bufanda', emoji: '🧣', correct: true },
      { id: 'gorro', label: 'Gorro', emoji: '🧢', correct: true },
      { id: 'abrigo', label: 'Abrigo', emoji: '🧥', correct: true },
      { id: 'short', label: 'Short', emoji: '🩳', correct: false },
      { id: 'ojotas', label: 'Ojotas', emoji: '🩴', correct: false },
      { id: 'musculosa', label: 'Musculosa', emoji: '👕', correct: false },
    ],
    key: 'r1',
  },
  {
    weather: { emoji: '☀️', label: 'Mucho calor' },
    message: 'Hace sol y calor. Que ropa te pones?',
    clothes: [
      { id: 'short2', label: 'Short', emoji: '🩳', correct: true },
      { id: 'remera', label: 'Remera', emoji: '👕', correct: true },
      { id: 'ojotas2', label: 'Ojotas', emoji: '🩴', correct: true },
      { id: 'abrigo2', label: 'Abrigo', emoji: '🧥', correct: false },
      { id: 'bufanda2', label: 'Bufanda', emoji: '🧣', correct: false },
      { id: 'gorro2', label: 'Gorro de lana', emoji: '🧢', correct: false },
    ],
    key: 'r2',
  },
  {
    weather: { emoji: '🌧️', label: 'Lluvia' },
    message: 'Esta lloviendo. Que ropa te pones?',
    clothes: [
      { id: 'impermeable', label: 'Impermeable', emoji: '🧥', correct: true },
      { id: 'botas', label: 'Botas de lluvia', emoji: '🥾', correct: true },
      { id: 'paraguas', label: 'Paraguas', emoji: '☂️', correct: true },
      { id: 'short3', label: 'Short', emoji: '🩳', correct: false },
      { id: 'ojotas3', label: 'Ojotas', emoji: '🩴', correct: false },
      { id: 'lentes', label: 'Lentes de sol', emoji: '🕶️', correct: false },
    ],
    key: 'r3',
  },
];

export default function CONDUCTA_ADAPTATIVA_055({ currentItem, onAnswer }: Props) {
  return <WeatherClothesGame currentItem={currentItem} onAnswer={onAnswer} activityId={CONDUCTA_ADAPTATIVA_055_CONFIG.id} title="Ropa para el clima" instruction={CONDUCTA_ADAPTATIVA_055_CONFIG.descripcion} rounds={ROUNDS} characterEmoji="🧒" />;
}
