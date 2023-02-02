import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import moment from 'moment';
import { HabitsList } from '@/components/HabitsList';
import { ProgressBar } from '@/components/ProgressBar';
import { useState } from 'react';

interface HabitDayProps {
  defaultCompleted?: number;
  amount?: number;
  date: Date;
}

export function HabitDay({ amount = 0, defaultCompleted = 0, date }: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);

  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;
  const dayAndMonth = moment(date).format('DD/MM');
  const dayOfWeek = moment(date).format('dddd');

  const today = moment().startOf('day').toDate();
  const isCurrentDay = moment(date).isSame(today);

  function handleCompletedChanged(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          'w-10 h-10 border-2 rounded-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background transition-colors',
          {
            'bg-zinc-900 border-zinc-800': completedPercentage === 0,
            'bg-violet-900 border-violet-800': completedPercentage > 0 && completedPercentage < 20,
            'bg-violet-800 border-violet-700':
              completedPercentage >= 20 && completedPercentage < 40,
            'bg-violet-700 border-violet-600':
              completedPercentage >= 40 && completedPercentage < 60,
            'bg-violet-600 border-violet-500':
              completedPercentage >= 60 && completedPercentage < 80,
            'bg-violet-500 border-violet-400': completedPercentage >= 80,
            'border-white border-3': isCurrentDay === true,
          }
        )}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col animate-scale-in focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>

          <ProgressBar progress={completedPercentage} />

          <HabitsList
            date={date}
            onCompletedChanged={handleCompletedChanged}
          />

          <Popover.Arrow
            height={8}
            width={16}
            className="fill-zinc-900"
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
