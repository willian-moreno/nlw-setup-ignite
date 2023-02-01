import { BackButton } from '@/components/BackButton';
import { ScrollView, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import { ProgressBar } from '@/components/ProgressBar';
import { Checkbox } from '@/components/Checkbox';

interface HabitParams {
  date: string;
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as HabitParams;
  const parsedDate = moment(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <BackButton />

        <Text className="mt-6 text-base text-white lowercase font-semibold">
          {dayOfWeek}
        </Text>
        <Text className="mt-1 text-3xl text-white font-extrabold">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={40} />

        <View className="mt-6">
          <Checkbox
            title="Beber 2L de água"
            checked={false}
          />
          <Checkbox
            title="Caminhar"
            checked={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}
