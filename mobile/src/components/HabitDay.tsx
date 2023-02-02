import clsx from 'clsx';
import { generateProgressPercentage } from '../utils/generate-progress-percentage';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import moment from 'moment';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps {
  date: Date;
  completed?: number;
  amount?: number;
}

export function HabitDay({
  amount = 0,
  completed = 0,
  date,
  ...rest
}: HabitDayProps) {
  const day = date.getDate();
  const completedPercentage = generateProgressPercentage(amount, completed);
  const today = moment().startOf('day').toDate();
  const isCurrentDay = moment(date).isSame(today);

  return (
    <TouchableOpacity
      className={clsx(
        'm-1 border-2 rounded-lg flex items-center justify-center',
        {
          'bg-zinc-900 border-zinc-800': completedPercentage === 0,
          'bg-violet-900 border-violet-800':
            completedPercentage > 0 && completedPercentage < 20,
          'bg-violet-800 border-violet-700':
            completedPercentage >= 20 && completedPercentage < 40,
          'bg-violet-700 border-violet-600':
            completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-600 border-violet-500':
            completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-500 border-violet-400': completedPercentage >= 80,
          'border-white border-4': isCurrentDay,
        }
      )}
      activeOpacity={0.7}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      {...rest}
    >
      <Text className="text-white text-base opacity-20">{day}</Text>
    </TouchableOpacity>
  );
}
