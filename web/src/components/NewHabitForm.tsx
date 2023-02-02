import { Checkbox } from '@/components/Checkbox';
import { api } from '@/plugins/axios';
import { Check } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export function NewHabitForm() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function fetchCreateNewHabit(event: FormEvent) {
    event.preventDefault();

    try {
      if (!title.trim() || weekDays.length === 0)
        return toast.warning('Preencha o título do hábito e o(s) dia(s) da semana.');

      await api.post('habits', {
        title,
        weekDays,
      });

      setTitle('');
      setWeekDays([]);
      toast.success('Hábito adicionado.');
    } catch (error) {
      toast.error('Não foi possível inserir um novo hábito.');
    }
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);
      setWeekDays(weekDaysWithRemovedOne);
      return;
    }

    const weekDaysWithAddedOne = [...weekDays, weekDay];
    setWeekDays(weekDaysWithAddedOne);
    return;
  }

  return (
    <form
      className="w-full flex flex-col mt-6"
      onSubmit={fetchCreateNewHabit}
    >
      <label
        htmlFor="title"
        className="font-semibold leading-tight mb-3"
      >
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="Ex.: Exercícios, dormir bem, etc."
        autoFocus
        className="p-4 rounded-lg bg-zinc-800 text-white placeholder:text-zinc-400 border-2 border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label
        htmlFor=""
        className="font-semibold leading-tight mt-6 mb-3"
      >
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2">
        {availableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox
              key={weekDay}
              title={weekDay}
              onCheckedChange={() => handleToggleWeekDay(index)}
              checked={weekDays.includes(index)}
            />
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 transition-all hover:bg-green-500 disabled:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background"
        disabled={!title.length || !weekDays.length}
      >
        <Check
          size={20}
          weight="bold"
        />
        Confirmar
      </button>
    </form>
  );
}
