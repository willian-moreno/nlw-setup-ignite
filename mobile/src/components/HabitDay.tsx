import {
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps {
  day: number;
}

export function HabitDay({ day, ...rest }: HabitDayProps) {
  return (
    <TouchableOpacity
      className="m-1 bg-zinc-900 border-2 border-zinc-800 rounded-lg flex items-center justify-center"
      activeOpacity={0.7}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      {...rest}
    >
      <Text className="text-zinc-800">{day}</Text>
    </TouchableOpacity>
  );
}
