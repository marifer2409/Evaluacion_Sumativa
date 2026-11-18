export type Habit = {
  id: string;
  name: string;
  description: string;
  duration: string;
  emoji: string;
};

export const PREDEFINED_HABITS: Habit[] = [
  {
    id: 'programming',
    name: 'Estudiar programación',
    description: 'Aprende algo nuevo y practica un poco.',
    duration: '30 minutos',
    emoji: '💻',
  },
  {
    id: 'reading',
    name: 'Leer',
    description: 'Desconecta y disfruta de un buen libro.',
    duration: '20 minutos',
    emoji: '📖',
  },
  {
    id: 'exercise',
    name: 'Mover el cuerpo',
    description: 'Una caminata o entrenamiento también cuenta.',
    duration: '30 minutos',
    emoji: '🏃',
  },
  {
    id: 'water',
    name: 'Beber agua',
    description: 'Mantente hidratado durante el día.',
    duration: '8 vasos',
    emoji: '💧',
  },
];
