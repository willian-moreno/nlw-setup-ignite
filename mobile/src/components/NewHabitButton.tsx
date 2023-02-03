import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import colors from 'tailwindcss/colors';
import { Feather } from '@expo/vector-icons';

interface NewHabitButtonProps {
  value?: string;
}

export function NewHabitButton({ value = 'Novo' }: NewHabitButtonProps) {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      className="flex-row items-center justify-center h-11 px-4 border-2 border-violet-500 rounded-lg uppercase"
      activeOpacity={0.7}
      onPress={() => navigate('new')}
    >
      <Feather
        name="plus"
        color={colors.violet[500]}
        size={20}
      />
      <Text className="uppercase text-white font-semibold text-sm ml-3">
        {value}
      </Text>
    </TouchableOpacity>
  );
}
