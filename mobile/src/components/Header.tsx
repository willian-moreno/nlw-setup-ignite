import Logo from '@/assets/logo.svg';
import { View } from 'react-native';
import { NewHabitButton } from './NewHabitButton';

export function Header() {
  return (
    <View className="w-full flex-row items-center justify-between p-1">
      <Logo />
      <NewHabitButton />
    </View>
  );
}
