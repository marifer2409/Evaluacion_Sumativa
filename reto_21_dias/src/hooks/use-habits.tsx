import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from 'react';

import { PREDEFINED_HABITS, type Habit } from '@/data/habits';

type CompletionByDay = Record<number, string[]>;

type HabitWithStatus = Habit & {
  completed: boolean;
};

type HabitsContextValue = {
  habits: HabitWithStatus[];
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  toggleHabit: (habitId: string) => void;
  resetProgress: () => void;
  completedCount: number;
  progress: number;
  overallProgress: number;
  completedDays: number;
  progressForDay: (day: number) => number;
};

const HabitsContext = createContext<HabitsContextValue | null>(null);

export function HabitsProvider({ children }: PropsWithChildren) {
  const [selectedDay, setSelectedDayState] = useState(1);
  const [completionByDay, setCompletionByDay] = useState<CompletionByDay>({});

  const setSelectedDay = useCallback((day: number) => {
    if (Number.isInteger(day) && day >= 1 && day <= 21) {
      setSelectedDayState(day);
    }
  }, []);

  const toggleHabit = useCallback(
    (habitId: string) => {
      if (!PREDEFINED_HABITS.some((habit) => habit.id === habitId)) {
        return;
      }

      setCompletionByDay((current) => {
        const dayCompletions = current[selectedDay] ?? [];
        const isCompleted = dayCompletions.includes(habitId);
        const nextCompletions = isCompleted
          ? dayCompletions.filter((id) => id !== habitId)
          : [...dayCompletions, habitId];

        return { ...current, [selectedDay]: nextCompletions };
      });
    },
    [selectedDay]
  );

  const progressForDay = useCallback(
    (day: number) => {
      const completed = completionByDay[day]?.length ?? 0;
      return Math.round((completed / PREDEFINED_HABITS.length) * 100);
    },
    [completionByDay]
  );

  const habits = useMemo(
    () =>
      PREDEFINED_HABITS.map((habit) => ({
        ...habit,
        completed: (completionByDay[selectedDay] ?? []).includes(habit.id),
      })),
    [completionByDay, selectedDay]
  );
  const completedCount = habits.filter((habit) => habit.completed).length;
  const progress = Math.round((completedCount / habits.length) * 100);
  const completedTotal = Object.values(completionByDay).reduce((total, items) => total + items.length, 0);
  const overallProgress = Math.round(
    (completedTotal / (PREDEFINED_HABITS.length * 21)) * 100
  );
  const completedDays = Object.values(completionByDay).filter((items) => items.length > 0).length;

  const resetProgress = useCallback(() => {
    setCompletionByDay({});
    setSelectedDayState(1);
  }, []);

  const value = useMemo(
    () => ({
      habits,
      selectedDay,
      setSelectedDay,
      toggleHabit,
      resetProgress,
      completedCount,
      progress,
      overallProgress,
      completedDays,
      progressForDay,
    }),
    [
      habits,
      selectedDay,
      setSelectedDay,
      toggleHabit,
      resetProgress,
      completedCount,
      progress,
      overallProgress,
      completedDays,
      progressForDay,
    ]
  );

  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>;
}

export function useHabits() {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error('useHabits debe utilizarse dentro de HabitsProvider.');
  }
  return context;
}
