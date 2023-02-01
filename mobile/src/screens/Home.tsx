import { DAY_SIZE, HabitDay } from '@/components/HabitDay';
import { Header } from '@/components/Header';
import { generateDatesFromYearBeginning } from '@/utils/generate-dates-from-year-beginning';
import { Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const characterWeekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearBeginning = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 5;
const amountOfDaysToFill =
  minimumSummaryDatesSize - datesFromYearBeginning.length;

export function Home() {
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-row mt-6 mb-2">
        {characterWeekDays.map((characterWeekDay, index) => {
          return (
            <Text
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{
                width: DAY_SIZE,
                height: DAY_SIZE,
              }}
              key={characterWeekDay.concat('-', String(index))}
            >
              {characterWeekDay}
            </Text>
          );
        })}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearBeginning.map((date) => {
            return (
              <HabitDay
                key={date.toISOString()}
                day={date.getDate()}
                onPress={() =>
                  navigate('habit', {
                    date: date.toISOString(),
                  })
                }
              />
            );
          })}
          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => {
              return (
                <View
                  className="m-1 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-50"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  key={'not-allowed-day'.concat('-', String(index))}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}
