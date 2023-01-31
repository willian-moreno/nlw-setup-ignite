import Logo from '@/assets/logo.svg';
import { View, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

export function Header() {
  return (
    <View className="w-full flex-row items-center justify-between m-1">
      <Logo />
      <TouchableOpacity
        className="flex-row items-center justify-center h-11 px-4 border-2 border-violet-500 rounded-lg uppercase"
        activeOpacity={0.7}
      >
        <Feather
          name="plus"
          color={colors.violet[500]}
          size={20}
        />
        <Text className="uppercase text-white font-semibold text-sm ml-3">
          Novo
        </Text>
      </TouchableOpacity>
    </View>
  );
}
