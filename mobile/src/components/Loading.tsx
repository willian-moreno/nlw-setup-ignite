import { ActivityIndicator, View } from 'react-native';

export default function Loading() {
  return (
    <View className="absolute inset-0 w-screen h-screen items-center justify-center bg-transparent z-10">
      <ActivityIndicator
        color="#7C3AED"
        size={'large'}
      />
    </View>
  );
}
