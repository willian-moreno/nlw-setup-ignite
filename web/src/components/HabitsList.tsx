import { Checkbox } from '@/components/Checkbox';
import { api } from '@/plugins/axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface HabitsListProps {
  date: Date;
  onCompletedChanged: (amount: number, completed: number) => void;
}

type HabitsResponse = {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
};

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {
  const [habits, setHabits] = useState<HabitsResponse>();
  const parsedDate = moment(date).startOf('day').toDate();
  const isDateInPast = moment(date).endOf('day').isBefore(new Date());

  async function fetchHabitsList() {
    try {
      const { data } = await api.get('day', {
        params: {
          date: parsedDate,
        },
      });

      setHabits(data);
    } catch (error) {
      toast.error('Não foi possível obter a lista de hábitos deste dia.');
    }
  }

  async function fetchToggleHabit(habitId: string) {
    try {
      await api.patch(`habits/${habitId}/toggle`);

      const isHabitAlreadyCompleted = habits!.completedHabits.includes(habitId);

      let completedHabits: string[] = [];

      if (isHabitAlreadyCompleted) {
        completedHabits = habits!.completedHabits.filter((id) => id !== habitId);
      } else {
        completedHabits = [...habits!.completedHabits, habitId];
      }

      setHabits({
        possibleHabits: habits!.possibleHabits,
        completedHabits,
      });

      onCompletedChanged(habits!.possibleHabits.length, completedHabits.length);
    } catch (error) {
      toast.error('Não foi possível alterar o estado desse hábito.');
    }
  }

  useEffect(() => {
    fetchHabitsList();
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-3 overflow-y-auto max-h-[7.5rem] focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background">
      {habits?.possibleHabits.length ? (
        habits.possibleHabits.map(({ id, title }) => {
          const isChecked = habits.completedHabits.includes(id);

          return (
            <Checkbox
              key={id}
              title={title}
              lineThrough={true}
              checked={isChecked}
              disabled={isDateInPast}
              onCheckedChange={() => fetchToggleHabit(id)}
            />
          );
        })
      ) : (
        <span className="text-white text-base text-center">Nenhum hábito encontrado.</span>
      )}
    </div>
  );
}
