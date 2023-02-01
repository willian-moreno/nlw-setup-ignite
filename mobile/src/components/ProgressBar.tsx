import { StyleProp, View, ViewStyle } from 'react-native';

interface ProgressBarProps {
  progress?: number;
}

export function ProgressBar({ progress = 0 }: ProgressBarProps) {
  const progressStyle: StyleProp<ViewStyle> = {
    width: `${progress}%`,
  };

  return (
    <View className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <View
        className="h-3 rounded-xl bg-violet-600"
        style={progressStyle}
      />
    </View>
  );
}
