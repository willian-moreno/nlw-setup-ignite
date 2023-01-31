import { ActivityIndicator, View } from 'react-native';

export default function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator
        color="#7C3AED"
        size={'large'}
      />
    </View>
  );
}
