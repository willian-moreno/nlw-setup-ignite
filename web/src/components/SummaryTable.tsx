import { HabitDay } from '@components/HabitDay';
import { generateDatesFromYearBeginning } from '@utils/generate-dates-from-year-beginning';

const characterWeekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function SummaryTable() {
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {characterWeekDays.map((characterWeekDay, index) => {
          return (
            <div
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
              key={characterWeekDay.concat('-', String(index))}
            >
              {characterWeekDay}
            </div>
          );
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3 overflow-x-auto">
        {summaryDates.map((date) => {
          return <HabitDay key={date.toString()} />;
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return (
              <div
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
                key={'not-allowed-day'.concat('-', String(index))}
              ></div>
            );
          })}
      </div>
    </div>
  );
}
