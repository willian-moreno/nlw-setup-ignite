import Loading from '@/components/Loading';
import '@/plugins/moment';
import { Routes } from '@/routes';
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter';
import { StatusBar, View } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded)
    return (
      <View className="flex-1 bg-background">
        <Loading />
      </View>
    );

  return (
    <>
      <Routes />
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
    </>
  );
}
