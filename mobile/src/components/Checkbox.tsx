import { Feather } from '@expo/vector-icons';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import colors from 'tailwindcss/colors';
import clsx from 'clsx';

interface CheckboxProps extends TouchableOpacityProps {
  title: string;
  checked?: boolean;
  disabled?: boolean;
}

export function Checkbox({
  title,
  checked = false,
  disabled = false,
  ...rest
}: CheckboxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      disabled={disabled}
      {...rest}
    >
      {checked ? (
        <View
          className={clsx(
            'w-8 h-8 bg-green-500 rounded-lg items-center justify-center',
            {
              'opacity-50': disabled,
            }
          )}
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />
        </View>
      ) : (
        <View className="w-8 h-8 bg-zinc-900 rounded-lg items-center justify-center border-2 border-zinc-800" />
      )}

      <Text
        className={clsx('text-white text-base ml-3 text-semibold', {
          'opacity-50': disabled,
        })}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
