import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import colors from 'tailwindcss/colors';

export function BackButton() {
  const { goBack } = useNavigation();

  return (
    <TouchableOpacity>
      <Feather
        name="arrow-left"
        size={32}
        color={colors.zinc[400]}
        onPress={goBack}
      />
    </TouchableOpacity>
  );
}
